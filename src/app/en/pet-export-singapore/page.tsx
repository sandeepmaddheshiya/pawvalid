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
  title: 'Exporting a Pet From Singapore: 2026 AVS Rules, Health Certs & Shippers | PawValid',
  description:
    'Complete statutory guide to exporting a dog or cat from Singapore under Animal & Veterinary Service (AVS / NParks) regulations. Destination import rules, GoBusiness export licences, veterinary health certificates, CAPQ Changi inspection, and approved pet shippers.',
  keywords: [
    'pet export singapore',
    'export dog from singapore',
    'leave singapore with pet',
    'export health certificate singapore',
    'singapore pet export requirements',
    'AVS export licence',
    'gobusiness pet export',
    'CAPQ changi airport inspection',
    'pet relocation out of singapore',
    'export cat from singapore',
    'IPATA pet shipper singapore',
  ],
  alternates: getHreflangAlternates('/pet-export-singapore'),
  openGraph: {
    title: 'Exporting a Pet From Singapore: Official AVS & NParks Outbound Guide (2026) | PawValid',
    description:
      'Step-by-step master guide for leaving Singapore with a dog or cat. Destination country rules, AVS GoBusiness export licences, veterinary health certificates, CAPQ inspections, and pet shippers.',
    url: 'https://pawvalid.online/en/pet-export-singapore',
    siteName: 'PawValid',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Exporting a Pet From Singapore (2026 AVS Outbound Guide) | PawValid',
    description:
      'How to leave Singapore with your dog or cat: AVS export licences, destination rules, vet health certs, CAPQ inspection, and pet relocation shippers.',
  },
};

const SINGAPORE_EXPORT_FAQS = [
  {
    q: 'Do I need an export licence from AVS to take my pet out of Singapore?',
    a: 'Yes. Under the Animals and Birds Act, all dogs and cats leaving Singapore permanently or temporarily must have an official AVS Export Licence issued by the Animal & Veterinary Service (AVS / NParks). You must apply through the online GoBusiness Licensing portal within 30 days prior to your pet’s departure. The licence fee is SGD $50 per animal ($100 for express processing within 3 working days) and remains valid for 30 days from issuance.',
  },
  {
    q: 'What is the role of CAPQ (Changi Animal & Plant Quarantine Station) during pet export?',
    a: 'Before your pet can be checked in or loaded as manifest cargo at Singapore Changi Airport (SIN), they must undergo a mandatory pre-export physical inspection at the Changi Animal & Plant Quarantine Station (CAPQ), located at the Changi Airfreight Centre. You must book an inspection appointment through the AVS CAPQ booking system at least 5 working days in advance. During this inspection, an AVS officer verifies your pet’s microchip, checks clinical health, and stamps the export clearance documentation.',
  },
  {
    q: 'How far in advance should I start preparing to export my pet from Singapore?',
    a: 'Your preparation timeline depends entirely on the destination country’s import rules. For destinations requiring a rabies blood titer test (such as Australia, New Zealand, Japan, or South Africa), you must begin preparations 6 to 7 months before departure due to mandatory 180-day waiting periods. For destinations like the UK, European Union, USA, or Canada, 1 to 2 months of preparation is usually sufficient for rabies vaccinations, ISO microchipping, and tapeworm treatments.',
  },
  {
    q: 'When must the veterinary clinical examination and health certificate be completed in Singapore?',
    a: 'Most importing countries require the final veterinary clinical examination to be performed between 2 and 10 days before departure by a licensed, registered veterinarian in Singapore. The veterinarian examines the animal for infectious diseases, administers required internal parasite (Praziquantel) and external parasite (fipronil/permethrin) treatments, and completes the destination-specific export health certificate.',
  },
  {
    q: 'How do I get my pet’s export health certificate endorsed by AVS?',
    a: 'Once your private Singapore vet completes and signs the export health certificate, it must be officially endorsed by AVS. For countries that accept electronic certificates, your vet submits it via the AVS e-licensing system. For countries requiring physical wet-ink stamps and embossment (such as Australia, Japan, or the UAE), you or your pet relocation agent must submit the original documents to the AVS headquarters or CAPQ office for official endorsement (fee is SGD $23 per certificate).',
  },
  {
    q: 'Do I need to hire a professional pet relocation agent in Singapore?',
    a: 'While it is legally possible to handle export paperwork yourself for certain destinations, hiring an IPATA-certified pet shipper in Singapore is strongly recommended—and often mandatory by airlines. Major airlines flying out of Changi (such as Singapore Airlines, Qantas, Emirates, and British Airways) require unaccompanied pets to travel as manifest cargo booked through an approved IATA cargo agent. Professional shippers also manage airport security, CAPQ terminal transfers, and destination customs clearance.',
  },
  {
    q: 'What happens to my Singapore dog licence when I export my dog?',
    a: 'After your dog has successfully departed Singapore, you must log into the AVS Pet Animal Licensing System (PALS) via GoBusiness and formally cancel your dog’s local Singapore licence. You will need to select "Exported Overseas" as the reason for cancellation and upload a copy of the AVS Export Licence or airway bill to keep national pet registry records accurate.',
  },
  {
    q: 'Can my pet travel in the cabin with me when leaving Singapore?',
    a: 'Singapore Airlines (SIA) does not allow pets in the passenger cabin on commercial flights (except for certified medically trained service dogs). Pets departing Singapore with SIA must travel as checked baggage in the temperature-controlled cargo hold (AVIH) or as manifest cargo. A limited number of international carriers (such as KLM, Air France, or Turkish Airlines) permit small pets in-cabin on specific outbound routes, subject to strict weight limits (usually 8 kg including carrier).',
  },
];

