import Link from 'next/link';
import type { Metadata } from 'next';
import FaqAccordion from '@/components/FaqAccordion';
import {
  getBreadcrumbSchema,
  getFaqSchema,
  getMedicalWebPageSchema,
  getSoftwareApplicationSchema,
} from '@/lib/seo/schema';
import { getHreflangAlternates } from '@/lib/seo/hreflang';

export const metadata: Metadata = {
  title: 'How to Import a Pet to Singapore: 2026 AVS Requirements, Licence & Quarantine | PawValid',
  description:
    'Complete statutory guide to importing a pet to Singapore under Animal & Veterinary Service (AVS / NParks) regulations. Step-by-step instructions for GoBusiness import licences, Category A-D quarantine rules, RNATT rabies titers, Sembawang booking, breed restrictions, and costs.',
  keywords: [
    'import pet to singapore',
    'singapore pet import requirements',
    'AVS import licence',
    'bring dog to singapore',
    'singapore pet quarantine',
    'animal and veterinary service singapore',
    'gobusiness pet import licence',
    'import dog into singapore',
    'sembawang animal quarantine station',
    'singapore pet entry rules',
    'pet travel to singapore',
    'RNATT rabies titer singapore',
  ],
  alternates: getHreflangAlternates('/import-pet-to-singapore'),
  openGraph: {
    title: 'How to Import a Pet to Singapore: Official AVS & NParks Guide (2026) | PawValid',
    description:
      'Step-by-step master guide to bringing dogs and cats into Singapore. Master AVS country categories, GoBusiness electronic licences, quarantine booking at Sembawang, and biosecurity checklists.',
    url: 'https://pawvalid.online/en/import-pet-to-singapore',
    siteName: 'PawValid',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Import a Pet to Singapore (2026 AVS Guide) | PawValid',
    description:
      'Everything you need to know about importing a dog or cat to Singapore — AVS categories, GoBusiness licences, Sembawang quarantine, costs, and timeline.',
  },
};

const SINGAPORE_IMPORT_FAQS = [
  {
    q: 'What are the 4 country categories for importing pets to Singapore?',
    a: 'The Animal & Veterinary Service (AVS) classifies exporting countries into four risk tiers: Category A (rabies-free: Australia, New Zealand, UK, Ireland — 0 days quarantine, no rabies titer required); Category B (rabies-controlled: Cayman Islands, Hong Kong, Japan, Norway, Sweden, Switzerland, Taiwan, USA [Hawaii and Guam only] — 0 days quarantine with valid rabies vaccination); Category C (e.g. USA mainland, Canada, European Union member states — 10 to 30 days quarantine or direct release under specific C1 residency conditions with RNATT titer); and Category D (high-risk rabies countries: India, China, Philippines, UAE, and all unlisted nations — mandatory RNATT titer test and 30 days quarantine at Sembawang).',
  },
  {
    q: 'How do I apply for an AVS Import Licence on GoBusiness Singapore?',
    a: 'You must submit an application for an AVS Electronic Import Licence through the Singapore GoBusiness Licensing portal within 30 days prior to your pet’s scheduled arrival date. The licence costs SGD $50 per animal (with an optional express fee of SGD $100 for urgent processing within 3 working days) and remains valid for 30 days from issuance. You must upload your pet’s microchip record, vaccination history, RNATT titer laboratory report (if applicable), and confirmed Sembawang quarantine reservation code (if coming from Category C or D).',
  },
  {
    q: 'How far in advance must I reserve quarantine space at Sembawang Animal Quarantine Station (SAQS)?',
    a: 'Because the Animal Quarantine Centre (AQC / SAQS) in Sembawang has strictly limited kennel and cattery capacity, quarantine accommodations must be booked through the online Quarantine Management System (QMS) at least 3 to 4 months prior to your intended arrival date. You cannot secure an AVS Import Licence for Category C or D pets without an active QMS reservation booking code.',
  },
  {
    q: 'What rabies titer blood test (RNATT) score is required for Singapore?',
    a: 'For pets arriving from Category C and Category D origin countries, a Rabies Neutralising Antibody Titre (RNATT / FAVN) serological blood test confirming an antibody level of at least 0.50 IU/mL is mandatory. The blood sample must be drawn at least 30 days after the qualifying rabies vaccination and between 30 days and 6 months prior to departure. The test must be processed by an AVS-recognized international reference laboratory.',
  },
  {
    q: 'Which dog breeds are strictly prohibited from entering Singapore?',
    a: 'Under the Animals and Birds Act, AVS strictly prohibits the following dog breeds (and their crosses) from importation into Singapore: Pit Bull Terriers (including American Pit Bull Terrier, American Staffordshire Terrier, Staffordshire Bull Terrier, American Bully), Akita, Tosa, Dogo Argentino, Fila Brasileiro, Boerboel, Neapolitan Mastiff, and any first-to-fourth generation (F1–F4) Bengal or Savannah hybrid cats.',
  },
  {
    q: 'What are the housing restrictions for dogs in Singapore HDB government flats?',
    a: 'Under Housing & Development Board (HDB) regulations, residents of HDB flats are permitted to keep only one approved dog per household. The dog must belong to an approved small breed (maximum shoulder height of 50 cm and maximum body weight of 15 kg), or be a larger local mixed-breed dog adopted under the official Project ADORE scheme. In private residential condominiums and landed properties, up to three dogs are permitted per household.',
  },
  {
    q: 'How much does it cost to import a pet into Singapore in total?',
    a: 'Total costs generally range between SGD $2,500 and $6,500+ depending on the origin country and quarantine requirements. Essential government fees include: AVS Import Licence ($50), CAPQ Changi Airport Inspection ($25–$80), Dog Licence ($15–$90/year), and Sembawang Quarantine ($24.20–$34.10/day for kennels, totaling approx. $750–$1,050 for 30 days). Additional private costs include veterinary clinical exams, USDA/CFIA endorsement, RNATT laboratory testing, IATA-compliant crates, and international manifest air freight ($1,500–$4,000+).',
  },
  {
    q: 'When must the final clinical health examination and AVS Veterinary Health Certificate be completed?',
    a: 'The official Singapore AVS Veterinary Health Certificate must be completed and signed by an accredited veterinarian strictly within 7 days prior to departure. During this examination, the veterinarian must verify the 15-digit ISO microchip, certify freedom from infectious clinical disease, and administer mandatory internal parasite treatment (Praziquantel) and external parasite treatment (Fipronil or permethrin) administered between 2 and 7 days before departure.',
  },
];

