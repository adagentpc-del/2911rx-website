import { Link } from "wouter";
import { CONTACT_EMAIL } from "@/lib/utils";

const UPDATED = "June 2026";

function LegalHero({ kicker, title }: { kicker: string; title: string }) {
  return (
    <section className="hero-surface relative overflow-hidden py-16 text-white md:py-20">
      <div className="hero-grid absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-teal-light">
          {kicker}
        </p>
        <h1 className="font-display text-4xl tracking-tight md:text-5xl">{title}</h1>
        <p className="mt-4 text-sm text-white/55">Last updated: {UPDATED}</p>
      </div>
    </section>
  );
}

export default function Privacy() {
  return (
    <>
      <LegalHero kicker="Legal" title="Privacy Policy" />
      <section className="py-14 md:py-20">
        <div className="prose prose-slate mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
          <p>
            This Privacy Policy explains how 2911Rx ("we," "us," or "our") collects, uses, and
            protects information when you visit our website or submit an inquiry. By using this
            site, you agree to the practices described here.
          </p>

          <h2>Who this site is for</h2>
          <p>
            This website is intended for licensed healthcare providers and wellness
            organizations. It does not provide medical advice and does not sell products
            directly to patients or consumers.
          </p>

          <h2>Information we collect</h2>
          <p>We collect information you choose to provide, which may include:</p>
          <ul>
            <li>
              Contact and practice details you submit through our forms (such as name, work
              email, phone number, practice or organization name, practice type, state, and
              your message or goals).
            </li>
            <li>
              Basic, aggregated usage information about how the site is used (such as which
              pages are viewed and how often forms are submitted). We do not use cookies for
              advertising, do not use device fingerprinting, and do not store your IP address
              for tracking.
            </li>
          </ul>
          <p>
            Please do not include patient health information in any message you send us.
          </p>

          <h2>How we use information</h2>
          <ul>
            <li>To respond to your inquiry and schedule a consultation.</li>
            <li>To provide, operate, and improve the site and our partnership services.</li>
            <li>To communicate with you about your inquiry or partnership.</li>
            <li>To maintain the security and integrity of the site.</li>
          </ul>

          <h2>How we share information</h2>
          <p>
            We do not sell your personal information. We may share it with service providers
            who help us operate the site and communicate with you (for example, hosting,
            database, and email providers), and where required by law or to protect our rights.
          </p>

          <h2>Cookies</h2>
          <p>
            We use a single, strictly necessary session cookie to keep authorized users signed
            in to the administrative area. We do not use advertising or cross-site tracking
            cookies.
          </p>

          <h2>Data security &amp; retention</h2>
          <p>
            We use reasonable administrative and technical measures to protect the information
            we collect, and we retain inquiry information for as long as needed to respond to
            you and operate our business, unless a longer period is required by law.
          </p>

          <h2>Your choices &amp; rights</h2>
          <p>
            Depending on where you live, you may have rights to access, correct, or delete the
            personal information we hold about you, or to opt out of certain processing. To make
            a request, contact us using the details below. We will respond consistent with
            applicable law.
          </p>

          <h2>Children</h2>
          <p>
            This site is intended for professionals and is not directed to children, and we do
            not knowingly collect information from children under 13.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Material changes will be
            reflected by updating the "Last updated" date above.
          </p>

          <h2>Contact us</h2>
          <p>
            {CONTACT_EMAIL ? (
              <>
                Questions about this policy? Email us at{" "}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
              </>
            ) : (
              <>
                Questions about this policy? Reach us through our{" "}
                <Link href="/contact">contact form</Link>.
              </>
            )}
          </p>
        </div>
      </section>
    </>
  );
}