export default function PetExportSingaporePage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Countries', url: '/en/countries' },
    { name: 'Singapore', url: '/en/countries/singapore' },
    { name: 'Exporting a Pet From Singapore', url: '/en/pet-export-singapore' },
  ];

  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);
  const faqSchema = getFaqSchema(SINGAPORE_EXPORT_FAQS);
  const medicalSchema = getMedicalWebPageSchema({
    name: 'Exporting a Pet From Singapore: Official AVS & NParks Biosecurity Export Guide',
    description:
      'Authoritative statutory guidance for exporting companion animals from Singapore under AVS Animals and Birds Act rules and destination biosecurity statutes.',
    url: '/en/pet-export-singapore',
    authority: 'Animal & Veterinary Service (AVS / NParks Singapore)',
    authorityUrl: 'https://www.nparks.gov.sg/avs',
    lastReviewed: '2026-10-14',
    reviewerName: 'Dr. Sarah Miller, DVM',
    reviewerTitle: 'Veterinary Biosecurity Specialist & Cross-Border Compliance Auditor',
  });
  const howToSchema = getHowToSchema({
    title: 'How to Export a Dog or Cat From Singapore Step-by-Step',
    description:
      'Chronological preparation timeline to export companion animals from Singapore with full AVS compliance and destination entry endorsement.',
    steps: [
      {
        step: 1,
        title: 'Check Destination Import Requirements',
        description:
          'Confirm destination rules: rabies blood titer test (RNATT), import permit, and microchip sequencing.',
      },
      {
        step: 2,
        title: 'Complete Veterinary Examinations & Treatments',
        description:
          'Visit a registered Singapore vet for microchip verification, vaccines, and internal/external parasite treatments.',
      },
      {
        step: 3,
        title: 'Apply for AVS Export Licence via GoBusiness',
        description:
          'Submit an export licence application on GoBusiness Singapore within 30 days of travel (SGD $50).',
      },
      {
        step: 4,
        title: 'Obtain AVS Authority Endorsement',
        description:
          'Submit the health certificate to AVS for government endorsement and wet-ink stamping.',
      },
      {
        step: 5,
        title: 'Complete Pre-Departure CAPQ Inspection at Changi',
        description:
          'Attend the scheduled pre-flight physical inspection at Changi Animal & Plant Quarantine Station at least 4 hours before departure.',
      },
      {
        step: 6,
        title: 'Cancel Singapore Dog Licence via PALS',
        description:
          'After arrival at destination, log into GoBusiness PALS to cancel the Singapore local dog registration.',
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
            <Link href="/en/countries/singapore" className="hover:text-zinc-900 transition-colors">
              Singapore
            </Link>
            <span className="text-zinc-300">/</span>
            <span className="font-semibold text-zinc-900">
              Exporting a Pet From Singapore
            </span>
          </nav>
          <div className="inline-flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80 text-[11px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>2026 AVS / NParks Outbound Export Protocol</span>
          </div>
        </div>
      </div>

      {/* ─── HERO SECTION ────────────────────────────────────────────── */}
      <section className="bg-white border-b border-zinc-200/80 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200/80 text-xs font-bold uppercase tracking-wider mb-4">
              <span>Outbound Biosecurity Protocol</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0E2342] tracking-tight leading-tight mb-4">
              Exporting a Pet From Singapore
            </h1>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed mb-6">
              Relocating a dog or cat out of Singapore is regulated by the <strong>Animal &amp; Veterinary Service (AVS)</strong>, a division of the National Parks Board (NParks), under the statutory mandate of the <em>Animals and Birds Act (Chapter 7)</em>. While Singapore maintains a coveted rabies-free status, exporting an animal requires coordinating two separate regulatory frameworks: Singapore’s official outbound export clearance (including an <strong>AVS Export Licence</strong> and <strong>CAPQ Changi pre-flight inspection</strong>) and the destination country’s sovereign veterinary import statutes. This comprehensive outbound guide covers every critical requirement, timeline, and agency procedure.
            </p>

            {/* Reviewer Trust Banner */}
            <div className="flex items-center gap-3 p-3.5 bg-[#F8FAFB] border border-zinc-200/80 rounded-xl text-xs text-zinc-600 mb-8">
              <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 font-bold shrink-0">
                SM
              </div>
              <div className="flex-1 leading-snug">
                <span className="font-bold text-zinc-900">Statutorily &amp; Medically Reviewed</span> by Dr. Sarah Miller, DVM &bull; Verified against AVS NParks Outbound Export Regulations, GoBusiness Licensing Procedures, and IATA Live Animals Regulations (Updated October 2026).
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              <div className="bg-[#F8FAFB] rounded-xl p-4 border border-zinc-200/80">
                <span className="text-[11px] font-semibold text-zinc-500 block uppercase">
                  AVS Export Licence
                </span>
                <strong className="text-xl font-bold text-zinc-900 mt-1 block">
                  Mandatory (SGD $50)
                </strong>
                <span className="text-[11px] text-zinc-500 mt-0.5 block">
                  Via GoBusiness (30d validity)
                </span>
              </div>
              <div className="bg-[#F8FAFB] rounded-xl p-4 border border-zinc-200/80">
                <span className="text-[11px] font-semibold text-zinc-500 block uppercase">
                  CAPQ Inspection
                </span>
                <strong className="text-xl font-bold text-zinc-900 mt-1 block">
                  Changi Airport
                </strong>
                <span className="text-[11px] text-zinc-500 mt-0.5 block">
                  Mandatory pre-flight check
                </span>
              </div>
              <div className="bg-[#F8FAFB] rounded-xl p-4 border border-zinc-200/80">
                <span className="text-[11px] font-semibold text-zinc-500 block uppercase">
                  Health Certificate
                </span>
                <strong className="text-xl font-bold text-zinc-900 mt-1 block">
                  AVS Endorsed
                </strong>
                <span className="text-[11px] text-zinc-500 mt-0.5 block">
                  Within 2–10 days of travel
                </span>
              </div>
              <div className="bg-[#F8FAFB] rounded-xl p-4 border border-zinc-200/80">
                <span className="text-[11px] font-semibold text-zinc-500 block uppercase">
                  Preparation Lead Time
                </span>
                <strong className="text-xl font-bold text-zinc-900 mt-1 block">
                  1 to 7 Months
                </strong>
                <span className="text-[11px] text-zinc-500 mt-0.5 block">
                  Destination dependent
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
                  href="#destination-rules"
                  className="bg-white px-3 py-1.5 rounded-lg border border-zinc-200/90 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors font-medium"
                >
                  1. Know the Destination&apos;s Rules First
                </a>
                <a
                  href="#vet-checks-certificate"
                  className="bg-white px-3 py-1.5 rounded-lg border border-zinc-200/90 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors font-medium"
                >
                  2. Vet Checks and Export Certificate
                </a>
                <a
                  href="#authority-endorsement"
                  className="bg-white px-3 py-1.5 rounded-lg border border-zinc-200/90 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors font-medium"
                >
                  3. Endorsement by the Authority
                </a>
                <a
                  href="#pet-shipper"
                  className="bg-white px-3 py-1.5 rounded-lg border border-zinc-200/90 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors font-medium"
                >
                  4. Choosing a Pet Shipper
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

            {/* ─── SECTION 1: DESTINATION RULES ─────────────────────── */}
            <section id="destination-rules" className="scroll-mt-20 space-y-6">
              <div className="border-b border-zinc-200 pb-4">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                  Step 1 &bull; Regulatory Research
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E2342]">
                  Know the Destination&apos;s Rules First
                </h2>
              </div>

              <p className="text-sm sm:text-base text-zinc-700 leading-relaxed">
                When exporting a dog or cat from Singapore, your regulatory obligations are dictacted primarily by your <strong>destination country</strong>. While Singapore’s outbound requirements remain constant (AVS licence and CAPQ inspection), importing authorities worldwide categorize Singapore differently based on their sovereign biosecurity standards:
              </p>

              {/* Destination Categories Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-zinc-200/90 shadow-2xs">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <h3 className="font-bold text-sm text-[#0E2342]">
                      Streamlined Destinations (UK, EU, USA, Canada)
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Because Singapore is an officially recognized rabies-free country, destinations like the <strong>United Kingdom (DEFRA)</strong> and the <strong>European Union</strong> treat Singapore as a qualifying listed country. No rabies blood titer test is required. Pets need an ISO 11784/11785 microchip, a primary rabies vaccine administered at least 21 days before travel, and standard tapeworm treatment (for dogs going to the UK, Ireland, Finland, Norway, or Malta).
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-zinc-200/90 shadow-2xs">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <h3 className="font-bold text-sm text-[#0E2342]">
                      High-Biosecurity Destinations (Australia, NZ, Japan)
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Countries with ultra-strict biosecurity laws enforce extended latency protocols. For example, moving a pet from Singapore to <strong>Australia (DAFF)</strong> requires an advance BICON import permit, extensive serology testing, and 10 to 30 days of mandatory quarantine at the Mickleham facility in Melbourne. <strong>Japan (MAFF)</strong> requires a 40-day advance import notification.
                  </p>
                </div>
              </div>

              {/* Destination Comparison Table */}
              <div className="bg-white rounded-2xl border border-zinc-200/90 shadow-2xs overflow-hidden">
                <div className="p-4 bg-zinc-50 border-b border-zinc-200/80">
                  <h3 className="font-bold text-sm text-[#0E2342]">
                    Destination Export Requirements Matrix from Singapore (2026)
                  </h3>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Comparison of import permits, blood titer requirements, and mandatory waiting clocks when leaving Singapore.
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-zinc-100/70 border-b border-zinc-200 text-zinc-700 font-semibold">
                        <th className="p-3">Destination</th>
                        <th className="p-3">Import Permit</th>
                        <th className="p-3">Rabies Titer (RNATT)</th>
                        <th className="p-3">Parasite Window</th>
                        <th className="p-3">Quarantine</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 text-zinc-700">
                      <tr>
                        <td className="p-3 font-semibold text-zinc-900">🇬🇧 United Kingdom</td>
                        <td className="p-3 text-zinc-600">None required</td>
                        <td className="p-3 text-emerald-700 font-medium">Exempt (Singapore listed)</td>
                        <td className="p-3 text-zinc-600">Tapeworm 24–120h prior</td>
                        <td className="p-3 text-emerald-700 font-bold">0 Days (Direct Entry)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-zinc-900">🇪🇺 European Union</td>
                        <td className="p-3 text-zinc-600">None required</td>
                        <td className="p-3 text-emerald-700 font-medium">Exempt (Annex II listed)</td>
                        <td className="p-3 text-zinc-600">Tapeworm 24–120h (select nations)</td>
                        <td className="p-3 text-emerald-700 font-bold">0 Days (Direct Entry)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-zinc-900">🇺🇸 United States</td>
                        <td className="p-3 text-zinc-600">CDC Dog Import Form (Free)</td>
                        <td className="p-3 text-emerald-700 font-medium">Exempt (Rabies-free country)</td>
                        <td className="p-3 text-zinc-600">General wellness check</td>
                        <td className="p-3 text-emerald-700 font-bold">0 Days (Direct Entry)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-zinc-900">🇦🇺 Australia</td>
                        <td className="p-3 text-amber-800 font-medium">DAFF BICON Permit Mandatory</td>
                        <td className="p-3 text-zinc-600">Not required for Group 2 (Singapore)</td>
                        <td className="p-3 text-zinc-600">External &amp; internal specific tests</td>
                        <td className="p-3 text-amber-700 font-bold">10–30 Days (Mickleham)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-zinc-900">🇯🇵 Japan</td>
                        <td className="p-3 text-blue-800 font-medium">40-day advance MAFF notice</td>
                        <td className="p-3 text-emerald-700 font-medium">Exempt (Designated region)</td>
                        <td className="p-3 text-zinc-600">Clinical exam within 10 days</td>
                        <td className="p-3 text-emerald-700 font-bold">12 Hours (Port check)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Callout Box */}
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200/80 text-xs text-blue-900 space-y-1.5">
                <div className="font-bold flex items-center gap-1.5 text-blue-950">
                  <svg className="w-4 h-4 text-blue-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Critical Rule: Verify Your Pet&apos;s Microchip Standard</span>
                </div>
                <p className="leading-relaxed">
                  While Singapore AVS permits both 9-digit AVID chips and 15-digit ISO 11784/11785 chips domestically, virtually all international destination countries (including the EU, UK, Australia, and Japan) <strong>strictly require a 15-digit ISO 11784/11785 FDX-B microchip</strong>. If your pet has an older 9-digit chip, a new ISO chip must be implanted in Singapore, and all pre-export vaccines must be administered on or after the new chip implantation date.
                </p>
              </div>
            </section>

            {/* ─── SECTION 2: VET CHECKS & HEALTH CERTIFICATE ───────── */}
            <section id="vet-checks-certificate" className="scroll-mt-20 space-y-6">
              <div className="border-b border-zinc-200 pb-4">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                  Step 2 &bull; Clinical Preparation
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E2342]">
                  Vet Checks and Export Certificate
                </h2>
              </div>

              <p className="text-sm sm:text-base text-zinc-700 leading-relaxed">
                All pre-export veterinary procedures in Singapore must be completed by a <strong>registered veterinary surgeon</strong> licensed by AVS. Your private vet is responsible for verifying your pet’s microchip, administering required vaccines and parasitic treatments, and completing the official export health certificate.
              </p>

              {/* Step-by-Step Clinical Workflow */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white border border-zinc-200/90 shadow-2xs">
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 border border-emerald-200/80">
                      1
                    </span>
                    <div className="space-y-1">
                      <h3 className="font-bold text-sm text-[#0E2342]">
                        Microchip Verification and Record Synchronization
                      </h3>
                      <p className="text-xs text-zinc-600 leading-relaxed">
                        At your first consultation, the vet must scan the microchip and confirm that the 15-digit number matches your Singapore dog licence (PALS record), vaccination cards, and destination paperwork. The microchip must precede every vaccination, blood test, and clinical entry.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-zinc-200/90 shadow-2xs">
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 border border-emerald-200/80">
                      2
                    </span>
                    <div className="space-y-1">
                      <h3 className="font-bold text-sm text-[#0E2342]">
                        Vaccination Updates (Rabies &amp; Core Boosters)
                      </h3>
                      <p className="text-xs text-zinc-600 leading-relaxed">
                        Although Singapore does not mandate rabies vaccination for pets living domestically, almost all importing nations require a valid <strong>inactivated or recombinant rabies vaccine</strong>. For dogs, core vaccines (DHPP: Distemper, Hepatitis, Parvovirus, Parainfluenza) must be up to date. For cats, FVRCP (Feline Viral Rhinotracheitis, Calicivirus, Panleukopenia) is standard.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-zinc-200/90 shadow-2xs">
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 border border-emerald-200/80">
                      3
                    </span>
                    <div className="space-y-1">
                      <h3 className="font-bold text-sm text-[#0E2342]">
                        Mandatory Internal &amp; External Parasite Treatments
                      </h3>
                      <p className="text-xs text-zinc-600 leading-relaxed">
                        Most international export health certificates require specific parasite treatments administered within strict pre-departure windows. Internal parasite treatments must contain <strong>Praziquantel</strong> (effective against <em>Echinococcus multilocularis</em> tapeworm). External treatments must be certified veterinary products against fleas and ticks (such as fipronil, permethrin, or fluralaner).
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-zinc-200/90 shadow-2xs">
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 border border-emerald-200/80">
                      4
                    </span>
                    <div className="space-y-1">
                      <h3 className="font-bold text-sm text-[#0E2342]">
                        Issuance of the Veterinary Health Certificate
                      </h3>
                      <p className="text-xs text-zinc-600 leading-relaxed">
                        Strictly within <strong>2 to 7 days before departure</strong> (exact timing depends on destination rules), your Singapore vet conducts the final clinical exam to certify that the pet is free from signs of infectious or contagious disease and fit to travel by air under IATA Live Animals Regulations. The vet then issues and signs the official health certificate.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ─── SECTION 3: ENDORSEMENT BY AUTHORITY ──────────────── */}
            <section id="authority-endorsement" className="scroll-mt-20 space-y-6">
              <div className="border-b border-zinc-200 pb-4">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                  Step 3 &bull; Singapore Government Clearances
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E2342]">
                  Endorsement by the Authority
                </h2>
              </div>

              <p className="text-sm sm:text-base text-zinc-700 leading-relaxed">
                Before any pet can exit Singapore, two official government endorsements from the <strong>Animal &amp; Veterinary Service (AVS)</strong> are statutorily required: the <strong>AVS Export Licence</strong> and the <strong>government endorsement of the export health certificate</strong>.
              </p>

              {/* 3 Pillars of AVS Export Clearance */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="w-9 h-9 rounded-xl bg-[#0E2342] text-white flex items-center justify-center font-bold text-sm">
                      A
                    </div>
                    <h3 className="font-bold text-sm text-[#0E2342]">
                      AVS Export Licence (GoBusiness)
                    </h3>
                    <p className="text-xs text-zinc-600 leading-relaxed">
                      Submitted online via Singapore&apos;s GoBusiness Licensing portal within 30 days of travel. Costs <strong>SGD $50</strong> per animal. Valid for 30 days. You must upload your pet’s microchip certificate and destination import permit (if applicable).
                    </p>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700 mt-3 block">
                    Online turnaround: 2–3 working days
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="w-9 h-9 rounded-xl bg-[#0E2342] text-white flex items-center justify-center font-bold text-sm">
                      B
                    </div>
                    <h3 className="font-bold text-sm text-[#0E2342]">
                      Health Certificate Government Endorsement
                    </h3>
                    <p className="text-xs text-zinc-600 leading-relaxed">
                      AVS veterinary officers must endorse the health certificate signed by your private vet. Fee is <strong>SGD $23</strong> per document. Physical wet-ink stamp or electronic certification depending on destination requirements.
                    </p>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700 mt-3 block">
                    Submitted via AVS portal or in person
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="w-9 h-9 rounded-xl bg-[#0E2342] text-white flex items-center justify-center font-bold text-sm">
                      C
                    </div>
                    <h3 className="font-bold text-sm text-[#0E2342]">
                      CAPQ Pre-Export Physical Inspection
                    </h3>
                    <p className="text-xs text-zinc-600 leading-relaxed">
                      Held at Changi Animal &amp; Plant Quarantine Station (CAPQ) at Changi Airfreight Centre. An AVS inspector verifies the pet&apos;s microchip and visual health prior to cargo or baggage check-in.
                    </p>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700 mt-3 block">
                    Must book 5 working days in advance
                  </span>
                </div>
              </div>

              {/* Warning on CAPQ Changi Airport Inspection */}
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/80 text-xs text-amber-900 space-y-1.5">
                <div className="font-bold flex items-center gap-1.5 text-amber-950">
                  <svg className="w-4 h-4 text-amber-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>Changi Airport CAPQ Protocol: Security Pass &amp; Operating Hours</span>
                </div>
                <p className="leading-relaxed">
                  CAPQ is located inside the Changi Airfreight Centre (a restricted customs zone). If you are personally bringing your pet for inspection rather than using an IPATA pet relocation agent, you must obtain a commercial security visitor pass at the Changi Police Pass Office by presenting your passport/NRIC and flight itinerary. Inspection hours are strictly Monday to Saturday between 8:00 AM and 10:30 PM (closed on Sundays and public holidays unless prior overtime inspection arrangements have been approved).
                </p>
              </div>

              {/* Dog Licence Cancellation in PALS */}
              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/90 text-xs text-zinc-700 space-y-1">
                <div className="font-bold text-[#0E2342]">
                  Post-Departure Obligation: Cancelling Your Dog&apos;s Singapore Licence (PALS)
                </div>
                <p className="leading-relaxed text-zinc-600">
                  Under the Animals and Birds (Dog Licensing and Control) Rules, pet owners are legally required to notify AVS when an animal has left Singapore permanently. Within 28 days of export, log into the <strong>AVS Pet Animal Licensing System (PALS)</strong> via Singpass on GoBusiness, select &ldquo;Cancel Licence&rdquo;, choose &ldquo;Exported Overseas&rdquo;, and upload your AVS Export Licence or air waybill. Failure to update PALS may result in continuing annual licence renewal reminders and administrative fines.
                </p>
              </div>
            </section>

            {/* ─── SECTION 4: CHOOSING A PET SHIPPER ────────────────── */}
            <section id="pet-shipper" className="scroll-mt-20 space-y-6">
              <div className="border-b border-zinc-200 pb-4">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                  Step 4 &bull; Logistics &amp; Transport
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E2342]">
                  Choosing a Pet Shipper
                </h2>
              </div>

              <p className="text-sm sm:text-base text-zinc-700 leading-relaxed">
                Relocating a companion animal internationally involves complex freight logistics, airport customs transfers, and airline safety compliance. Most international airlines operating out of Singapore Changi Airport (SIN)—including Singapore Airlines, British Airways, and Emirates—require live animals to be booked as <strong>manifest cargo</strong> through an accredited member of the <strong>International Pet and Animal Transportation Association (IPATA)</strong>.
              </p>

              {/* Why use a shipper vs DIY */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-zinc-200/90 shadow-2xs">
                  <h3 className="font-bold text-sm text-[#0E2342] mb-2 flex items-center gap-1.5">
                    <span className="text-emerald-700">✓</span> What an IPATA Pet Shipper Handles
                  </h3>
                  <ul className="text-xs text-zinc-600 space-y-2 leading-relaxed">
                    <li>&bull; Booking manifest cargo flight space with airline live animal desks</li>
                    <li>&bull; IATA-compliant travel crate procurement and custom wooden sizing</li>
                    <li>&bull; Direct liaising with AVS officers for physical certificate endorsement</li>
                    <li>&bull; Pre-flight handling at Changi CAPQ and delivery to the cargo terminal</li>
                    <li>&bull; Transit liaison for pets connecting through European, Middle Eastern, or Asian hubs</li>
                    <li>&bull; Destination customs clearance and quarantine intake coordination</li>
                  </ul>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-zinc-200/90 shadow-2xs">
                  <h3 className="font-bold text-sm text-[#0E2342] mb-2 flex items-center gap-1.5">
                    <span className="text-amber-700">!</span> Key Questions to Ask Your Singapore Shipper
                  </h3>
                  <ul className="text-xs text-zinc-600 space-y-2 leading-relaxed">
                    <li>&bull; Are you a registered IPATA member with active Changi airport passes?</li>
                    <li>&bull; Does the quote include AVS export licence fees ($50) and endorsement fees ($23)?</li>
                    <li>&bull; Will you handle the CAPQ pre-export physical inspection appointment?</li>
                    <li>&bull; What are the contingency protocols if flight delays or weather holds occur?</li>
                    <li>&bull; Does the quote cover destination terminal handling and clearance charges?</li>
                    <li>&bull; Which airline routing do you recommend to minimize tarmac layover stress?</li>
                  </ul>
                </div>
              </div>

              {/* Cost Breakdown Table */}
              <div className="bg-white rounded-2xl border border-zinc-200/90 shadow-2xs overflow-hidden">
                <div className="p-4 bg-zinc-50 border-b border-zinc-200/80">
                  <h3 className="font-bold text-sm text-[#0E2342]">
                    Realistic Cost Breakdown for Pet Export From Singapore (SGD)
                  </h3>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Estimated statutory government charges, veterinary clinical expenses, and freight ranges.
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-zinc-100/70 border-b border-zinc-200 text-zinc-700 font-semibold">
                        <th className="p-3">Expense Category</th>
                        <th className="p-3">Fee / Cost Range</th>
                        <th className="p-3">Payee / Authority</th>
                        <th className="p-3">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 text-zinc-700">
                      <tr>
                        <td className="p-3 font-semibold text-zinc-900">AVS Export Licence</td>
                        <td className="p-3 font-mono font-semibold text-zinc-900">SGD $50</td>
                        <td className="p-3 text-zinc-600">AVS / GoBusiness</td>
                        <td className="p-3 text-zinc-600">Standard application (SGD $100 for express 3-day turnaround)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-zinc-900">AVS Health Cert Endorsement</td>
                        <td className="p-3 font-mono font-semibold text-zinc-900">SGD $23</td>
                        <td className="p-3 text-zinc-600">AVS NParks</td>
                        <td className="p-3 text-zinc-600">Official government endorsement fee per health document</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-zinc-900">Veterinary Exam &amp; Treatments</td>
                        <td className="p-3 font-mono font-semibold text-zinc-900">SGD $250 – $600</td>
                        <td className="p-3 text-zinc-600">Private Singapore Vet Clinic</td>
                        <td className="p-3 text-zinc-600">Clinical wellness exam, rabies booster, microchip check, parasite doses</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-zinc-900">Rabies Titer (RNATT) Test</td>
                        <td className="p-3 font-mono font-semibold text-zinc-900">SGD $350 – $550</td>
                        <td className="p-3 text-zinc-600">Approved Reference Lab</td>
                        <td className="p-3 text-zinc-600">Mandatory for Australia, NZ, South Africa (blood draw &amp; serology)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-zinc-900">IATA Live Animals Crate</td>
                        <td className="p-3 font-mono font-semibold text-zinc-900">SGD $150 – $600</td>
                        <td className="p-3 text-zinc-600">Pet Shipper / Retailer</td>
                        <td className="p-3 text-zinc-600">IATA Container Requirement #1 compliant rigid plastic or wood crate</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-zinc-900">Airfreight Cargo (Changi SIN)</td>
                        <td className="p-3 font-mono font-semibold text-zinc-900">SGD $1,500 – $5,500+</td>
                        <td className="p-3 text-zinc-600">Airline Live Cargo Desk</td>
                        <td className="p-3 text-zinc-600">Manifest cargo rate based on volumetric weight (crate size &amp; weight)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-zinc-900">Professional Shipper Fee</td>
                        <td className="p-3 font-mono font-semibold text-zinc-900">SGD $1,200 – $2,500</td>
                        <td className="p-3 text-zinc-600">IPATA Relocation Agent</td>
                        <td className="p-3 text-zinc-600">Document filing, AVS courier, CAPQ handling, airport transfer coordination</td>
                      </tr>
                    </tbody>
                  </table>
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
                  Frequently Asked Questions About Pet Export From Singapore
                </h2>
              </div>

              <p className="text-sm text-zinc-600">
                Official regulatory answers regarding AVS export licences, pre-export veterinary procedures, Changi CAPQ inspections, and airline regulations.
              </p>

              <div className="bg-white rounded-2xl border border-zinc-200/90 shadow-2xs p-4 sm:p-6">
                <FaqAccordion items={SINGAPORE_EXPORT_FAQS} />
              </div>
            </section>

          </main>

          {/* Right Sidebar (4 cols) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Interactive Checker Sticky Card */}
            <div className="bg-white rounded-2xl border border-zinc-200/90 p-5 shadow-sm space-y-4 lg:sticky lg:top-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs border border-emerald-200/80">
                  🇸🇬
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#0E2342]">
                    Verify Your Outbound Route
                  </h3>
                  <span className="text-[11px] text-zinc-500">
                    Leaving Singapore with a dog or cat?
                  </span>
                </div>
              </div>

              <p className="text-xs text-zinc-600 leading-relaxed">
                Check destination biosecurity rules, AVS export licence timelines, and mandatory microchip/titer windows instantly with PawValid.
              </p>

              <div className="space-y-2 pt-1">
                <Link
                  href="/checker?origin=SG"
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-[#0E2342] hover:bg-[#16345E] text-white text-xs font-semibold py-2.5 px-4 rounded-xl shadow-xs transition-all text-center"
                >
                  <span>Start Outbound Route Audit →</span>
                </Link>
                <Link
                  href="/pet-travel-certificate"
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 border border-zinc-200 text-xs font-semibold py-2 px-4 rounded-xl transition-all text-center"
                >
                  <span>Select Destination Certificate</span>
                </Link>
              </div>

              {/* Related Singapore Guides */}
              <div className="pt-4 border-t border-zinc-100 space-y-2">
                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                  Related Singapore Guides
                </span>
                <ul className="text-xs space-y-2 text-zinc-600">
                  <li>
                    <Link
                      href="/en/import-pet-to-singapore"
                      className="text-emerald-700 hover:text-emerald-800 font-medium hover:underline flex items-center gap-1"
                    >
                      <span>→</span>
                      <span>Importing Pets to Singapore (AVS Guide)</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/en/importing-cats-to-singapore"
                      className="text-emerald-700 hover:text-emerald-800 font-medium hover:underline flex items-center gap-1"
                    >
                      <span>→</span>
                      <span>Importing Cats to Singapore (NParks Cat Framework)</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/en/pet-immigration-requirements-by-country"
                      className="text-emerald-700 hover:text-emerald-800 font-medium hover:underline flex items-center gap-1"
                    >
                      <span>→</span>
                      <span>Global Pet Immigration by Country</span>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Official Authority Links */}
              <div className="pt-3 border-t border-zinc-100 text-[11px] text-zinc-500 space-y-1">
                <div className="font-semibold text-zinc-700">Official Singapore Portals:</div>
                <div>&bull; <a href="https://www.nparks.gov.sg/avs" target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-zinc-900 underline">AVS / NParks Singapore</a></div>
                <div>&bull; <a href="https://www.gobusiness.gov.sg" target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-zinc-900 underline">GoBusiness Licensing Portal</a></div>
                <div>&bull; <a href="https://pals.avs.gov.sg" target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-zinc-900 underline">AVS PALS Dog Licensing</a></div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
