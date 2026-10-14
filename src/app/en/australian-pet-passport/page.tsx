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
  title: 'Is There an Australian Pet Passport? (2026 Myth-Busting Guide) | PawValid',
  description:
    'Myth-busting guide to the Australian pet passport. Understand why Australia does not issue pet passports, the statutory document system used by DAFF, exact documents required to enter, and how to take an Australian pet overseas and back.',
  keywords: [
    'australian pet passport',
    'pet passport australia',
    'australia pet travel documents',
    'does australia have a pet passport',
    'DAFF pet documents',
    'enter australia with pet passport',
    'taking pet out of australia and returning',
    'australia dog passport myth',
  ],
  alternates: getHreflangAlternates('/australian-pet-passport'),
  openGraph: {
    title: 'Is There an Australian Pet Passport? Official Document Guide | PawValid',
    description:
      'Think you need an Australian Pet Passport? Australia does not issue or recognize pet passports. Learn the actual statutory document system required by DAFF.',
    url: 'https://pawvalid.online/en/australian-pet-passport',
    siteName: 'PawValid',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is There an Australian Pet Passport? (2026 Myth-Busting) | PawValid',
    description:
      'The truth about pet passports in Australia: statutory DAFF permits, mandatory health certificates, and returning an Australian pet home.',
  },
};

const PET_PASSPORT_FAQS = [
  {
    q: 'Does Australia issue or have an official pet passport?',
    a: 'No. The Australian Government does not issue, recognize, or utilize an "Australian Pet Passport". Unlike the European Union, which issues standardized blue EU Pet Passports for intra-union movement, Australia’s biosecurity framework under the Biosecurity Act 2015 operates strictly through single-journey government import permits (issued via DAFF BICON) and bilateral veterinary export health certificates endorsed by sovereign authorities.',
  },
  {
    q: 'Can I enter Australia with an EU Pet Passport or UK Pet Health Certificate?',
    a: 'No. An EU Pet Passport, UK Animal Health Certificate (AHC), or USDA Pet Passport booklet is completely invalid for direct entry into Australia. While your European or British passport booklet can serve as historical evidence of rabies vaccination dates, you must still apply for an Australian DAFF Import Permit, pass all required laboratory blood tests, and have an accredited government veterinarian complete Australia’s specific multi-page export health certificate.',
  },
  {
    q: 'What documents are actually needed to bring a pet into Australia?',
    a: 'To legally import a dog or cat into Australia, you need five statutory documents: (1) An official Australian Import Permit granted by DAFF BICON; (2) An official RNATT Rabies Titer Laboratory Report showing an antibody titer ≥ 0.50 IU/mL; (3) An official Government RNATT Identity Verification Declaration Form; (4) An Australian International Veterinary Health Certificate completed and endorsed by an official government veterinarian; and (5) A confirmed Mickleham Post Entry Quarantine (PEQ) reservation code and airline manifest air waybill (AWB).',
  },
  {
    q: 'Can an Australian dog or cat travel overseas on vacation and come straight back?',
    a: 'No. Australia does not allow pets to travel overseas on short vacations and return freely. Any animal leaving Australia loses its domestic biosecurity status the moment it departs sovereign territory. To re-enter Australia, the pet must undergo the entire import procedure—including securing a new DAFF BICON import permit, completing all required pre-export blood tests, and spending 10 days in Mickleham quarantine upon return.',
  },
  {
    q: 'How can an Australian pet return home without serving a 180-day waiting period overseas?',
    a: 'If you plan to take an Australian pet abroad and eventually return, you can complete the RNATT rabies titer blood test while still in Australia before you depart. If drawn and certified in Australia by an approved Australian lab, that RNATT titer remains valid for 24 months. When returning to Australia, your pet will not have to wait 180 days in the foreign country before traveling, allowing a faster return journey to Mickleham quarantine.',
  },
  {
    q: 'What is a DAFF Notice of Intention to Export (NOI)?',
    a: 'When permanently or temporarily taking an animal out of Australia, Australian law requires pet owners to lodge a Notice of Intention to Export (NOI) with DAFF. A registered Australian export vet must examine the pet, ensure all destination import rules are met, and have DAFF issue an Australian Government Certificate of Health for Export before the animal can board an outbound flight.',
  },
];

