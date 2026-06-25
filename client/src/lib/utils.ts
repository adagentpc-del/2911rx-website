import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const PORTAL_URL = "https://bloom.greenstonerx.com/dtp/69b3278ba0eb867770b24280";

/**
 * Editable site settings. Fill these in when the client provides them.
 * Anything left as an empty string is hidden on the site (so we never show a
 * dead email/phone or a broken booking link).
 */
export const CONTACT_EMAIL: string = ""; // e.g. "info@2911rx.com" — shown in footer + receives form copies
export const CONTACT_PHONE: string = ""; // e.g. "(555) 123-4567"
export const CALENDAR_URL: string = ""; // e.g. Calendly link for the 15-min consult
export const LEAD_MAGNET = {
  title: "GLP-1 & Peptide Partnership Readiness Checklist",
  file: "/2911rx-partnership-readiness-checklist.pdf",
};
