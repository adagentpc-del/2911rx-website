import { Link } from "wouter";
import { CONTACT_EMAIL } from "@/lib/utils";

const UPDATED = "June 2026";

export default function Terms() {
  return (
    <>
      <section className="hero-surface relative overflow-hidden py-16 text-white md:py-20">
        <div className="hero-grid absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-teal-light">
            Legal
          </p>
          <h1 className="font-display text-4xl tracking-tight md:text-5xl">Terms of Use</h1>
          <p className="mt-4 text-sm text-white/55">Last updated: {UPDATED}</p>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="prose prose-slate mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
          <p>
            These Terms of Use govern your access to and use of the 2911Rx website. By using
            this site, you agree to these terms. If you do not agree, please do not use the
            site.
          </p>

          <h2>Intended audience</h2>
          <p>
            This site is intended for licensed healthcare providers and wellness organizations.
            Content is provided for general informational and partnership purposes only.
          </p>

          <h2>No medical advice; no product claims</h2>
          <p>
            Nothing on this site is medical, clinical, legal, or financial advice, and nothing
            here is intended to diagnose, treat, cure, or prevent any disease. Certain products
            referenced may be compounded or may not be approved by the U.S. Food and Drug
            Administration. No statement on this site is a claim that any product is FDA-approved
            or a representation of its safety or effectiveness. Therapies are available only
            through licensed providers exercising independent clinical judgment.
          </p>

          <h2>Inquiries and partnership</h2>
          <p>
            Submitting an inquiry does not create a partnership or any binding agreement. Any
            partnership is subject to a separate written agreement and applicable eligibility,
            licensing, and regulatory requirements.
          </p>

          <h2>Third-party links and ordering</h2>
          <p>
            The site may link to third-party services, including a separate provider ordering
            portal operated by a third party. We are not responsible for the content, products,
            or practices of third-party sites, which are governed by their own terms.
          </p>

          <h2>Intellectual property</h2>
          <p>
            All content on this site, including text, graphics, logos, and design, is owned by
            2911Rx or its licensors and may not be copied or used without permission.
          </p>

          <h2>Disclaimers &amp; limitation of liability</h2>
          <p>
            The site is provided "as is" and "as available" without warranties of any kind. To
            the fullest extent permitted by law, 2911Rx is not liable for any indirect,
            incidental, or consequential damages arising from your use of the site.
          </p>

          <h2>Governing law</h2>
          <p>
            These terms are governed by the laws of the State of Florida, without regard to its
            conflict-of-law principles.
          </p>

          <h2>Changes</h2>
          <p>
            We may update these terms from time to time. Continued use of the site after changes
            take effect constitutes acceptance of the updated terms.
          </p>

          <h2>Contact us</h2>
          <p>
            {CONTACT_EMAIL ? (
              <>
                Questions? Email us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
              </>
            ) : (
              <>
                Questions? Reach us through our <Link href="/contact">contact form</Link>.
              </>
            )}
          </p>
        </div>
      </section>
    </>
  );
}
