import Link from 'next/link';
import type { Metadata } from 'next';
import FaqAccordion from '@/components/FaqAccordion';
import PetCertificateSelector from '@/components/PetCertificateSelector';
import {
  getBreadcrumbSchema,
  getFaqSchema,
  getMedicalWebPageSchema,
  getSoftwareApplicationSchema,
} from '@/lib/seo/schema';
import { getHreflangAlternates } from '@/lib/seo/hreflang';

export const metadata: Metadata = {
  title: 'Pet Travel Certificates Explained: Pet Passport vs AHC vs Export Certificate (2026) | PawValid',
  description:
    'Complete statutory guide to pet travel certificates: learn the critical legal differences between EU Pet Passports, Animal Health Certificates (AHC), and Official Government Export Certificates. Understand who can issue them, validity windows, official vet endorsements, and avoid costly customs rejections.',
  keywords: [
    'pet travel certificate',
    'animal health certificate',
    'pet health certificate',
    'vet certificate for pet travel',
    'export certificate',
    'veterinary health certificate',
    'official veterinarian pet certificate',
    'government endorsement pet travel',
    'USDA APHIS pet health certificate',
    'DEFRA pet health certificate',
    'EU pet passport vs AHC',
    'international pet health certificate validity',
    'pet export certificate rejection reasons',
  ],
  alternates: getHreflangAlternates('/pet-travel-certificate'),
  openGraph: {
    title: 'Pet Travel Certificates Explained: Pet Passport vs AHC vs Export Certificate | PawValid',
    description:
      'The definitive guide to pet travel certificates worldwide. Compare legal frameworks, Official Veterinarian (OV) requirements, USDA/CFIA/APHA endorsements, validity windows, and border rejection prevention.',
    url: 'https://pawvalid.online/en/pet-travel-certificate',
    siteName: 'PawValid',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pet Travel Certificates Explained: 2026 Legal & Veterinary Guide | PawValid',
    description:
      'Learn the exact differences between EU Pet Passports, Animal Health Certificates (AHC), and Government Export Certificates. Endorsement rules, validity timing, and common border rejection traps.',
  },
};

const CERTIFICATE_FAQS = [
  {
    q: 'What is the main difference between a pet passport, an Animal Health Certificate (AHC), and an export certificate?',
    a: 'An EU Pet Passport is a lifelong, reusable document issued exclusively by an authorized veterinarian in the European Union (or Northern Ireland) for continuous travel within the EU. An Animal Health Certificate (AHC) is a single-use document issued by an Official Veterinarian (OV) in Great Britain for pets travelling to the EU post-Brexit, valid for 10 days for entry and 4 months of intra-EU travel. A Government Export Health Certificate (such as USDA APHIS Form 7001 / International Health Certificate or CFIA certificate) is a formal statutory document issued by an accredited veterinarian and countersigned/endorsed by the exporting nation’s agricultural ministry for cross-border transit into non-EU or sovereign biosecurity jurisdictions.',
  },
  {
    q: 'Can any regular private veterinarian sign a pet travel certificate for international travel?',
    a: 'No. Standard private veterinarians without government biosecurity accreditation cannot sign statutory international pet travel certificates. In the United States, the vet must be a USDA-Accredited Veterinarian (Category II accredited). In the United Kingdom, they must be an Official Veterinarian (OV) holding an Official Controls Qualification (Veterinary) - OCQ(V) CA. In Canada, they must be a CFIA-accredited practitioner. In the EU, they must be an officially authorized veterinarian registered with the national veterinary authority.',
  },
  {
    q: 'What is government endorsement, and why is the veterinarian’s signature not enough?',
    a: 'Government endorsement is the legal countersigning, physical wet-stamping, or cryptographic digital seal applied by the sovereign agricultural and biosecurity ministry of the exporting country (e.g., USDA APHIS in the US, CFIA in Canada, DEFRA/APHA in the UK, DAFF in Australia). International customs and border veterinary authorities do not accept private clinical signatures alone because only a sovereign competent authority can legally guarantee under international treaty law that the issuing veterinarian is accredited and that national biosecurity standards were satisfied.',
  },
  {
    q: 'How long is a pet travel certificate valid before I travel?',
    a: 'For most destinations (including the European Union, United Kingdom, and Canada), the veterinary health certificate must be completed and issued strictly within 10 days of departure or arrival at the destination port of entry. However, some destinations require clinical examinations even closer to departure (e.g., within 48 to 72 hours). Once endorsed, an AHC remains valid for 4 months for continuous movement within the EU or until the underlying rabies vaccination expires, whichever comes first.',
  },
  {
    q: 'What is the 21-day rabies vaccination rule for pet travel certificates?',
    a: 'Under international veterinary travel statutes (including EU Regulation 576/2013 and UK biosecurity rules), a primary rabies vaccination is only legally valid for cross-border travel starting 21 days after the date of administration (with the day of vaccination counted as Day 0). Furthermore, the rabies vaccine MUST be administered on or after the date of ISO 11784/11785 microchip implantation. Any vaccine administered prior to microchipping is legally null and void for international certification.',
  },
  {
    q: 'Can I reuse an Animal Health Certificate (AHC) for multiple separate trips from the UK to Europe?',
    a: 'No. An Animal Health Certificate (AHC) is valid for only one single entry into the European Union. Once you enter the EU, the certificate remains valid for up to 4 months of continuous travel within the EU/Schengen zone and for your subsequent return to Great Britain. However, once you return to the UK, that specific AHC is permanently expired. You must obtain a brand new AHC from an Official Veterinarian for each subsequent journey from the UK to the EU.',
  },
  {
    q: 'What are the rules regarding tapeworm (Echinococcus multilocularis) treatments on certificates?',
    a: 'When dogs travel to the United Kingdom, Republic of Ireland, Finland, Norway, or Malta, they must receive a veterinary-administered tapeworm treatment containing Praziquantel (or an equivalent licensed active ingredient) strictly between 24 hours (minimum 1 day) and 120 hours (maximum 5 days) before the scheduled arrival time at the destination port. The administering veterinarian must record the exact date, time, product trade name, and manufacturer in the designated section of the certificate or passport.',
  },
  {
    q: 'What happens at border customs if my pet travel certificate has an error or is missing an endorsement?',
    a: 'Border biosecurity officers have statutory legal authority to take three immediate enforcement actions if documents are non-compliant: (1) refuse entry and issue an immediate return deportation order at the owner’s sole expense; (2) place the animal into mandatory government quarantine at an approved quarantine station until compliant paperwork or testing is completed; or (3) in extreme non-compliance scenarios where rabies or infectious disease risk cannot be safely mitigated, subject the animal to euthanasia. Pre-flight verification with PawValid eliminates these risks.',
  },
  {
    q: 'How much does a pet travel certificate typically cost?',
    a: 'Costs vary depending on document type and jurisdiction. A UK Animal Health Certificate (AHC) typically costs £110 to £250 for the first pet (+ £30 to £50 per additional pet). A US USDA-endorsed international health certificate costs between $250 and $450 USD (veterinary clinical exam $150–$250 + USDA APHIS endorsement fee of $38–$150 + express courier shipping). An EU Pet Passport issued within the EU costs only €25 to €70. Destination-specific certificates involving blood titers and complex testing (like Australia or Japan) can exceed $1,000 to $3,500 USD total.',
  },
  {
    q: 'How can I ensure my pet travel certificate will not be rejected by border officials?',
    a: 'To prevent customs rejection: (1) verify that your pet’s ISO microchip was implanted before or on the day of rabies vaccination; (2) ensure all dates, microchip digits, and owner details match your passport and booking exactly; (3) confirm the certificate is signed by an accredited Official Veterinarian and stamped with official government endorsement; (4) observe the strict 10-day issuance window; (5) ensure no manual white-out or uninitialed edits exist on the form; and (6) run your completed paperwork through PawValid’s automated document scanner before leaving for the airport.',
  },
];

