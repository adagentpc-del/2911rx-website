import type { Express, Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import { storage } from "./storage";
import {
  insertInquirySchema,
  insertLeadSchema,
  PUBLIC_SETTING_KEYS,
  ALL_SETTING_KEYS,
  type Inquiry,
} from "@shared/schema";
import { fromZodError } from "zod-validation-error";

declare module "express-session" {
  interface SessionData {
    isAdmin?: boolean;
    adminEmail?: string;
  }
}

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.session?.isAdmin) return next();
  return res.status(401).json({ error: "Unauthorized" });
}

/** Best-effort email alert via Resend. Never blocks or throws into the request. */
async function sendLeadAlert(lead: Inquiry) {
  try {
    const s = await storage.getSettings();
    const key = s.resend_api_key;
    const to = s.notify_email;
    if (!key || !to) return; // alerts not configured yet
    const from = s.resend_from || "2911Rx <onboarding@resend.dev>";
    const lines = [
      `Source: ${lead.source}`,
      `Name: ${lead.name}`,
      `Email: ${lead.email}`,
      lead.phone ? `Phone: ${lead.phone}` : "",
      lead.organization ? `Practice: ${lead.organization}` : "",
      lead.practiceType ? `Practice type: ${lead.practiceType}` : "",
      lead.state ? `State: ${lead.state}` : "",
      lead.interest ? `Interest: ${lead.interest}` : "",
      lead.message ? `Message: ${lead.message}` : "",
    ].filter(Boolean);
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `New ${lead.source} lead: ${lead.name}`,
        html: `<h2>New 2911Rx lead</h2><p>${lines.join("<br>")}</p>`,
      }),
    });
  } catch (err) {
    console.error("Lead alert email failed:", err);
  }
}

