/**
 * Bespoke hero visual for 2911Rx.
 * An abstract "wellness intelligence" composition: a glass panel holding a
 * rising vitality curve, a molecular lattice, and floating metric chips,
 * all in the navy/teal brand palette. Pure SVG, retina-crisp, no photos.
 */
import { motion } from "framer-motion";

const TEAL = "hsl(170 60% 55%)";
const TEAL_SOFT = "hsl(170 55% 50%)";

export default function HeroArt() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-[34rem]"
      aria-hidden="true"
    >
      <svg viewBox="0 0 560 480" className="h-auto w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="hsl(180 40% 70%)" stopOpacity="0.10" />
            <stop offset="1" stopColor="hsl(214 50% 30%)" stopOpacity="0.04" />
          </linearGradient>
          <linearGradient id="curve" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor={TEAL_SOFT} stopOpacity="0.15" />
            <stop offset="1" stopColor={TEAL} stopOpacity="0.55" />
          </linearGradient>
          <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={TEAL} stopOpacity="0.22" />
            <stop offset="1" stopColor={TEAL} stopOpacity="0" />
          </linearGradient>
          <radialGradient id="halo" cx="0.5" cy="0.4" r="0.6">
            <stop offset="0" stopColor={TEAL} stopOpacity="0.28" />
            <stop offset="1" stopColor={TEAL} stopOpacity="0" />
          </radialGradient>
          <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        {/* ambient halo */}
        <circle cx="300" cy="200" r="220" fill="url(#halo)" />

        {/* concentric orbit rings */}
        <g stroke="hsl(180 40% 75%)" strokeOpacity="0.12" fill="none">
          <ellipse cx="300" cy="240" rx="250" ry="250" />
          <ellipse cx="300" cy="240" rx="185" ry="185" />
        </g>

        {/* main glass panel */}
        <g>
          <rect x="70" y="96" width="420" height="288" rx="24" fill="url(#glass)" stroke="hsl(180 40% 80%)" strokeOpacity="0.18" />
          {/* panel header dots */}
          <circle cx="100" cy="126" r="4" fill={TEAL} fillOpacity="0.7" />
          <circle cx="116" cy="126" r="4" fill="hsl(180 40% 80%)" fillOpacity="0.3" />
          <circle cx="132" cy="126" r="4" fill="hsl(180 40% 80%)" fillOpacity="0.3" />
          <rect x="380" y="118" width="80" height="16" rx="8" fill="hsl(180 40% 80%)" fillOpacity="0.10" />

          {/* baseline grid */}
          <g stroke="hsl(180 40% 80%)" strokeOpacity="0.08">
            <line x1="100" y1="190" x2="460" y2="190" />
            <line x1="100" y1="250" x2="460" y2="250" />
            <line x1="100" y1="310" x2="460" y2="310" />
          </g>

          {/* rising vitality area + curve (metabolic optimization) */}
          <path
            d="M100 320 C 160 312, 200 286, 250 270 C 300 254, 340 220, 400 176 C 430 154, 448 150, 460 146 L 460 350 L 100 350 Z"
            fill="url(#area)"
          />
          <path
            d="M100 320 C 160 312, 200 286, 250 270 C 300 254, 340 220, 400 176 C 430 154, 448 150, 460 146"
            fill="none"
            stroke="url(#curve)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* curve node markers */}
          <circle cx="250" cy="270" r="4.5" fill={TEAL} />
          <circle cx="400" cy="176" r="5.5" fill="hsl(40 30% 98%)" stroke={TEAL} strokeWidth="2.5" />
        </g>

        {/* molecular lattice (peptide / GLP-1 motif), lower-left, overlapping panel edge */}
        <g stroke={TEAL} strokeOpacity="0.5" strokeWidth="1.6">
          <line x1="120" y1="350" x2="168" y2="384" />
          <line x1="168" y1="384" x2="150" y2="430" />
          <line x1="168" y1="384" x2="222" y2="396" />
          <line x1="222" y1="396" x2="150" y2="430" />
        </g>
        <g>
          <circle cx="120" cy="350" r="9" fill="hsl(214 50% 12%)" stroke={TEAL} strokeWidth="2" />
          <circle cx="168" cy="384" r="11" fill={TEAL} fillOpacity="0.85" />
          <circle cx="150" cy="430" r="9" fill="hsl(214 50% 12%)" stroke={TEAL} strokeWidth="2" />
          <circle cx="222" cy="396" r="8" fill="hsl(214 50% 12%)" stroke={TEAL} strokeWidth="2" />
        </g>

        {/* floating metric chips */}
        <g filter="url(#soft)" opacity="0.5">
          <rect x="350" y="60" width="150" height="56" rx="14" fill="hsl(214 50% 16%)" />
          <rect x="56" y="250" width="150" height="56" rx="14" fill="hsl(214 50% 16%)" />
        </g>
        {/* chip: recurring revenue */}
        <g>
          <rect x="350" y="56" width="156" height="58" rx="15" fill="hsl(214 48% 14%)" stroke="hsl(180 40% 80%)" strokeOpacity="0.16" />
          <circle cx="378" cy="85" r="15" fill={TEAL} fillOpacity="0.16" />
          <path d="M372 85a6 6 0 1 1 1.8 4.3" fill="none" stroke={TEAL} strokeWidth="2" strokeLinecap="round" />
          <path d="M372 79v4h4" fill="none" stroke={TEAL} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="404" y="74" width="78" height="8" rx="4" fill="hsl(180 40% 85%)" fillOpacity="0.55" />
          <rect x="404" y="90" width="52" height="7" rx="3.5" fill="hsl(180 40% 85%)" fillOpacity="0.25" />
        </g>
        {/* chip: adherence */}
        <g>
          <rect x="52" y="246" width="156" height="58" rx="15" fill="hsl(214 48% 14%)" stroke="hsl(180 40% 80%)" strokeOpacity="0.16" />
          <circle cx="80" cy="275" r="15" fill={TEAL} fillOpacity="0.16" />
          <path d="M74 275l4 4 8-8.5" fill="none" stroke={TEAL} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="106" y="264" width="78" height="8" rx="4" fill="hsl(180 40% 85%)" fillOpacity="0.55" />
          <rect x="106" y="280" width="52" height="7" rx="3.5" fill="hsl(180 40% 85%)" fillOpacity="0.25" />
        </g>
      </svg>
    </motion.div>
  );
}
