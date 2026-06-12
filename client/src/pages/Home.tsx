import { lazy, Suspense } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui";
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
  IconCheck,
} from "@/components/Icons";

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
                    Request Partnership Information <IconArrow />
                  </Button>
                </Link>
                <Link href="/how-it-works">
                  <Button size="lg" variant="light" className="w-full sm:w-auto">
                    See How It Works
                  </Button>
                </Link>
              </div>
              <p className="mt-5 text-sm text-white/45">
                No cost to explore. For licensed providers and wellness organizations.
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
            <motion.ul
              {...fadeUp}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-3"
            >
              {DIFFERENTIATORS.map((d) => (
                <li
                  key={d}
                  className="flex items-start gap-3.5 rounded-xl border border-white/10 bg-white/[0.04] p-4"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal/20 text-teal-light">
                    <IconCheck className="h-4 w-4" />
                  </span>
                  <span className="text-sm leading-relaxed text-white/85">{d}</span>
                </li>
              ))}
            </motion.ul>
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
