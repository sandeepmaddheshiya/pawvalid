import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | PawValid',
  description:
    'PawValid privacy policy. Learn how we handle your veterinary records, passport documents, pet microchip data, and payment information with 256-bit encryption.',
  alternates: {
    canonical: 'https://pawvalid.online/en/privacy',
  },
};

export default function PrivacyPage() {
  const lastUpdated = 'September 10, 2026';

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-zinc-800 font-sans py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-zinc-200/80">
        {/* Navigation Breadcrumb */}
        <nav className="text-xs text-zinc-500 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-zinc-900 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-zinc-900 font-semibold">Privacy Policy</span>
        </nav>

        <header className="border-b border-zinc-100 pb-8 mb-8">
          <div className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-[11px] font-bold uppercase tracking-wider rounded-full mb-3">
            Legal &amp; Data Protection
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
            PawValid Privacy Policy
          </h1>
          <p className="text-xs text-zinc-500 mt-2">
            Last Updated: {lastUpdated} &bull; Effective Date: January 1, 2026
          </p>
        </header>

        <div className="space-y-8 text-sm leading-relaxed text-zinc-600">
          <section>
            <h2 className="text-lg font-bold text-[#0F172A] mb-3">1. Overview and Commitment</h2>
            <p>
              PawValid (&quot;PawValid,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to safeguarding your privacy and protecting the sensitive medical, microchip, and travel records you entrust to us. This Privacy Policy explains our practices regarding the collection, storage, processing, and protection of information when you use <a href="https://pawvalid.online" className="text-emerald-600 underline">pawvalid.online</a> (the &quot;Platform&quot;).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0F172A] mb-3">2. Information We Collect</h2>
            <p className="mb-3">To verify international travel compliance for your companion animals, we collect:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Pet Information:</strong> Name, species, breed, age, ISO 11784/11785 15-digit microchip number, implant date, rabies vaccination certificates, titer test laboratory reports (FAVN/RNATT), and veterinary health certificates.
              </li>
              <li>
                <strong>Travel Corridor Details:</strong> Country of origin, departure date, destination jurisdiction, transit locations, and carrier/airline specifications.
              </li>
              <li>
                <strong>Account &amp; Contact Details:</strong> Email address, traveler name, and optional WhatsApp telephone number (for Priority Concierge liaison).
              </li>
              <li>
                <strong>Payment Records:</strong> Transactions are securely processed through PCI-DSS Level 1 certified processors (Razorpay). PawValid does not store raw credit card or banking numbers on our servers.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0F172A] mb-3">3. How We Use Your Information</h2>
            <p className="mb-3">We process your data strictly to deliver compliance verification services:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>To cross-reference your uploaded records against statutory entry criteria (e.g., DEFRA, USDA APHIS, EU TRACES, and IATA Live Animals Regulations).</li>
              <li>To generate digital travel dossiers, QR verification tokens, and printable veterinary summary sheets.</li>
              <li>To dispatch automated transactional notifications (trip readiness milestones, tapeworm window alerts, payment receipts, and magic login links) via Brevo.</li>
              <li>To provide customer support and enable our veterinary import specialists to contact you via WhatsApp for booked Concierge audits.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0F172A] mb-3">4. Data Security and Document Vault Protection</h2>
            <p>
              Uploaded documents and certificates are encrypted at rest using industry-standard AES-256 encryption and transmitted via TLS 1.3 encryption. We do not sell, rent, or monetize your personal or pet data to third-party pet food marketers, insurance brokers, or advertisers.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0F172A] mb-3">5. Your Data Rights (GDPR &amp; Global Rights)</h2>
            <p className="mb-3">Regardless of your location, you have the right to:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Access all personal data and pet travel records held in your account.</li>
              <li>Request immediate deletion of your account and uploaded certificates (&quot;Right to be Forgotten&quot;).</li>
              <li>Rectify inaccurate pet records or vaccination dates.</li>
              <li>Opt out of any marketing or newsletter communications at any time.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0F172A] mb-3">6. Independent Service Disclaimer</h2>
            <p className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-500 leading-normal">
              <strong>Notice:</strong> PawValid is an independent commercial compliance preparation platform. We are not a government agency, border control service, or affiliated with the USDA, DEFRA, or European Union. Final health certificate endorsements must be executed by an accredited veterinarian or competent state authority.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#0F172A] mb-3">7. Contact Data Protection Officer</h2>
            <p>
              If you have any questions regarding this policy or wish to exercise your privacy rights, please contact our Data Protection desk:
            </p>
            <p className="mt-2 font-medium text-[#0F172A]">
              Email: <a href="mailto:privacy@pawvalid.online" className="text-emerald-600 underline">privacy@pawvalid.online</a><br />
              General Inquiries: <a href="mailto:support@pawvalid.online" className="text-emerald-600 underline">support@pawvalid.online</a><br />
              Platform: <a href="https://pawvalid.online" className="text-emerald-600 underline">pawvalid.online</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
