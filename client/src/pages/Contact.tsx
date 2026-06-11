import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import { insertInquirySchema, type InsertInquiry, PRACTICE_TYPES, INTEREST_AREAS } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { Button, Input, Textarea, Select, Label, Card, FieldError } from "@/components/ui";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

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
      await apiRequest("POST", "/api/inquiries", data);
      setSubmitted(true);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  if (submitted) {
    return (
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-xl px-4 text-center sm:px-6">
          <CheckCircle2 className="mx-auto h-14 w-14 text-teal" />
          <h1 className="mt-6 text-3xl font-bold tracking-tight">Inquiry Received</h1>
          <p className="mt-4 text-muted-foreground">
            Thank you for your interest in partnering with 2911Rx. A member of our team will
            reach out shortly to schedule your partnership consultation.
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-navy py-16 text-white md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-teal-light">
              Become a Partner
            </p>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Request Information</h1>
            <p className="mt-4 max-w-2xl text-lg text-white/75">
              Tell us about your practice and what you're looking to build. We'll cover
              therapies, pricing, onboarding, and fulfillment in your consultation.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <Card className="p-8">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" noValidate>
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
                  placeholder="Patient volume, programs you want to offer, timeline — anything that helps us prepare for your consultation."
                  {...form.register("message")}
                />
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
