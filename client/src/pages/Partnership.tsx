import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Building2,
  Repeat,
  Boxes,
  HeartHandshake,
  LineChart,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
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
    icon: Repeat,
    title: "Recurring Revenue Infrastructure",
    text: "Continuity-based wellness programs designed to generate predictable, recurring revenue for your practice — not one-off transactions.",
  },
  {
    icon: Boxes,
    title: "Reliable Fulfillment",
    text: "A trusted pharmacy relationship with consistent execution. Your patients receive what they expect, when they expect it.",
  },
  {
    icon: HeartHandshake,
    title: "Operational Simplicity",
    text: "We handle the operational complexity — onboarding, ordering workflows, and support — so scaling doesn't mean more administrative burden.",
  },
  {
    icon: LineChart,
    title: "Scalable Wellness Positioning",
    text: "Premium, professional positioning that strengthens patient trust and supports long-term program retention.",
  },
  {
    icon: GraduationCap,
    title: "Provider Education & Support",
    text: "Clear communication, structured onboarding, and ongoing education so your team is confident from day one.",
  },
  {
    icon: Building2,
    title: "Built Around Your Practice",
    text: "Partnership structures that fit your model — whether you're a single-location med spa or a multi-state telehealth operator.",
  },
];

export default function Partnership() {
  return (
    <>
      <section className="bg-navy py-20 text-white md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div {...fadeUp} className="max-w-3xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-teal-light">
              Wholesale & Distribution Partnership
            </p>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Scale Your Practice Through Partnership
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
              Our partnership program exists for one reason: to help wellness-focused
              providers scale through long-term recurring operational relationships — with
              the consistency, support, and professionalism your patients deserve.
            </p>
            <div className="mt-8">
              <Link href="/contact">
                <Button size="lg">
                  Apply for Partnership <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-b bg-white py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Ideal partners
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {PARTNER_TYPES.map((p) => (
              <span key={p} className="font-display text-sm font-semibold text-navy/70">
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              What Partnership Solves
            </h2>
            <p className="mt-4 text-muted-foreground">
              Operational simplicity, consistency, scalable wellness infrastructure, and a
              trusted pharmacy relationship — in one program.
            </p>
          </motion.div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={b.title}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="rounded-lg border bg-card p-6 shadow-sm"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-md bg-accent">
                  <b.icon className="h-5 w-5 text-teal-dark" />
                </div>
                <h3 className="font-semibold">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <motion.div {...fadeUp}>
            <h2 className="text-center text-3xl font-bold tracking-tight md:text-4xl">
              A Note on Pricing
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-center leading-relaxed text-muted-foreground">
              Pricing matters — and ours is competitive. But the partners who succeed with
              2911Rx understand that price alone doesn't build a wellness program. Reliability,
              operational support, and long-term consistency are what keep patients enrolled
              and revenue recurring. If you've been burned by low-cost, low-reliability
              suppliers before, you already know the difference.
            </p>
            <div className="mt-8 text-center">
              <Link href="/contact">
                <Button size="lg">
                  Request Partnership Pricing <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
