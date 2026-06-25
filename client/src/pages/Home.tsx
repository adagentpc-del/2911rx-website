import { lazy, Suspense } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui";
import { PORTAL_URL } from "@/lib/utils";
import HeroArt from "@/components/HeroArt";
const Hero3D = lazy(() => import("@/components/Hero3D"));
import {
  IconVial,
  IconMetabolic,
  IconPeptide,
  IconSystems,
  IconShield,
  IconHandshake,
  IconRecurring,
  IconArrow,
  IconExternal,
} from "@/components/Icons";
import { StatBand, GrowthChart, DonutChart, CheckList } from "@/components/DataViz";

const STATS = [
  { value: 5, suffix: " steps", label: "From first call to launched program" },
  { value: 3, label: "Core program lines under one partner" },
  { value: 1, label: "Provider portal for every order" },
  { value: 24, suffix: "/7", label: "Ordering access, on your schedule" },
];

const GROWTH = [12, 19, 28, 41, 55, 72];
const GROWTH_LABELS = ["M1", "M2", "M3", "M4", "M5", "M6"];

const PROGRAM_MIX = [
  { label: "GLP-1 Therapy Programs", value: 45 },
  { label: "Metabolic Optimization", value: 30 },
  { label: "Peptide Wellness", value: 25 },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
};

// Above-the-fold: animate on mount, not on scroll (avoids a blank hero on first paint)
const fadeUpOnLoad = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
};

const PILLARS = [
  {
    icon: IconVial,
    title: "GLP-1 Therapy Programs",
    text: "Structured GLP-1 wellness programs delivered through licensed providers and trusted pharmacy relationships. Built for consistency, quality, and patient satisfaction.",
  },
  {
    icon: IconMetabolic,
    title: "Metabolic Optimization",
    text: "Continuity-based metabolic programs that position your practice for lasting patient outcomes and predictable, recurring wellness revenue.",
  },
  {
    icon: IconPeptide,
    title: "Peptide Wellness Support",
    text: "Provider-directed peptide wellness support, backed by reliable sourcing, professional education, and structured clinical workflows.",
  },
  {
    icon: IconSystems,
    title: "Operational Partnership Systems",
    text: "Onboarding, fulfillment coordination, and operational support that remove friction, so your team can focus on patients instead of logistics.",
  },
];

const DIFFERENTIATORS = [
  "High-quality therapies through licensed pharmacy relationships",
  "Efficient, consistent execution on every order",
  "Structured onboarding for every new provider partner",
  "Dedicated operational support, not one-off transactions",
  "Clear, professional, transparent communication",
  "Premium positioning your patients recognize and trust",
];

const AUDIENCES = [
  "Wellness Clinics",
  "Med Spas",
  "Concierge Medicine",
  "Telehealth Operators",
  "Functional Medicine",
  "Longevity Practices",
];

