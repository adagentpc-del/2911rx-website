import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const PORTAL_URL = "https://bloom.greenstonerx.com/dtp/69b3278ba0eb867770b24280";
