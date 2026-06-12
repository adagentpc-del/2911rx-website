import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui";
import { IconShield, IconHandshake, IconRecurring, IconArrow } from "@/components/Icons";

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

const VALUES = [
  {
    icon: IconShield,
    title: "Trusted",
    text: "Licensed provider and pharmacy relationships, transparent communication, and the consistency that earns long-term trust.",
  },
  {
    icon: IconHandshake,
    title: "Professional",
    text: "Disciplined, operationally sharp, and focused on partnership success in everything from onboarding to fulfillment.",
  },
  {
    icon: IconRecurring,
    title: "Advanced",
    text: "A modern wellness infrastructure platform built for scale: efficient systems, structured workflows, and cutting-edge program design.",
  },
];

export default function About() {
  return (
    <>
      <section className="hero-surface relative overflow-hidden py-20 text-white md:py-24">
        <div className="hero-grid absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <motion.div {...fadeUpOnLoad} className="max-w-3xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-teal-light">
              About 2911Rx
            </p>
            <h1 className="font-display text-4xl tracking-tight md:text-[3.4rem] md:leading-[1.05]">
              Wellness infrastructure, done right
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
              2911Rx exists to give licensed providers a partner they can build on, combining
              high-quality therapies, reliable fulfillment, and operational support into one
              premium wellness partnership platform.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-2">
            <motion.div {...fadeUp}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-teal-dark">
                Why we exist
              </p>
              <h2 className="text-3xl tracking-tight md:text-[2.4rem]">
                A partner built for the long game
              </h2>
              <div className="mt-5 space-y-4 text-lg leading-relaxed text-muted-foreground">
                <p>
                  Providers offering GLP-1 and wellness programs face a frustrating landscape:
                  low-cost suppliers with unreliable fulfillment, transactional vendors with no
                  support, and operational complexity that pulls focus away from patients.
                </p>
                <p>
                  We built 2911Rx to be the opposite. A platform where quality, consistency,
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
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-5"
            >
              {VALUES.map((v) => (
                <div key={v.title} className="rounded-2xl border border-border/80 bg-card p-7">
                  <div className="flex items-center gap-4">
                    <span className="icon-tile">
                      <v.icon />
                    </span>
                    <h3 className="font-display text-xl font-semibold">{v.title}</h3>
                  </div>
                  <p className="mt-3.5 leading-relaxed text-muted-foreground">{v.text}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-muted py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl tracking-tight md:text-[2.4rem]">Let us talk partnership</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
              If you are a licensed provider looking for a wellness partner built on trust,
              professionalism, and advanced infrastructure, we would like to hear from you.
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
