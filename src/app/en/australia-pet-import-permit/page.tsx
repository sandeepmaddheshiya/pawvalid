import Link from 'next/link';
import type { Metadata } from 'next';
import FaqAccordion from '@/components/FaqAccordion';
import {
  getBreadcrumbSchema,
  getFaqSchema,
  getMedicalWebPageSchema,
  getSoftwareApplicationSchema,
  getHowToSchema,
} from '@/lib/seo/schema';
import { getHreflangAlternates } from '@/lib/seo/hreflang';

export const metadata: Metadata = {
  title: 'Australia Pet Import Permit: How to Apply (2026 DAFF BICON Guide) | PawValid',
  description:
    'Step-by-step official guide to applying for an Australian pet import permit through DAFF BICON. What the permit covers, country group checks, application steps, AUD $480 fees, validity windows, and common processing delays.',
  keywords: [
    'australia pet import permit',
    'DAFF import permit pet',
    'BICON pet permit',
    'apply for australian dog permit',
    'australian cat import permit',
    'department of agriculture pet permit',
    'BICON import conditions pet',
    'australia pet permit cost',
    'australian pet biosecurity permit',
  ],
  alternates: getHreflangAlternates('/australia-pet-import-permit'),
  openGraph: {
    title: 'Australia Pet Import Permit: How to Apply (DAFF BICON Guide) | PawValid',
    description:
      'Complete procedural walkthrough for the Australian pet import permit. Master DAFF BICON registration, fees, 20-day review times, and mandatory document attachments.',
    url: 'https://pawvalid.online/en/australia-pet-import-permit',
    siteName: 'PawValid',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Australia Pet Import Permit: How to Apply (2026 BICON Guide) | PawValid',
    description:
      'Everything you need to secure your DAFF pet import permit for Australia: application steps, BICON filing, costs, validity, and avoiding delays.',
  },
};

const PERMIT_FAQS = [
  {
    q: 'Do all pets entering Australia need an import permit?',
    a: 'No. Pets arriving directly from New Zealand, Norfolk Island, or the Cocos (Keeling) Islands (Group 1 countries) do not require a DAFF import permit. However, all dogs and cats arriving from Group 2 countries (approved rabies-free/rabies-controlled nations such as the UK, Singapore, and Japan) and Group 3 countries (approved rabies-endemic nations such as the United States, Canada, and EU member states) strictly require an Australian Import Permit issued by DAFF prior to travel.',
  },
  {
    q: 'How long does it take DAFF to process a pet import permit application?',
    a: 'DAFF requires a minimum of 20 Australian business days (approximately 4 to 5 calendar weeks) to assess and grant a companion animal import permit. During peak travel periods (November to February) or when documentation requires veterinary clarification, processing can take 6 to 8 weeks. You should apply for your permit at least 3 to 4 months prior to your intended arrival date.',
  },
  {
    q: 'How much does the Australian pet import permit cost?',
    a: 'DAFF charges a non-refundable initial application assessment fee of AUD $480 for the first animal. If you are importing multiple eligible pets simultaneously on the same application under identical travel itineraries, each additional pet incurs an additional fee of approximately AUD $240. Payment must be made online via credit card at the time of BICON application submission.',
  },
  {
    q: 'How long is the Australian pet import permit valid?',
    a: 'A DAFF pet import permit is valid for 12 months from the date of issuance. If your travel dates shift slightly within that 12-month window, you generally do not need a new permit, provided all pre-export serological tests, vaccinations, and the RNATT rabies titer 180-day clock remain fully compliant with the permit conditions.',
  },
  {
    q: 'Can I book quarantine at Mickleham without an import permit?',
    a: 'No. You cannot reserve a quarantine space at the Mickleham Post Entry Quarantine (PEQ) facility in Melbourne until your DAFF import permit has been formally granted and assigned an official permit number. Attempting to book PEQ without a valid permit number is rejected automatically by the DAFF booking system.',
  },
  {
    q: 'What happens if my pet arrives in Australia without an import permit?',
    a: 'Entering Australian territory with an unpermitted animal is a serious criminal offense under the Biosecurity Act 2015. Biosecurity officers will immediately seize the animal upon landing at Melbourne Airport. The pet will either be re-exported immediately on the next outbound flight or humanely euthanized at the importer’s sole expense. There are zero on-arrival permits granted under any circumstances.',
  },
];

