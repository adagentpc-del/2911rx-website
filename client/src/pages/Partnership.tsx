import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui";
import {
  IconRecurring,
  IconFulfillment,
  IconSimplicity,
  IconPositioning,
  IconEducation,
  IconBuilding,
  IconArrow,
  IconCheck,
} from "@/components/Icons";
import { DonutChart, StatBand } from "@/components/DataViz";
import { LifestyleBand } from "@/components/Photo";

const VALUE_MIX = [
  { label: "Operational support & simplicity", value: 35 },
  { label: "Reliable fulfillment", value: 30 },
  { label: "Recurring revenue infrastructure", value: 20 },
  { label: "Premium positioning", value: 15 },
];

const PARTNER_STATS = [
  { value: 6, label: "Practice types we partner with" },
  { value: 3, label: "Core program lines to offer" },
  { value: 5, suffix: " steps", label: "Simple onboarding to launch" },
  { value: 1, label: "Dedicated partnership relationship" },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
};

const fadeUpOnLoad = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
};

const PARTNER_TYPES = [
  "Wellness Clinics",
  "Med Spas",
  "Concierge Medicine Groups",
  "Telehealth Wellness Providers",
  "Functional Medicine Clinics",
  "Longevity-Focused Practices",
];

const BENEFITS = [
  {
    icon: IconRecurring,
    title: "Recurring Revenue Infrastructure",
    text: "Continuity-based wellness programs designed to generate predictable, recurring revenue for your practice, not one-off transactions.",
  },
  {
    icon: IconFulfillment,
    title: "Reliable Fulfillment",
    text: "A trusted pharmacy relationship with consistent execution. Your patients receive what they expect, when they expect it.",
  },
  {
    icon: IconSimplicity,
    title: "Operational Simplicity",
    text: "We handle the operational complexity, from onboarding to ordering workflows, so scaling never means more administrative burden.",
  },
  {
    icon: IconPositioning,
    title: "Premium Wellness Positioning",
    text: "Professional positioning that strengthens patient trust and supports long-term program retention.",
  },
  {
    icon: IconEducation,
    title: "Provider Education and Support",
    text: "Clear communication, structured onboarding, and ongoing education so your team is confident from day one.",
  },
  {
    icon: IconBuilding,
    title: "Built Around Your Practice",
    text: "Partnership structures that fit your model, whether you are a single-location med spa or a multi-state telehealth operator.",
  },
];

const IN_PRACTICE = [
  "GLP-1, metabolic, and peptide programs under one partner",
  "Structured onboarding and provider education",
  "Ordering through a single provider portal",
  "Operational support so your team can focus on patients",
];

const DISTRIBUTION = [
  "Volume-based partnership pricing that scales with you",
  "Licensed, accredited pharmacy fulfillment",
  "Multi-state shipping with an emphasis on supply continuity",
  "Fast provider verification and onboarding",
  "A dedicated account and operational relationship",
];

function TrackList({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 space-y-2.5">
      {items.map((t) => (
        <li key={t} className="flex items-start gap-2.5 text-sm text-muted-foreground">
          <span className="mt-0.5 shrink-0 text-teal-dark">
            <IconCheck className="h-4 w-4" />
          </span>
          {t}
        </li>
      ))}
    </ul>
  );
}

