import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useSettings } from "@/lib/useSettings";
import { Button, Input } from "@/components/ui";
import { IconArrow, IconExternal } from "@/components/Icons";

const SEEN_KEY = "rx_consult_seen";

export default function ConsultPopup() {
  const settings = useSettings();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const honeypot = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (localStorage.getItem(SEEN_KEY)) return;
    } catch {
      /* ignore */
    }
    const t = setTimeout(() => setOpen(true), 22000);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    setOpen(false);
    try {
      localStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await apiRequest("POST", "/api/leads", {
        name,
        email,
        source: "consult",
        message: "Requested a 15-minute consult via popup.",
        company_website: honeypot.current?.value || "",
      });
      setDone(true);
      try {
        localStorage.setItem(SEEN_KEY, "1");
      } catch {
        /* ignore */
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-navy/60 backdrop-blur-[2px]" onClick={close} />
          <motion.div
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-border bg-card shadow-[0_40px_100px_-30px_hsl(214_60%_4%/0.5)]"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="hero-surface px-7 pb-6 pt-8 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-light">
                Free 15-minute consult
              </p>
              <h3 className="mt-2 font-display text-2xl leading-tight">
                {done ? "You're all set." : "See if a partnership fits your practice"}
              </h3>
              <p className="mt-2 text-sm text-white/65">
                {done
                  ? "Thanks. We'll reach out to schedule your free 15-minute consult."
                  : "No cost, no obligation. We'll review your goals and whether 2911Rx is a fit."}
              </p>
            </div>

            <div className="px-7 py-6">
              {done ? (
                <div className="space-y-3">
                  {settings.calendar_url ? (
                    <a href={settings.calendar_url} target="_blank" rel="noopener noreferrer">
                      <Button size="lg" className="w-full">
                        Book your time now <IconExternal />
                      </Button>
                    </a>
                  ) : null}
                  <Button variant="outline" size="lg" className="w-full" onClick={close}>
                    Close
                  </Button>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-3">
                  <input
                    ref={honeypot}
                    type="text"
                    name="company_website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute left-[-9999px] h-0 w-0 opacity-0"
                  />
                  <Input
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
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
                    Request my free consult <IconArrow />
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    For licensed providers and wellness organizations.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