export function registerRoutes(app: Express) {
  /* ---------------- Public: lead capture ---------------- */
  app.post("/api/inquiries", async (req, res) => {
    if (req.body?.company_website) return res.status(201).json({ ok: true }); // honeypot
    const parsed = insertInquirySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: fromZodError(parsed.error).message });
    }
    try {
      const inquiry = await storage.createInquiry(parsed.data);
      await storage.logEvent("lead", "/contact");
      void sendLeadAlert(inquiry);
      res.status(201).json({ ok: true, id: inquiry.id });
    } catch (err) {
      console.error("Failed to save inquiry:", err);
      res.status(500).json({ error: "Failed to submit. Please try again." });
    }
  });

  // Consult popup + lead-magnet opt-in (name + email).
  app.post("/api/leads", async (req, res) => {
    if (req.body?.company_website) return res.status(201).json({ ok: true }); // honeypot
    const parsed = insertLeadSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: fromZodError(parsed.error).message });
    }
    try {
      const lead = await storage.createLead(parsed.data);
      const evt = parsed.data.source === "lead-magnet" ? "download" : "consult";
      await storage.logEvent(evt, null);
      await storage.logEvent("lead", null);
      void sendLeadAlert(lead);
      res.status(201).json({ ok: true, id: lead.id });
    } catch (err) {
      console.error("Failed to save lead:", err);
      res.status(500).json({ error: "Failed to submit. Please try again." });
    }
  });

  // Privacy-friendly page-view tracking (no cookies, IP, or fingerprint).
  app.post("/api/track", async (req, res) => {
    const type = String(req.body?.type ?? "");
    const path = req.body?.path ? String(req.body.path).slice(0, 200) : null;
    if (!["page_view"].includes(type)) return res.status(204).end();
    try {
      await storage.logEvent(type, path);
    } catch {
      /* tracking is best-effort */
    }
    res.status(204).end();
  });

  // Public site settings (calendar link, contact email/phone).
  app.get("/api/settings/public", async (_req, res) => {
    const all = await storage.getSettings();
    const out: Record<string, string> = {};
    for (const k of PUBLIC_SETTING_KEYS) if (all[k]) out[k] = all[k];
    res.json(out);
  });

  /* ---------------- Admin: auth & first-run setup ---------------- */
  app.get("/api/admin/setup-status", async (_req, res) => {
    res.json({ needsSetup: (await storage.countAdmins()) === 0 });
  });

  app.post("/api/admin/setup", async (req, res) => {
    if ((await storage.countAdmins()) > 0) {
      return res.status(403).json({ error: "Setup already completed." });
    }
    const email = String(req.body?.email ?? "").trim();
    const password = String(req.body?.password ?? "");
    if (!/^\S+@\S+\.\S+$/.test(email) || password.length < 8) {
      return res.status(400).json({ error: "Enter a valid email and a password of at least 8 characters." });
    }
    const hash = await bcrypt.hash(password, 10);
    await storage.createAdmin(email, hash, "owner");
    req.session.isAdmin = true;
    req.session.adminEmail = email;
    res.status(201).json({ ok: true });
  });

  app.post("/api/admin/login", async (req, res) => {
    const email = String(req.body?.username ?? req.body?.email ?? "").trim();
    const password = String(req.body?.password ?? "");
    if ((await storage.countAdmins()) === 0) {
      return res.status(409).json({ error: "No admin account yet. Visit /admin/setup to create the owner login." });
    }
    const user = await storage.getAdminByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    req.session.isAdmin = true;
    req.session.adminEmail = user.email;
    res.json({ ok: true });
  });

  app.post("/api/admin/logout", (req, res) => {
    req.session.destroy(() => res.json({ ok: true }));
  });

  app.get("/api/admin/me", (req, res) => {
    res.json({ isAdmin: !!req.session?.isAdmin, email: req.session?.adminEmail ?? null });
  });

  /* ---------------- Admin: inquiries / CRM ---------------- */
  app.get("/api/admin/inquiries", requireAdmin, async (_req, res) => {
    res.json(await storage.getInquiries());
  });

  app.patch("/api/admin/inquiries/:id", requireAdmin, async (req, res) => {
    const id = Number(req.params.id);
    const status = String(req.body?.status ?? "");
    if (!id || !["new", "contacted", "qualified", "closed"].includes(status)) {
      return res.status(400).json({ error: "Invalid request" });
    }
    const updated = await storage.updateInquiryStatus(id, status);
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  });

  app.delete("/api/admin/inquiries/:id", requireAdmin, async (req, res) => {
    const ok = await storage.deleteInquiry(Number(req.params.id));
    if (!ok) return res.status(404).json({ error: "Not found" });
    res.json({ ok: true });
  });

  /* ---------------- Admin: analytics ---------------- */
  app.get("/api/admin/stats", requireAdmin, async (_req, res) => {
    res.json(await storage.getEventStats());
  });

  /* ---------------- Admin: settings ---------------- */
  app.get("/api/admin/settings", requireAdmin, async (_req, res) => {
    const all = await storage.getSettings();
    const out: Record<string, string> = {};
    for (const k of ALL_SETTING_KEYS) out[k] = all[k] ?? "";
    res.json(out);
  });

  app.put("/api/admin/settings", requireAdmin, async (req, res) => {
    const body = req.body ?? {};
    for (const k of ALL_SETTING_KEYS) {
      if (typeof body[k] === "string") await storage.setSetting(k, body[k].trim());
    }
    res.json({ ok: true });
  });

  /* ---------------- Admin: user management ---------------- */
  app.get("/api/admin/users", requireAdmin, async (_req, res) => {
    res.json(await storage.listAdmins());
  });

  app.post("/api/admin/users", requireAdmin, async (req, res) => {
    const email = String(req.body?.email ?? "").trim();
    const password = String(req.body?.password ?? "");
    if (!/^\S+@\S+\.\S+$/.test(email) || password.length < 8) {
      return res.status(400).json({ error: "Enter a valid email and a password of at least 8 characters." });
    }
    if (await storage.getAdminByEmail(email)) {
      return res.status(409).json({ error: "An admin with that email already exists." });
    }
    const hash = await bcrypt.hash(password, 10);
    const created = await storage.createAdmin(email, hash, "admin");
    res.status(201).json(created);
  });

  app.patch("/api/admin/users/:id/password", requireAdmin, async (req, res) => {
    const password = String(req.body?.password ?? "");
    if (password.length < 8) {
      return res.status(400).json({ error: "Password must be at least 8 characters." });
    }
    const hash = await bcrypt.hash(password, 10);
    const ok = await storage.updateAdminPassword(Number(req.params.id), hash);
    if (!ok) return res.status(404).json({ error: "Not found" });
    res.json({ ok: true });
  });

  app.delete("/api/admin/users/:id", requireAdmin, async (req, res) => {
    if ((await storage.countAdmins()) <= 1) {
      return res.status(400).json({ error: "You cannot delete the only remaining admin." });
    }
    const ok = await storage.deleteAdmin(Number(req.params.id));
    if (!ok) return res.status(404).json({ error: "Not found" });
    res.json({ ok: true });
  });
}
