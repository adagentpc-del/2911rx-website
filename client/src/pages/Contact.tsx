import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { insertInquirySchema, type InsertInquiry, PRACTICE_TYPES, INTEREST_AREAS } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { Button, Input, Textarea, Select, Label, Card, FieldError } from "@/components/ui";
import { IconCheck } from "@/components/Icons";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");
  const honeypotRef = useRef<HTMLInputElement>(null);

  const form = useForm<InsertInquiry>({
    resolver: zodResolver(insertInquirySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      organization: "",
      practiceType: "",
      state: "",
      interest: "",
      message: "",
    },
  });

  const onSubmit = async (data: InsertInquiry) => {
    setServerError("");
    try {
      await apiRequest("POST", "/api/inquiries", {
        ...data,
        company_website: honeypotRef.current?.value || "",
      });
      setSubmitted(true);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  if (submitted) {
    return (
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-xl px-5 text-center sm:px-6">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent text-teal-dark">
            <IconCheck className="h-8 w-8" />
          </span>
          <h1 className="mt-7 font-display text-3xl tracking-tight">Inquiry received</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Thank you for your interest in partnering with 2911Rx. A member of our team will
            reach out shortly to schedule your consultation and answer your questions.
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="hero-surface relative overflow-hidden py-16 text-white md:py-20">
        <div className="hero-grid absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-teal-light">
              Become a Partner
            </p>
            <h1 className="font-display text-4xl tracking-tight md:text-[3.4rem] md:leading-[1.05]">
              Request information
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
              Tell us about your practice and what you want to build. We will cover therapies,
              pricing, onboarding, and fulfillment in your consultation. Most partners hear
              back within one business day.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-2xl px-5 sm:px-6 lg:px-8">
          <Card className="p-7 shadow-[0_20px_60px_-30px_hsl(214_45%_11%/0.25)] sm:p-9">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" noValidate>
              {/* Honeypot: hidden from humans; bots that fill it are silently dropped */}
              <input
                ref={honeypotRef}
                type="text"
                name="company_website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
              />
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input id="name" placeholder="Dr. Jane Smith" {...form.register("name")} />
                  <FieldError message={form.formState.errors.name?.message} />
                </div>
                <div>
                  <Label htmlFor="email">Work Email *</Label>
                  <Input id="email" type="email" placeholder="you@practice.com" {...form.register("email")} />
                  <FieldError message={form.formState.errors.email?.message} />
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" placeholder="(555) 555-5555" {...form.register("phone")} />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input id="state" placeholder="e.g. Florida" {...form.register("state")} />
                </div>
              </div>
              <div>
                <Label htmlFor="organization">Practice / Organization *</Label>
                <Input id="organization" placeholder="Your clinic, med spa, or telehealth company" {...form.register("organization")} />
                <FieldError message={form.formState.errors.organization?.message} />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="practiceType">Practice Type *</Label>
                  <Select id="practiceType" {...form.register("practiceType")}>
                    <option value="">Select...</option>
                    {PRACTICE_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </Select>
                  <FieldError message={form.formState.errors.practiceType?.message} />
                </div>
                <div>
                  <Label htmlFor="interest">Area of Interest *</Label>
                  <Select id="interest" {...form.register("interest")}>
                    <option value="">Select...</option>
                    {INTEREST_AREAS.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </Select>
                  <FieldError message={form.formState.errors.interest?.message} />
                </div>
              </div>
              <div>
                <Label htmlFor="message">Tell Us About Your Goals</Label>
                <Textarea
                  id="message"
                  placeholder="Patient volume, programs you want to offer, timeline, and anything else that helps us prepare for your consultation."
                  {...form.register("message")}
                />
                <p className="mt-1.5 text-xs text-muted-foreground">
                  Please do not include any patient health information.
                </p>
              </div>
              {serverError && <p className="text-sm text-destructive">{serverError}</p>}
              <Button type="submit" size="lg" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                Submit Partnership Inquiry
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                For licensed healthcare providers and wellness organizations only.
              </p>
            </form>
          </Card>
        </div>
      </section>
    </>
  );
}
