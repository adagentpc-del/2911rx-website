/**
 * 2911Rx dimensional icon set.
 * Gradient-filled glyphs with highlights and soft depth for a modern 3D feel.
 * 32x32 viewBox. Each icon carries its own gradient defs (unique ids) so they
 * compose anywhere. Designed to sit inside .icon-tile / .icon-tile-dark.
 */
import { cn } from "@/lib/utils";

type IconProps = { className?: string };

const VB = { viewBox: "0 0 32 32", fill: "none", xmlns: "http://www.w3.org/2000/svg" };

// Shared gradient stops
function Defs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="hsl(168 70% 58%)" />
        <stop offset="1" stopColor="hsl(174 78% 30%)" />
      </linearGradient>
      <linearGradient id={`${id}-deep`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="hsl(174 60% 32%)" />
        <stop offset="1" stopColor="hsl(195 65% 22%)" />
      </linearGradient>
      <linearGradient id={`${id}-gloss`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="hsl(0 0% 100%)" stopOpacity="0.85" />
        <stop offset="1" stopColor="hsl(0 0% 100%)" stopOpacity="0" />
      </linearGradient>
    </defs>
  );
}

function Tile({ id, className, children }: IconProps & { id: string; children: React.ReactNode }) {
  return (
    <svg {...VB} className={cn("h-8 w-8", className)} aria-hidden="true">
      <Defs id={id} />
      {children}
    </svg>
  );
}

const W = "hsl(0 0% 100%)";

/** GLP-1 therapy: dimensional dose vial */
export function IconVial({ className }: IconProps) {
  return (
    <Tile id="vial" className={className}>
      <rect x="10" y="7" width="12" height="20" rx="3.5" fill="url(#vial-deep)" />
      <rect x="10" y="14.5" width="12" height="12.5" rx="3.5" fill="url(#vial-fill)" />
      <rect x="11.4" y="8.4" width="4.2" height="17" rx="2.1" fill="url(#vial-gloss)" opacity="0.5" />
      <rect x="9" y="4.4" width="14" height="3.4" rx="1.7" fill="url(#vial-deep)" />
      <path d="M13 18.5h6M13 21.5h4" stroke={W} strokeOpacity="0.85" strokeWidth="1.4" strokeLinecap="round" />
    </Tile>
  );
}

/** Metabolic optimization: rising graph on a rounded chip */
export function IconMetabolic({ className }: IconProps) {
  return (
    <Tile id="metab" className={className}>
      <rect x="4.5" y="4.5" width="23" height="23" rx="7" fill="url(#metab-deep)" />
      <path d="M9 20.5l4.5-5 3.5 3 6-8" stroke="url(#metab-fill)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="23" cy="10.5" r="2.4" fill={W} />
      <rect x="6" y="6" width="20" height="8" rx="5" fill="url(#metab-gloss)" opacity="0.25" />
    </Tile>
  );
}

/** Peptide wellness: molecular cluster */
export function IconPeptide({ className }: IconProps) {
  return (
    <Tile id="pept" className={className}>
      <path d="M10 11l6 7m6-7l-6 7" stroke="url(#pept-deep)" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="10" cy="10.5" r="4" fill="url(#pept-deep)" />
      <circle cx="22" cy="10.5" r="4" fill="url(#pept-deep)" />
      <circle cx="16" cy="21" r="4.6" fill="url(#pept-fill)" />
      <circle cx="8.8" cy="9.2" r="1.3" fill={W} opacity="0.7" />
      <circle cx="14.6" cy="19.5" r="1.6" fill={W} opacity="0.75" />
    </Tile>
  );
}

