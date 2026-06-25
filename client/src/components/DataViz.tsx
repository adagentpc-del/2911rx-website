/**
 * 2911Rx animated data-visualization set.
 * Pure SVG + framer-motion (already a dependency, so no bundle cost beyond it).
 * Every piece is scroll-triggered (animates once on view) and honors
 * prefers-reduced-motion. Figures are illustrative, used to convey the shape
 * of the story (growth, mix, simplicity), not specific performance claims.
 *
 * Tone-aware: pass tone="light" on dark/navy backgrounds, tone="dark" on
 * light backgrounds (default).
 */
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, animate } from "framer-motion";
import { cn } from "@/lib/utils";

type Tone = "light" | "dark";

const EASE = [0.22, 1, 0.36, 1] as const;

const C = {
  teal: "hsl(172 70% 33%)",
  tealLight: "hsl(170 55% 52%)",
  tealDark: "hsl(173 75% 24%)",
  navy: "hsl(214 50% 10%)",
  slate: "hsl(214 16% 62%)",
};

function gridStroke(tone: Tone) {
  return tone === "light" ? "hsl(0 0% 100% / 0.12)" : "hsl(214 20% 88%)";
}
function axisText(tone: Tone) {
  return tone === "light" ? "hsl(0 0% 100% / 0.55)" : "hsl(214 18% 45%)";
}

/* ------------------------------------------------------------------ */
/* Count-up number                                                     */
/* ------------------------------------------------------------------ */
function useCountUp(target: number, active: boolean, decimals = 0, duration = 1.5) {
  const reduce = useReducedMotion();
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    if (reduce) {
      setVal(target);
      return;
    }
    const controls = animate(0, target, {
      duration,
      ease: EASE,
      onUpdate: (v: number) => setVal(v),
    });
    return () => controls.stop();
  }, [active, target, reduce, duration]);
  return decimals > 0 ? val.toFixed(decimals) : Math.round(val).toString();
}

export type Stat = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

function StatItem({ stat, active, tone }: { stat: Stat; active: boolean; tone: Tone }) {
  const display = useCountUp(stat.value, active, stat.decimals ?? 0);
  return (
    <div
      className={cn(
        "rounded-2xl border p-6 text-center",
        tone === "light"
          ? "border-white/10 bg-white/[0.06]"
          : "border-border/80 bg-card shadow-[0_10px_30px_-18px_hsl(214_45%_11%/0.25)]",
      )}
    >
      <p
        className={cn(
          "font-display text-4xl font-semibold tracking-tight md:text-5xl",
          tone === "light" ? "text-teal-light" : "text-teal",
        )}
      >
        {stat.prefix}
        {display}
        {stat.suffix}
      </p>
      <p
        className={cn(
          "mt-2 text-sm leading-snug",
          tone === "light" ? "text-white/60" : "text-muted-foreground",
        )}
      >
        {stat.label}
      </p>
    </div>
  );
}

