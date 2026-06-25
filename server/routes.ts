import type { Express, Request, Response, NextFunction } from "express";
import { storage } from "./storage";
import { insertInquirySchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "TrueTrim2020!";

declare module "express-session" {
  interface SessionData {
    isAdmin?: boolean;
  }
}

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.session?.isAdmin) return next();
  return res.status(401).json({ error: "Unauthorized" });
}

export function registerRoutes(app: Express) {
  // ---------- Public ----------
  app.post("/api/inquiries", async (req, res) => {
    // Honeypot: real users never fill this hidden field. Pretend success for bots.
    if (req.body?.company_website) {
      return res.status(201).json({ ok: true });
    }
    const parsed = insertInquirySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: fromZodError(parsed.error).message });
    }
    try {
      const inquiry = await storage.createInquiry(parsed.data);
      res.status(201).json({ ok: true, id: inquiry.id });
    } catch (err) {
      console.error("Failed to save inquiry:", err);
      res.status(500).json({ error: "Failed to submit inquiry. Please try again." });
    }
  });

  // ---------- Admin auth ----------
  app.post("/api/admin/login", (req, res) => {
    const { username, password } = req.body ?? {};
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      req.session.isAdmin = true;
      return res.json({ ok: true });
    }
    res.status(401).json({ error: "Invalid credentials" });
  });

  app.post("/api/admin/logout", (req, res) => {
    req.session.destroy(() => res.json({ ok: true }));
  });

  app.get("/api/admin/me", (req, res) => {
    res.json({ isAdmin: !!req.session?.isAdmin });
  });

  // ---------- Admin: inquiries ----------
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
}
