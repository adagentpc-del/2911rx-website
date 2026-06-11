import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  organization: text("organization").notNull(),
  practiceType: text("practice_type").notNull(),
  state: text("state"),
  interest: text("interest").notNull(),
  message: text("message"),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertInquirySchema = createInsertSchema(inquiries)
  .omit({ id: true, status: true, createdAt: true })
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

export type InsertInquiry = z.infer<typeof insertInquirySchema>;
export type Inquiry = typeof inquiries.$inferSelect;

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