export default function Partnership() {
  return (
    <>
      <section className="hero-surface relative overflow-hidden py-20 text-white md:py-24">
        <div className="hero-grid absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <motion.div {...fadeUpOnLoad} className="max-w-3xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-teal-light">
              Wholesale and Distribution Partnership
            </p>
            <h1 className="font-display text-4xl tracking-tight md:text-[3.4rem] md:leading-[1.05]">
              Scale your practice through partnership
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
              Our partnership program exists for one reason: to help wellness-focused
              providers grow through long-term, recurring relationships, with the
              consistency, support, and professionalism your patients deserve.
            </p>
            <div className="mt-8">
              <Link href="/contact">
                <Button size="lg">
                  Apply for Partnership <IconArrow />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Two ways to partner */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-teal-dark">
              Two ways to partner
            </p>
            <h2 className="text-3xl tracking-tight md:text-[2.4rem]">
              Choose the partnership that fits your model
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Whether you treat patients in-house or distribute across a network, 2911Rx gives you
              dependable supply and the operational support behind it.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <motion.div
              {...fadeUp}
              className="flex flex-col rounded-3xl border border-border/80 bg-card p-8 shadow-[0_12px_40px_-18px_hsl(214_45%_11%/0.16)]"
            >
              <span className="icon-tile mb-5">
                <IconBuilding />
              </span>
              <h3 className="font-display text-xl font-semibold">In-practice provider program</h3>
              <p className="mt-2.5 text-muted-foreground">
                For clinics, med spas, and telehealth providers offering GLP-1, metabolic, and
                peptide wellness programs to their own patients.
              </p>
              <TrackList items={IN_PRACTICE} />
              <div className="mt-auto pt-7">
                <Link href="/contact">
                  <Button className="w-full sm:w-auto">
                    Become a Partner <IconArrow />
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col rounded-3xl border border-teal/40 bg-card p-8 ring-1 ring-teal/15 shadow-[0_16px_50px_-20px_hsl(174_60%_30%/0.28)]"
            >
              <span className="icon-tile mb-5">
                <IconFulfillment />
              </span>
              <h3 className="font-display text-xl font-semibold">Wholesale &amp; distribution partner</h3>
              <p className="mt-2.5 text-muted-foreground">
                For organizations distributing or supplying across multiple locations, brands, or a
                provider network, with 2911Rx as your fulfillment partner.
              </p>
              <TrackList items={DISTRIBUTION} />
              <div className="mt-auto pt-7">
                <Link href="/contact">
                  <Button className="w-full sm:w-auto">
                    Become a Distribution Partner <IconArrow />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-muted-foreground">
            Available therapies, formulations, and pricing depend on current regulatory status and a
            provider's independent clinical judgment, and are discussed during your consultation.
          </p>
        </div>
      </section>

      <section className="border-b border-border/70 bg-white py-9">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Ideal partners
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {PARTNER_TYPES.map((p) => (
              <span key={p} className="font-display text-base font-medium text-navy/55">
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <LifestyleBand
            id="photo-1656017054238-f08a0e1482fe"
            alt="A joyful couple laughing together outdoors"
            eyebrow="Built around outcomes"
            title="Healthier patients, a stronger practice"
            body="Your patients want to look and feel their best. With dependable therapies and the operational support to deliver them consistently, you become the practice they stay with and refer."
            reverse
          />
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-teal-dark">
              What you get
            </p>
            <h2 className="text-3xl tracking-tight md:text-[2.6rem]">
              What partnership solves
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Operational simplicity, consistency, scalable infrastructure, and a trusted
              pharmacy relationship, in one program.
            </p>
          </motion.div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={b.title}
                {...fadeUp}
                transition={{ duration: 0.55, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="group rounded-2xl border border-border/80 bg-card p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-teal/40 hover:shadow-[0_12px_40px_-12px_hsl(214_45%_11%/0.16)]"
              >
                <span className="icon-tile mb-5">
                  <b.icon />
                </span>
                <h3 className="text-lg font-semibold">{b.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{b.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Where the value comes from (illustrative) */}
      <section className="hero-surface relative overflow-hidden py-20 text-white md:py-28">
        <div className="hero-grid absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div {...fadeUp}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-teal-light">
                Where the value comes from
              </p>
              <h2 className="text-3xl tracking-tight text-white md:text-[2.6rem]">
                More than a price on a product
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-white/70">
                Partners who succeed with 2911Rx are not buying the cheapest unit. They are
                buying operational simplicity, reliable fulfillment, and an infrastructure
                that keeps patients enrolled and revenue recurring.
              </p>
            </motion.div>
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl border border-white/10 bg-white/[0.05] p-7 md:p-9"
            >
              <DonutChart
                segments={VALUE_MIX}
                tone="light"
                centerTop="100%"
                centerLabel="partnership value"
              />
              <p className="mt-6 text-center text-xs text-white/45">
                Illustrative breakdown of what partnership delivers.
              </p>
            </motion.div>
          </div>

          <motion.div {...fadeUp} className="mt-14">
            <StatBand stats={PARTNER_STATS} tone="light" />
          </motion.div>
        </div>
      </section>

      <section className="bg-muted py-20 md:py-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-teal-dark">
              On pricing
            </p>
            <h2 className="text-3xl tracking-tight md:text-[2.4rem]">
              Competitive pricing is the floor, not the pitch
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Our pricing is competitive. But the partners who succeed with 2911Rx understand
              that price alone does not build a wellness program. Reliability, operational
              support, and long-term consistency are what keep patients enrolled and revenue
              recurring. If a low-cost, low-reliability supplier has burned you before, you
              already know the difference.
            </p>
            <div className="mt-8 flex justify-center">
              <Link href="/contact">
                <Button size="lg">
                  Request Partnership Pricing <IconArrow />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