export function StatBand({
  stats,
  tone = "dark",
  className,
}: {
  stats: Stat[];
  tone?: Tone;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div
      ref={ref}
      className={cn(
        "grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4",
        className,
      )}
    >
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
        >
          <StatItem stat={s} active={inView} tone={tone} />
        </motion.div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Donut / pie chart                                                   */
/* ------------------------------------------------------------------ */
export type Segment = { label: string; value: number; color?: string };

export function DonutChart({
  segments,
  tone = "dark",
  centerTop,
  centerLabel,
  className,
}: {
  segments: Segment[];
  tone?: Tone;
  centerTop?: string;
  centerLabel?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const total = segments.reduce((a, s) => a + s.value, 0) || 1;

  const size = 220;
  const stroke = 26;
  const r = (size - stroke) / 2 - 2;
  const cx = size / 2;
  const cy = size / 2;
  const palette = [C.tealLight, C.teal, C.tealDark, C.slate];

  let cumulative = 0;
  const arcs = segments.map((s, i) => {
    const fraction = s.value / total;
    const startFrac = cumulative;
    cumulative += fraction;
    return {
      ...s,
      fraction,
      startFrac,
      color: s.color ?? palette[i % palette.length],
      pct: Math.round(fraction * 100),
    };
  });

  return (
    <div ref={ref} className={cn("flex flex-col items-center gap-6 sm:flex-row sm:gap-8", className)}>
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={tone === "light" ? "hsl(0 0% 100% / 0.08)" : "hsl(214 20% 92%)"}
            strokeWidth={stroke}
          />
          {arcs.map((a) => (
            <motion.circle
              key={a.label}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={a.color}
              strokeWidth={stroke}
              strokeLinecap="butt"
              // Rotate via the SVG transform attribute around an explicit point
              // (avoids the CSS transform-origin ambiguity on SVG elements).
              transform={`rotate(${a.startFrac * 360 - 90} ${cx} ${cy})`}
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: a.fraction } : {}}
              transition={{ duration: reduce ? 0 : 1.1, delay: a.startFrac * 1.1, ease: EASE }}
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          {centerTop && (
            <span
              className={cn(
                "font-display text-3xl font-semibold tracking-tight",
                tone === "light" ? "text-white" : "text-navy",
              )}
            >
              {centerTop}
            </span>
          )}
          {centerLabel && (
            <span
              className={cn(
                "mt-0.5 max-w-[7rem] text-xs leading-tight",
                tone === "light" ? "text-white/55" : "text-muted-foreground",
              )}
            >
              {centerLabel}
            </span>
          )}
        </div>
      </div>

      <ul className="space-y-3">
        {arcs.map((a, i) => (
          <motion.li
            key={a.label}
            initial={{ opacity: 0, x: 8 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.3 + i * 0.1, ease: EASE }}
            className="flex items-center gap-3"
          >
            <span className="h-3 w-3 shrink-0 rounded-full" style={{ background: a.color }} />
            <span className={cn("text-sm", tone === "light" ? "text-white/80" : "text-foreground")}>
              {a.label}
            </span>
            <span
              className={cn(
                "ml-auto text-sm font-semibold tabular-nums",
                tone === "light" ? "text-white/55" : "text-muted-foreground",
              )}
            >
              {a.pct}%
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Growth chart: rising bars + trend line                             */
/* ------------------------------------------------------------------ */
export function GrowthChart({
  data,
  labels,
  tone = "dark",
  caption,
  className,
}: {
  data: number[];
  labels?: string[];
  tone?: Tone;
  caption?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();

  const W = 560;
  const H = 280;
  const padL = 16;
  const padR = 16;
  const padT = 24;
  const padB = 34;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;
  const max = Math.max(...data) * 1.12;
  const n = data.length;
  const slot = plotW / n;
  const barW = slot * 0.46;

  const x = (i: number) => padL + slot * i + slot / 2;
  const y = (v: number) => padT + plotH - (v / max) * plotH;

  const linePath = data
    .map((v, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(1)} ${y(v).toFixed(1)}`)
    .join(" ");
  const areaPath = `${linePath} L ${x(n - 1).toFixed(1)} ${padT + plotH} L ${x(0).toFixed(1)} ${
    padT + plotH
  } Z`;

  const gridY = [0, 0.25, 0.5, 0.75, 1];

  return (
    <div ref={ref} className={cn("w-full", className)}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={caption ?? "Illustrative growth chart"}>
        <defs>
          <linearGradient id="dv-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={C.tealLight} stopOpacity="0.35" />
            <stop offset="1" stopColor={C.tealLight} stopOpacity="0" />
          </linearGradient>
          <linearGradient id="dv-bar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={C.tealLight} />
            <stop offset="1" stopColor={C.teal} />
          </linearGradient>
        </defs>

        {/* gridlines */}
        {gridY.map((g) => {
          const gy = padT + plotH * g;
          return (
            <line
              key={g}
              x1={padL}
              x2={W - padR}
              y1={gy}
              y2={gy}
              stroke={gridStroke(tone)}
              strokeWidth="1"
              strokeDasharray="2 4"
            />
          );
        })}

        {/* bars */}
        {data.map((v, i) => {
          const barH = (v / max) * plotH;
          const bx = x(i) - barW / 2;
          const by = padT + plotH - barH;
          return (
            <motion.rect
              key={i}
              x={bx}
              width={barW}
              rx={5}
              fill="url(#dv-bar)"
              initial={{ height: 0, y: padT + plotH }}
              animate={inView ? { height: barH, y: by } : {}}
              transition={{ duration: reduce ? 0 : 0.7, delay: 0.15 + i * 0.08, ease: EASE }}
            />
          );
        })}

        {/* area + line */}
        <motion.path
          d={areaPath}
          fill="url(#dv-area)"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: reduce ? 0 : 0.8, delay: 0.7, ease: EASE }}
        />
        <motion.path
          d={linePath}
          fill="none"
          stroke={tone === "light" ? "hsl(0 0% 100%)" : C.tealDark}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: reduce ? 0 : 1.1, delay: 0.4, ease: EASE }}
        />
        {/* end dot (animate radius to avoid SVG transform-origin issues) */}
        <motion.circle
          cx={x(n - 1)}
          cy={y(data[n - 1])}
          fill={tone === "light" ? "hsl(0 0% 100%)" : C.tealDark}
          initial={{ r: 0 }}
          animate={inView ? { r: 5 } : {}}
          transition={{ duration: reduce ? 0 : 0.4, delay: 1.4, ease: EASE }}
        />

        {/* x labels */}
        {labels &&
          labels.map((l, i) => (
            <text
              key={l + i}
              x={x(i)}
              y={H - 12}
              textAnchor="middle"
              fontSize="12"
              fontFamily="Inter, sans-serif"
              fill={axisText(tone)}
            >
              {l}
            </text>
          ))}
      </svg>
      {caption && (
        <p
          className={cn(
            "mt-2 text-center text-xs",
            tone === "light" ? "text-white/45" : "text-muted-foreground",
          )}
        >
          {caption}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Flow diagram: steps connected by flowing arrows + popping checks    */
/* ------------------------------------------------------------------ */
export type FlowStep = { title: string; text?: string };

function FlowCheck({ active, delay, reduce }: { active: boolean; delay: number; reduce: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <motion.path
        d="M5 12.5l4 4L19 7"
        stroke="hsl(0 0% 100%)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={active ? { pathLength: 1 } : {}}
        transition={{ duration: reduce ? 0 : 0.4, delay, ease: EASE }}
      />
    </svg>
  );
}

export function FlowDiagram({
  steps,
  tone = "dark",
  className,
}: {
  steps: FlowStep[];
  tone?: Tone;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();

  const nodeBase =
    tone === "light"
      ? "border-white/10 bg-white/[0.05] text-white"
      : "border-border/80 bg-card text-foreground shadow-[0_12px_40px_-20px_hsl(214_45%_11%/0.3)]";

  return (
    <div ref={ref} className={cn("w-full", className)}>
      {/* connecting flow line (desktop) */}
      <div className="relative">
        <div className="hidden lg:block">
          <svg
            viewBox="0 0 1000 8"
            preserveAspectRatio="none"
            className="absolute left-0 right-0 top-[31px] h-2 w-full"
            aria-hidden="true"
          >
            <line x1="0" y1="4" x2="1000" y2="4" stroke={gridStroke(tone)} strokeWidth="2" />
            {/* One clean technique only: a dashed line whose offset flows.
                (Mixing framer-motion pathLength with a SMIL dashoffset on the
                same element fights over strokeDasharray and causes flicker.) */}
            <line
              x1="0"
              y1="4"
              x2="1000"
              y2="4"
              stroke={tone === "light" ? C.tealLight : C.teal}
              strokeWidth="2.5"
              strokeDasharray="10 8"
            >
              {inView && !reduce && (
                <animate
                  attributeName="stroke-dashoffset"
                  from="36"
                  to="0"
                  dur="1.1s"
                  repeatCount="indefinite"
                />
              )}
            </line>
          </svg>
        </div>

        <ol
          className="relative grid gap-x-5 gap-y-8 lg:grid-cols-5"
          style={{ gridTemplateColumns: undefined }}
        >
          {steps.map((s, i) => {
            const delay = 0.2 + i * 0.18;
            return (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, y: 18 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay, ease: EASE }}
                className="relative flex flex-col items-center text-center"
              >
                {/* node badge */}
                <motion.span
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{
                    duration: reduce ? 0 : 0.45,
                    delay: delay + 0.1,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                  className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-light to-teal-dark shadow-[0_10px_28px_-10px_hsl(172_70%_30%/0.7)]"
                  style={{ transformOrigin: "center" }}
                >
                  <FlowCheck active={inView} delay={delay + 0.35} reduce={!!reduce} />
                  <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-navy text-[11px] font-bold text-teal-light ring-2 ring-white/10">
                    {i + 1}
                  </span>
                </motion.span>

                <div
                  className={cn(
                    "mt-4 w-full rounded-2xl border px-4 py-4",
                    nodeBase,
                  )}
                >
                  <p className="font-display text-base font-semibold">{s.title}</p>
                  {s.text && (
                    <p
                      className={cn(
                        "mt-1.5 text-xs leading-relaxed",
                        tone === "light" ? "text-white/55" : "text-muted-foreground",
                      )}
                    >
                      {s.text}
                    </p>
                  )}
                </div>

                {/* mobile/tablet downward flowing connector */}
                {i < steps.length - 1 && (
                  <svg
                    viewBox="0 0 8 40"
                    className="my-1 h-8 w-2 lg:hidden"
                    aria-hidden="true"
                  >
                    <line x1="4" y1="0" x2="4" y2="40" stroke={gridStroke(tone)} strokeWidth="2" />
                    <line
                      x1="4"
                      y1="0"
                      x2="4"
                      y2="40"
                      stroke={tone === "light" ? C.tealLight : C.teal}
                      strokeWidth="2.5"
                      strokeDasharray="6 6"
                    >
                      {!reduce && (
                        <animate
                          attributeName="stroke-dashoffset"
                          from="24"
                          to="0"
                          dur="1s"
                          repeatCount="indefinite"
                        />
                      )}
                    </line>
                  </svg>
                )}
              </motion.li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Animated checklist (checks draw in on view)                         */
/* ------------------------------------------------------------------ */
export function CheckList({
  items,
  tone = "light",
  className,
}: {
  items: string[];
  tone?: Tone;
  className?: string;
}) {
  const ref = useRef<HTMLUListElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  return (
    <ul ref={ref} className={cn("space-y-3", className)}>
      {items.map((item, i) => {
        const delay = 0.1 + i * 0.12;
        return (
          <motion.li
            key={item}
            initial={{ opacity: 0, x: 10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45, delay, ease: EASE }}
            className={cn(
              "flex items-start gap-3.5 rounded-xl border p-4",
              tone === "light"
                ? "border-white/10 bg-white/[0.04]"
                : "border-border/80 bg-card",
            )}
          >
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal/20 text-teal-light">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
                <motion.path
                  d="M5 12.5l4 4L19 7"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={inView ? { pathLength: 1 } : {}}
                  transition={{ duration: reduce ? 0 : 0.4, delay: delay + 0.15, ease: EASE }}
                />
              </svg>
            </span>
            <span
              className={cn(
                "text-sm leading-relaxed",
                tone === "light" ? "text-white/85" : "text-foreground",
              )}
            >
              {item}
            </span>
          </motion.li>
        );
      })}
    </ul>
  );
}
