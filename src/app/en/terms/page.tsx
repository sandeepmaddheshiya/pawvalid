import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | PawValid',
  description:
    'PawValid terms of service. Understand the guidelines, service scope, payment terms, and independent compliance disclaimer for international pet travel preparation.',
  alternates: {
    canonical: 'https://pawvalid.online/en/terms',
  },
};

export default function TermsPage() {
  const lastUpdated = 'September 10, 2026';

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-zinc-800 font-sans py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-zinc-200/80">
        {/* Navigation Breadcrumb */}
        <nav className="text-xs text-zinc-500 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-zinc-900 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-zinc-900 font-semibold">Terms of Service</span>
        </nav>

        <header className="border-b border-zinc-100 pb-8 mb-8">
          <div className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-[11px] font-bold uppercase tracking-wider rounded-full mb-3">
            Terms &amp; User Agreement
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
            PawValid Terms of Service
          </h1>
          <p className="text-xs text-zinc-500 mt-2">
            Last Updated: {lastUpdated} &bull; Version 2.1
          </p>
        </header>

        <div className="space-y-8 text-sm leading-relaxed text-zinc-600">
          <section>
            <h2 className="text-lg font-bold text-[#0F172A] mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using <a href="https://pawvalid.online" className="text-emerald-600 underline">pawvalid.online</a> (the &quot;Platform&quot;), creating an account, uploading pet records, or purchasing travel compliance products, you agree to be bound by these Terms of Service. If you do not agree, please discontinue using the platform immediately.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0F172A] mb-3">2. Description of Services</h2>
            <p className="mb-3">
              PawValid provides pet owners with automated regulatory research, document readiness gap analysis, and relocation dockets for companion animals traveling internationally. Our service tiers include:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Free Travel Assessment:</strong> Preliminary microchip, vaccine, and quarantine timeline verification against statutory country rules.
              </li>
              <li>
                <strong>Certified Trip Pass (£19.00 GBP):</strong> Full digital travel dossier, verifiable QR pass, printable vet summary sheet, and departure preparation checklists.
              </li>
              <li>
                <strong>Priority Concierge Review (£59.00 GBP):</strong> Direct review of uploaded documents by a veterinary import specialist with a 24-hour response SLA via direct WhatsApp liaison.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0F172A] mb-3">3. Independent Travel Preparation Disclaimer</h2>
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 leading-normal">
              <strong>CRITICAL NOTICE:</strong> PawValid is an independent technological preparation tool. PawValid is NOT an official government department, border control agency, or veterinary practice. We do not issue official state health certificates or legal veterinary endorsements. Official export endorsements must be granted by a USDA-accredited veterinarian, official DEFRA/APHA veterinary officer, or the relevant competent veterinary authority in your jurisdiction.
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0F172A] mb-3">4. Traveler Responsibilities</h2>
            <p className="mb-3">As a user of PawValid, you acknowledge and agree that:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>You are solely responsible for ensuring your pet is examined by an authorized veterinarian within the statutory departure windows (e.g. 10 days for EU Annex IV health certificates, 24–120 hours for tapeworm administration).</li>
              <li>You must present original, physical ink-signed or authorized digital certificates at airline check-in desks and border inspection posts.</li>
              <li>Airline-specific live animal transport policies (such as brachycephalic breed embargoes, extreme weather cutoffs, or IATA container dimensions) must be confirmed directly with your operating airline.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0F172A] mb-3">5. Fees and Refund Policy</h2>
            <p>
              Paid tiers (£19 Certified Pass and £59 Concierge) grant immediate digital access to specialized dockets and veterinary specialist labor. If you encounter technical inaccuracies in a statutory checklist prior to travel, please contact our support team at <a href="mailto:support@pawvalid.online" className="text-emerald-600 underline">support@pawvalid.online</a> within 14 days of purchase for a review or refund.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0F172A] mb-3">6. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by applicable law, PawValid and its operators shall not be liable for any indirect, incidental, or consequential damages, including but not limited to missed flights, airline denial of boarding, pet quarantine fees, or border inspection rejections resulting from inaccurate document uploads, omitted veterinary procedures, or sudden regulatory shifts by destination governments.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0F172A] mb-3">7. Contact Information</h2>
            <p>
              For legal inquiries, questions about these Terms, or support requests:
            </p>
            <p className="mt-2 font-medium text-[#0F172A]">
              Support Desk: <a href="mailto:support@pawvalid.online" className="text-emerald-600 underline">support@pawvalid.online</a><br />
              Legal &amp; Compliance: <a href="mailto:legal@pawvalid.online" className="text-emerald-600 underline">legal@pawvalid.online</a><br />
              Website: <a href="https://pawvalid.online" className="text-emerald-600 underline">pawvalid.online</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
