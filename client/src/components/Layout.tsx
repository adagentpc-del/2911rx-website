import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { cn, PORTAL_URL, CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/utils";
import { useSettings } from "@/lib/useSettings";
import { Button } from "@/components/ui";
import { IconExternal } from "@/components/Icons";
import ConsultPopup from "@/components/ConsultPopup";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/partnership", label: "Partnership" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About" },
];

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className="flex items-baseline gap-px font-display text-[1.65rem] font-semibold tracking-tight">
      <span className={dark ? "text-white" : "text-navy"}>2911</span>
      <span className="text-teal">Rx</span>
    </Link>
  );
}

export function Header() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-ivory/80 backdrop-blur-md">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-teal-dark",
                location === l.href ? "text-teal-dark" : "text-foreground/70",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <a href={PORTAL_URL} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm">
              Provider Ordering <IconExternal />
            </Button>
          </a>
          <Link href="/contact">
            <Button size="sm">Become a Partner</Button>
          </Link>
        </div>
        <button
          className="-mr-1 rounded-md p-2 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border/70 bg-ivory px-5 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2.5 text-sm font-medium hover:bg-muted"
              >
                {l.label}
              </Link>
            ))}
            <a
              href={PORTAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-md px-2 py-2.5 text-sm font-medium hover:bg-muted"
            >
              Provider Ordering <IconExternal />
            </a>
            <Link href="/contact" onClick={() => setOpen(false)}>
              <Button className="mt-2 w-full">Become a Partner</Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  const settings = useSettings();
  const email = settings.contact_email || CONTACT_EMAIL;
  const phone = settings.contact_phone || CONTACT_PHONE;
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo dark />
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/65">
              A premium provider-focused wellness platform specializing in GLP-1 therapies,
              metabolic optimization, peptide wellness support, and operational partnership
              systems, built on licensed provider and pharmacy relationships.
            </p>
            {(email || phone) && (
              <div className="mt-5 space-y-1.5 text-sm text-white/70">
                {email && (
                  <p>
                    <a href={`mailto:${email}`} className="transition-colors hover:text-teal-light">
                      {email}
                    </a>
                  </p>
                )}
                {phone && (
                  <p>
                    <a href={`tel:${phone.replace(/[^0-9+]/g, "")}`} className="transition-colors hover:text-teal-light">
                      {phone}
                    </a>
                  </p>
                )}
              </div>
            )}
          </div>
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-white/45">Explore</h4>
            <ul className="space-y-2.5 text-sm text-white/75">
              <li><Link href="/partnership" className="transition-colors hover:text-teal-light">Partnership Program</Link></li>
              <li><Link href="/how-it-works" className="transition-colors hover:text-teal-light">How It Works</Link></li>
              <li><Link href="/about" className="transition-colors hover:text-teal-light">About 2911Rx</Link></li>
              <li><Link href="/contact" className="transition-colors hover:text-teal-light">Request Information</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-white/45">Providers</h4>
            <ul className="space-y-2.5 text-sm text-white/75">
              <li>
                <a href={PORTAL_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 transition-colors hover:text-teal-light">
                  Provider Ordering Portal <IconExternal />
                </a>
              </li>
              <li><Link href="/contact" className="transition-colors hover:text-teal-light">Become a Partner</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-14 border-t border-white/10 pt-7">
          <p className="max-w-4xl text-xs leading-relaxed text-white/45">
            2911Rx partners exclusively with licensed healthcare providers and pharmacy
            partners. Therapies and wellness programs are available only through licensed
            providers operating within their scope of practice, and are dispensed solely on
            the basis of a provider's independent clinical judgment. Certain products may be
            compounded or may contain substances that are not approved by the U.S. Food and
            Drug Administration; no statement on this site should be read as a claim that any
            product is FDA-approved or as a representation of safety or effectiveness. This
            website is intended for licensed healthcare professionals and wellness
            organizations. It does not provide medical advice, makes no claims to diagnose,
            treat, cure, or prevent any disease, and does not offer products for direct
            purchase by patients or consumers.
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-white/35">
              © {new Date().getFullYear()} 2911Rx. All rights reserved.
            </p>
            <div className="flex items-center gap-5 text-xs text-white/55">
              <Link href="/privacy" className="transition-colors hover:text-teal-light">Privacy Policy</Link>
              <Link href="/terms" className="transition-colors hover:text-teal-light">Terms of Use</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <ConsultPopup />
    </div>
  );
}
