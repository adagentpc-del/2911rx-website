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
} from "@/components/Icons";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
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

export default function Partnership() {
  return (
    <>
      <section className="hero-surface relative overflow-hidden py-20 text-white md:py-24">
        <div className="hero-grid absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="max-w-3xl">
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
