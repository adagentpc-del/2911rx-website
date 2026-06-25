import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { LEAD_MAGNET } from "@/lib/utils";
import { Button, Input } from "@/components/ui";
import { IconCheck, IconArrow } from "@/components/Icons";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
};

export default function LeadMagnet() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const honeypot = useRef<HTMLInputElement>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await apiRequest("POST", "/api/leads", {
        name,
        email,
        source: "lead-magnet",
        message: `Downloaded: ${LEAD_MAGNET.title}`,
        company_website: honeypot.current?.value || "",
      });
      setDone(true);
      window.open(LEAD_MAGNET.file, "_blank");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
        <motion.div
          {...fadeUp}
          className="overflow-hidden rounded-3xl border border-border/80 bg-card shadow-[0_24px_70px_-34px_hsl(214_45%_11%/0.3)]"
        >
          <div className="grid md:grid-cols-2">
            <div className="bg-muted/60 p-8 md:p-10">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-teal-dark">
                Free download
              </p>
              <h2 className="font-display text-2xl leading-tight tracking-tight md:text-3xl">
                {LEAD_MAGNET.title}
              </h2>
              <p className="mt-3 text-muted-foreground">
                A practical pre-launch checklist to evaluate whether your practice is ready to add
                or scale a provider-directed wellness program, the right way.
              </p>
              <ul className="mt-5 space-y-2.5 text-sm">
                {[
                  "Clinical & regulatory foundations",
                  "Sourcing, fulfillment & operations",
                  "Program design & recurring revenue model",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal/15 text-teal-dark">
                      <IconCheck className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-foreground/80">{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col justify-center p-8 md:p-10">
              {done ? (
                <div className="text-center">
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent text-teal-dark">
                    <IconCheck className="h-7 w-7" />
                  </span>
                  <h3 className="mt-4 font-display text-xl font-semibold">Your download is ready</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    If it didn't open automatically, use the button below.
                  </p>
                  <a href={LEAD_MAGNET.file} target="_blank" rel="noopener noreferrer">
                    <Button className="mt-5 w-full">Download the checklist</Button>
                  </a>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-3">
                  <p className="text-sm font-medium">Get the checklist instantly</p>
                  <input
                    ref={honeypot}
                    type="text"
                    name="company_website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute left-[-9999px] h-0 w-0 opacity-0"
                  />
                  <Input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required />
                  <Input
                    type="email"
                    placeholder="Work email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  {error && <p className="text-sm text-destructive">{error}</p>}
                  <Button type="submit" size="lg" className="w-full" disabled={loading}>
                    {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                    Send me the checklist <IconArrow />
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    For licensed providers. No spam, unsubscribe anytime.
                  </p>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
