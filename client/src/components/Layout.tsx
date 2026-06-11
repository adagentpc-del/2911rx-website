import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ExternalLink } from "lucide-react";
import { cn, PORTAL_URL } from "@/lib/utils";
import { Button } from "@/components/ui";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/partnership", label: "Partnership" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About" },
];

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className="flex items-baseline gap-0.5 font-display text-2xl font-bold tracking-tight">
      <span className={dark ? "text-white" : "text-navy"}>2911</span>
      <span className="text-teal">Rx</span>
    </Link>
  );
}

export function Header() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-teal",
                location === l.href ? "text-teal" : "text-foreground/80",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <a href={PORTAL_URL} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm">
              Provider Ordering Portal <ExternalLink className="h-3.5 w-3.5" />
            </Button>
          </a>
          <Link href="/contact">
            <Button size="sm">Become a Partner</Button>
          </Link>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="border-t bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-1 text-sm font-medium"
              >
                {l.label}
              </Link>
            ))}
            <a href={PORTAL_URL} target="_blank" rel="noopener noreferrer" className="py-1 text-sm font-medium">
              Provider Ordering Portal ↗
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
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo dark />
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70">
              A premium provider-focused wellness platform specializing in GLP-1 therapies,
              metabolic optimization, peptide wellness support, and operational partnership
              systems — built on licensed provider and pharmacy relationships.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/50">Explore</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li><Link href="/partnership" className="hover:text-teal-light">Partnership Program</Link></li>
              <li><Link href="/how-it-works" className="hover:text-teal-light">How It Works</Link></li>
              <li><Link href="/about" className="hover:text-teal-light">About 2911Rx</Link></li>
              <li><Link href="/contact" className="hover:text-teal-light">Request Information</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/50">Providers</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <a href={PORTAL_URL} target="_blank" rel="noopener noreferrer" className="hover:text-teal-light">
                  Provider Ordering Portal ↗
                </a>
              </li>
              <li><Link href="/contact" className="hover:text-teal-light">Become a Partner</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="text-xs leading-relaxed text-white/50">
            2911Rx partners exclusively with licensed healthcare providers and pharmacy
            partners. Therapies and wellness programs are available only through licensed
            providers operating within their scope of practice. This website is intended for
            licensed healthcare professionals and wellness organizations; it does not provide
            medical advice and does not offer products for direct purchase by patients or consumers.
          </p>
          <p className="mt-4 text-xs text-white/40">
            © {new Date().getFullYear()} 2911Rx. All rights reserved.
          </p>
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
    </div>
  );
}
