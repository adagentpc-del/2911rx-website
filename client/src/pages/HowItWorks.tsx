import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui";
import { IconArrow } from "@/components/Icons";
import { FlowDiagram } from "@/components/DataViz";
import { LifestyleBand } from "@/components/Photo";
import { cn } from "@/lib/utils";

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

const STEPS = [
  {
    step: "01",
    title: "Request Information",
    text: "Submit a partnership inquiry telling us about your practice, your patient base, and the programs you want to offer.",
  },
  {
    step: "02",
    title: "Partnership Consultation",
    text: "We walk you through available therapies, partnership pricing, onboarding, and fulfillment, and answer every question before you commit.",
  },
  {
    step: "03",
    title: "Structured Onboarding",
    text: "Your team is onboarded with clear workflows, ordering access through the provider portal, and the education needed to launch with confidence.",
  },
  {
    step: "04",
    title: "Launch Your Programs",
    text: "Begin offering GLP-1 therapy, metabolic optimization, and peptide wellness programs through your practice, with our operational support behind you.",
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
    a: "2911Rx supports provider-directed GLP-1 therapy programs, metabolic optimization programs, and peptide wellness support. Specific offerings, formulations, and availability are discussed directly with prospective partners during consultation. All therapies are available exclusively through licensed providers. Some products may be compounded or may not be approved by the FDA; availability depends on current regulatory status and a provider's independent clinical judgment, and nothing here is a claim of FDA approval, safety, or effectiveness.",
  },
  {
    q: "What is your pricing?",
    a: "Partnership pricing is competitive and shared during your consultation. We structure pricing around long-term partnership economics, designed so your programs stay sustainable and your margins support growth.",
  },
  {
    q: "How does onboarding work?",
    a: "Onboarding is structured and supported. After your consultation, we set up portal access, walk your team through ordering and fulfillment workflows, and provide the education materials you need to launch.",
  },
  {
    q: "How does fulfillment work?",
    a: "Fulfillment runs through our trusted pharmacy relationship with an emphasis on consistency and reliability. Orders placed through the provider portal are processed efficiently, with clear communication at every step.",
  },
  {
    q: "Can I order right now, or do I need to be a partner first?",
    a: "Ordering runs through our provider portal and is available to approved provider partners. If you're new, start by requesting partnership. Once your practice is verified and onboarded, you'll receive portal access to place orders. This keeps ordering limited to licensed providers operating within their scope of practice.",
  },
  {
    q: "Who can become a partner?",
    a: "Licensed healthcare providers and wellness organizations, including wellness clinics, med spas, concierge medicine groups, telehealth operators, functional medicine clinics, and longevity-focused practices.",
  },
];

function FaqItem({ q, a, defaultOpen }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className="rounded-2xl border border-border/80 bg-card transition-colors hover:border-teal/30">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={open}
      >
        <span className="font-display text-lg font-medium">{q}</span>
        <span className={cn("shrink-0 text-teal-dark transition-transform duration-300", open && "rotate-45")}>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      <div className={cn("grid transition-all duration-300", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
        <div className="overflow-hidden">
          <p className="px-6 pb-5 leading-relaxed text-muted-foreground">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <>
      <section className="hero-surface relative overflow-hidden py-20 text-white md:py-24">
        <div className="hero-grid absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <motion.div {...fadeUpOnLoad} className="max-w-3xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-teal-light">
              How It Works
            </p>
            <h1 className="font-display text-4xl tracking-tight md:text-[3.4rem] md:leading-[1.05]">
              From first call to first launch, without the friction
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
              A clear, structured path from initial conversation to a fully operational
              wellness program inside your practice.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Lifestyle band */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <LifestyleBand
            id="photo-1530700131180-d43d9b8cc41f"
            alt="A person walking a happy golden retriever outdoors"
            eyebrow="The payoff"
            title="Less logistics, more time for patients"
            body="Once you are onboarded, ordering and fulfillment run quietly in the background. Your team spends its energy on patient care while we handle the operational details."
          />
        </div>
      </section>

      {/* Animated simplicity flow */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-teal-dark">
              Five simple steps
            </p>
            <h2 className="text-3xl tracking-tight md:text-[2.4rem]">
              The whole path, at a glance
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Each step flows into the next, with our team handling the operational
              complexity so your launch stays simple.
            </p>
          </motion.div>
          <FlowDiagram
            tone="dark"
            steps={STEPS.map((s) => ({ title: s.title }))}
          />
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-teal-dark">
              In detail
            </p>
            <h2 className="text-3xl tracking-tight md:text-[2.4rem]">Every step, explained</h2>
          </motion.div>
          <ol className="relative space-y-5 before:absolute before:left-[1.85rem] before:top-3 before:hidden before:h-[calc(100%-2rem)] before:w-px before:bg-border sm:before:block">
            {STEPS.map((s, i) => (
              <motion.li
                key={s.step}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex gap-5 rounded-2xl border border-border/80 bg-card p-6 sm:gap-6"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-navy font-display text-lg font-semibold text-teal-light">
                  {s.step}
                </span>
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
        <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-teal-dark">
              Before you ask
            </p>
            <h2 className="text-3xl tracking-tight md:text-[2.4rem]">Common questions</h2>
          </motion.div>
          <motion.div {...fadeUp} className="mt-12 space-y-4">
            {FAQS.map((f, i) => (
              <FaqItem key={f.q} q={f.q} a={f.a} defaultOpen={i === 0} />
            ))}
          </motion.div>
          <motion.div {...fadeUp} className="mt-12 text-center">
            <Link href="/contact">
              <Button size="lg">
                Start the Conversation <IconArrow />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