export default function AustraliaPetImportPermitPage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Countries', url: '/en/countries' },
    { name: 'Australia', url: '/en/countries/australia' },
    { name: 'Australia Pet Import Permit', url: '/en/australia-pet-import-permit' },
  ];

  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);
  const faqSchema = getFaqSchema(PERMIT_FAQS);
  const medicalSchema = getMedicalWebPageSchema({
    name: 'Australia Pet Import Permit: How to Apply (DAFF BICON Biosecurity Guide)',
    description:
      'Official statutory guidance for applying for an Australian companion animal import permit under DAFF BICON regulations.',
    url: '/en/australia-pet-import-permit',
    authority: 'Department of Agriculture, Fisheries and Forestry (DAFF Australia)',
    authorityUrl: 'https://bicon.agriculture.gov.au',
    lastReviewed: '2026-10-14',
    reviewerName: 'Dr. Sarah Miller, DVM',
    reviewerTitle: 'Veterinary Biosecurity Specialist & Cross-Border Compliance Auditor',
  });
  const howToSchema = getHowToSchema({
    title: 'How to Apply for an Australian Pet Import Permit via BICON',
    description:
      'Step-by-step procedural roadmap for securing a DAFF companion animal import permit.',
    steps: [
      {
        step: 1,
        title: 'Confirm Origin Country Group & Residency',
        description:
          'Verify your pet has resided continuously in an approved Group 2 or Group 3 country for at least 6 months.',
      },
      {
        step: 2,
        title: 'Complete RNATT Rabies Titer & Identity Verification',
        description:
          'For Group 3 pets, complete the RNATT rabies titer and have an official government vet sign the RNATT declaration form.',
      },
      {
        step: 3,
        title: 'Create a BICON Account and Start Application',
        description:
          'Register on the DAFF BICON portal and select the non-commercial dog/cat import permit application case.',
      },
      {
        step: 4,
        title: 'Upload Supporting Dossier & Pay AUD $480 Fee',
        description:
          'Attach microchip records, rabies history, RNATT declaration, and pay the non-refundable assessment charge.',
      },
      {
        step: 5,
        title: 'Receive Granted Permit & Book Mickleham PEQ',
        description:
          'Upon permit issuance (min. 20 business days), use your permit number to book post-entry quarantine in Melbourne.',
      },
    ],
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
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
            <Link href="/en/countries" className="hover:text-zinc-900 transition-colors">
              Countries
            </Link>
            <span className="text-zinc-300">/</span>
            <Link href="/en/countries/australia" className="hover:text-zinc-900 transition-colors">
              Australia
            </Link>
            <span className="text-zinc-300">/</span>
            <span className="font-semibold text-zinc-900">
              Pet Import Permit Guide
            </span>
          </nav>
          <div className="inline-flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80 text-[11px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>DAFF BICON Electronic Permit System</span>
          </div>
        </div>
      </div>

      {/* ─── HERO SECTION ────────────────────────────────────────────── */}
      <section className="bg-white border-b border-zinc-200/80 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200/80 text-xs font-bold uppercase tracking-wider mb-4">
              <span>Statutory Permit Protocol</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0E2342] tracking-tight leading-tight mb-4">
              Australia Pet Import Permit: How to Apply
            </h1>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed mb-6">
              Securing an official <strong>Australian Pet Import Permit</strong> issued by the <strong>Department of Agriculture, Fisheries and Forestry (DAFF)</strong> is the statutory cornerstone of bringing a dog or cat into Australia from any Group 2 or Group 3 country. Governed under the <em>Biosecurity Act 2015</em>, the import permit establishes the mandatory veterinary conditions, laboratory testing schedules, and quarantine protocols your pet must satisfy. Applications are processed exclusively through the online <strong>Biosecurity Import Conditions (BICON)</strong> system.
            </p>

            {/* Reviewer Trust Banner */}
            <div className="flex items-center gap-3 p-3.5 bg-[#F8FAFB] border border-zinc-200/80 rounded-xl text-xs text-zinc-600 mb-8">
              <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 font-bold shrink-0">
                SM
              </div>
              <div className="flex-1 leading-snug">
                <span className="font-bold text-zinc-900">Statutorily &amp; Medically Reviewed</span> by Dr. Sarah Miller, DVM &bull; Verified against DAFF BICON Electronic Import Assessment Protocols and the Australian Biosecurity Act 2015 (Updated October 2026).
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              <div className="bg-[#F8FAFB] rounded-xl p-4 border border-zinc-200/80">
                <span className="text-[11px] font-semibold text-zinc-500 block uppercase">
                  Application Fee
                </span>
                <strong className="text-xl font-bold text-zinc-900 mt-1 block">
                  AUD $480
                </strong>
                <span className="text-[11px] text-zinc-500 mt-0.5 block">
                  Non-refundable initial fee
                </span>
              </div>
              <div className="bg-[#F8FAFB] rounded-xl p-4 border border-zinc-200/80">
                <span className="text-[11px] font-semibold text-zinc-500 block uppercase">
                  Processing Time
                </span>
                <strong className="text-xl font-bold text-zinc-900 mt-1 block">
                  20+ Days
                </strong>
                <span className="text-[11px] text-zinc-500 mt-0.5 block">
                  Australian business days
                </span>
              </div>
              <div className="bg-[#F8FAFB] rounded-xl p-4 border border-zinc-200/80">
                <span className="text-[11px] font-semibold text-zinc-500 block uppercase">
                  Permit Validity
                </span>
                <strong className="text-xl font-bold text-zinc-900 mt-1 block">
                  12 Months
                </strong>
                <span className="text-[11px] text-zinc-500 mt-0.5 block">
                  From issuance date
                </span>
              </div>
              <div className="bg-[#F8FAFB] rounded-xl p-4 border border-zinc-200/80">
                <span className="text-[11px] font-semibold text-zinc-500 block uppercase">
                  Filing Platform
                </span>
                <strong className="text-xl font-bold text-zinc-900 mt-1 block">
                  DAFF BICON
                </strong>
                <span className="text-[11px] text-zinc-500 mt-0.5 block">
                  Online electronic portal
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
                  href="#what-permit-covers"
                  className="bg-white px-3 py-1.5 rounded-lg border border-zinc-200/90 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors font-medium"
                >
                  1. What the Permit Covers
                </a>
                <a
                  href="#application-steps"
                  className="bg-white px-3 py-1.5 rounded-lg border border-zinc-200/90 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors font-medium"
                >
                  2. Application Steps (Country Group, Submit, Validity)
                </a>
                <a
                  href="#permit-fees"
                  className="bg-white px-3 py-1.5 rounded-lg border border-zinc-200/90 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors font-medium"
                >
                  3. Fees
                </a>
                <a
                  href="#common-delays"
                  className="bg-white px-3 py-1.5 rounded-lg border border-zinc-200/90 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors font-medium"
                >
                  4. Common Delays
                </a>
                <a
                  href="#faqs"
                  className="bg-white px-3 py-1.5 rounded-lg border border-zinc-200/90 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors font-medium"
                >
                  5. Frequently Asked Questions
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MAIN CONTENT CONTAINER ─────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Editorial Body (8 cols) */}
          <main className="lg:col-span-8 space-y-12">

            {/* ─── SECTION 1: WHAT THE PERMIT COVERS ─────────────────── */}
            <section id="what-permit-covers" className="scroll-mt-20 space-y-6">
              <div className="border-b border-zinc-200 pb-4">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                  Regulatory Scope
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E2342]">
                  What the Permit Covers
                </h2>
              </div>

              <p className="text-sm sm:text-base text-zinc-700 leading-relaxed">
                An Australian Pet Import Permit is not a ceremonial travel document or a generic pet passport. It is a legally binding statutory instrument issued under the <em>Biosecurity Act 2015</em> that grants conditional authority for a specific animal to enter Australian sovereign airspace and border facilities.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-zinc-200/90 shadow-2xs">
                  <h3 className="font-bold text-sm text-[#0E2342] mb-2 flex items-center gap-1.5">
                    <span className="text-emerald-700">✓</span> What the Permit Specifically Authorizes
                  </h3>
                  <ul className="text-xs text-zinc-600 space-y-2 leading-relaxed">
                    <li>&bull; <strong>Individual Animal Identification:</strong> Matches the specific 15-digit ISO microchip number, breed, age, and sex of your dog or cat.</li>
                    <li>&bull; <strong>Sovereign Path Conditions:</strong> Sets out the specific pre-export serological tests, internal/external parasite treatments, and vaccinations required for your exact country of export.</li>
                    <li>&bull; <strong>Melbourne Landing Authority:</strong> Grants permission for the animal to land as manifest air cargo at Melbourne International Airport (MEL).</li>
                    <li>&bull; <strong>PEQ Quarantine Access:</strong> Unlocks authorization to book a mandatory kennel or cattery suite at the Mickleham Post Entry Quarantine facility.</li>
                  </ul>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-zinc-200/90 shadow-2xs">
                  <h3 className="font-bold text-sm text-[#0E2342] mb-2 flex items-center gap-1.5">
                    <span className="text-red-700">✕</span> What the Permit Does NOT Cover
                  </h3>
                  <ul className="text-xs text-zinc-600 space-y-2 leading-relaxed">
                    <li>&bull; <strong>Quarantine Accommodation:</strong> The permit does <em>not</em> automatically reserve a bed at Mickleham; you must book PEQ separately once the permit is granted.</li>
                    <li>&bull; <strong>Airline Flight Booking:</strong> Manifest airfreight must be arranged independently with an airline cargo desk or IPATA pet shipper.</li>
                    <li>&bull; <strong>Exemption from Health Testing:</strong> If pre-export blood tests or parasite treatments are missed, the permit becomes invalid upon landing.</li>
                    <li>&bull; <strong>Banned Breed Exemption:</strong> DAFF will not issue a permit for any prohibited breeds or domestic-wild hybrids.</li>
                  </ul>
                </div>
              </div>

              {/* Callout on Permitted Groups */}
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200/80 text-xs text-blue-900 space-y-1.5">
                <div className="font-bold flex items-center gap-1.5 text-blue-950">
                  <svg className="w-4 h-4 text-blue-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Who Must Apply for an Import Permit?</span>
                </div>
                <p className="leading-relaxed">
                  Only pets originating in <strong>Group 2 countries</strong> (such as the UK, Ireland, Singapore, Japan) and <strong>Group 3 countries</strong> (such as the USA, Canada, EU member states, UAE, South Korea) are eligible to apply. Pets from Group 1 (New Zealand) are statutorily exempt. Pets from unapproved countries (such as India, China, Philippines, Brazil) cannot apply for an import permit until they have resided in a Group 2 or 3 country for at least 6 consecutive months.
                </p>
              </div>
            </section>

            {/* ─── SECTION 2: APPLICATION STEPS ─────────────────────── */}
            <section id="application-steps" className="scroll-mt-20 space-y-6">
              <div className="border-b border-zinc-200 pb-4">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                  Filing Procedure
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E2342]">
                  Application Steps
                </h2>
              </div>

              <p className="text-sm sm:text-base text-zinc-700 leading-relaxed">
                Applying for an Australian Pet Import Permit through the DAFF BICON system must follow a rigorous, non-negotiable sequence.
              </p>

              {/* H3: Check country group */}
              <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-[#0E2342] text-white flex items-center justify-center font-bold text-xs">
                    Step 1
                  </span>
                  <h3 className="font-bold text-base text-[#0E2342]">
                    Check Country Group &amp; Continuous Residency
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  Before opening an application, verify your export country’s DAFF classification. Crucially, your pet must have <strong>resided continuously in the approved exporting country for at least 6 months</strong> prior to export (or since birth). If your dog or cat recently traveled outside an approved Group 2 or 3 jurisdiction, the 6-month residency clock resets.
                </p>
                <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 text-xs text-zinc-700 flex flex-wrap items-center justify-between gap-2">
                  <span>Need to verify country risk category?</span>
                  <Link
                    href="/en/bring-pets-to-australia#country-groups"
                    className="text-emerald-700 font-bold hover:underline"
                  >
                    View DAFF Country Groups Matrix →
                  </Link>
                </div>
              </div>

              {/* H3: Submit application */}
              <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-[#0E2342] text-white flex items-center justify-center font-bold text-xs">
                    Step 2
                  </span>
                  <h3 className="font-bold text-base text-[#0E2342]">
                    Submit Application via DAFF BICON Portal
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  Navigate to the official <strong>BICON (Biosecurity Import Conditions)</strong> web system. Create an individual or business account, search for the &ldquo;Cats and Dogs&rdquo; case, and begin a new permit application. You must enter exact pet biometrics and upload high-resolution digital copies of:
                </p>
                <ul className="list-disc pl-5 text-xs text-zinc-600 space-y-1.5 leading-relaxed">
                  <li><strong>Certificate of Microchipping:</strong> Must confirm 15-digit ISO 11784/11785 FDX-B chip number.</li>
                  <li><strong>Rabies Vaccination Records:</strong> Demonstrating full valid immunisation with an approved vaccine.</li>
                  <li><strong>RNATT Laboratory Report (Group 3 only):</strong> Official laboratory test report showing antibody titer ≥ 0.50 IU/mL.</li>
                  <li><strong>RNATT Declaration Form:</strong> Completed, signed, and stamped by an Official Government Veterinarian (e.g. USDA APHIS, UK DEFRA, CFIA, Singapore AVS).</li>
                </ul>
              </div>

              {/* H3: Permit validity */}
              <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-[#0E2342] text-white flex items-center justify-center font-bold text-xs">
                    Step 3
                  </span>
                  <h3 className="font-bold text-base text-[#0E2342]">
                    Permit Issuance and 12-Month Validity Window
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  Once your application is assessed and approved by DAFF biosecurity officers, your official <strong>Import Permit Document (PDF)</strong> is issued directly into your BICON account. The permit carries an official DAFF reference number and remains <strong>valid for 12 months</strong> from the date of issue.
                </p>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  <strong>Important:</strong> The permit outlines the exact pre-export testing milestones that your private accredited vet must execute in the final 30 days before departure. You must provide a full copy of this permit to your vet and your IPATA freight agent.
                </p>
              </div>
            </section>

            {/* ─── SECTION 3: FEES ──────────────────────────────────── */}
            <section id="permit-fees" className="scroll-mt-20 space-y-6">
              <div className="border-b border-zinc-200 pb-4">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                  Financial Requirements
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E2342]">
                  Permit Fees
                </h2>
              </div>

              <p className="text-sm sm:text-base text-zinc-700 leading-relaxed">
                DAFF operates on a statutory cost-recovery model. All application assessment fees are strictly <strong>non-refundable</strong> once lodged, even if your application is subsequently withdrawn, rejected due to invalid documents, or if your relocation plans change.
              </p>

              {/* Fee Breakdown Table */}
              <div className="bg-white rounded-2xl border border-zinc-200/90 shadow-2xs overflow-hidden">
                <div className="p-4 bg-zinc-50 border-b border-zinc-200/80">
                  <h3 className="font-bold text-sm text-[#0E2342]">
                    Official DAFF Import Permit Fee Schedule (2026)
                  </h3>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Statutory Australian Government charges for companion animal import assessment.
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-zinc-100/70 border-b border-zinc-200 text-zinc-700 font-semibold">
                        <th className="p-3">Fee Item</th>
                        <th className="p-3">Amount (AUD)</th>
                        <th className="p-3">When Payable</th>
                        <th className="p-3">Terms</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 text-zinc-700">
                      <tr>
                        <td className="p-3 font-semibold text-zinc-900">Initial Application (First Animal)</td>
                        <td className="p-3 font-mono font-bold text-zinc-900">AUD $480</td>
                        <td className="p-3 text-zinc-600">Upon online BICON submission</td>
                        <td className="p-3 text-zinc-600">Non-refundable standard assessment fee</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-zinc-900">Additional Animal (Same Application)</td>
                        <td className="p-3 font-mono font-bold text-zinc-900">AUD $240</td>
                        <td className="p-3 text-zinc-600">Upon online BICON submission</td>
                        <td className="p-3 text-zinc-600">Must travel on exact identical itinerary</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-zinc-900">Permit Variation / Amendment Fee</td>
                        <td className="p-3 font-mono font-bold text-zinc-900">AUD $150 – $300</td>
                        <td className="p-3 text-zinc-600">Upon requesting modification</td>
                        <td className="p-3 text-zinc-600">For correcting animal details or route changes</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-zinc-900">Out-of-Scope Manual Assessment</td>
                        <td className="p-3 font-mono font-bold text-zinc-900">AUD $60 / 15 mins</td>
                        <td className="p-3 text-zinc-600">Invoiced if complex review needed</td>
                        <td className="p-3 text-zinc-600">Applies if documentation requires extensive forensic audit</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* ─── SECTION 4: COMMON DELAYS ─────────────────────────── */}
            <section id="common-delays" className="scroll-mt-20 space-y-6">
              <div className="border-b border-zinc-200 pb-4">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                  Risk Management
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E2342]">
                  Common Delays
                </h2>
              </div>

              <p className="text-sm sm:text-base text-zinc-700 leading-relaxed">
                DAFF biosecurity assessors operate under a zero-tolerance compliance threshold. Errors, discrepancies, or uncertified documents result in formal Information Notices that halt the assessment clock and delay issuance by weeks.
              </p>

              {/* 4 Traps Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white border border-zinc-200/90 shadow-2xs space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-red-100 text-red-700 font-bold text-xs flex items-center justify-center shrink-0">
                      1
                    </span>
                    <h3 className="font-bold text-xs sm:text-sm text-[#0E2342]">
                      Microchip Mismatches &amp; Date Sequencing
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    The single most common delay is a microchip number on the rabies certificate differing by even one digit from the RNATT lab report, or the rabies vaccine being administered <em>before</em> the microchip was officially implanted.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-zinc-200/90 shadow-2xs space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-red-100 text-red-700 font-bold text-xs flex items-center justify-center shrink-0">
                      2
                    </span>
                    <h3 className="font-bold text-xs sm:text-sm text-[#0E2342]">
                      Unendorsed RNATT Declaration Forms
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Private veterinarians cannot endorse the official RNATT declaration. In Group 3 countries, the form must be endorsed, signed, and embossed by a <strong>full-time government veterinary officer</strong> (e.g. USDA APHIS in the US, DEFRA in the UK).
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-zinc-200/90 shadow-2xs space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-red-100 text-red-700 font-bold text-xs flex items-center justify-center shrink-0">
                      3
                    </span>
                    <h3 className="font-bold text-xs sm:text-sm text-[#0E2342]">
                      Late Lodgement Before Flight Dates
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Submitting your application less than 30 business days before your intended travel date creates high risk of missing your flight. DAFF will not prioritize or expedite standard applications due to personal travel deadlines.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-zinc-200/90 shadow-2xs space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-red-100 text-red-700 font-bold text-xs flex items-center justify-center shrink-0">
                      4
                    </span>
                    <h3 className="font-bold text-xs sm:text-sm text-[#0E2342]">
                      Uncertified Breed Declarations
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    If your dog has physical characteristics resembling a restricted breed (such as a staffordshire terrier, bully cross, or mastiff), DAFF will require a formal statutory declaration and breed pedigree verification before approving the permit.
                  </p>
                </div>
              </div>
            </section>

            {/* ─── SECTION 5: FAQS ──────────────────────────────────── */}
            <section id="faqs" className="scroll-mt-20 space-y-6">
              <div className="border-b border-zinc-200 pb-4">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                  Authoritative Guidance
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E2342]">
                  Frequently Asked Questions About the Australian Pet Import Permit
                </h2>
              </div>

              <p className="text-sm text-zinc-600">
                Official regulatory guidance regarding DAFF BICON registration, fees, 20-day review times, and mandatory document attachments.
              </p>

              <div className="bg-white rounded-2xl border border-zinc-200/90 shadow-2xs p-4 sm:p-6">
                <FaqAccordion items={PERMIT_FAQS} />
              </div>
            </section>

          </main>

          {/* Right Sidebar (4 cols) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Interactive Checker Sticky Card */}
            <div className="bg-white rounded-2xl border border-zinc-200/90 p-5 shadow-sm space-y-4 lg:sticky lg:top-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs border border-emerald-200/80">
                  🇦🇺
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#0E2342]">
                    Audit Your Australia Permit
                  </h3>
                  <span className="text-[11px] text-zinc-500">
                    Applying via DAFF BICON?
                  </span>
                </div>
              </div>

              <p className="text-xs text-zinc-600 leading-relaxed">
                Scan your pet&apos;s RNATT laboratory report and microchip records with PawValid to identify discrepancies before paying the non-refundable AUD $480 assessment fee.
              </p>

              <div className="space-y-2 pt-1">
                <Link
                  href="/checker?dest=AU"
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-[#0E2342] hover:bg-[#16345E] text-white text-xs font-semibold py-2.5 px-4 rounded-xl shadow-xs transition-all text-center"
                >
                  <span>Pre-Screen Permit Dossier →</span>
                </Link>
                <Link
                  href="/en/bring-pets-to-australia"
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 border border-zinc-200 text-xs font-semibold py-2 px-4 rounded-xl transition-all text-center"
                >
                  <span>Australia Overview Hub</span>
                </Link>
              </div>

              {/* Related Australia Cluster Guides */}
              <div className="pt-4 border-t border-zinc-100 space-y-2">
                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                  Australia Cluster Guides
                </span>
                <ul className="text-xs space-y-2 text-zinc-600">
                  <li>
                    <Link
                      href="/en/australia-pet-quarantine"
                      className="text-emerald-700 hover:text-emerald-800 font-medium hover:underline flex items-center gap-1"
                    >
                      <span>→</span>
                      <span>Mickleham Quarantine: What to Expect</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/en/australian-quarantine-for-dogs"
                      className="text-emerald-700 hover:text-emerald-800 font-medium hover:underline flex items-center gap-1"
                    >
                      <span>→</span>
                      <span>Australian Quarantine for Dogs (Rules &amp; Prep)</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/en/cat-quarantine-australia"
                      className="text-emerald-700 hover:text-emerald-800 font-medium hover:underline flex items-center gap-1"
                    >
                      <span>→</span>
                      <span>Cat Quarantine in Australia (Requirements)</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/en/australian-pet-passport"
                      className="text-emerald-700 hover:text-emerald-800 font-medium hover:underline flex items-center gap-1"
                    >
                      <span>→</span>
                      <span>Is There an Australian Pet Passport? (Myth-Busting)</span>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Official Authority Links */}
              <div className="pt-3 border-t border-zinc-100 text-[11px] text-zinc-500 space-y-1">
                <div className="font-semibold text-zinc-700">Official Portals:</div>
                <div>&bull; <a href="https://bicon.agriculture.gov.au" target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-zinc-900 underline">DAFF BICON System</a></div>
                <div>&bull; <a href="https://www.agriculture.gov.au/biosecurity-trade/import/goods/live-animals/pets" target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-zinc-900 underline">DAFF Pet Import Guidelines</a></div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