/** Operational systems: interlocking blocks */
export function IconSystems({ className }: IconProps) {
  return (
    <Tile id="sys" className={className}>
      <rect x="5" y="5" width="11" height="11" rx="3.2" fill="url(#sys-deep)" />
      <rect x="16" y="16" width="11" height="11" rx="3.2" fill="url(#sys-fill)" />
      <path d="M16 10.5h3.5a2 2 0 0 1 2 2V16" stroke="url(#sys-fill)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <rect x="6.4" y="6.4" width="8" height="3.4" rx="1.7" fill="url(#sys-gloss)" opacity="0.4" />
    </Tile>
  );
}

/** Trust: dimensional shield with check */
export function IconShield({ className }: IconProps) {
  return (
    <Tile id="shield" className={className}>
      <path d="M16 4l9 3.2v6.3c0 5.8-3.8 10-9 11.8-5.2-1.8-9-6-9-11.8V7.2L16 4z" fill="url(#shield-deep)" />
      <path d="M16 4l9 3.2v6.3c0 5.8-3.8 10-9 11.8V4z" fill="url(#shield-fill)" opacity="0.55" />
      <path d="M11.5 15.5l3 3 5.5-6" stroke={W} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </Tile>
  );
}

/** Partnership: dimensional clasp */
export function IconHandshake({ className }: IconProps) {
  return (
    <Tile id="hands" className={className}>
      <path d="M4 11l4-2 6 1.4 1.4 1.4a1.9 1.9 0 0 1-2.6 2.7L11 13" fill="none" stroke="url(#hands-deep)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M28 11l-4-2-5 1.4" fill="none" stroke="url(#hands-deep)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 14l2.6 2.6m-4.2-.8l2.4 2.4m-3.8-.6l2 2" stroke="url(#hands-fill)" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M19 10.4L24 15l4-2.6" fill="none" stroke="url(#hands-deep)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </Tile>
  );
}

/** Recurring revenue: cycle around a coin */
export function IconRecurring({ className }: IconProps) {
  return (
    <Tile id="rec" className={className}>
      <circle cx="16" cy="16" r="10.5" fill="url(#rec-deep)" />
      <circle cx="16" cy="16" r="7" fill="url(#rec-fill)" />
      <path d="M16 11.5v9M13.8 13.2h3.4a1.9 1.9 0 0 1 0 3.8h-2.4a1.9 1.9 0 0 0 0 3.8h3.4" stroke={W} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M7 9.5A11 11 0 0 1 25 7" stroke="url(#rec-fill)" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.0" />
    </Tile>
  );
}

/** Reliable fulfillment: dimensional parcel */
export function IconFulfillment({ className }: IconProps) {
  return (
    <Tile id="ful" className={className}>
      <path d="M16 4.5l10 5.4v11.2L16 27.5 6 21.1V9.9L16 4.5z" fill="url(#ful-deep)" />
      <path d="M16 16.2l10-5.4V21.1L16 27.5V16.2z" fill="url(#ful-fill)" opacity="0.7" />
      <path d="M6 9.9l10 5.4 10-5.4" stroke={W} strokeOpacity="0.7" strokeWidth="1.5" fill="none" />
      <path d="M11 7.2l10 5.4" stroke={W} strokeOpacity="0.55" strokeWidth="1.4" />
    </Tile>
  );
}

/** Operational simplicity: clean stacked rows */
export function IconSimplicity({ className }: IconProps) {
  return (
    <Tile id="simp" className={className}>
      <rect x="4.5" y="4.5" width="23" height="23" rx="7" fill="url(#simp-deep)" />
      <path d="M9 11h9M9 16h14M9 21h7" stroke={W} strokeOpacity="0.9" strokeWidth="2" strokeLinecap="round" />
      <circle cx="22" cy="11" r="2.4" fill="url(#simp-fill)" />
      <circle cx="20" cy="21" r="2.4" fill="url(#simp-fill)" />
    </Tile>
  );
}

/** Positioning: dimensional target */
export function IconPositioning({ className }: IconProps) {
  return (
    <Tile id="pos" className={className}>
      <circle cx="16" cy="16" r="11" fill="url(#pos-deep)" />
      <circle cx="16" cy="16" r="7" fill="url(#pos-fill)" opacity="0.45" />
      <circle cx="16" cy="16" r="3.4" fill={W} />
      <circle cx="16" cy="16" r="1.4" fill="url(#pos-deep)" />
    </Tile>
  );
}

/** Education: open guide */
export function IconEducation({ className }: IconProps) {
  return (
    <Tile id="edu" className={className}>
      <path d="M16 8.5C13.5 6.8 10.3 6.3 6 6.5v17c4.3-.2 7.5.3 10 2 2.5-1.7 5.7-2.2 10-2v-17c-4.3-.2-7.5.3-10 2z" fill="url(#edu-deep)" />
      <path d="M16 8.5c2.5-1.7 5.7-2.2 10-2v17c-4.3-.2-7.5.3-10 2v-17z" fill="url(#edu-fill)" opacity="0.6" />
      <path d="M9 11h4.5M9 14.5h4.5M18.5 11H23M18.5 14.5H23" stroke={W} strokeOpacity="0.75" strokeWidth="1.4" strokeLinecap="round" />
    </Tile>
  );
}

/** Practice / building */
export function IconBuilding({ className }: IconProps) {
  return (
    <Tile id="bld" className={className}>
      <path d="M8 27V8l8-3.5L24 8v19z" fill="url(#bld-deep)" />
      <path d="M16 4.5L24 8v19h-8V4.5z" fill="url(#bld-fill)" opacity="0.5" />
      <path d="M11.5 11h2M18.5 11h2M11.5 15h2M18.5 15h2" stroke={W} strokeOpacity="0.8" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M13.5 27v-4h5v4" fill={W} fillOpacity="0.85" />
    </Tile>
  );
}

/* Inline UI glyphs (single-stroke, currentColor) */
export function IconArrow({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("h-4 w-4", className)} aria-hidden="true">
      <path d="M4 12h15M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconExternal({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("h-3.5 w-3.5", className)} aria-hidden="true">
      <path d="M14 4h6v6M20 4l-8.5 8.5M18 13v5.5A1.5 1.5 0 0 1 16.5 20h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconCheck({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("h-5 w-5", className)} aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
