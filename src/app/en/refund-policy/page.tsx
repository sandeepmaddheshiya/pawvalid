import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy | PawValid',
  description:
    'PawValid refund and cancellation policy. Learn about our 14-day satisfaction guarantee, refund eligibility, payment processing timelines, and dispute resolution.',
  alternates: {
    canonical: 'https://pawvalid.online/en/refund-policy',
  },
};

export default function RefundPolicyPage() {
  const lastUpdated = 'September 10, 2026';

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-zinc-800 font-sans py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-zinc-200/80">
        {/* Navigation Breadcrumb */}
        <nav className="text-xs text-zinc-500 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-zinc-900 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-zinc-900 font-semibold">Refund &amp; Cancellation Policy</span>
        </nav>

        <header className="border-b border-zinc-100 pb-8 mb-8">
          <div className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-[11px] font-bold uppercase tracking-wider rounded-full mb-3">
            Billing &amp; Consumer Protection
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
            PawValid Refund &amp; Cancellation Policy
          </h1>
          <p className="text-xs text-zinc-500 mt-2">
            Last Updated: {lastUpdated} &bull; Version 1.0
          </p>
        </header>

        {/* Highlight Summary Box */}
        <div className="mb-8 p-5 rounded-2xl bg-[#F0FDF4] border border-[#DCFCE7] text-xs sm:text-sm text-zinc-700 space-y-2">
          <h3 className="font-bold text-[#166534] text-sm flex items-center gap-2">
            <span>🛡️</span> Our 14-Day Traveler Protection Commitment
          </h3>
          <p className="text-zinc-600 leading-relaxed">
            At PawValid, our mission is to ensure stress-free and accurate pet relocations worldwide. If you experience technical errors, statutory data inaccuracies in our checklist, or accidental duplicate charges, you are protected by our comprehensive refund policy.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="bg-white p-3 rounded-xl border border-emerald-100 text-xs shadow-2xs">
              <span className="font-bold text-zinc-900 block mb-0.5">14-Day Window</span>
              Eligible requests evaluated promptly within 14 days of purchase.
            </div>
            <div className="bg-white p-3 rounded-xl border border-emerald-100 text-xs shadow-2xs">
              <span className="font-bold text-zinc-900 block mb-0.5">Duplicate Charges</span>
              100% instant refund for accidental double payments.
            </div>
            <div className="bg-white p-3 rounded-xl border border-emerald-100 text-xs shadow-2xs">
              <span className="font-bold text-zinc-900 block mb-0.5">5–7 Business Days</span>
              Funds credited back directly to your original payment method.
            </div>
          </div>
        </div>

        <div className="space-y-8 text-sm leading-relaxed text-zinc-600">
          {/* Section 1 */}
          <section>
            <h2 className="text-lg font-bold text-[#0F172A] mb-3">1. Scope of This Policy</h2>
            <p>
              This Refund &amp; Cancellation Policy applies to all digital products, regulatory compliance passes, and concierge services purchased on <a href="https://pawvalid.online" className="text-emerald-600 underline">pawvalid.online</a> (&quot;Platform&quot;), operated by PawValid. Payments are processed securely via PCI-DSS Level 1 compliant payment gateways (Razorpay) in British Sterling Pounds (£ GBP).
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-lg font-bold text-[#0F172A] mb-3">2. Service Tiers Covered</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Complete Travel Plan / Certified Trip Pass (£19.00 GBP):</strong> Immediate digital access to route-specific departure checklists, digital verification pass with QR code, printable vet summary sheets, and deadline reminder notifications.
              </li>
              <li>
                <strong>Priority Expert Review / Concierge (£59.00 GBP):</strong> All Certified Pass features plus dedicated direct review of uploaded documents by a veterinary pet import specialist with a guaranteed 24-hour response SLA via WhatsApp liaison.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-lg font-bold text-[#0F172A] mb-3">3. Eligibility for a Full Refund</h2>
            <p className="mb-3">
              You are entitled to a full (100%) refund of your purchase under any of the following conditions:
            </p>
            <ul className="list-disc pl-5 space-y-3">
              <li>
                <strong>Statutory or Algorithmic Inaccuracy:</strong> If our system checklist contains a demonstrable factual error or omitted mandatory requirement verified against the destination country&apos;s official veterinary authority rules in effect at the time of purchase, and this is brought to our attention before departure.
              </li>
              <li>
                <strong>Duplicate or Accidental Overpayment:</strong> If you were billed more than once for the same trip assessment due to a browser glitch or payment gateway retry, all redundant charges will be refunded immediately in full.
              </li>
              <li>
                <strong>Technical Delivery Failure:</strong> If technical platform faults prevent you from generating, downloading, or viewing your Certified Pass or Dossier, and our engineering team is unable to resolve the issue within 24 hours of notification.
              </li>
              <li>
                <strong>Concierge SLA Breach:</strong> If you purchased Priority Expert Review (£59.00) and our specialist team fails to initiate liaison or review your uploaded records within the guaranteed 24-hour SLA without prior mutual agreement.
              </li>
              <li>
                <strong>Cancellation Before Concierge Work Commences:</strong> If you request cancellation of Priority Expert Review before our specialist has begun auditing your uploaded files.
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-lg font-bold text-[#0F172A] mb-3">4. Non-Refundable Circumstances</h2>
            <p className="mb-3">
              To maintain the integrity of our verified specialist labor and digital dockets, refunds cannot be granted under the following circumstances:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Completed Specialist Review:</strong> If our veterinary specialist has already conducted the audit, cross-checked your records against official requirements, and delivered personalized recommendations or WhatsApp liaison.
              </li>
              <li>
                <strong>Traveler or Veterinary Non-Compliance:</strong> Refusal of boarding or border entry caused by failure to take your pet to the vet within mandatory clinical windows (e.g. tapeworm treatment outside the 24–120 hour window, rabies vaccine administered after microchip or within the 21-day latency period).
              </li>
              <li>
                <strong>Third-Party Airline or Government Actions:</strong> Last-minute flight cancellations, airline brachycephalic heat-embargoes, geopolitical border closures, or customs strikes outside PawValid&apos;s control.
              </li>
              <li>
                <strong>Change of Mind After Exporting Documents:</strong> Requests made more than 14 days after purchase where the digital pass and dossier have already been downloaded and utilized without defect.
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-lg font-bold text-[#0F172A] mb-3">5. Cancellation Policy</h2>
            <p className="mb-2">
              You may cancel your pending order or request account removal at any time:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Self-Service / Immediate:</strong> If you have not submitted documents for specialist review, email us with your Order ID to request an immediate order cancellation and refund.
              </li>
              <li>
                <strong>Automated Subscriptions:</strong> PawValid does not charge recurring or hidden subscription fees. Every pass purchase is a strictly one-time fee per pet travel itinerary. You will never be billed automatically.
              </li>
            </ul>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-lg font-bold text-[#0F172A] mb-3">6. How to Request a Refund</h2>
            <p className="mb-3">
              Submitting a refund claim is simple and straightforward:
            </p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                Send an email to <a href="mailto:support@pawvalid.online" className="text-emerald-600 underline font-medium">support@pawvalid.online</a> with the subject line <code>Refund Request - [Your Order ID or Email]</code>.
              </li>
              <li>
                Provide your <strong>Registered Email Address</strong>, <strong>Pet Name</strong>, and <strong>Travel Corridor</strong> (e.g. UK to Germany).
              </li>
              <li>
                Briefly describe the reason for your refund request.
              </li>
            </ol>
            <p className="mt-3">
              Our support team reviews all refund requests within <strong>24 to 48 hours</strong> on business days.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-lg font-bold text-[#0F172A] mb-3">7. Processing &amp; Payout Timelines</h2>
            <p>
              Once your refund is approved:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>
                The refund is immediately submitted through our payment processor, <strong>Razorpay</strong>.
              </li>
              <li>
                Funds are returned to your original payment instrument (credit card, debit card, UPI, or net banking).
              </li>
              <li>
                Depending on your card issuer or banking institution, the credit will typically reflect on your bank statement within <strong>5 to 7 business days</strong>.
              </li>
              <li>
                You will receive an automated email confirmation from Razorpay and PawValid containing your refund transaction ARN / reference number.
              </li>
            </ul>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-lg font-bold text-[#0F172A] mb-3">8. Contact Us</h2>
            <p>
              If you have any questions about this Refund &amp; Cancellation Policy or need assistance with an existing order, please get in touch with our billing team:
            </p>
            <div className="mt-3 p-4 rounded-xl bg-zinc-50 border border-zinc-200 text-xs sm:text-sm text-zinc-700 space-y-1">
              <p><strong>Customer Support:</strong> <a href="mailto:support@pawvalid.online" className="text-emerald-600 underline">support@pawvalid.online</a></p>
              <p><strong>Billing &amp; Disputes:</strong> <a href="mailto:billing@pawvalid.online" className="text-emerald-600 underline">billing@pawvalid.online</a></p>
              <p><strong>Official Website:</strong> <a href="https://pawvalid.online" className="text-emerald-600 underline">https://pawvalid.online</a></p>
            </div>
          </section>
        </div>

        {/* Footer Navigation Backlinks */}
        <div className="mt-10 pt-6 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-500">
          <Link href="/" className="hover:text-zinc-900 transition-colors">
            ← Return to Homepage
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/en/terms" className="hover:text-zinc-900 transition-colors">
              Terms of Service
            </Link>
            <span>&bull;</span>
            <Link href="/en/privacy" className="hover:text-zinc-900 transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
