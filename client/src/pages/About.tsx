import { Link } from "wouter";
import { motion } from "framer-motion";
import { ShieldCheck, Award, Cpu, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
};

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Trusted",
    text: "Licensed provider and pharmacy relationships, transparent communication, and the consistency that earns long-term trust.",
  },
  {
    icon: Award,
    title: "Professional",
    text: "Disciplined, operationally sharp, and focused on partnership success — in everything from onboarding to fulfillment.",
  },
  {
    icon: Cpu,
    title: "Advanced",
    text: "A modern wellness infrastructure platform built for scale: efficient systems, structured workflows, and cutting-edge program design.",
  },
];

export default function About() {
  return (
    <>
      <section className="bg-navy py-20 text-white md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div {...fadeUp} className="max-w-3xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-teal-light">
              About 2911Rx
            </p>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Wellness Infrastructure, Done Right
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
              2911Rx exists to give licensed providers a partner they can build on — combining
              high-quality therapies, reliable fulfillment, and operational support systems
              into one premium wellness partnership platform.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <motion.div {...fadeUp}>
              <h2 className="text-3xl font-bold tracking-tight">Why We Exist</h2>
              <div className="mt-5 space-y-4 leading-relaxed text-muted-foreground">
                <p>
                  Providers offering GLP-1 and wellness programs face a frustrating landscape:
                  low-cost suppliers with unreliable fulfillment, transactional vendors with no
                  support, and operational complexity that pulls focus away from patients.
                </p>
                <p>
                  We built 2911Rx to be the opposite — a platform where quality, consistency,
                  and professionalism come standard, and where every partnership is structured
                  for long-term success rather than a quick sale.
                </p>
                <p>
                  Our focus is simple: scalable wellness infrastructure built around recurring
                  partnerships, operational simplicity, reliable fulfillment, and metabolic
                  optimization programs that work for your practice and your patients.
                </p>
              </div>
            </motion.div>
            <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="space-y-5">
              {VALUES.map((v) => (
                <div key={v.title} className="rounded-lg border bg-card p-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-accent">
                      <v.icon className="h-5 w-5 text-teal-dark" />
                    </div>
                    <h3 className="font-display text-lg font-semibold">{v.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-muted py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl font-bold tracking-tight">Let's Talk Partnership</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              If you're a licensed provider looking for a wellness partner built on trust,
              professionalism, and advanced infrastructure — we'd like to hear from you.
            </p>
            <div className="mt-7">
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
