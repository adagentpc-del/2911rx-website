import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  TrendingUp,
  Workflow,
  Handshake,
  FlaskConical,
  Activity,
  Layers,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
};

const PILLARS = [
  {
    icon: FlaskConical,
    title: "GLP-1 Therapy Programs",
    text: "Structured GLP-1 wellness programs delivered through licensed providers and trusted pharmacy relationships — built for consistency, quality, and patient satisfaction.",
  },
  {
    icon: Activity,
    title: "Metabolic Optimization",
    text: "Continuity-based metabolic optimization programs that position your practice for long-term patient outcomes and recurring wellness revenue.",
  },
  {
    icon: Layers,
    title: "Peptide Wellness Support",
    text: "Provider-directed peptide wellness support backed by reliable sourcing, professional education, and structured clinical workflows.",
  },
  {
    icon: Workflow,
    title: "Operational Partnership Systems",
    text: "Onboarding, fulfillment coordination, and operational support systems that remove friction so your team can focus on patients — not logistics.",
  },
];

const DIFFERENTIATORS = [
  "High-quality products through licensed pharmacy relationships",
  "Efficient, consistent execution — every order, every time",
  "Structured onboarding for new provider partners",
  "Dedicated operational support, not just transactions",
  "Professional, transparent communication",
  "Premium positioning your patients can trust",
];

const AUDIENCES = [
  "Wellness Clinics",
  "Med Spas",
  "Concierge Medicine",
  "Telehealth Operators",
  "Functional Medicine",
  "Longevity Practices",
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="grid-glow absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32">
          <motion.div {...fadeUp} className="max-w-3xl">
            <p className="mb-5 inline-block rounded-full border border-teal/40 bg-teal/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-teal-light">
              For Licensed Healthcare Providers
            </p>
            <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              The Wellness Partnership Platform Built for{" "}
              <span className="text-teal-light">Providers</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
              2911Rx is a premium provider-focused wellness platform specializing in GLP-1
              therapies, metabolic optimization, peptide wellness support, and operational
              partnership systems — through licensed provider and pharmacy relationships.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/contact">
                <Button size="lg">
                  Request Partnership Information <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button size="lg" variant="light">
                  See How It Works
                </Button>
              </Link>
            </div>
          </motion.div>
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3"
          >
            {[
              { icon: ShieldCheck, label: "Trusted", text: "Licensed provider & pharmacy relationships" },
              { icon: Handshake, label: "Professional", text: "Structured onboarding & dedicated support" },
              { icon: TrendingUp, label: "Advanced", text: "Scalable recurring wellness infrastructure" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-white/10 bg-white/5 p-5 backdrop-blur"
              >
                <item.icon className="mb-3 h-6 w-6 text-teal-light" />
                <p className="font-display text-lg font-semibold">{item.label}</p>
                <p className="mt-1 text-sm text-white/65">{item.text}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Who we serve */}
      <section className="border-b bg-white py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Built for wellness-focused practices
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {AUDIENCES.map((a) => (
              <span key={a} className="font-display text-sm font-semibold text-navy/70">
                {a}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              One Platform. Complete Wellness Infrastructure.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Everything your practice needs to launch and scale provider-directed wellness
              programs — without building the operational backbone yourself.
            </p>
          </motion.div>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.title}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="rounded-lg border bg-card p-7 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md bg-accent">
                  <p.icon className="h-6 w-6 text-teal-dark" />
                </div>
                <h3 className="text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{p.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why 2911Rx */}
      <section className="bg-navy py-20 text-white md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div {...fadeUp}>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Partnerships, Not Transactions
              </h2>
              <p className="mt-5 leading-relaxed text-white/75">
                Most suppliers compete on price and disappear after the sale. 2911Rx is built
                differently — around long-term provider relationships, operational support,
                and the consistency your patients depend on. That's why providers who have
                tried low-cost, low-reliability suppliers choose us and stay.
              </p>
              <div className="mt-8">
                <Link href="/partnership">
                  <Button variant="light" size="lg">
                    Explore the Partnership Program <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
            <motion.ul {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="space-y-4">
              {DIFFERENTIATORS.map((d) => (
                <li key={d} className="flex items-start gap-3 rounded-md border border-white/10 bg-white/5 p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-light" />
                  <span className="text-sm text-white/85">{d}</span>
                </li>
              ))}
            </motion.ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Ready to Build Recurring Wellness Revenue?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Tell us about your practice. We'll walk you through therapies, onboarding,
              fulfillment, and partnership pricing — everything you need to make a confident decision.
            </p>
            <div className="mt-8">
              <Link href="/contact">
                <Button size="lg">
                  Request Information <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
