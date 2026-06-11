import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
};

const STEPS = [
  {
    step: "01",
    title: "Request Information",
    text: "Submit a partnership inquiry telling us about your practice, your patient base, and the programs you're interested in offering.",
  },
  {
    step: "02",
    title: "Partnership Consultation",
    text: "We walk you through available therapies, partnership pricing, onboarding, and fulfillment — and answer every question before you commit.",
  },
  {
    step: "03",
    title: "Structured Onboarding",
    text: "Your team is onboarded with clear workflows, ordering access through our provider portal, and the education needed to launch confidently.",
  },
  {
    step: "04",
    title: "Launch Your Programs",
    text: "Begin offering GLP-1 therapy, metabolic optimization, and peptide wellness programs through your practice — with our operational support behind you.",
  },
  {
    step: "05",
    title: "Scale With Support",
    text: "Reliable fulfillment, consistent communication, and continuity-based program structures help you grow recurring wellness revenue over time.",
  },
];

const FAQS = [
  {
    q: "What therapies are available?",
    a: "2911Rx supports provider-directed GLP-1 therapy programs, metabolic optimization programs, and peptide wellness support. Specific offerings, formulations, and availability are discussed directly with prospective partners during consultation — all therapies are available exclusively through licensed providers.",
  },
  {
    q: "What is your pricing?",
    a: "Partnership pricing is competitive and shared during your consultation. We structure pricing around long-term partnership economics — designed so your programs are sustainable and your margins support growth.",
  },
  {
    q: "How does onboarding work?",
    a: "Onboarding is structured and supported. After your consultation, we set up portal access, walk your team through ordering and fulfillment workflows, and provide the education materials needed to launch.",
  },
  {
    q: "How does fulfillment work?",
    a: "Fulfillment runs through our trusted pharmacy relationship with an emphasis on consistency and reliability. Orders placed through the provider portal are processed efficiently, with clear communication at every step.",
  },
  {
    q: "Who can become a partner?",
    a: "Licensed healthcare providers and wellness organizations — including wellness clinics, med spas, concierge medicine groups, telehealth operators, functional medicine clinics, and longevity-focused practices.",
  },
];

export default function HowItWorks() {
  return (
    <>
      <section className="bg-navy py-20 text-white md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div {...fadeUp} className="max-w-3xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-teal-light">
              How It Works
            </p>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              From Inquiry to Launch — Without the Friction
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
              A clear, structured path from first conversation to a fully operational
              wellness program in your practice.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <ol className="space-y-6">
            {STEPS.map((s, i) => (
              <motion.li
                key={s.step}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="flex gap-6 rounded-lg border bg-card p-6 shadow-sm"
              >
                <span className="font-display text-3xl font-bold text-teal">{s.step}</span>
                <div>
                  <h3 className="text-lg font-semibold">{s.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-muted-foreground">{s.text}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-muted py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <motion.h2 {...fadeUp} className="text-center text-3xl font-bold tracking-tight md:text-4xl">
            Common Questions
          </motion.h2>
          <div className="mt-12 space-y-5">
            {FAQS.map((f, i) => (
              <motion.div
                key={f.q}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className="rounded-lg border bg-card p-6 shadow-sm"
              >
                <h3 className="font-semibold">{f.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </motion.div>
            ))}
          </div>
          <motion.div {...fadeUp} className="mt-12 text-center">
            <Link href="/contact">
              <Button size="lg">
                Start the Conversation <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