export default function AustralianPetPassportPage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Countries', url: '/en/countries' },
    { name: 'Australia', url: '/en/countries/australia' },
    { name: 'Is There an Australian Pet Passport?', url: '/en/australian-pet-passport' },
  ];

  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);
  const faqSchema = getFaqSchema(PET_PASSPORT_FAQS);
  const medicalSchema = getMedicalWebPageSchema({
    name: 'Is There an Australian Pet Passport? Official Biosecurity Document Guide',
    description:
      'Authoritative statutory clarification on Australia’s veterinary document system, dispelling the pet passport myth and outlining required DAFF entry permits.',
    url: '/en/australian-pet-passport',
    authority: 'Department of Agriculture, Fisheries and Forestry (DAFF Australia)',
    authorityUrl: 'https://www.agriculture.gov.au/biosecurity-trade/import/goods/live-animals/pets',
    lastReviewed: '2026-10-14',
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
            <Link href="/en/countries/australia" className="hover:text-zinc-900 transition-colors">
              Australia
            </Link>
            <span className="text-zinc-300">/</span>
            <span className="font-semibold text-zinc-900">
              Australian Pet Passport Myth
            </span>
          </nav>
          <div className="inline-flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80 text-[11px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>DAFF Biosecurity Document Framework</span>
          </div>
        </div>
      </div>

      {/* ─── HERO SECTION ────────────────────────────────────────────── */}
      <section className="bg-white border-b border-zinc-200/80 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200/80 text-xs font-bold uppercase tracking-wider mb-4">
              <span>Myth-Busting &amp; Statutory Truth</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0E2342] tracking-tight leading-tight mb-4">
              Is There an Australian Pet Passport?
            </h1>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed mb-6">
              One of the most persistent misconceptions among international pet travelers is the belief that they can acquire an &ldquo;Australian Pet Passport&rdquo; to freely travel into or out of Australia. <strong>Australia does not issue, recognize, or accept pet passports.</strong> Governed under the <em>Biosecurity Act 2015</em> by the <strong>Department of Agriculture, Fisheries and Forestry (DAFF)</strong>, Australia relies on a rigorous, single-journey document system of government import permits, laboratory blood titers, and official veterinary health certificates. This guide dismantles the myth and provides the definitive list of documents actually required.
            </p>

            {/* Reviewer Trust Banner */}
            <div className="flex items-center gap-3 p-3.5 bg-[#F8FAFB] border border-zinc-200/80 rounded-xl text-xs text-zinc-600 mb-8">
              <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 font-bold shrink-0">
                SM
              </div>
              <div className="flex-1 leading-snug">
                <span className="font-bold text-zinc-900">Statutorily &amp; Medically Reviewed</span> by Dr. Sarah Miller, DVM &bull; Verified against Australian DAFF Pet Import and Export Regulations and Biosecurity Act 2015 statutory schedules (Updated October 2026).
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              <div className="bg-[#F8FAFB] rounded-xl p-4 border border-zinc-200/80">
                <span className="text-[11px] font-semibold text-zinc-500 block uppercase">
                  Passport Exists?
                </span>
                <strong className="text-xl font-bold text-red-600 mt-1 block">
                  No (Myth)
                </strong>
                <span className="text-[11px] text-zinc-500 mt-0.5 block">
                  Australia has no passport
                </span>
              </div>
              <div className="bg-[#F8FAFB] rounded-xl p-4 border border-zinc-200/80">
                <span className="text-[11px] font-semibold text-zinc-500 block uppercase">
                  Actual System
                </span>
                <strong className="text-xl font-bold text-zinc-900 mt-1 block">
                  Permit + Cert
                </strong>
                <span className="text-[11px] text-zinc-500 mt-0.5 block">
                  DAFF BICON statutory path
                </span>
              </div>
              <div className="bg-[#F8FAFB] rounded-xl p-4 border border-zinc-200/80">
                <span className="text-[11px] font-semibold text-zinc-500 block uppercase">
                  EU Passport Valid?
                </span>
                <strong className="text-xl font-bold text-zinc-900 mt-1 block">
                  Invalid
                </strong>
                <span className="text-[11px] text-zinc-500 mt-0.5 block">
                  For entry into Australia
                </span>
              </div>
              <div className="bg-[#F8FAFB] rounded-xl p-4 border border-zinc-200/80">
                <span className="text-[11px] font-semibold text-zinc-500 block uppercase">
                  Overseas Trips
                </span>
                <strong className="text-xl font-bold text-zinc-900 mt-1 block">
                  Full Re-Entry
                </strong>
                <span className="text-[11px] text-zinc-500 mt-0.5 block">
                  Requires permit &amp; Mickleham
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
                  href="#short-answer"
                  className="bg-white px-3 py-1.5 rounded-lg border border-zinc-200/90 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors font-medium"
                >
                  1. Short Answer: Australia&apos;s Document System
                </a>
                <a
                  href="#documents-you-need"
                  className="bg-white px-3 py-1.5 rounded-lg border border-zinc-200/90 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors font-medium"
                >
                  2. Documents You Do Need to Enter Australia
                </a>
                <a
                  href="#taking-pet-overseas-and-back"
                  className="bg-white px-3 py-1.5 rounded-lg border border-zinc-200/90 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors font-medium"
                >
                  3. Taking an Australian Pet Overseas and Back
                </a>
                <a
                  href="#faqs"
                  className="bg-white px-3 py-1.5 rounded-lg border border-zinc-200/90 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors font-medium"
                >
                  4. Frequently Asked Questions
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

            {/* ─── SECTION 1: SHORT ANSWER ──────────────────────────── */}
            <section id="short-answer" className="scroll-mt-20 space-y-6">
              <div className="border-b border-zinc-200 pb-4">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                  Myth vs Reality
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E2342]">
                  Short Answer: Australia&apos;s Document System
                </h2>
              </div>

              <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200/90 text-xs sm:text-sm text-amber-950 space-y-2">
                <strong className="font-bold text-base block text-amber-950">
                  The Direct Answer:
                </strong>
                <p className="leading-relaxed">
                  There is <strong>no such thing as an Australian Pet Passport</strong>. If a website or third-party agent offers to sell you an &ldquo;official Australian pet passport booklet&rdquo;, it is completely fraudulent. The Australian Government has never issued pet passports, does not issue them today, and has no plans to introduce them.
                </p>
              </div>

              <p className="text-sm sm:text-base text-zinc-700 leading-relaxed">
                Why doesn&apos;t Australia have a pet passport? Unlike the European Union, which operates a multi-country unified customs border where pets cross land borders frequently, Australia is an isolated island nation with unique wildlife and agriculture. Because Australia is completely free of terrestrial rabies and many tick-borne diseases, every single entry into the country must be audited individually as a fresh, high-risk biological importation.
              </p>

              {/* EU vs Australia Comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🇪🇺</span>
                    <h3 className="font-bold text-sm text-[#0E2342]">
                      The European Union Pet Passport Model
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    A physical blue booklet issued by accredited European veterinarians. Remains valid for the life of the animal as long as rabies boosters are current. Allows seamless repeated border crossings across 27 EU nations without import permits or quarantine.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🇦🇺</span>
                    <h3 className="font-bold text-sm text-[#0E2342]">
                      The Australian DAFF Statutory Model
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    A digital, single-journey regulatory pathway. Requires a dedicated BICON import permit application (AUD $480), individualized laboratory serology reports, official government veterinary endorsements, and mandatory 10-day quarantine at Mickleham.
                  </p>
                </div>
              </div>
            </section>

            {/* ─── SECTION 2: DOCUMENTS YOU DO NEED ─────────────────── */}
            <section id="documents-you-need" className="scroll-mt-20 space-y-6">
              <div className="border-b border-zinc-200 pb-4">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                  Required Dossier
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E2342]">
                  Documents You Do Need to Enter Australia
                </h2>
              </div>

              <p className="text-sm sm:text-base text-zinc-700 leading-relaxed">
                Rather than carrying a pet passport booklet, you must assemble a formal statutory compliance dossier containing the following five mandatory legal documents:
              </p>

              {/* 5 Core Documents */}
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm sm:text-base text-[#0E2342] flex items-center gap-2">
                      <span className="w-6 h-6 rounded-md bg-[#0E2342] text-white flex items-center justify-center text-xs font-bold">1</span>
                      Official Australian Pet Import Permit (DAFF BICON)
                    </h3>
                    <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Mandatory (Group 2 &amp; 3)
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Granted through the online DAFF BICON system prior to travel (AUD $480 fee). Valid for 12 months. Outlines the specific testing conditions and biological prerequisites your pet must satisfy.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm sm:text-base text-[#0E2342] flex items-center gap-2">
                      <span className="w-6 h-6 rounded-md bg-[#0E2342] text-white flex items-center justify-center text-xs font-bold">2</span>
                      RNATT Rabies Titer Laboratory Report
                    </h3>
                    <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Mandatory (Group 3)
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Official laboratory certificate from a DAFF-recognized reference lab confirming an antibody titer of <strong>≥ 0.50 IU/mL</strong>. The 180-day countdown starts on the date the sample was received by the lab.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm sm:text-base text-[#0E2342] flex items-center gap-2">
                      <span className="w-6 h-6 rounded-md bg-[#0E2342] text-white flex items-center justify-center text-xs font-bold">3</span>
                      Official Government RNATT Identity Declaration
                    </h3>
                    <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Mandatory (Group 3)
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    A formal identity declaration signed and stamped by an Official Government Veterinarian (USDA, DEFRA, CFIA, etc.) certifying that they scanned the microchip and verified the animal’s identity at the time of the blood draw.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm sm:text-base text-[#0E2342] flex items-center gap-2">
                      <span className="w-6 h-6 rounded-md bg-[#0E2342] text-white flex items-center justify-center text-xs font-bold">4</span>
                      International Veterinary Export Health Certificate
                    </h3>
                    <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Mandatory All Pets
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    A multi-page statutory document signed by an accredited vet and endorsed with an official wet-ink government stamp within <strong>5 days before flight</strong>. Certifies negative disease tests (Ehrlichia, Brucella, Leishmania) and certified parasite treatments.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm sm:text-base text-[#0E2342] flex items-center gap-2">
                      <span className="w-6 h-6 rounded-md bg-[#0E2342] text-white flex items-center justify-center text-xs font-bold">5</span>
                      Mickleham PEQ Confirmation &amp; Air Waybill (AWB)
                    </h3>
                    <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Mandatory All Pets
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Official booking confirmation letter from the Mickleham Post Entry Quarantine facility and airline cargo manifest waybill showing direct arrival into Melbourne International Airport (MEL).
                  </p>
                </div>
              </div>
            </section>

            {/* ─── SECTION 3: TAKING AN AUSTRALIAN PET OVERSEAS & BACK ── */}
            <section id="taking-pet-overseas-and-back" className="scroll-mt-20 space-y-6">
              <div className="border-b border-zinc-200 pb-4">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                  Outbound &amp; Return Journeys
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E2342]">
                  Taking an Australian Pet Overseas and Back
                </h2>
              </div>

              <p className="text-sm sm:text-base text-zinc-700 leading-relaxed">
                Many pet parents moving from Australia on temporary work assignments (e.g. 1 to 3 years in the UK, Europe, or North America) ask whether their Australian pet can easily return home.
              </p>

              {/* The Re-entry Reality */}
              <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs space-y-3">
                <h3 className="font-bold text-sm text-[#0E2342] flex items-center gap-1.5">
                  <span>🇦🇺</span> The Re-Entry Reality: Pets Lose Australian Biosecurity Status
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  The instant your pet leaves Australian airspace, their status resets. Australia does not differentiate between an Australian-born pet returning home and a foreign pet being imported for the first time. To come back, you must apply for a new DAFF BICON permit, complete all pre-export testing in the foreign country, and your pet must spend 10 days in Mickleham quarantine.
                </p>
              </div>

              {/* Pro Tip: In-Australia RNATT Titer */}
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200/90 text-xs text-emerald-950 space-y-2">
                <div className="font-bold text-sm text-emerald-950 flex items-center gap-1.5">
                  <span className="text-emerald-700">💡</span> Pro-Tip: How to Avoid the 180-Day Wait When Returning Home
                </div>
                <p className="leading-relaxed">
                  If you know you will return to Australia within 24 months, <strong>have your vet draw blood for an Australian RNATT titer test before you leave Australia</strong>. Because the blood is drawn while the animal is still on Australian soil and processed by the Australian Animal Health Laboratory (AAHL / CSIRO in Geelong), DAFF treats this titer as valid for <strong>24 months from the date of the blood draw</strong>.
                </p>
                <p className="leading-relaxed">
                  When you are ready to return from the UK, US, or Europe, you can re-import your pet immediately without waiting 180 days in the foreign country, as long as the animal returns before the 24-month titer expires!
                </p>
              </div>
            </section>

            {/* ─── SECTION 4: FAQS ──────────────────────────────────── */}
            <section id="faqs" className="scroll-mt-20 space-y-6">
              <div className="border-b border-zinc-200 pb-4">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                  Official Clarifications
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E2342]">
                  Frequently Asked Questions About the Australian Pet Passport Myth
                </h2>
              </div>

              <p className="text-sm text-zinc-600">
                Official regulatory guidance regarding why Australia does not issue pet passports, how DAFF permits work, and returning pets home from abroad.
              </p>

              <div className="bg-white rounded-2xl border border-zinc-200/90 shadow-2xs p-4 sm:p-6">
                <FaqAccordion items={PET_PASSPORT_FAQS} />
              </div>
            </section>

          </main>

          {/* Right Sidebar (4 cols) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Interactive Checker Sticky Card */}
            <div className="bg-white rounded-2xl border border-zinc-200/90 p-5 shadow-sm space-y-4 lg:sticky lg:top-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs border border-emerald-200/80">
                  📋
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#0E2342]">
                    Audit Australia Documents
                  </h3>
                  <span className="text-[11px] text-zinc-500">
                    Traveling to or from Australia?
                  </span>
                </div>
              </div>

              <p className="text-xs text-zinc-600 leading-relaxed">
                Check whether your existing pet records, vaccinations, and microchip meet DAFF&apos;s strict statutory criteria with PawValid.
              </p>

              <div className="space-y-2 pt-1">
                <Link
                  href="/checker?dest=AU"
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-[#0E2342] hover:bg-[#16345E] text-white text-xs font-semibold py-2.5 px-4 rounded-xl shadow-xs transition-all text-center"
                >
                  <span>Start Document Audit →</span>
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
                      href="/en/australia-pet-import-permit"
                      className="text-emerald-700 hover:text-emerald-800 font-medium hover:underline flex items-center gap-1"
                    >
                      <span>→</span>
                      <span>Australia Pet Import Permit (How to Apply)</span>
                    </Link>
                  </li>
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
                </ul>
              </div>

              {/* Official Authority Links */}
              <div className="pt-3 border-t border-zinc-100 text-[11px] text-zinc-500 space-y-1">
                <div className="font-semibold text-zinc-700">Official Portals:</div>
                <div>&bull; <a href="https://www.agriculture.gov.au/biosecurity-trade/import/goods/live-animals/pets" target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-zinc-900 underline">DAFF Biosecurity Guidelines</a></div>
                <div>&bull; <a href="https://bicon.agriculture.gov.au" target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-zinc-900 underline">BICON Import System</a></div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