export default function PetTravelCertificatePage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Pet Travel Certificates Explained', url: '/en/pet-travel-certificate' },
  ];

  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);
  const faqSchema = getFaqSchema(CERTIFICATE_FAQS);
  const medicalSchema = getMedicalWebPageSchema({
    name: 'Pet Travel Certificates Explained: Comprehensive Veterinary & Regulatory Guide',
    description:
      'Authoritative guide comparing EU Pet Passports, Animal Health Certificates (AHC), and Government Export Health Certificates across international biosecurity frameworks.',
    url: '/en/pet-travel-certificate',
    authority: 'World Organisation for Animal Health (WOAH) & DEFRA / USDA APHIS',
    authorityUrl: 'https://www.woah.org',
    lastReviewed: '2026-10-04',
    reviewerName: 'Dr. Sarah Miller, DVM',
    reviewerTitle: 'Veterinary Biosecurity Specialist & Cross-Border Compliance Auditor',
  });
  const softwareSchema = getSoftwareApplicationSchema();

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 font-sans">
      {/* ─── JSON-LD STRUCTURED DATA ─────────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      {/* ─── BREADCRUMBS & COMPLIANCE BADGE ──────────────────────────── */}
      <div className="w-full bg-white border-b border-zinc-200/80 py-3 text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between flex-wrap gap-2">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-zinc-600 text-xs">
            <Link href="/" className="hover:text-zinc-900 transition-colors">
              Home
            </Link>
            <span className="text-zinc-300">/</span>
            <span className="font-semibold text-zinc-900">
              Pet Travel Certificates Explained
            </span>
          </nav>
          <div className="inline-flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80 text-[11px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>2026 Statutory Veterinary Documentation Standard</span>
          </div>
        </div>
      </div>

      {/* ─── HERO SECTION ────────────────────────────────────────────── */}
      <section className="bg-white border-b border-zinc-200/80 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200/80 text-xs font-bold uppercase tracking-wider mb-4">
              <span>Cross-Border Biosecurity &amp; Documentation Intelligence</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0E2342] tracking-tight leading-tight mb-4">
              Pet Travel Certificates Explained
            </h1>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed mb-6">
              Travelling across international borders with a dog or cat requires an official <strong>pet travel certificate</strong>—the legally mandated document certifying your animal’s microchip identity, rabies vaccination status, parasite treatments, and clinical fitness to fly. However, widespread confusion surrounds the three distinct legal document types: the <strong>EU Pet Passport</strong>, the post-Brexit <strong>Animal Health Certificate (AHC)</strong>, and sovereign <strong>Government Export Health Certificates</strong> (such as USDA APHIS, DEFRA, CFIA, and DAFF forms). This definitive veterinary explainer unpacks statutory distinctions, signing authority rules, government endorsement protocols, validity clocks, and top border rejection traps.
            </p>

            {/* Reviewer Trust Banner */}
            <div className="flex items-center gap-3 p-3.5 bg-[#F8FAFB] border border-zinc-200/80 rounded-xl text-xs text-zinc-600 mb-8">
              <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 font-bold shrink-0">
                SM
              </div>
              <div className="flex-1 leading-snug">
                <span className="font-bold text-zinc-900">Medically &amp; Statutorily Reviewed</span> by Dr. Sarah Miller, DVM &bull; Veterinary Biosecurity Specialist. Verified against Regulation (EU) No 576/2013, USDA APHIS 9 CFR, UK DEFRA Animal Health Regulations, and WOAH standards.
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              <div className="bg-[#F8FAFB] rounded-xl p-4 border border-zinc-200/80">
                <span className="text-[11px] font-semibold text-zinc-500 block uppercase">
                  Document Classes
                </span>
                <strong className="text-xl font-bold text-zinc-900 mt-1 block">
                  3 Legal Types
                </strong>
                <span className="text-[11px] text-zinc-500 mt-0.5 block">
                  Passport vs AHC vs Export
                </span>
              </div>
              <div className="bg-[#F8FAFB] rounded-xl p-4 border border-zinc-200/80">
                <span className="text-[11px] font-semibold text-zinc-500 block uppercase">
                  Signing Window
                </span>
                <strong className="text-xl font-bold text-zinc-900 mt-1 block">
                  Strict 10 Days
                </strong>
                <span className="text-[11px] text-zinc-500 mt-0.5 block">
                  Prior to border arrival
                </span>
              </div>
              <div className="bg-[#F8FAFB] rounded-xl p-4 border border-zinc-200/80">
                <span className="text-[11px] font-semibold text-zinc-500 block uppercase">
                  Govt Endorsement
                </span>
                <strong className="text-xl font-bold text-zinc-900 mt-1 block">
                  USDA / CFIA / APHA
                </strong>
                <span className="text-[11px] text-zinc-500 mt-0.5 block">
                  Mandatory for non-EU
                </span>
              </div>
              <div className="bg-[#F8FAFB] rounded-xl p-4 border border-zinc-200/80">
                <span className="text-[11px] font-semibold text-zinc-500 block uppercase">
                  Rejection Risk
                </span>
                <strong className="text-xl font-bold text-emerald-700 mt-1 block">
                  0% With Pre-Scan
                </strong>
                <span className="text-[11px] text-zinc-500 mt-0.5 block">
                  Automated OCR verification
                </span>
              </div>
            </div>

            {/* In-Page Quick Navigation */}
            <div className="bg-[#F8FAFB] rounded-xl p-3 sm:p-4 border border-zinc-200/80">
              <span className="text-xs font-bold text-zinc-800 uppercase tracking-wide block mb-2">
                Table of Contents &amp; Quick Jump
              </span>
              <div className="flex flex-wrap gap-2 text-xs">
                <a
                  href="#certificate-matcher"
                  className="bg-white px-3 py-1.5 rounded-lg border border-zinc-200/90 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors font-medium"
                >
                  1. Interactive Certificate Matcher
                </a>
                <a
                  href="#passport-vs-ahc-vs-export"
                  className="bg-white px-3 py-1.5 rounded-lg border border-zinc-200/90 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors font-medium"
                >
                  2. Pet Passport vs. AHC vs. Export Cert
                </a>
                <a
                  href="#who-can-issue-it"
                  className="bg-white px-3 py-1.5 rounded-lg border border-zinc-200/90 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors font-medium"
                >
                  3. Who Can Issue It (OV &amp; Endorsement)
                </a>
                <a
                  href="#validity-windows-timing"
                  className="bg-white px-3 py-1.5 rounded-lg border border-zinc-200/90 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors font-medium"
                >
                  4. Validity Windows &amp; Timing Clocks
                </a>
                <a
                  href="#common-rejection-reasons"
                  className="bg-white px-3 py-1.5 rounded-lg border border-zinc-200/90 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors font-medium"
                >
                  5. Common Rejection Reasons
                </a>
                <a
                  href="#step-by-step-roadmap"
                  className="bg-white px-3 py-1.5 rounded-lg border border-zinc-200/90 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors font-medium"
                >
                  6. Step-by-Step Acquisition Roadmap
                </a>
                <a
                  href="#certificate-faqs"
                  className="bg-white px-3 py-1.5 rounded-lg border border-zinc-200/90 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors font-medium"
                >
                  7. Frequently Asked Questions
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 1: INTERACTIVE MATCHER ──────────────────────────── */}
      <section id="certificate-matcher" className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
              Automated Route Matching
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E2342] tracking-tight mb-3">
              Find Your Required Pet Travel Certificate
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Every international route operates under a distinct bilateral biosecurity treaty. Use this interactive tool to determine your exact document requirements, issuing authority accreditation level, government endorsement requirements, and statutory validity deadlines.
            </p>
          </div>

          <PetCertificateSelector />
        </div>
      </section>

      {/* ─── SECTION 2: PET PASSPORT VS AHC VS EXPORT CERTIFICATE ─────── */}
      <section
        id="passport-vs-ahc-vs-export"
        className="py-12 sm:py-16 bg-white border-y border-zinc-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
              Statutory Classification
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E2342] tracking-tight mb-3">
              Pet Passport vs. Animal Health Certificate vs. Export Certificate
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              The term <strong>pet travel certificate</strong> is frequently used as a blanket catch-all phrase by pet owners and travel agents. In international veterinary law, however, companion animal transit documents fall into three mutually exclusive statutory classes with distinct legal lifespans, issuing protocols, and geographical validity.
            </p>
          </div>

          {/* Master Comparison Table */}
          <div className="overflow-x-auto rounded-2xl border border-zinc-200/90 shadow-2xs mb-12">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#0E2342] text-white">
                  <th className="py-4 px-4 font-bold uppercase tracking-wider text-[11px] border-r border-white/10">
                    Feature &amp; Dimension
                  </th>
                  <th className="py-4 px-4 font-bold uppercase tracking-wider text-[11px] border-r border-white/10">
                    EU Pet Passport
                  </th>
                  <th className="py-4 px-4 font-bold uppercase tracking-wider text-[11px] border-r border-white/10">
                    Animal Health Certificate (AHC)
                  </th>
                  <th className="py-4 px-4 font-bold uppercase tracking-wider text-[11px]">
                    Government Export Certificate
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200/80 bg-white text-zinc-800">
                <tr className="hover:bg-zinc-50/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-zinc-900 bg-zinc-50/50">
                    Legal Definition
                  </td>
                  <td className="py-3.5 px-4 leading-relaxed">
                    Official bound passport booklet establishing lifelong pet identity and vaccination record under EU Regulation 576/2013.
                  </td>
                  <td className="py-3.5 px-4 leading-relaxed">
                    Post-Brexit statutory single-entry veterinary health certificate for non-commercial pets travelling from Great Britain to the EU.
                  </td>
                  <td className="py-3.5 px-4 leading-relaxed">
                    Sovereign export health certificate issued by an accredited vet and officially countersigned by the exporting national government.
                  </td>
                </tr>

                <tr className="hover:bg-zinc-50/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-zinc-900 bg-zinc-50/50">
                    Issuing Authority
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-[#0E2342]">
                    Authorized private veterinarian practicing physically within an EU member state or Northern Ireland.
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-[#0E2342]">
                    UK Official Veterinarian (OV) holding an OCQ(V) CA qualification from APHA.
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-[#0E2342]">
                    USDA-Accredited Veterinarian (US), CFIA-Accredited Vet (Canada), or DAFF-Approved Vet (Australia).
                  </td>
                </tr>

                <tr className="hover:bg-zinc-50/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-zinc-900 bg-zinc-50/50">
                    Government Endorsement Mandate
                  </td>
                  <td className="py-3.5 px-4 text-zinc-600">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-zinc-100 text-zinc-700">
                      Not Required
                    </span>
                    <span className="block text-[11px] text-zinc-500 mt-1">Vet signature is self-authenticating within the EU</span>
                  </td>
                  <td className="py-3.5 px-4 text-zinc-600">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-zinc-100 text-zinc-700">
                      Not Required
                    </span>
                    <span className="block text-[11px] text-zinc-500 mt-1">OV official practice stamp provides statutory authority</span>
                  </td>
                  <td className="py-3.5 px-4 text-zinc-600">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-800 border border-purple-200/80">
                      Mandatory
                    </span>
                    <span className="block text-[11px] text-zinc-500 mt-1">Must be stamped by USDA APHIS, CFIA, DEFRA, or DAFF</span>
                  </td>
                </tr>

                <tr className="hover:bg-zinc-50/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-zinc-900 bg-zinc-50/50">
                    Reusability
                  </td>
                  <td className="py-3.5 px-4 font-bold text-emerald-700">
                    Multi-Use (Lifelong)
                  </td>
                  <td className="py-3.5 px-4 font-bold text-zinc-900">
                    Single-Entry into EU
                  </td>
                  <td className="py-3.5 px-4 font-bold text-zinc-900">
                    Single-Trip Specific
                  </td>
                </tr>

                <tr className="hover:bg-zinc-50/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-zinc-900 bg-zinc-50/50">
                    Validity Duration
                  </td>
                  <td className="py-3.5 px-4 leading-relaxed">
                    Lifelong validity, conditioned strictly on continuous rabies boosters administered prior to vaccine expiration.
                  </td>
                  <td className="py-3.5 px-4 leading-relaxed">
                    10 days from signing to enter EU; 4 months of continuous intra-EU travel and UK re-entry.
                  </td>
                  <td className="py-3.5 px-4 leading-relaxed">
                    Typically 10 to 30 days from signing/endorsement date, depending on destination biosecurity rules.
                  </td>
                </tr>

                <tr className="hover:bg-zinc-50/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-zinc-900 bg-zinc-50/50">
                    Geographic Scope
                  </td>
                  <td className="py-3.5 px-4 leading-relaxed">
                    All 27 EU member states, Schengen zone countries (Switzerland, Norway, Iceland), and UK entry.
                  </td>
                  <td className="py-3.5 px-4 leading-relaxed">
                    Entry from Great Britain into any EU member state or Northern Ireland + return to GB.
                  </td>
                  <td className="py-3.5 px-4 leading-relaxed">
                    Bilateral route-specific (e.g. USA to EU, Canada to Japan, US to Australia, UK to UAE).
                  </td>
                </tr>

                <tr className="hover:bg-zinc-50/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-zinc-900 bg-zinc-50/50">
                    Typical Cost Range
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-zinc-900">
                    €25 – €70 (one-off passport booklet fee)
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-zinc-900">
                    £110 – £250 per pet (per trip)
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-zinc-900">
                    $200 – $500+ USD (exam + govt fee + courier)
                  </td>
                </tr>

                <tr className="hover:bg-zinc-50/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-zinc-900 bg-zinc-50/50">
                    Primary Traps &amp; Pitfalls
                  </td>
                  <td className="py-3.5 px-4 text-zinc-600 leading-snug">
                    Cannot be updated or stamped by UK/US vets post-Brexit. Rabies booster lapse invalidates passport.
                  </td>
                  <td className="py-3.5 px-4 text-zinc-600 leading-snug">
                    Expired 10-day window; wrong translation language for first EU entry port; uninitialed corrections.
                  </td>
                  <td className="py-3.5 px-4 text-zinc-600 leading-snug">
                    Courier delays missing the flight date; un-endorsed forms; incomplete destination parasite panels.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Deep-Dive Subsections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Card 1: EU Pet Passport */}
            <div className="bg-[#F8FAFB] rounded-2xl p-6 border border-zinc-200/80 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 text-[11px] font-semibold border border-blue-200/80 mb-4">
                  <span>EU Regulation 576/2013</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#0E2342] mb-2">
                  1. The EU Pet Passport
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed mb-4">
                  Governed under <strong>Regulation (EU) No 576/2013</strong>, the European Union Pet Passport is the statutory document of companion animal mobility across the 27 EU member states and Schengen territory.
                </p>
                <div className="space-y-2.5 text-xs text-zinc-700">
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold shrink-0 mt-0.5">•</span>
                    <span><strong>Post-Brexit Status:</strong> Passports issued in Great Britain (GB) prior to Jan 1, 2021, are permanently invalid for entering the EU. Passports issued in an EU member state or Northern Ireland remain fully valid.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold shrink-0 mt-0.5">•</span>
                    <span><strong>Vaccination Continuity:</strong> A rabies vaccine booster must be administered in the EU before the previous vaccine’s expiry date to maintain lifelong validity without re-certification.</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-200/80 text-[11px] text-zinc-500">
                Applicable to: EU residents, dual citizens, and long-stay expatriates residing in Schengen territories.
              </div>
            </div>

            {/* Card 2: Animal Health Certificate */}
            <div className="bg-[#F8FAFB] rounded-2xl p-6 border border-zinc-200/80 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[11px] font-semibold border border-amber-200/80 mb-4">
                  <span>Part 2 Listed Third Country</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#0E2342] mb-2">
                  2. Animal Health Certificate (AHC)
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed mb-4">
                  Created following Brexit when the UK became a Part 2 Listed Third Country under EU biosecurity regulations. An <strong>animal health certificate</strong> replaces the old UK pet passport for private pets travelling from Great Britain into the EU.
                </p>
                <div className="space-y-2.5 text-xs text-zinc-700">
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold shrink-0 mt-0.5">•</span>
                    <span><strong>Dual-Language Mandate:</strong> The AHC must be issued in English AND the official language of the first EU country where your pet clears customs (e.g., French for Eurotunnel Calais).</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold shrink-0 mt-0.5">•</span>
                    <span><strong>Capacity:</strong> Up to 5 personal companion animals belonging to the same owner can be recorded on a single AHC document.</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-200/80 text-[11px] text-zinc-500">
                Applicable to: UK residents travelling to France, Spain, Ireland, Italy, and other EU/Schengen nations.
              </div>
            </div>

            {/* Card 3: Government Export Health Certificate */}
            <div className="bg-[#F8FAFB] rounded-2xl p-6 border border-zinc-200/80 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-semibold border border-emerald-200/80 mb-4">
                  <span>Bilateral Statutory Treaties</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#0E2342] mb-2">
                  3. Government Export Certificate
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed mb-4">
                  An <strong>export certificate</strong> (officially termed an International Veterinary Health Certificate) is a bilateral legal document negotiated between national agricultural ministries, requiring sovereign government countersignature.
                </p>
                <div className="space-y-2.5 text-xs text-zinc-700">
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold shrink-0 mt-0.5">•</span>
                    <span><strong>USDA APHIS VEHCS:</strong> The US Veterinary Export Health Certification System enables electronic submission and cryptographic digital endorsement for approved destination corridors.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold shrink-0 mt-0.5">•</span>
                    <span><strong>Strict Destination Specifics:</strong> Australia (DAFF), Japan (MAFF), and Singapore (AVS) enforce custom multi-page statutory annexes covering titers and parasite treatments.</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-200/80 text-[11px] text-zinc-500">
                Applicable to: US, Canadian, and global travellers flying between non-EU sovereign nations.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: WHO CAN ISSUE IT ─────────────────────────────── */}
      <section id="who-can-issue-it" className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
              Statutory Authority &amp; Jurisdictions
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E2342] tracking-tight mb-3">
              Who Can Issue It
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Not all veterinary professionals possess the statutory legal authority to issue an international <strong>vet certificate for pet travel</strong>. Under international biosecurity conventions, cross-border health documents require a two-tiered hierarchy of certification: the primary clinical examination by an accredited <strong>Official Veterinarian</strong>, followed by sovereign <strong>Government Endorsement</strong> from the exporting state’s agricultural ministry.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* H3: Official Vet */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-zinc-200/80 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 text-[11px] font-semibold border border-blue-200/80 mb-3">
                  <span>Tier 1: Clinical Certification</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0E2342] mb-3">
                  Official vet
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-4">
                  An <strong>Official Veterinarian (OV)</strong> or Accredited Veterinarian is a licensed veterinary surgeon who has completed specialized government training and holds formal statutory credentials granted by national agricultural and biosecurity departments.
                </p>

                <div className="space-y-3 text-xs text-zinc-700">
                  <div className="bg-[#F8FAFB] p-3.5 rounded-xl border border-zinc-200/80">
                    <strong className="text-zinc-900 block font-bold mb-1">
                      United Kingdom — Official Veterinarians (OVs)
                    </strong>
                    <p className="text-zinc-600 leading-relaxed">
                      In England, Scotland, and Wales, only veterinary surgeons who hold the <strong>Official Controls Qualification (Veterinary) Companion Animals — OCQ(V) CA</strong> awarded by the Animal and Plant Health Agency (APHA) can issue and stamp an Animal Health Certificate (AHC) or GB Export Certificate. Regular practice vets cannot issue AHCs.
                    </p>
                  </div>

                  <div className="bg-[#F8FAFB] p-3.5 rounded-xl border border-zinc-200/80">
                    <strong className="text-zinc-900 block font-bold mb-1">
                      United States — USDA-Accredited Veterinarians (Category II)
                    </strong>
                    <p className="text-zinc-600 leading-relaxed">
                      In the USA, issuing an international <strong>pet health certificate</strong> requires <strong>Category II National Accreditation</strong> through the USDA Animal and Plant Health Inspection Service (APHIS). Category II accreditation certifies that the vet has completed federal training on foreign animal diseases and export protocols.
                    </p>
                  </div>

                  <div className="bg-[#F8FAFB] p-3.5 rounded-xl border border-zinc-200/80">
                    <strong className="text-zinc-900 block font-bold mb-1">
                      Canada — CFIA-Authorized Veterinarians
                    </strong>
                    <p className="text-zinc-600 leading-relaxed">
                      Canadian private practitioners must be officially authorized by the Canadian Food Inspection Agency (CFIA) to prepare and certify companion animal export documentation before submitting the file to a CFIA district veterinarian for endorsement.
                    </p>
                  </div>
                </div>

                <div className="mt-5 p-3.5 bg-blue-50/70 border border-blue-200/80 rounded-xl text-xs text-blue-950">
                  <strong className="font-bold block text-blue-900 mb-1">Official Vet Statutory Duties During Examination:</strong>
                  <ul className="list-disc list-inside space-y-1 text-blue-900/90 leading-relaxed">
                    <li>Physically scan the ISO 11784/11785 microchip and verify the 15-digit number against medical history.</li>
                    <li>Audit the rabies vaccination certificate to confirm inoculation occurred on or after the microchipping date.</li>
                    <li>Conduct a physical clinical exam to certify the animal displays no clinical signs of infectious disease.</li>
                    <li>Administer and witness mandatory parasite treatments (e.g. Praziquantel tapeworm dosing) within statutory timing.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* H3: Government Endorsement */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-zinc-200/80 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-800 text-[11px] font-semibold border border-purple-200/80 mb-3">
                  <span>Tier 2: Sovereign Legal Validation</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0E2342] mb-3">
                  Government endorsement
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-4">
                  <strong>Government endorsement</strong> is the formal legal validation performed by the sovereign competent authority of the exporting nation. It provides treaty-level verification that the issuing veterinarian holds active accreditation and that all biosecurity protocols adhere to the destination nation’s statutory import rules.
                </p>

                <div className="space-y-3 text-xs text-zinc-700">
                  <div className="bg-[#F8FAFB] p-3.5 rounded-xl border border-zinc-200/80">
                    <strong className="text-zinc-900 block font-bold mb-1">
                      USDA APHIS Veterinary Services (United States)
                    </strong>
                    <p className="text-zinc-600 leading-relaxed">
                      Health certificates prepared by USDA-accredited vets must be submitted to the local USDA APHIS Service Center. Submissions occur primarily through <strong>VEHCS (Veterinary Export Health Certification System)</strong>. The USDA Veterinary Medical Officer reviews paperwork and applies a digital signature or physical raised seal.
                    </p>
                  </div>

                  <div className="bg-[#F8FAFB] p-3.5 rounded-xl border border-zinc-200/80">
                    <strong className="text-zinc-900 block font-bold mb-1">
                      CFIA District Veterinary Offices (Canada)
                    </strong>
                    <p className="text-zinc-600 leading-relaxed">
                      Canadian export certificates must be physically taken to or couriered to a Canadian Food Inspection Agency (CFIA) District Office. A CFIA Official Veterinarian reviews rabies records, verifies clinical timelines, and affixes the official CFIA ink stamp and wet signature.
                    </p>
                  </div>

                  <div className="bg-[#F8FAFB] p-3.5 rounded-xl border border-zinc-200/80">
                    <strong className="text-zinc-900 block font-bold mb-1">
                      DAFF Australia &amp; MAFF Japan Endorsement Networks
                    </strong>
                    <p className="text-zinc-600 leading-relaxed">
                      High-biosecurity rabies-free island states mandate that exporting national authorities (USDA, CFIA, DEFRA) countersign complex multi-page statutory annexes confirming rabies titer laboratory test results and serial veterinary treatments.
                    </p>
                  </div>
                </div>

                <div className="mt-5 p-3.5 bg-purple-50/70 border border-purple-200/80 rounded-xl text-xs text-purple-950">
                  <strong className="font-bold block text-purple-900 mb-1">Physical Wet Seal vs. Digital VEHCS Signatures:</strong>
                  <p className="leading-relaxed">
                    While many modern biosecurity agencies (including EU member states and Great Britain) accept digital USDA VEHCS electronic signatures with embedded verification QR codes, certain destination jurisdictions still require an original physical certificate with an embossed raised seal and live blue-ink veterinary signatures.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Endorsement Summary Banner */}
          <div className="bg-[#F8FAFB] rounded-2xl p-6 sm:p-8 border border-zinc-200/90 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-left">
              <span className="text-emerald-700 font-bold text-xs uppercase tracking-wider block">
                Statutory Summary
              </span>
              <h4 className="font-serif text-xl font-bold text-[#0E2342]">
                Does Your Pet Travel Certificate Require Government Endorsement?
              </h4>
              <p className="text-xs sm:text-sm text-zinc-600 max-w-2xl leading-relaxed">
                If your pet is travelling on an <strong>EU Pet Passport</strong> within the EU or an <strong>Animal Health Certificate (AHC)</strong> from the UK to the EU, government endorsement is not required because the OV’s official stamp is legally recognized. If you are travelling from the <strong>United States, Canada, Australia, or Asia</strong>, government endorsement by USDA APHIS, CFIA, or DAFF is <strong>mandatory</strong>.
              </p>
            </div>
            <Link
              href="/en/checker"
              className="shrink-0 btn-primary text-xs px-6 py-3 text-center w-full lg:w-auto"
            >
              Check My Route Rules →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: VALIDITY WINDOWS AND TIMING ──────────────────── */}
      <section
        id="validity-windows-timing"
        className="py-12 sm:py-16 bg-white border-y border-zinc-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
              Statutory Countdown Clocks
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E2342] tracking-tight mb-3">
              Validity Windows and Timing
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Timing is the single most unforgiving aspect of cross-border pet relocation. A <strong>pet travel certificate</strong> is governed by multiple overlapping statutory validity windows. If a single clinical window expires before your pet passes border biosecurity customs, the entire certificate becomes invalid.
            </p>
          </div>

          {/* 4 Critical Timing Windows Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <div className="bg-[#F8FAFB] rounded-2xl p-5 border border-zinc-200/80">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
                Window 1: Entry Window
              </span>
              <strong className="text-2xl font-bold text-[#0E2342] block mb-2">
                10 Days
              </strong>
              <p className="text-xs text-zinc-600 leading-relaxed">
                The veterinary clinical examination, certificate signing by the Official Veterinarian, and government endorsement must occur strictly within <strong>10 days prior to arrival</strong> at the destination port of entry.
              </p>
            </div>

            <div className="bg-[#F8FAFB] rounded-2xl p-5 border border-zinc-200/80">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 block mb-1">
                Window 2: Intra-EU Transit
              </span>
              <strong className="text-2xl font-bold text-[#0E2342] block mb-2">
                4 Months
              </strong>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Once validated at an EU Border Inspection Post (BIP), an Animal Health Certificate (AHC) or USDA EU Certificate remains valid for <strong>up to 4 months of continuous travel</strong> across all 27 EU member states and for return to the UK.
              </p>
            </div>

            <div className="bg-[#F8FAFB] rounded-2xl p-5 border border-zinc-200/80">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block mb-1">
                Window 3: Tapeworm Treatment
              </span>
              <strong className="text-2xl font-bold text-[#0E2342] block mb-2">
                24 – 120 Hours
              </strong>
              <p className="text-xs text-zinc-600 leading-relaxed">
                For dogs entering the UK, Ireland, Finland, Norway, or Malta: an approved tapeworm treatment (Praziquantel) must be administered by a vet strictly between <strong>1 day (24 hours) and 5 days (120 hours)</strong> before arrival.
              </p>
            </div>

            <div className="bg-[#F8FAFB] rounded-2xl p-5 border border-zinc-200/80">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-700 block mb-1">
                Window 4: Rabies Latency
              </span>
              <strong className="text-2xl font-bold text-[#0E2342] block mb-2">
                21 Days Post-Vaccine
              </strong>
              <p className="text-xs text-zinc-600 leading-relaxed">
                A primary rabies vaccination requires a mandatory <strong>21-day incubation latency waiting period</strong> before travel is legally permitted. Booster vaccines given before prior vaccine expiration are exempt.
              </p>
            </div>
          </div>

          {/* Chronological Timeline */}
          <div className="bg-[#F8FAFB] rounded-2xl p-6 sm:p-8 border border-zinc-200/80 mb-10">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#0E2342] mb-6">
              Chronological Pet Travel Certificate Preparation Timeline
            </h3>

            <div className="relative border-l-2 border-emerald-500/40 ml-4 sm:ml-6 space-y-8 pl-6 sm:pl-8">
              {/* Timeline Item 1 */}
              <div className="relative">
                <div className="absolute -left-[31px] sm:-left-[39px] top-0 w-5 h-5 rounded-full bg-[#0E2342] border-4 border-white shadow-2xs"></div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                  <strong className="text-sm font-bold text-zinc-900">
                    Day -180 to Day -60: Microchip &amp; Rabies Titer Blood Testing (If Applicable)
                  </strong>
                  <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/80 self-start">
                    Strict Biosecurity Corridors
                  </span>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  For strict island nations (Australia, Japan, Singapore, New Zealand) or non-listed rabies endemic regions: ensure the ISO 11784/11785 15-digit microchip is implanted first, administer qualifying rabies vaccination, and draw blood for a FAVN rabies titer test. Australia and Japan mandate a full 180-day waiting period from the blood draw date before departure.
                </p>
              </div>

              {/* Timeline Item 2 */}
              <div className="relative">
                <div className="absolute -left-[31px] sm:-left-[39px] top-0 w-5 h-5 rounded-full bg-[#0E2342] border-4 border-white shadow-2xs"></div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                  <strong className="text-sm font-bold text-zinc-900">
                    Day -30 to Day -21: Rabies Vaccination Latency &amp; Vet Appointment Booking
                  </strong>
                  <span className="text-[11px] font-semibold text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200/80 self-start">
                    All International Routes
                  </span>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Administer primary rabies vaccination if not previously vaccinated or if booster lapsed. Observe the mandatory 21-day latency period. Book an appointment with a certified Official Veterinarian (OV) or USDA-accredited vet scheduled strictly within the 10-day pre-travel window.
                </p>
              </div>

              {/* Timeline Item 3 */}
              <div className="relative">
                <div className="absolute -left-[31px] sm:-left-[39px] top-0 w-5 h-5 rounded-full bg-[#0E2342] border-4 border-white shadow-2xs"></div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                  <strong className="text-sm font-bold text-zinc-900">
                    Day -10 to Day -5: Official Veterinary Clinical Exam &amp; Government Endorsement
                  </strong>
                  <span className="text-[11px] font-semibold text-purple-800 bg-purple-50 px-2 py-0.5 rounded border border-purple-200/80 self-start">
                    Critical 10-Day Window Opens
                  </span>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  The Official Veterinarian scans the microchip, completes physical health exam, verifies vaccination records, and issues the official pet health certificate. For US/Canadian departures, submit documents to USDA APHIS VEHCS or CFIA for sovereign government endorsement stamp and signature.
                </p>
              </div>

              {/* Timeline Item 4 */}
              <div className="relative">
                <div className="absolute -left-[31px] sm:-left-[39px] top-0 w-5 h-5 rounded-full bg-[#0E2342] border-4 border-white shadow-2xs"></div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                  <strong className="text-sm font-bold text-zinc-900">
                    Day -5 to Day -1 (24h–120h): Mandatory Tapeworm (Echinococcus) Administration
                  </strong>
                  <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/80 self-start">
                    UK, Ireland, Finland, Norway, Malta
                  </span>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Veterinarian administers licensed Praziquantel tapeworm treatment strictly between 24 and 120 hours before scheduled arrival in the UK/Ireland. Vet stamps certificate with exact time, date, product trade name, and manufacturer.
                </p>
              </div>

              {/* Timeline Item 5 */}
              <div className="relative">
                <div className="absolute -left-[31px] sm:-left-[39px] top-0 w-5 h-5 rounded-full bg-[#0E2342] border-4 border-white shadow-2xs"></div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                  <strong className="text-sm font-bold text-zinc-900">
                    Day 0: Departure, Airport Check-In &amp; Border Inspection Post (BIP) Customs Clearance
                  </strong>
                  <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/80 self-start">
                    Port of Entry
                  </span>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Present physical endorsed certificate and microchipped animal at airline check-in and destination customs biosecurity inspection post. Biosecurity officer scans microchip, audits date stamps, and clears pet for immediate release into the country.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: COMMON REJECTION REASONS ─────────────────────── */}
      <section id="common-rejection-reasons" className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-red-700 block mb-1">
              Biosecurity Compliance Pitfalls
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E2342] tracking-tight mb-3">
              Common Rejection Reasons
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              International customs and border veterinary inspection posts operate under zero-tolerance statutory frameworks. Biosecurity officers do not have the legal discretion to waive paperwork discrepancies. Below are the 8 most frequent reasons a <strong>pet travel certificate</strong> is rejected at the port of entry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Reason 1 */}
            <div className="bg-white rounded-2xl p-6 border border-zinc-200/80 shadow-2xs">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-red-50 text-red-700 font-bold text-xs flex items-center justify-center border border-red-200/80 shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 mb-1">
                    Chronological Microchip Inversion
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed mb-2">
                    Under international biosecurity law (EU 576/2013, DEFRA, USDA), the ISO 11784/11785 microchip MUST be implanted before or on the exact same date as the rabies vaccination. If veterinary records show a rabies shot given even one day prior to microchipping, border authorities legally treat the animal as unvaccinated.
                  </p>
                  <span className="text-[11px] font-semibold text-red-700 block">
                    Consequence: Mandatory quarantine hold or immediate return deportation.
                  </span>
                </div>
              </div>
            </div>

            {/* Reason 2 */}
            <div className="bg-white rounded-2xl p-6 border border-zinc-200/80 shadow-2xs">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-red-50 text-red-700 font-bold text-xs flex items-center justify-center border border-red-200/80 shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 mb-1">
                    Missing Government Endorsement Stamp
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed mb-2">
                    Travelers departing the United States or Canada often assume that their private USDA-accredited vet’s signature is sufficient. Arriving at an overseas airport with a certificate lacking the official USDA APHIS VEHCS digital seal or CFIA District Office ink stamp results in immediate refusal of entry.
                  </p>
                  <span className="text-[11px] font-semibold text-red-700 block">
                    Consequence: Refusal of airline boarding or port quarantine detention.
                  </span>
                </div>
              </div>
            </div>

            {/* Reason 3 */}
            <div className="bg-white rounded-2xl p-6 border border-zinc-200/80 shadow-2xs">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-red-50 text-red-700 font-bold text-xs flex items-center justify-center border border-red-200/80 shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 mb-1">
                    Tapeworm (Echinococcus) Timing Violations
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed mb-2">
                    For dogs entering Great Britain, Ireland, Finland, Norway, or Malta: the tapeworm dose must be administered strictly within 24 to 120 hours of arrival. If administered at 22 hours (too early) or 124 hours (too late), or if the medication does not contain Praziquantel, entry is strictly denied.
                  </p>
                  <span className="text-[11px] font-semibold text-red-700 block">
                    Consequence: Retreatment hold at port or airline check-in denial.
                  </span>
                </div>
              </div>
            </div>

            {/* Reason 4 */}
            <div className="bg-white rounded-2xl p-6 border border-zinc-200/80 shadow-2xs">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-red-50 text-red-700 font-bold text-xs flex items-center justify-center border border-red-200/80 shrink-0">
                  4
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 mb-1">
                    Expired 10-Day Pre-Travel Window
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed mb-2">
                    The veterinary clinical exam and certificate issuance must occur strictly within 10 days of entering the destination country. Flight cancellations, flight delays, or extended layovers that push arrival onto Day 11 immediately nullify the legal validity of the health certificate.
                  </p>
                  <span className="text-[11px] font-semibold text-red-700 block">
                    Consequence: Emergency re-examination hold or entry denial.
                  </span>
                </div>
              </div>
            </div>

            {/* Reason 5 */}
            <div className="bg-white rounded-2xl p-6 border border-zinc-200/80 shadow-2xs">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-red-50 text-red-700 font-bold text-xs flex items-center justify-center border border-red-200/80 shrink-0">
                  5
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 mb-1">
                    Manual Alterations &amp; Correction Fluid
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed mb-2">
                    Official veterinary biosecurity documents strictly prohibit the use of correction fluid (Tipp-Ex/white-out) or un-initialed handwritten alterations. Any manual correction must be struck through with a single line, annotated with the correct information, and stamped/initialed by the Official Veterinarian.
                  </p>
                  <span className="text-[11px] font-semibold text-red-700 block">
                    Consequence: Deemed document tampering; certificate declared void.
                  </span>
                </div>
              </div>
            </div>

            {/* Reason 6 */}
            <div className="bg-white rounded-2xl p-6 border border-zinc-200/80 shadow-2xs">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-red-50 text-red-700 font-bold text-xs flex items-center justify-center border border-red-200/80 shrink-0">
                  6
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 mb-1">
                    Incorrect Dual-Language Template
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed mb-2">
                    When entering the European Union, the Animal Health Certificate or EU health certificate must be completed in English AND the official national language of the First Port of Entry into the EU (e.g. French for Eurotunnel Calais or Charles de Gaulle, German for Frankfurt).
                  </p>
                  <span className="text-[11px] font-semibold text-red-700 block">
                    Consequence: Refusal of customs clearance at border inspection post.
                  </span>
                </div>
              </div>
            </div>

            {/* Reason 7 */}
            <div className="bg-white rounded-2xl p-6 border border-zinc-200/80 shadow-2xs">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-red-50 text-red-700 font-bold text-xs flex items-center justify-center border border-red-200/80 shrink-0">
                  7
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 mb-1">
                    Non-ISO 11784/11785 Microchip Discrepancy
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed mb-2">
                    International customs scanners operate on 134.2 kHz ISO standard frequencies. If the pet is implanted with a non-ISO chip (such as an older 10-digit 125 kHz chip) and the owner fails to carry their own compatible microchip scanner, border officials cannot verify identity.
                  </p>
                  <span className="text-[11px] font-semibold text-red-700 block">
                    Consequence: Unverified identity hold at airport quarantine.
                  </span>
                </div>
              </div>
            </div>

            {/* Reason 8 */}
            <div className="bg-white rounded-2xl p-6 border border-zinc-200/80 shadow-2xs">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-red-50 text-red-700 font-bold text-xs flex items-center justify-center border border-red-200/80 shrink-0">
                  8
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 mb-1">
                    Owner Name &amp; Microchip Digit Mismatches
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed mb-2">
                    A single transposed digit in the 15-digit microchip code between the veterinary certificate and the microchip scan, or an owner name on the certificate that does not match the travelling passenger’s passport, triggers statutory suspicion of commercial animal smuggling.
                  </p>
                  <span className="text-[11px] font-semibold text-red-700 block">
                    Consequence: Immediate commercial customs detention.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Border Rejection Penalty Breakdown */}
          <div className="bg-[#F8FAFB] border border-zinc-200/80 rounded-2xl p-6 sm:p-8 text-xs text-zinc-700">
            <h4 className="font-serif text-base font-bold text-[#0E2342] mb-2">
              Sovereign Border Biosecurity Penalties for Non-Compliant Documents
            </h4>
            <p className="leading-relaxed mb-4 text-zinc-600">
              When a pet arrives at an international border inspection post with defective paperwork, customs officers have statutory jurisdiction to execute three enforcement penalties under national biosecurity laws:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-white p-3.5 rounded-xl border border-zinc-200/80 shadow-2xs">
                <strong className="text-zinc-900 block font-bold mb-1">1. Immediate Deportation</strong>
                <p className="text-zinc-500 text-[11px]">The pet is returned to origin country on next outbound flight at owner’s sole expense.</p>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-zinc-200/80 shadow-2xs">
                <strong className="text-zinc-900 block font-bold mb-1">2. Mandatory Quarantine</strong>
                <p className="text-zinc-500 text-[11px]">Animal placed into quarantine facility at £150–£300 per day until legal compliance is achieved.</p>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-zinc-200/80 shadow-2xs">
                <strong className="text-zinc-900 block font-bold mb-1">3. Biosecurity Seizure</strong>
                <p className="text-zinc-500 text-[11px]">In extreme non-compliance cases where disease risk cannot be safely mitigated, humane euthanasia is authorized.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: STEP-BY-STEP ROADMAP ─────────────────────────── */}
      <section
        id="step-by-step-roadmap"
        className="py-12 sm:py-16 bg-white border-y border-zinc-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
              Action Plan
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E2342] tracking-tight mb-3">
              How to Obtain Your Pet Travel Certificate (6-Step Roadmap)
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Follow this step-by-step statutory roadmap to secure an error-free <strong>pet travel certificate</strong>, complete official endorsements on time, and breeze through airport biosecurity clearance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="bg-[#F8FAFB] rounded-2xl p-6 border border-zinc-200/80 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                  Step 1 &bull; 60–90 Days Before
                </span>
                <h3 className="font-serif text-base font-bold text-[#0E2342] mb-2">
                  Verify Microchip &amp; Rabies Order
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Confirm your pet has a 15-digit ISO 11784/11785 microchip. Audit medical history to verify that rabies vaccination was given after or on the same day as chip implantation. If not, administer a new rabies shot and observe the 21-day latency wait.
                </p>
              </div>
            </div>

            <div className="bg-[#F8FAFB] rounded-2xl p-6 border border-zinc-200/80 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                  Step 2 &bull; 30–60 Days Before
                </span>
                <h3 className="font-serif text-base font-bold text-[#0E2342] mb-2">
                  Determine Exact Destination Form
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Identify whether you need an Animal Health Certificate (UK to EU), USDA APHIS Form (US to EU/UK), or bespoke bilateral export certificate (Australia/Japan). Check whether blood titer testing or import permits apply.
                </p>
              </div>
            </div>

            <div className="bg-[#F8FAFB] rounded-2xl p-6 border border-zinc-200/80 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                  Step 3 &bull; 30 Days Before
                </span>
                <h3 className="font-serif text-base font-bold text-[#0E2342] mb-2">
                  Book an Official Veterinarian (OV)
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Book an appointment with an Official Veterinarian (in the UK) or USDA-Accredited Category II Vet (in the US). Schedule the exam strictly within the 10-day pre-travel window before departure.
                </p>
              </div>
            </div>

            <div className="bg-[#F8FAFB] rounded-2xl p-6 border border-zinc-200/80 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                  Step 4 &bull; Days -10 to -5
                </span>
                <h3 className="font-serif text-base font-bold text-[#0E2342] mb-2">
                  Attend Clinical Exam &amp; Sign Certificate
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  The vet verifies microchip readability, conducts physical health check, confirms vaccine dates, and completes the official health certificate in required dual-language format.
                </p>
              </div>
            </div>

            <div className="bg-[#F8FAFB] rounded-2xl p-6 border border-zinc-200/80 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                  Step 5 &bull; Days -5 to -2
                </span>
                <h3 className="font-serif text-base font-bold text-[#0E2342] mb-2">
                  Obtain Government Endorsement
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  If departing the US or Canada, submit the certificate via USDA VEHCS or to a CFIA district office for official sovereign endorsement stamp and digital signature.
                </p>
              </div>
            </div>

            <div className="bg-[#F8FAFB] rounded-2xl p-6 border border-zinc-200/80 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                  Step 6 &bull; Pre-Flight
                </span>
                <h3 className="font-serif text-base font-bold text-[#0E2342] mb-2">
                  Automated OCR Scan with PawValid
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Upload your completed certificate to PawValid’s automated document scanner to verify microchip matching, date sequencing, tapeworm administration, and official endorsement validity before heading to the airport.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 7: FAQS ─────────────────────────────────────────── */}
      <section id="certificate-faqs" className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
              Regulatory Answers
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E2342] tracking-tight mb-3">
              Frequently Asked Questions About Pet Travel Certificates
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Statutory guidance addressing the most frequent questions regarding <strong>pet travel certificates</strong>, <strong>animal health certificates</strong>, issuing veterinarians, government endorsements, and customs clearance protocols.
            </p>
          </div>

          <div className="max-w-4xl">
            <FaqAccordion items={CERTIFICATE_FAQS} columns={2} defaultOpenIndex={0} />
          </div>
        </div>
      </section>

      {/* ─── SECTION 8: RELATED GUIDES & CROSS-CLUSTER LINKS ─────────── */}
      <section className="py-12 sm:py-16 bg-white border-t border-zinc-200/80 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
              Knowledge Base
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0E2342]">
              Related Pet Relocation &amp; Regulatory Hubs
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 mt-1">
              Explore our country-specific import guidelines, statutory comparison matrices, and flight corridor compliance checkers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/en/pet-immigration-requirements-by-country"
              className="p-5 rounded-2xl border border-zinc-200/80 bg-[#F8FAFB] hover:bg-white hover:border-emerald-600/70 transition-all group"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">Comparison Matrix</span>
              <strong className="text-sm font-bold text-[#0E2342] group-hover:text-emerald-700 transition-colors block mb-1">
                Pet Immigration Matrix
              </strong>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Compare permits, quarantine days, titer tests, and entry rules across 15+ sovereign countries.
              </p>
            </Link>

            <Link
              href="/en/pet-import-guide"
              className="p-5 rounded-2xl border border-zinc-200/80 bg-[#F8FAFB] hover:bg-white hover:border-emerald-600/70 transition-all group"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">Master Guide</span>
              <strong className="text-sm font-bold text-[#0E2342] group-hover:text-emerald-700 transition-colors block mb-1">
                Pet Import Guide
              </strong>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Master the step-by-step process of importing a dog or cat into any country worldwide.
              </p>
            </Link>

            <Link
              href="/en/guides/rabies-titer-test-favn-guide"
              className="p-5 rounded-2xl border border-zinc-200/80 bg-[#F8FAFB] hover:bg-white hover:border-emerald-600/70 transition-all group"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">Testing Guide</span>
              <strong className="text-sm font-bold text-[#0E2342] group-hover:text-emerald-700 transition-colors block mb-1">
                Rabies Titer (FAVN) Guide
              </strong>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Complete guide to blood titer draws, 0.50 IU/mL thresholds, accredited labs, and 180-day wait clocks.
              </p>
            </Link>

            <Link
              href="/en/countries"
              className="p-5 rounded-2xl border border-zinc-200/80 bg-[#F8FAFB] hover:bg-white hover:border-emerald-600/70 transition-all group"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">Directory</span>
              <strong className="text-sm font-bold text-[#0E2342] group-hover:text-emerald-700 transition-colors block mb-1">
                Country Directory (15 Hubs)
              </strong>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Detailed regulatory guides for the UK, France, Germany, Spain, Italy, Australia, Canada, and USA.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── DOCUMENT READINESS CHECK CTA (PAWVALID STYLE) ──────────── */}
      <section className="py-14 sm:py-16 bg-white border-t border-zinc-200/80 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F8FAFB] rounded-2xl border border-zinc-200/90 p-7 sm:p-10 lg:p-12 shadow-2xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Authentic Problem-Solving Copy */}
              <div className="lg:col-span-7 space-y-4 text-left">
                <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Pre-Departure Document Check</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0E2342] leading-tight">
                  Verify your pet travel certificate before departure
                </h2>

                <p className="text-sm sm:text-base text-zinc-600 leading-relaxed max-w-xl">
                  A single misplaced date, missing government endorsement stamp, or incorrect vaccination sequence can lead to denied boarding or unexpected airport quarantine. Check your paperwork against official statutory rules before heading to the airport.
                </p>

                {/* 3 Practical Feature Checks */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-zinc-700">
                  <div className="bg-white p-3.5 rounded-xl border border-zinc-200/80 flex items-start gap-2 shadow-2xs">
                    <span className="text-emerald-600 font-bold shrink-0">✓</span>
                    <span>Microchip &amp; rabies order verification</span>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-zinc-200/80 flex items-start gap-2 shadow-2xs">
                    <span className="text-emerald-600 font-bold shrink-0">✓</span>
                    <span>Official vet &amp; endorsement audit</span>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-zinc-200/80 flex items-start gap-2 shadow-2xs">
                    <span className="text-emerald-600 font-bold shrink-0">✓</span>
                    <span>10-day validity clock monitoring</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Clean Action Card */}
              <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-2xl border border-zinc-200/90 shadow-sm space-y-4 text-left">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
                    Free Instant Check
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#0E2342] mb-1.5">
                    Scan Your Travel Paperwork
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    Upload your pet&apos;s veterinary certificate, vaccination records, or titer report to receive a route-specific readiness audit.
                  </p>
                </div>

                <div className="space-y-2.5 pt-1">
                  <Link
                    href="/en/checker"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0E2342] hover:bg-[#16345E] text-white font-semibold text-sm rounded-xl shadow-sm hover:shadow transition-all active:scale-[0.99]"
                  >
                    <span>Start Document Check</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>

                  <Link
                    href="/en/pet-travel"
                    className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 border border-zinc-200/80 font-semibold text-xs rounded-xl transition-all"
                  >
                    <span>Browse 50+ Flight Corridors</span>
                    <span>→</span>
                  </Link>
                </div>

                <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-400">
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>100% Private</span>
                  </span>
                  <span>⚡ Instant Check</span>
                  <span>📋 Official Statutes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