export default function ImportPetToSingaporePage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Countries', url: '/en/countries' },
    { name: 'Singapore', url: '/en/countries/singapore' },
    { name: 'How to Import a Pet to Singapore', url: '/en/import-pet-to-singapore' },
  ];

  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);
  const faqSchema = getFaqSchema(SINGAPORE_IMPORT_FAQS);
  const medicalSchema = getMedicalWebPageSchema({
    name: 'How to Import a Pet to Singapore: Official AVS & NParks Biosecurity Guide',
    description:
      'Comprehensive statutory guidance for importing companion animals into Singapore under AVS Animals and Birds Act rules.',
    url: '/en/import-pet-to-singapore',
    authority: 'Animal & Veterinary Service (AVS / NParks Singapore)',
    authorityUrl: 'https://www.nparks.gov.sg/avs',
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
            <Link href="/en/countries" className="hover:text-zinc-900 transition-colors">
              Countries
            </Link>
            <span className="text-zinc-300">/</span>
            <Link href="/en/countries/singapore" className="hover:text-zinc-900 transition-colors">
              Singapore
            </Link>
            <span className="text-zinc-300">/</span>
            <span className="font-semibold text-zinc-900">
              Import Pet to Singapore
            </span>
          </nav>
          <div className="inline-flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80 text-[11px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>2026 AVS / NParks Singapore Biosecurity Framework</span>
          </div>
        </div>
      </div>

      {/* ─── HERO SECTION ────────────────────────────────────────────── */}
      <section className="bg-white border-b border-zinc-200/80 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200/80 text-xs font-bold uppercase tracking-wider mb-4">
              <span>Sovereign Biosecurity Protocol</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0E2342] tracking-tight leading-tight mb-4">
              How to Import a Pet to Singapore
            </h1>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed mb-6">
              Relocating a dog or cat to Singapore is governed by the <strong>Animal &amp; Veterinary Service (AVS)</strong>, a cluster of the National Parks Board (NParks), under the statutory authority of the <em>Animals and Birds Act (Chapter 7)</em>. Because Singapore is an officially recognized rabies-free island nation, its biosecurity laws enforce strict country-of-origin categories, advance <strong>AVS import licences</strong>, mandatory rabies blood titer (RNATT) testing, microchip sequencing, and post-entry quarantine at the Sembawang Animal Quarantine Station (SAQS). This master guide outlines every statutory requirement, procedural timeline, and cost breakdown to ensure compliant entry.
            </p>

            {/* Reviewer Trust Banner */}
            <div className="flex items-center gap-3 p-3.5 bg-[#F8FAFB] border border-zinc-200/80 rounded-xl text-xs text-zinc-600 mb-8">
              <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 font-bold shrink-0">
                SM
              </div>
              <div className="flex-1 leading-snug">
                <span className="font-bold text-zinc-900">Statutorily &amp; Medically Reviewed</span> by Dr. Sarah Miller, DVM &bull; Verified against AVS NParks Pet Import Directives, GoBusiness Licensing Protocols, and WOAH Rabies Standards (Updated October 2026).
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              <div className="bg-[#F8FAFB] rounded-xl p-4 border border-zinc-200/80">
                <span className="text-[11px] font-semibold text-zinc-500 block uppercase">
                  Quarantine Window
                </span>
                <strong className="text-xl font-bold text-zinc-900 mt-1 block">
                  0 to 30 Days
                </strong>
                <span className="text-[11px] text-zinc-500 mt-0.5 block">
                  Category A–D tiered
                </span>
              </div>
              <div className="bg-[#F8FAFB] rounded-xl p-4 border border-zinc-200/80">
                <span className="text-[11px] font-semibold text-zinc-500 block uppercase">
                  Import Licence
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
                  Rabies Titer (RNATT)
                </span>
                <strong className="text-xl font-bold text-zinc-900 mt-1 block">
                  ≥ 0.50 IU/mL
                </strong>
                <span className="text-[11px] text-zinc-500 mt-0.5 block">
                  Mandatory Category C &amp; D
                </span>
              </div>
              <div className="bg-[#F8FAFB] rounded-xl p-4 border border-zinc-200/80">
                <span className="text-[11px] font-semibold text-zinc-500 block uppercase">
                  Lead Time
                </span>
                <strong className="text-xl font-bold text-zinc-900 mt-1 block">
                  3 to 6 Months
                </strong>
                <span className="text-[11px] text-zinc-500 mt-0.5 block">
                  Quarantine &amp; titer dependent
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
                  href="#eligibility-categories"
                  className="bg-white px-3 py-1.5 rounded-lg border border-zinc-200/90 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors font-medium"
                >
                  1. Eligibility &amp; Country Categories
                </a>
                <a
                  href="#step-by-step-process"
                  className="bg-white px-3 py-1.5 rounded-lg border border-zinc-200/90 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors font-medium"
                >
                  2. Step-by-Step Import Process
                </a>
                <a
                  href="#quarantine-at-arrival"
                  className="bg-white px-3 py-1.5 rounded-lg border border-zinc-200/90 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors font-medium"
                >
                  3. Quarantine at Arrival (Sembawang)
                </a>
                <a
                  href="#breed-restrictions-licensing"
                  className="bg-white px-3 py-1.5 rounded-lg border border-zinc-200/90 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors font-medium"
                >
                  4. Breed Restrictions &amp; Dog Licensing
                </a>
                <a
                  href="#costs-and-timeline"
                  className="bg-white px-3 py-1.5 rounded-lg border border-zinc-200/90 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors font-medium"
                >
                  5. Costs &amp; Preparation Timeline
                </a>
                <a
                  href="#singapore-faqs"
                  className="bg-white px-3 py-1.5 rounded-lg border border-zinc-200/90 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors font-medium"
                >
                  6. Frequently Asked Questions
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 1: ELIGIBILITY & COUNTRY CATEGORIES ─────────────── */}
      <section id="eligibility-categories" className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
              AVS Risk Classification
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E2342] tracking-tight mb-3">
              Eligibility and Country Categories
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              To <strong>import a pet to Singapore</strong>, you must first determine the biosecurity category of your exporting country. The Singapore Animal &amp; Veterinary Service (AVS) divides all global origins into four distinct risk categories based on their national rabies surveillance and control status.
            </p>
          </div>

          {/* Master AVS Categories Table */}
          <div className="overflow-x-auto rounded-2xl border border-zinc-200/90 shadow-2xs mb-12">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#0E2342] text-white">
                  <th className="py-4 px-4 font-bold uppercase tracking-wider text-[11px] border-r border-white/10">
                    AVS Category
                  </th>
                  <th className="py-4 px-4 font-bold uppercase tracking-wider text-[11px] border-r border-white/10">
                    Qualifying Origin Countries
                  </th>
                  <th className="py-4 px-4 font-bold uppercase tracking-wider text-[11px] border-r border-white/10">
                    Quarantine Duration
                  </th>
                  <th className="py-4 px-4 font-bold uppercase tracking-wider text-[11px] border-r border-white/10">
                    Rabies Titer (RNATT)
                  </th>
                  <th className="py-4 px-4 font-bold uppercase tracking-wider text-[11px]">
                    Min. Prep Lead Time
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200/80 bg-white text-zinc-800">
                <tr className="hover:bg-zinc-50/50 transition-colors">
                  <td className="py-4 px-4 font-bold text-zinc-900 bg-zinc-50/50">
                    Category A
                    <span className="block text-[10px] text-emerald-700 font-semibold uppercase mt-0.5">
                      Rabies-Free Nations
                    </span>
                  </td>
                  <td className="py-4 px-4 leading-relaxed font-medium">
                    Australia, New Zealand, Republic of Ireland, United Kingdom (Great Britain &amp; Northern Ireland).
                  </td>
                  <td className="py-4 px-4 font-bold text-emerald-700">
                    0 Days (Direct Release)
                  </td>
                  <td className="py-4 px-4 text-zinc-600">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-zinc-100 text-zinc-700">
                      Exempt
                    </span>
                  </td>
                  <td className="py-4 px-4 font-semibold text-zinc-900">
                    30 to 45 Days
                  </td>
                </tr>

                <tr className="hover:bg-zinc-50/50 transition-colors">
                  <td className="py-4 px-4 font-bold text-zinc-900 bg-zinc-50/50">
                    Category B
                    <span className="block text-[10px] text-blue-700 font-semibold uppercase mt-0.5">
                      Rabies-Controlled
                    </span>
                  </td>
                  <td className="py-4 px-4 leading-relaxed font-medium">
                    Cayman Islands, Hong Kong, Japan, Norway, Sweden, Switzerland, Taiwan, USA (Hawaii and Guam only).
                  </td>
                  <td className="py-4 px-4 font-bold text-emerald-700">
                    0 Days (Direct Release)
                  </td>
                  <td className="py-4 px-4 text-zinc-600">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-zinc-100 text-zinc-700">
                      Exempt
                    </span>
                    <span className="block text-[10px] text-zinc-500 mt-0.5">Rabies vaccine mandatory</span>
                  </td>
                  <td className="py-4 px-4 font-semibold text-zinc-900">
                    30 to 60 Days
                  </td>
                </tr>

                <tr className="hover:bg-zinc-50/50 transition-colors">
                  <td className="py-4 px-4 font-bold text-zinc-900 bg-zinc-50/50">
                    Category C
                    <span className="block text-[10px] text-amber-700 font-semibold uppercase mt-0.5">
                      Low-Risk &amp; EU
                    </span>
                  </td>
                  <td className="py-4 px-4 leading-relaxed font-medium">
                    Austria, Belgium, Canada, Cyprus, Denmark, Finland, France, Germany, Italy, Netherlands, Spain, United States (Mainland 48 States &amp; Alaska).
                  </td>
                  <td className="py-4 px-4 font-semibold text-amber-900">
                    10 to 30 Days Mandatory
                    <span className="block text-[10px] text-zinc-500 font-normal mt-0.5">10d under C1 rules, 30d under C2</span>
                  </td>
                  <td className="py-4 px-4 text-zinc-600">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-800 border border-purple-200/80">
                      Mandatory (≥ 0.5 IU/mL)
                    </span>
                    <span className="block text-[10px] text-zinc-500 mt-0.5">Drawn 30d–6mo before flight</span>
                  </td>
                  <td className="py-4 px-4 font-semibold text-zinc-900">
                    3 to 4 Months (QMS booking)
                  </td>
                </tr>

                <tr className="hover:bg-zinc-50/50 transition-colors">
                  <td className="py-4 px-4 font-bold text-zinc-900 bg-zinc-50/50">
                    Category D
                    <span className="block text-[10px] text-red-700 font-semibold uppercase mt-0.5">
                      High-Risk &amp; Unlisted
                    </span>
                  </td>
                  <td className="py-4 px-4 leading-relaxed font-medium">
                    All other unlisted countries worldwide (including India, China, Philippines, UAE, Indonesia, Thailand, South Africa, Brazil).
                  </td>
                  <td className="py-4 px-4 font-bold text-red-700">
                    30 Days Mandatory
                    <span className="block text-[10px] text-zinc-500 font-normal mt-0.5">At Sembawang Quarantine (SAQS)</span>
                  </td>
                  <td className="py-4 px-4 text-zinc-600">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-800 border border-purple-200/80">
                      Mandatory (≥ 0.5 IU/mL)
                    </span>
                    <span className="block text-[10px] text-zinc-500 mt-0.5">Strict multi-vaccine history</span>
                  </td>
                  <td className="py-4 px-4 font-semibold text-zinc-900">
                    4 to 6 Months
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Continuous Residency Rule Callout */}
          <div className="bg-[#F8FAFB] rounded-2xl p-6 border border-zinc-200/80 text-xs text-zinc-700 mb-8">
            <h4 className="font-serif text-base font-bold text-[#0E2342] mb-1.5">
              Crucial: The AVS Continuous Residency Requirement
            </h4>
            <p className="leading-relaxed text-zinc-600">
              To qualify for the entry conditions of Category A, B, or C, your pet must have been <strong>continuously resident in the exporting country for at least 6 months prior to export</strong> (or since birth if under 6 months old). If your pet recently relocated through a higher-risk country, AVS will automatically downgrade the pet’s status to the highest-risk country visited, subjecting the animal to mandatory 30-day quarantine.
            </p>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: STEP-BY-STEP ─────────────────────────────────── */}
      <section
        id="step-by-step-process"
        className="py-12 sm:py-16 bg-white border-y border-zinc-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
              Official Workflow
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E2342] tracking-tight mb-3">
              Step-by-Step Pet Import Process
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Navigating the statutory process to <strong>bring a dog to Singapore</strong> or import a cat requires completing three critical phases in chronological sequence.
            </p>
          </div>

          <div className="space-y-8 mb-12">
            {/* Step 1: Apply for an Import Licence */}
            <div className="bg-[#F8FAFB] rounded-2xl p-6 sm:p-8 border border-zinc-200/80">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-4 mb-4 border-b border-zinc-200/80">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
                    Phase 1 &bull; Digital Regulatory Filing
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0E2342]">
                    Apply for an import licence
                  </h3>
                </div>
                <span className="self-start md:self-center px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-xs font-semibold">
                  GoBusiness Singapore Portal
                </span>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-zinc-600 leading-relaxed">
                <p>
                  Every pet entering Singapore strictly requires an official <strong>AVS Import Licence</strong> issued by NParks. Commercial airlines will refuse check-in and boarding pass issuance without validating this document.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="bg-white p-4 rounded-xl border border-zinc-200/80 space-y-2">
                    <strong className="text-zinc-900 block font-bold text-xs uppercase tracking-wider">
                      Application Protocol
                    </strong>
                    <ul className="space-y-1.5 text-xs text-zinc-600">
                      <li>• Applied online via Singapore <strong>GoBusiness Licensing</strong>.</li>
                      <li>• Standard statutory fee: <strong>SGD $50</strong> per animal.</li>
                      <li>• Validity: Strictly <strong>30 days</strong> from date of issuance.</li>
                      <li>• Express processing available for an additional SGD $100.</li>
                    </ul>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-zinc-200/80 space-y-2">
                    <strong className="text-zinc-900 block font-bold text-xs uppercase tracking-wider">
                      Required Upload Attachments
                    </strong>
                    <ul className="space-y-1.5 text-xs text-zinc-600">
                      <li>• 15-digit ISO 11784/11785 microchip certificate.</li>
                      <li>• Official vaccination records (DHPP / FVRCP + Rabies).</li>
                      <li>• RNATT rabies blood titer laboratory report (Category C/D).</li>
                      <li>• Confirmed QMS Sembawang quarantine reservation code.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Prepare Health and Vaccination Records */}
            <div className="bg-[#F8FAFB] rounded-2xl p-6 sm:p-8 border border-zinc-200/80">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-4 mb-4 border-b border-zinc-200/80">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
                    Phase 2 &bull; Veterinary Clinical Preparation
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0E2342]">
                    Prepare health and vaccination records
                  </h3>
                </div>
                <span className="self-start md:self-center px-3 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200/80 text-xs font-semibold">
                  Accredited Vet &amp; Endorsement
                </span>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-zinc-600 leading-relaxed">
                <p>
                  Singapore enforces strict chronological rules for veterinary medical ledgers. All medical treatments must strictly follow this order:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="bg-white p-4 rounded-xl border border-zinc-200/80 space-y-2">
                    <strong className="text-zinc-900 block font-bold text-xs">
                      1. ISO Microchipping
                    </strong>
                    <p className="text-xs text-zinc-600">
                      Must be a 15-digit ISO 11784/11785 chip operating at 134.2 kHz. Must be implanted <em>before</em> any qualifying vaccines or titer draws.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-zinc-200/80 space-y-2">
                    <strong className="text-zinc-900 block font-bold text-xs">
                      2. Core Vaccines &amp; RNATT
                    </strong>
                    <p className="text-xs text-zinc-600">
                      Dogs: DHPP (Distemper, Hepatitis, Parvovirus, Parainfluenza). Cats: FVRCP. Rabies vaccine given ≥30 days before flight. RNATT titer (≥0.50 IU/mL) for Cat C/D.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-zinc-200/80 space-y-2">
                    <strong className="text-zinc-900 block font-bold text-xs">
                      3. Parasites &amp; AVS Health Cert
                    </strong>
                    <p className="text-xs text-zinc-600">
                      Within 7 days of departure: clinical exam + AVS Health Cert signed by accredited vet and endorsed by USDA/CFIA. Parasite treatments given 2–7 days before flight.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Book Flight and Quarantine */}
            <div className="bg-[#F8FAFB] rounded-2xl p-6 sm:p-8 border border-zinc-200/80">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-4 mb-4 border-b border-zinc-200/80">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
                    Phase 3 &bull; Aviation Logistics &amp; Port Inspection
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0E2342]">
                    Book flight and quarantine
                  </h3>
                </div>
                <span className="self-start md:self-center px-3 py-1 rounded-full bg-purple-50 text-purple-800 border border-purple-200/80 text-xs font-semibold">
                  QMS &amp; CAPQ Changi Booking
                </span>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-zinc-600 leading-relaxed">
                <p>
                  Quarantine and flight booking must be coordinated with precision to prevent transit bottlenecks:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="bg-white p-4 rounded-xl border border-zinc-200/80 space-y-2">
                    <strong className="text-zinc-900 block font-bold text-xs uppercase tracking-wider">
                      Quarantine Space Booking (QMS)
                    </strong>
                    <p className="text-xs text-zinc-600">
                      Reserve space at Sembawang Animal Quarantine Station via the <strong>Quarantine Management System (QMS)</strong> online portal 3–4 months in advance. Select kennel/cattery accommodation and lock in your arrival date.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-zinc-200/80 space-y-2">
                    <strong className="text-zinc-900 block font-bold text-xs uppercase tracking-wider">
                      CAPQ Changi Airport Inspection Appointment
                    </strong>
                    <p className="text-xs text-zinc-600">
                      Book an official post-arrival veterinary inspection at the <strong>Changi Animal &amp; Plant Quarantine Station (CAPQ)</strong> at least <strong>5 working days</strong> prior to arrival via the online AVS portal.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: QUARANTINE AT ARRIVAL ─────────────────────────── */}
      <section id="quarantine-at-arrival" className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
              Border Biosecurity Clearance
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E2342] tracking-tight mb-3">
              Quarantine at Arrival (Sembawang SAQS)
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              When your flight lands at Singapore Changi Airport (SIN), your pet is transferred to the <strong>Changi Animal &amp; Plant Quarantine Station (CAPQ)</strong> located within the Changi Airfreight Centre for official veterinary clearance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* CAPQ Clearance */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-zinc-200/80 shadow-2xs space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#0E2342]">
                1. Changi Airport (CAPQ) Port-of-Entry Inspection
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                AVS veterinary officers at CAPQ perform an immediate documentary and physical audit:
              </p>
              <ul className="space-y-2 text-xs text-zinc-700">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold shrink-0">✓</span>
                  <span><strong>Microchip Verification:</strong> The officer scans the transponder and checks it against the AVS Import Licence and endorsed health certificate.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold shrink-0">✓</span>
                  <span><strong>Clinical Health Exam:</strong> Physical inspection for signs of infectious disease, fever, or external parasites.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold shrink-0">✓</span>
                  <span><strong>Release vs Transit:</strong> Category A/B pets are released immediately to owners. Category C/D pets are transferred under official AVS customs escort to Sembawang.</span>
                </li>
              </ul>
            </div>

            {/* Sembawang Facilities */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-zinc-200/80 shadow-2xs space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#0E2342]">
                2. Life at Sembawang Animal Quarantine Station (SAQS)
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                The Animal Quarantine Centre in Sembawang is a modern, high-standard biosecurity facility:
              </p>
              <ul className="space-y-2 text-xs text-zinc-700">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold shrink-0">✓</span>
                  <span><strong>Accommodation Options:</strong> Standard ventilated kennels or air-conditioned rooms with private outdoor runs. Cattery rooms have multi-level shelving.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold shrink-0">✓</span>
                  <span><strong>Owner Visitation:</strong> Pet owners may visit their animals during official visiting hours (Mon–Fri 4:00 PM – 6:00 PM; Sat 2:00 PM – 6:00 PM).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold shrink-0">✓</span>
                  <span><strong>Daily Care &amp; Feeding:</strong> Commercial premium dry/wet food provided, or owners may supply specialized veterinary diets.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: BREED RESTRICTIONS & DOG LICENSING ───────────── */}
      <section
        id="breed-restrictions-licensing"
        className="py-12 sm:py-16 bg-white border-y border-zinc-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
              Municipal &amp; Housing Compliance
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E2342] tracking-tight mb-3">
              Breed Restrictions and Dog Licensing
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Importing a pet into Singapore requires full compliance with both statutory breed import bans and municipal residential housing bylaws (HDB vs. private condominium rules).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* Prohibited Breeds */}
            <div className="bg-[#F8FAFB] rounded-2xl p-6 sm:p-8 border border-zinc-200/80 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-red-700 block">
                Banned from Importation
              </span>
              <h3 className="font-serif text-lg font-bold text-zinc-900">
                Prohibited Dog &amp; Cat Breeds
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                The following breeds (and their crosses) are strictly prohibited from entering Singapore under any circumstances:
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs text-zinc-700 font-medium">
                <div className="bg-white p-2.5 rounded-lg border border-zinc-200/80">• Pit Bull Terriers</div>
                <div className="bg-white p-2.5 rounded-lg border border-zinc-200/80">• American Bully</div>
                <div className="bg-white p-2.5 rounded-lg border border-zinc-200/80">• Akita</div>
                <div className="bg-white p-2.5 rounded-lg border border-zinc-200/80">• Tosa</div>
                <div className="bg-white p-2.5 rounded-lg border border-zinc-200/80">• Dogo Argentino</div>
                <div className="bg-white p-2.5 rounded-lg border border-zinc-200/80">• Fila Brasileiro</div>
                <div className="bg-white p-2.5 rounded-lg border border-zinc-200/80">• Boerboel</div>
                <div className="bg-white p-2.5 rounded-lg border border-zinc-200/80">• Neapolitan Mastiff</div>
                <div className="bg-white p-2.5 rounded-lg border border-zinc-200/80 col-span-2">• F1–F4 Bengal &amp; Savannah Cats</div>
              </div>
            </div>

            {/* Dog Licensing & HDB Rules */}
            <div className="bg-[#F8FAFB] rounded-2xl p-6 sm:p-8 border border-zinc-200/80 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 block">
                AVS Licensing &amp; Housing Laws
              </span>
              <h3 className="font-serif text-lg font-bold text-zinc-900">
                Dog Licensing &amp; HDB Housing Regulations
              </h3>
              <div className="space-y-3 text-xs text-zinc-600 leading-relaxed">
                <p>
                  <strong>Mandatory Dog Licence:</strong> All dogs residing in Singapore must be licensed with AVS via the Pet Animal Licensing System (PALS) on GoBusiness. One-time licensing fees for sterilized dogs are SGD $35 (or $15/year for non-sterilized).
                </p>
                <div className="bg-white p-3.5 rounded-xl border border-zinc-200/80 space-y-1.5">
                  <strong className="text-zinc-900 block font-bold">HDB Flat Housing Limits:</strong>
                  <p>
                    HDB government flats allow strictly <strong>1 approved dog per flat</strong>, limited to 62 approved small breeds (max shoulder height 50 cm, max weight 15 kg), or larger dogs adopted through Project ADORE.
                  </p>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-zinc-200/80 space-y-1.5">
                  <strong className="text-zinc-900 block font-bold">Private Condos &amp; Landed Properties:</strong>
                  <p>
                    Residents of private apartments and landed homes may keep up to <strong>3 dogs per household</strong>, subject to individual condo management (MCST) bylaws.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: COSTS AND TIMELINE ───────────────────────────── */}
      <section id="costs-and-timeline" className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
              Financial &amp; Scheduling Planning
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E2342] tracking-tight mb-3">
              Costs and Timeline
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Importing a pet to Singapore involves both statutory government biosecurity fees and commercial aviation expenses. Below is a comprehensive realistic budget and chronological milestone schedule.
            </p>
          </div>

          {/* Cost Breakdown Table */}
          <div className="overflow-x-auto rounded-2xl border border-zinc-200/90 shadow-2xs mb-12">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#0E2342] text-white">
                  <th className="py-4 px-4 font-bold uppercase tracking-wider text-[11px] border-r border-white/10">
                    Expense Category
                  </th>
                  <th className="py-4 px-4 font-bold uppercase tracking-wider text-[11px] border-r border-white/10">
                    Description &amp; Recipient Authority
                  </th>
                  <th className="py-4 px-4 font-bold uppercase tracking-wider text-[11px]">
                    Estimated Cost (SGD / USD)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200/80 bg-white text-zinc-800">
                <tr className="hover:bg-zinc-50/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-zinc-900 bg-zinc-50/50">
                    AVS Import Licence
                  </td>
                  <td className="py-3.5 px-4 text-zinc-600">
                    Statutory electronic import licence applied for on Singapore GoBusiness (valid 30 days).
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-zinc-900">
                    SGD $50 ($38 USD)
                  </td>
                </tr>

                <tr className="hover:bg-zinc-50/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-zinc-900 bg-zinc-50/50">
                    CAPQ Changi Inspection Fee
                  </td>
                  <td className="py-3.5 px-4 text-zinc-600">
                    Official veterinary port inspection at Changi Airport Airfreight Centre upon landing.
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-zinc-900">
                    SGD $25 – $80
                  </td>
                </tr>

                <tr className="hover:bg-zinc-50/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-zinc-900 bg-zinc-50/50">
                    Sembawang Quarantine (SAQS)
                  </td>
                  <td className="py-3.5 px-4 text-zinc-600">
                    30-day quarantine stay: Dog kennel ($24.20–$34.10/day) or Cat cattery ($18.70–$25.30/day).
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-zinc-900">
                    SGD $750 – $1,050 (for 30 days)
                  </td>
                </tr>

                <tr className="hover:bg-zinc-50/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-zinc-900 bg-zinc-50/50">
                    RNATT Rabies Titer Test
                  </td>
                  <td className="py-3.5 px-4 text-zinc-600">
                    Blood draw and international reference lab testing fee (Category C &amp; D origins).
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-zinc-900">
                    $200 – $400 USD
                  </td>
                </tr>

                <tr className="hover:bg-zinc-50/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-zinc-900 bg-zinc-50/50">
                    Veterinary Health Exam &amp; Endorsement
                  </td>
                  <td className="py-3.5 px-4 text-zinc-600">
                    Clinical pre-travel exam + USDA APHIS, CFIA, or DEFRA government endorsement fee.
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-zinc-900">
                    $250 – $500 USD
                  </td>
                </tr>

                <tr className="hover:bg-zinc-50/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-zinc-900 bg-zinc-50/50">
                    International Air Freight &amp; Crate
                  </td>
                  <td className="py-3.5 px-4 text-zinc-600">
                    IATA-compliant live animal cargo booking, pet freight forwarding, and airport handling.
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-zinc-900">
                    SGD $1,800 – $4,500+
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Timeline Milestones Card */}
          <div className="bg-[#F8FAFB] rounded-2xl p-6 sm:p-8 border border-zinc-200/80">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#0E2342] mb-6">
              Preparation Timeline Roadmap
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="bg-white p-4 rounded-xl border border-zinc-200/80 space-y-1.5">
                <span className="text-emerald-700 font-bold uppercase tracking-wider block">Month -6 to -4</span>
                <strong className="text-zinc-900 block text-sm">Microchip &amp; Titer</strong>
                <p className="text-zinc-600">Implant ISO microchip, give rabies vaccine, draw RNATT titer blood sample.</p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-zinc-200/80 space-y-1.5">
                <span className="text-blue-700 font-bold uppercase tracking-wider block">Month -3</span>
                <strong className="text-zinc-900 block text-sm">QMS Quarantine Booking</strong>
                <p className="text-zinc-600">Reserve kennel/cattery accommodation at Sembawang SAQS via QMS.</p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-zinc-200/80 space-y-1.5">
                <span className="text-purple-700 font-bold uppercase tracking-wider block">Day -30</span>
                <strong className="text-zinc-900 block text-sm">GoBusiness Licence</strong>
                <p className="text-zinc-600">Apply for AVS Import Licence on GoBusiness and book CAPQ inspection.</p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-zinc-200/80 space-y-1.5">
                <span className="text-amber-700 font-bold uppercase tracking-wider block">Days -7 to 0</span>
                <strong className="text-zinc-900 block text-sm">Final Exam &amp; Flight</strong>
                <p className="text-zinc-600">AVS Health Cert endorsed, parasite treatments given, check-in for flight.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: FAQS ─────────────────────────────────────────── */}
      <section id="singapore-faqs" className="py-12 sm:py-16 bg-white border-t border-zinc-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
              Regulatory Answers
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E2342] tracking-tight mb-3">
              Frequently Asked Questions About Singapore Pet Import
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Clear answers to the most common questions regarding AVS country categories, import licences, Sembawang quarantine, and dog licensing in Singapore.
            </p>
          </div>

          <div className="max-w-4xl">
            <FaqAccordion items={SINGAPORE_IMPORT_FAQS} columns={2} defaultOpenIndex={0} />
          </div>
        </div>
      </section>

      {/* ─── SECTION 7: CROSS-LINKS & RELATED GUIDES ─────────────────── */}
      <section className="py-12 sm:py-16 bg-white border-t border-zinc-200/80 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
              Singapore Cluster
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0E2342]">
              Related Singapore &amp; Biosecurity Hubs
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 mt-1">
              Explore our cat-specific Singapore import guide, country directory, and certificate verification tools.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/en/importing-cats-to-singapore"
              className="p-5 rounded-2xl border border-zinc-200/80 bg-[#F8FAFB] hover:bg-white hover:border-emerald-600/70 transition-all group"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">Feline Guide</span>
              <strong className="text-sm font-bold text-[#0E2342] group-hover:text-emerald-700 transition-colors block mb-1">
                Importing Cats to Singapore
              </strong>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Cat-specific vaccinations (FVRCP), AVS cattery quarantine, HDB cat licensing framework, and airline rules.
              </p>
            </Link>

            <Link
              href="/en/countries/singapore"
              className="p-5 rounded-2xl border border-zinc-200/80 bg-[#F8FAFB] hover:bg-white hover:border-emerald-600/70 transition-all group"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">Country Portal</span>
              <strong className="text-sm font-bold text-[#0E2342] group-hover:text-emerald-700 transition-colors block mb-1">
                Singapore Country Intelligence
              </strong>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Complete AVS statutory rule database, airport entry points, and inbound corridor checklists.
              </p>
            </Link>

            <Link
              href="/en/guides/rabies-titer-test-favn-guide"
              className="p-5 rounded-2xl border border-zinc-200/80 bg-[#F8FAFB] hover:bg-white hover:border-emerald-600/70 transition-all group"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">Testing Guide</span>
              <strong className="text-sm font-bold text-[#0E2342] group-hover:text-emerald-700 transition-colors block mb-1">
                Rabies Titer (RNATT/FAVN) Guide
              </strong>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Official blood draw timelines, accredited reference laboratories, and 0.50 IU/mL thresholds.
              </p>
            </Link>

            <Link
              href="/en/pet-travel-certificate"
              className="p-5 rounded-2xl border border-zinc-200/80 bg-[#F8FAFB] hover:bg-white hover:border-emerald-600/70 transition-all group"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">Documentation</span>
              <strong className="text-sm font-bold text-[#0E2342] group-hover:text-emerald-700 transition-colors block mb-1">
                Pet Travel Certificates Explained
              </strong>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Understand Official Veterinarian endorsements, USDA/CFIA stamps, and 10-day validity clocks.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── DOCUMENT READINESS CHECK CTA ──────────────────────────── */}
      <section className="py-14 sm:py-16 bg-white border-t border-zinc-200/80 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F8FAFB] rounded-2xl border border-zinc-200/90 p-7 sm:p-10 lg:p-12 shadow-2xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Authentic Problem-Solving Copy */}
              <div className="lg:col-span-7 space-y-4 text-left">
                <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Singapore Biosecurity Audit</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0E2342] leading-tight">
                  Verify your pet&apos;s paperwork for Singapore entry
                </h2>

                <p className="text-sm sm:text-base text-zinc-600 leading-relaxed max-w-xl">
                  A single discrepancy in your RNATT titer date, microchip timing, or AVS Import Licence will result in denied boarding or mandatory quarantine extension. Audit your records against official AVS rules before you fly.
                </p>

                {/* 3 Practical Feature Checks */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-zinc-700">
                  <div className="bg-white p-3.5 rounded-xl border border-zinc-200/80 flex items-start gap-2 shadow-2xs">
                    <span className="text-emerald-600 font-bold shrink-0">✓</span>
                    <span>AVS Category &amp; quarantine duration check</span>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-zinc-200/80 flex items-start gap-2 shadow-2xs">
                    <span className="text-emerald-600 font-bold shrink-0">✓</span>
                    <span>RNATT titer score &amp; timing verification</span>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-zinc-200/80 flex items-start gap-2 shadow-2xs">
                    <span className="text-emerald-600 font-bold shrink-0">✓</span>
                    <span>GoBusiness licence &amp; CAPQ booking check</span>
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
                    Scan Singapore Travel Dossier
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    Upload your pet&apos;s vaccination card, RNATT laboratory report, or AVS Health Certificate for an instant compliance review.
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
                    href="/en/countries/singapore"
                    className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 border border-zinc-200/80 font-semibold text-xs rounded-xl transition-all"
                  >
                    <span>View Singapore Country Rules</span>
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
