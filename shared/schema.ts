import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

/* ------------------------------------------------------------------ */
/* Leads / inquiries                                                   */
/* ------------------------------------------------------------------ */
export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  // organization/practiceType/interest are nullable so lighter captures
  // (consult popup, lead magnet) that only collect name + email can live in the
  // same table, distinguished by `source`.
  organization: text("organization"),
  practiceType: text("practice_type"),
  state: text("state"),
  interest: text("interest"),
  message: text("message"),
  source: text("source").notNull().default("contact-form"),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Full contact form: requires practice details.
export const insertInquirySchema = createInsertSchema(inquiries)
  .omit({ id: true, status: true, createdAt: true, source: true })
  .extend({
    name: z.string().min(2, "Please enter your full name"),
    email: z.string().email("Please enter a valid email"),
    organization: z.string().min(2, "Please enter your practice or organization"),
    practiceType: z.string().min(1, "Please select your practice type"),
    interest: z.string().min(1, "Please select an area of interest"),
    phone: z.string().optional().nullable(),
    state: z.string().optional().nullable(),
    message: z.string().optional().nullable(),
  });

// Lightweight capture: consult popup + lead magnet (name + email only).
export const insertLeadSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional().nullable(),
  organization: z.string().optional().nullable(),
  message: z.string().optional().nullable(),
  source: z.string().min(1),
});

export type InsertInquiry = z.infer<typeof insertInquirySchema>;
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Inquiry = typeof inquiries.$inferSelect;

/* ------------------------------------------------------------------ */
/* Admin users (in-app logins, hashed passwords)                       */
/* ------------------------------------------------------------------ */
export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: text("role").notNull().default("admin"), // "owner" | "admin"
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
export type AdminUser = typeof adminUsers.$inferSelect;

/* ------------------------------------------------------------------ */
/* Settings (key/value, editable from the admin panel)                 */
/* ------------------------------------------------------------------ */
export const settings = pgTable("settings", {
  key: text("key").primaryKey(),
  value: text("value"),
});
export type Setting = typeof settings.$inferSelect;

// Keys safe to expose publicly (used by the site itself).
export const PUBLIC_SETTING_KEYS = ["contact_email", "contact_phone", "calendar_url"] as const;
// Admin-only keys (never sent to the public site).
export const PRIVATE_SETTING_KEYS = ["notify_email", "resend_api_key", "resend_from"] as const;
export const ALL_SETTING_KEYS = [...PUBLIC_SETTING_KEYS, ...PRIVATE_SETTING_KEYS] as const;
export type SettingKey = (typeof ALL_SETTING_KEYS)[number];

/* ------------------------------------------------------------------ */
/* Analytics events (privacy-friendly: no cookies, IP, or fingerprint) */
/* ------------------------------------------------------------------ */
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // "page_view" | "lead" | "consult" | "download"
  path: text("path"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
export type EventRow = typeof events.$inferSelect;

/* ------------------------------------------------------------------ */
/* Static option lists                                                 */
/* ------------------------------------------------------------------ */
export const PRACTICE_TYPES = [
  "Wellness Clinic",
  "Med Spa",
  "Concierge Medicine",
  "Telehealth Provider",
  "Functional Medicine Clinic",
  "Longevity Practice",
  "Other Licensed Provider",
] as const;

export const INTEREST_AREAS = [
  "GLP-1 Therapy Programs",
  "Metabolic Optimization Programs",
  "Peptide Wellness Support",
  "Wholesale / Distribution Partnership",
  "Operational Support Systems",
  "General Partnership Inquiry",
] as const;