const TRUST = [
  { icon: IconShield, label: "Trusted", text: "Licensed provider and pharmacy relationships" },
  { icon: IconHandshake, label: "Professional", text: "Structured onboarding and dedicated support" },
  { icon: IconRecurring, label: "Advanced", text: "Scalable, recurring wellness infrastructure" },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero-surface relative overflow-hidden text-white">
        <div className="hero-grid absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-5 pb-24 pt-20 sm:px-6 md:pb-32 md:pt-28 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div {...fadeUpOnLoad} className="max-w-2xl">
              <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-teal-light">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-light" />
                For Licensed Healthcare Providers
              </p>
              <h1 className="font-display text-[2.6rem] leading-[1.05] tracking-tight sm:text-6xl md:text-[3.9rem]">
                Build a wellness program your patients{" "}
                <span className="text-teal-light">stay enrolled in.</span>
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/70">
                2911Rx gives licensed providers the GLP-1 therapies, metabolic optimization,
                and peptide wellness programs to launch fast, plus the pharmacy relationships
                and operational support to scale recurring revenue with confidence.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Link href="/contact">
                  <Button size="lg" className="w-full sm:w-auto">
                    Become a Partner <IconArrow />
                  </Button>
                </Link>
                <a href={PORTAL_URL} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="light" className="w-full sm:w-auto">
                    Shop Now <IconExternal />
                  </Button>
                </a>
              </div>
              <p className="mt-5 text-sm text-white/45">
                Ready to order? Shop the provider portal. Exploring a partnership?{" "}
                <Link href="/how-it-works" className="text-white/70 underline underline-offset-4 hover:text-white">
                  See how it works
                </Link>
                .
              </p>
            </motion.div>

            <div className="hidden lg:block">
              <Suspense fallback={<HeroArt />}>
                <Hero3D />
              </Suspense>
            </div>
          </div>

          <motion.div
            {...fadeUpOnLoad}
            transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3"
          >
            {TRUST.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm"
              >
                <span className="icon-tile icon-tile-dark mb-4">
                  <item.icon />
                </span>
                <p className="font-display text-lg font-semibold text-white">{item.label}</p>
                <p className="mt-1 text-sm leading-snug text-white/55">{item.text}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Audience marquee */}
      <section className="border-b border-border/70 bg-white py-9">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Trusted by wellness-focused practices
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {AUDIENCES.map((a) => (
              <span key={a} className="font-display text-base font-medium text-navy/55">
                {a}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-teal-dark">
              The Platform
            </p>
            <h2 className="text-3xl tracking-tight md:text-[2.6rem]">
              Everything you need to launch and scale
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              One partner for the therapies, the pharmacy relationships, and the operations
              behind a wellness program that actually grows.
            </p>
          </motion.div>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.title}
                {...fadeUp}
                transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="group rounded-2xl border border-border/80 bg-card p-8 transition-all duration-300 hover:-translate-y-0.5 hover:border-teal/40 hover:shadow-[0_12px_40px_-12px_hsl(214_45%_11%/0.16)]"
              >
                <span className="icon-tile mb-5">
                  <p.icon />
                </span>
                <h3 className="text-xl font-semibold">{p.title}</h3>
                <p className="mt-2.5 leading-relaxed text-muted-foreground">{p.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Growth + program mix (illustrative) */}
      <section className="bg-muted py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-teal-dark">
              The recurring model
            </p>
            <h2 className="text-3xl tracking-tight md:text-[2.6rem]">
              Built for compounding, recurring revenue
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Continuity-based programs are designed to grow month over month as patients
              stay enrolled, across a balanced mix of wellness offerings.
            </p>
          </motion.div>

          <div className="mt-14 grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <motion.div
              {...fadeUp}
              className="rounded-3xl border border-border/80 bg-card p-6 shadow-[0_20px_60px_-30px_hsl(214_45%_11%/0.25)] md:p-8"
            >
              <p className="mb-1 font-display text-lg font-semibold">Program enrollment over time</p>
              <p className="mb-5 text-sm text-muted-foreground">
                Illustrative: the shape of a continuity-based program as patients stay enrolled.
              </p>
              <GrowthChart
                data={GROWTH}
                labels={GROWTH_LABELS}
                tone="dark"
                caption="Illustrative model, not a performance guarantee."
              />
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl border border-border/80 bg-card p-6 shadow-[0_20px_60px_-30px_hsl(214_45%_11%/0.25)] md:p-8"
            >
              <p className="mb-1 font-display text-lg font-semibold">A balanced program mix</p>
              <p className="mb-6 text-sm text-muted-foreground">
                Three core lines, one partner behind all of them.
              </p>
              <DonutChart
                segments={PROGRAM_MIX}
                tone="dark"
                centerTop="3"
                centerLabel="core program lines"
              />
            </motion.div>
          </div>

          <motion.div {...fadeUp} className="mt-12">
            <StatBand stats={STATS} tone="dark" />
          </motion.div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="hero-surface relative overflow-hidden py-20 text-white md:py-28">
        <div className="hero-grid absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <motion.div {...fadeUp}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-teal-light">
                Why 2911Rx
              </p>
              <h2 className="text-3xl tracking-tight text-white md:text-[2.6rem]">
                Partnerships, not transactions
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-white/70">
                Most suppliers compete on price and disappear after the sale. 2911Rx is built
                around long-term provider relationships, operational support, and the
                consistency your patients depend on. It is why providers who have been burned
                by low-cost, low-reliability suppliers choose us and stay.
              </p>
              <div className="mt-9">
                <Link href="/partnership">
                  <Button variant="light" size="lg">
                    Explore the Partnership Program <IconArrow />
                  </Button>
                </Link>
              </div>
            </motion.div>
            <CheckList items={DIFFERENTIATORS} tone="light" />
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
          <motion.div
            {...fadeUp}
            className="relative overflow-hidden rounded-3xl border border-border/80 bg-card px-8 py-14 text-center shadow-[0_24px_70px_-30px_hsl(214_45%_11%/0.25)] md:px-14"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-teal-dark">
              Start the conversation
            </p>
            <h2 className="text-3xl tracking-tight md:text-[2.4rem]">
              Ready to build recurring wellness revenue?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Tell us about your practice. We will walk you through therapies, onboarding,
              fulfillment, and partnership pricing, so you can make a confident decision.
            </p>
            <div className="mt-8 flex justify-center">
              <Link href="/contact">
                <Button size="lg">
                  Request Information <IconArrow />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
