/**
 * 2911Rx custom icon set.
 * Hand-drawn duotone SVGs: navy structural strokes + teal accents.
 * Consistent 28x28 viewBox, drawn for use inside .icon-tile containers.
 * Deliberately bespoke (no icon-library look, no emoji).
 */
import { cn } from "@/lib/utils";

type IconProps = { className?: string };

const base = {
  viewBox: "0 0 28 28",
  fill: "none" as const,
  xmlns: "http://www.w3.org/2000/svg",
};

const navy = "hsl(214 45% 18%)";
const teal = "hsl(172 70% 31%)";
const s = { strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

function Tile({ className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg {...base} className={cn("h-7 w-7", className)} aria-hidden="true">
      {children}
    </svg>
  );
}

/** GLP-1 therapy: precision dose vial with measured gradations and a vitality fill */
export function IconVial({ className }: IconProps) {
  return (
    <Tile className={className}>
      <rect x="9.5" y="6.5" width="9" height="16" rx="2.5" stroke={navy} strokeWidth="1.5" />
      <path d="M11 3.5h6" stroke={navy} strokeWidth="1.5" {...s} />
      <path d="M14 3.5v3" stroke={navy} strokeWidth="1.5" />
      <path d="M9.5 13.5h3.2M9.5 16.5h2.2M9.5 10.5h2.2" stroke={navy} strokeWidth="1.2" {...s} />
      <path d="M10.3 18c1.2-.9 2.5-.9 3.7 0s2.5.9 3.7 0v3.3a1.7 1.7 0 0 1-1.7 1.7h-4a1.7 1.7 0 0 1-1.7-1.7V18Z" fill={teal} fillOpacity="0.85" />
    </Tile>
  );
}

/** Metabolic optimization: heartbeat waveform rising within a ring */
export function IconMetabolic({ className }: IconProps) {
  return (
    <Tile className={className}>
      <circle cx="14" cy="14" r="10.5" stroke={navy} strokeWidth="1.5" />
      <path d="M5.5 15h3.2l1.8-4.4 2.6 7 2.2-9 2 6.4h2.9" stroke={teal} strokeWidth="1.7" {...s} />
      <circle cx="21" cy="15.4" r="1.5" fill={teal} />
    </Tile>
  );
}

/** Peptide wellness: linked amino-acid chain */
export function IconPeptide({ className }: IconProps) {
  return (
    <Tile className={className}>
      <circle cx="8" cy="9.5" r="3" stroke={navy} strokeWidth="1.5" />
      <circle cx="20" cy="9.5" r="3" stroke={navy} strokeWidth="1.5" />
      <circle cx="14" cy="19" r="3" fill={teal} fillOpacity="0.18" stroke={teal} strokeWidth="1.6" />
      <path d="M10.4 11.4l2.2 4M17.6 11.4l-2.2 4M10.8 8.7h6.4" stroke={navy} strokeWidth="1.4" {...s} />
    </Tile>
  );
}

/** Operational systems: interlocking workflow nodes */
export function IconSystems({ className }: IconProps) {
  return (
    <Tile className={className}>
      <rect x="4" y="4.5" width="8" height="8" rx="2" stroke={navy} strokeWidth="1.5" />
      <rect x="16" y="15.5" width="8" height="8" rx="2" stroke={navy} strokeWidth="1.5" />
      <path d="M12 8.5h5.5A2.5 2.5 0 0 1 20 11v4.5" stroke={teal} strokeWidth="1.6" {...s} />
    </Tile>
  );
}

/** Trust: shield with check */
export function IconShield({ className }: IconProps) {
  return (
    <Tile className={className}>
      <path d="M14 3.2l8 3v5.8c0 5.2-3.4 9-8 10.8-4.6-1.8-8-5.6-8-10.8V6.2l8-3Z" stroke={navy} strokeWidth="1.5" {...s} />
      <path d="M10 13.6l2.7 2.7L18 10.6" stroke={teal} strokeWidth="1.8" {...s} />
    </Tile>
  );
}

/** Partnership: two clasped forms */
export function IconHandshake({ className }: IconProps) {
  return (
    <Tile className={className}>
      <path d="M3.5 9.5l3.4-1.7 5 1.1" stroke={navy} strokeWidth="1.5" {...s} />
      <path d="M24.5 9.5l-3.4-1.7-4 1.1" stroke={navy} strokeWidth="1.5" {...s} />
      <path d="M11.9 10l1 1a1.5 1.5 0 0 1-2 2.2L9 11.6 6.9 16M21.1 16l-4.2-4" stroke={navy} strokeWidth="1.5" {...s} />
      <path d="M13 14l2.4 2.4M11.6 15.8l2.1 2.1M10.4 17.6l1.7 1.7" stroke={teal} strokeWidth="1.6" {...s} />
    </Tile>
  );
}

/** Recurring revenue: cycle arrows around a coin */
export function IconRecurring({ className }: IconProps) {
  return (
    <Tile className={className}>
      <path d="M23 9a9.5 9.5 0 0 0-16.6-2.8M5 19a9.5 9.5 0 0 0 16.6 2.8" stroke={navy} strokeWidth="1.5" {...s} />
      <path d="M23 4.5V9h-4.5M5 23.5V19h4.5" stroke={navy} strokeWidth="1.5" {...s} />
      <path d="M14 10v8M11.8 11.4h3a1.6 1.6 0 0 1 0 3.2h-2a1.6 1.6 0 0 0 0 3.2h3" stroke={teal} strokeWidth="1.6" {...s} />
    </Tile>
  );
}

/** Reliable fulfillment: parcel with sealed path */
export function IconFulfillment({ className }: IconProps) {
  return (
    <Tile className={className}>
      <path d="M14 3.8l8.5 4.6v9l-8.5 4.6-8.5-4.6v-9L14 3.8Z" stroke={navy} strokeWidth="1.5" {...s} />
      <path d="M5.5 8.4L14 13l8.5-4.6M14 13v9" stroke={navy} strokeWidth="1.4" {...s} />
      <path d="M9.7 6.1l8.5 4.6" stroke={teal} strokeWidth="1.6" {...s} />
    </Tile>
  );
}

/** Operational simplicity: tidy stacked rows */
export function IconSimplicity({ className }: IconProps) {
  return (
    <Tile className={className}>
      <path d="M4.5 8h11M4.5 14h19M4.5 20h8" stroke={navy} strokeWidth="1.5" {...s} />
      <circle cx="20.5" cy="8" r="2.4" fill={teal} fillOpacity="0.18" stroke={teal} strokeWidth="1.6" />
      <circle cx="15.5" cy="20" r="2.4" fill={teal} fillOpacity="0.18" stroke={teal} strokeWidth="1.6" />
    </Tile>
  );
}

/** Positioning: target */
export function IconPositioning({ className }: IconProps) {
  return (
    <Tile className={className}>
      <circle cx="14" cy="14" r="9.5" stroke={navy} strokeWidth="1.5" />
      <circle cx="14" cy="14" r="5.2" stroke={navy} strokeWidth="1.4" />
      <circle cx="14" cy="14" r="2" fill={teal} />
    </Tile>
  );
}

/** Education: open guide */
export function IconEducation({ className }: IconProps) {
  return (
    <Tile className={className}>
      <path d="M14 7.4C12 5.9 9.4 5.4 5.5 5.6v15c3.9-.2 6.5.3 8.5 1.8 2-1.5 4.6-2 8.5-1.8v-15c-3.9-.2-6.5.3-8.5 1.8Z" stroke={navy} strokeWidth="1.5" {...s} />
      <path d="M14 7.4v15" stroke={teal} strokeWidth="1.6" {...s} />
    </Tile>
  );
}

/** Practice / building */
export function IconBuilding({ className }: IconProps) {
  return (
    <Tile className={className}>
      <path d="M4.5 23.5h19M7 23.5V6.5l7-2.7 7 2.7v17" stroke={navy} strokeWidth="1.5" {...s} />
      <path d="M11 10.5h1.8M15.2 10.5H17M11 14.5h1.8M15.2 14.5H17" stroke={navy} strokeWidth="1.3" {...s} />
      <path d="M12 23.5v-3.8h4v3.8" stroke={teal} strokeWidth="1.6" {...s} />
    </Tile>
  );
}

/* Inline UI glyphs (single-stroke, currentColor) */
export function IconArrow({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("h-4 w-4", className)} aria-hidden="true">
      <path d="M4 12h15M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.7" {...s} />
    </svg>
  );
}

export function IconExternal({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("h-3.5 w-3.5", className)} aria-hidden="true">
      <path d="M14 4h6v6M20 4l-8.5 8.5M18 13v5.5A1.5 1.5 0 0 1 16.5 20h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H11" stroke="currentColor" strokeWidth="1.6" {...s} />
    </svg>
  );
}

export function IconCheck({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("h-5 w-5", className)} aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7" stroke="currentColor" strokeWidth="1.8" {...s} />
    </svg>
  );
}
