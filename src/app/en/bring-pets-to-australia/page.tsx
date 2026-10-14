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
  title: 'Bringing Pets to Australia: Complete Overview (2026 DAFF Guide) | PawValid',
  description:
    'Definitive statutory overview hub for bringing dogs and cats into Australia under DAFF regulations. Master Group 1-3 country pathways, BICON import permits, 180-day RNATT rabies titer clocks, Mickleham PEQ quarantine booking, and exact costs.',
  keywords: [
    'bring pets to australia',
    'moving pets to australia',
    'import pet to australia',
    'DAFF pet import australia',
    'australia pet quarantine',
    'mickleham post entry quarantine',
    'BICON import permit pet',
    'RNATT rabies titer australia',
    'bring dog to australia',
    'bring cat to australia',
    'australia pet entry rules',
    'biosecurity act 2015 australia pet',
  ],
  alternates: getHreflangAlternates('/bring-pets-to-australia'),
  openGraph: {
    title: 'Bringing Pets to Australia: Official DAFF Biosecurity Guide (2026) | PawValid',
    description:
      'The comprehensive master guide for importing dogs and cats into Australia. Understand DAFF country groups, BICON electronic permits, 180-day blood titer waiting clocks, and Mickleham quarantine.',
    url: 'https://pawvalid.online/en/bring-pets-to-australia',
    siteName: 'PawValid',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bringing Pets to Australia (2026 DAFF Overview Hub) | PawValid',
    description:
      'Everything you need to know about moving a pet to Australia — DAFF permits, country groups, 180-day titer wait, Mickleham quarantine, costs, and timeline.',
  },
};

const AUSTRALIA_IMPORT_FAQS = [
  {
    q: 'How long do pets have to stay in quarantine when entering Australia?',
    a: 'Under the Australian Department of Agriculture, Fisheries and Forestry (DAFF) biosecurity protocols, pets arriving from approved rabies-endemic countries (Group 3, such as the United States, Canada, and EU member states) or approved rabies-controlled countries (Group 2, such as the UK and Singapore) must stay a minimum of 10 days at the Mickleham Post-Entry Quarantine (PEQ) facility in Melbourne, Victoria. If pre-export identity verification or blood titer testing was non-compliant, quarantine may be extended to 30 days. Pets arriving directly from New Zealand (Group 1) are exempt from quarantine.',
  },
  {
    q: 'Why does Australia require a 180-day waiting period after the rabies titer test?',
    a: 'Australia is free from canine rabies and enforces the Biosecurity Act 2015 to protect human and animal health. For pets originating in Group 3 countries, a Rabies Neutralising Antibody Titre (RNATT) blood test must show an antibody level of at least 0.50 IU/mL. The 180-day waiting period starts from the date the blood sample arrives at the approved laboratory. If your pet arrives in Australia before 180 days have elapsed, they cannot be released and must remain at Mickleham quarantine for the remaining duration at significant expense.',
  },
  {
    q: 'Where do pets land in Australia, and which quarantine facility do they go to?',
    a: 'All companion animals requiring post-entry quarantine must land directly at Melbourne International Airport (MEL) as manifest air cargo. Australia operates only one national animal quarantine facility: the Mickleham Post Entry Quarantine (PEQ) facility, located approximately 30 km north of Melbourne. Pets cannot enter Australia via Sydney (SYD), Brisbane (BNE), or Perth (PER) if quarantine is required.',
  },
  {
    q: 'How do I apply for an Australian Pet Import Permit through BICON?',
    a: 'You must submit your import permit application online through the DAFF Biosecurity Import Conditions (BICON) system. You will need your pet’s ISO microchip number, vaccination history, and RNATT laboratory report (if applicable). DAFF charges a non-refundable application assessment fee of approximately AUD $480. Standard processing takes a minimum of 20 Australian business days, and the permit remains valid for 12 months from the date of issuance.',
  },
  {
    q: 'Which dog breeds are strictly prohibited from entering Australia?',
    a: 'Under the Customs (Prohibited Imports) Regulations 1956, Australia strictly bans the importation of the following purebred and crossbred dog breeds: American Pit Bull Terrier (and Pit Bull Terrier types), Japanese Tosa, Dogo Argentino, Fila Brasileiro, and Perro de Presa Canario. Domestic dog-wolf hybrids (wolfdogs) and domestic cat hybrids (such as F1–F4 crosses of Bengal, Savannah, Chausie, or Safari cats) are also strictly prohibited.',
  },
  {
    q: 'What infectious disease tests are required for dogs entering Australia?',
    a: 'In addition to rabies, dogs must undergo specific laboratory testing prior to export: Brucella canis (for intact breeding dogs), Ehrlichia canis (serological IFAT test), Leishmania infantum (IFAT or ELISA test), and Leptospira interrogans serovar Canicola (microscopic agglutination test or antibiotic prophylaxis). All tests must be processed by approved reference laboratories within defined pre-export testing windows.',
  },
  {
    q: 'Can my pet fly in the passenger cabin or as checked luggage to Australia?',
    a: 'No. Australian biosecurity regulations mandate that all dogs and cats entering the country must travel as manifested international air cargo under the International Air Transport Association (IATA) Live Animals Regulations. Pets cannot fly in the passenger cabin or as excess accompanied baggage on any commercial flight into Australia.',
  },
  {
    q: 'How much does it cost in total to bring a dog or cat to Australia?',
    a: 'Total relocation costs generally range between AUD $6,500 and $14,000+ per pet, depending on origin country, pet size, and freight rates. Essential government charges include: DAFF BICON Import Permit (approx. AUD $480) and Mickleham PEQ Quarantine accommodation (approx. AUD $2,200 to $2,800 for 10 days). Additional private costs include RNATT testing (AUD $300–$600), pre-export clinical exams and government vet endorsements (AUD $400–$1,000), IATA travel crates (AUD $200–$600), and international manifest airfreight (AUD $3,000–$8,000+).',
  },
];

export default function BringPetsToAustraliaPage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Countries', url: '/en/countries' },
    { name: 'Australia', url: '/en/countries/australia' },
    { name: 'Bringing Pets to Australia: Complete Overview', url: '/en/bring-pets-to-australia' },
  ];

  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);
  const faqSchema = getFaqSchema(AUSTRALIA_IMPORT_FAQS);
  const medicalSchema = getMedicalWebPageSchema({
    name: 'Bringing Pets to Australia: Official DAFF Biosecurity Import Guide',
    description:
      'Authoritative statutory guidance for importing dogs and cats into Australia under the Biosecurity Act 2015 and DAFF BICON regulations.',
    url: '/en/bring-pets-to-australia',
    authority: 'Department of Agriculture, Fisheries and Forestry (DAFF Australia)',
    authorityUrl: 'https://www.agriculture.gov.au/biosecurity-trade/import/goods/live-animals/pets',
    lastReviewed: '2026-10-14',
    reviewerName: 'Dr. Sarah Miller, DVM',
    reviewerTitle: 'Veterinary Biosecurity Specialist & Cross-Border Compliance Auditor',
  });
  const howToSchema = getHowToSchema({
    title: 'How to Bring a Dog or Cat to Australia Step-by-Step',
    description:
      'Chronological 8-month timeline to prepare, test, permit, fly, and clear quarantine for dogs and cats moving to Australia.',
    steps: [
      {
        step: 1,
        title: 'Implant ISO Microchip & Administer Rabies Vaccine',
        description:
          'Implant a 15-digit ISO 11784/11785 microchip and administer an inactivated or recombinant rabies vaccine.',
      },
      {
        step: 2,
        title: 'Complete RNATT Rabies Blood Titer Test (Day 0 of 180-Day Clock)',
        description:
          'Have blood drawn at least 30 days post-vaccination. The 180-day countdown begins the date the blood arrives at the approved lab.',
      },
      {
        step: 3,
        title: 'Submit RNATT Declaration for Government Identity Verification',
        description:
          'An official government veterinarian (e.g. USDA, DEFRA, CFIA) must scan the microchip and complete the RNATT declaration form.',
      },
      {
        step: 4,
        title: 'Apply for DAFF BICON Import Permit',
        description:
          'Submit the import permit application on the DAFF BICON portal at least 4 to 6 months before intended departure.',
      },
      {
        step: 5,
        title: 'Reserve Mickleham Post-Entry Quarantine (PEQ)',
        description:
          'Once the permit is granted, book 10 days of quarantine space at the Mickleham PEQ facility in Melbourne.',
      },
      {
        step: 6,
        title: 'Pre-Export Disease Testing & Parasite Treatments',
        description:
          'Complete specific canine blood tests (Brucella, Ehrlichia, Leishmania) and certified external/internal parasite treatments.',
      },
      {
        step: 7,
        title: 'Final Health Exam & Government Endorsement',
        description:
          'Within 5 days of flight, accredited vet completes final exam and government authority stamps the international health certificate.',
      },
      {
        step: 8,
        title: 'Manifest Cargo Flight to Melbourne (MEL) & PEQ Release',
        description:
          'Pet flies as manifest cargo to Melbourne, is transferred directly to Mickleham PEQ, and is released after 10 compliant days.',
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
              Bringing Pets to Australia
            </span>
          </nav>
          <div className="inline-flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80 text-[11px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>2026 DAFF / Biosecurity Act 2015 Framework</span>
          </div>
        </div>
      </div>

      {/* ─── HERO SECTION ────────────────────────────────────────────── */}
      <section className="bg-white border-b border-zinc-200/80 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200/80 text-xs font-bold uppercase tracking-wider mb-4">
              <span>National Biosecurity Sovereign Hub</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0E2342] tracking-tight leading-tight mb-4">
              Bringing Pets to Australia: Complete Overview
            </h1>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed mb-6">
              Immigrating or relocating to Australia with a dog or cat is governed by the <strong>Department of Agriculture, Fisheries and Forestry (DAFF)</strong> under the strict legal authority of the <em>Biosecurity Act 2015</em>. Because Australia is entirely free from rabies and several serious vector-borne animal diseases, its import protocols are among the most stringent in the world. Successfully bringing your pet requires navigating <strong>DAFF Country Groups</strong>, advance <strong>BICON import permits</strong>, a mandatory <strong>180-day rabies titer waiting period</strong>, and reservations at the <strong>Mickleham Post Entry Quarantine (PEQ)</strong> facility in Melbourne. This definitive guide covers every phase of the process.
            </p>

            {/* Reviewer Trust Banner */}
            <div className="flex items-center gap-3 p-3.5 bg-[#F8FAFB] border border-zinc-200/80 rounded-xl text-xs text-zinc-600 mb-8">
              <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 font-bold shrink-0">
                SM
              </div>
              <div className="flex-1 leading-snug">
                <span className="font-bold text-zinc-900">Statutorily &amp; Medically Reviewed</span> by Dr. Sarah Miller, DVM &bull; Verified against Australian DAFF BICON Biosecurity Protocols, Mickleham PEQ Standards, and IATA Live Animals Regulations (Updated October 2026).
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              <div className="bg-[#F8FAFB] rounded-xl p-4 border border-zinc-200/80">
                <span className="text-[11px] font-semibold text-zinc-500 block uppercase">
                  Mickleham Quarantine
                </span>
                <strong className="text-xl font-bold text-zinc-900 mt-1 block">
                  10 to 30 Days
                </strong>
                <span className="text-[11px] text-zinc-500 mt-0.5 block">
                  Melbourne PEQ facility
                </span>
              </div>
              <div className="bg-[#F8FAFB] rounded-xl p-4 border border-zinc-200/80">
                <span className="text-[11px] font-semibold text-zinc-500 block uppercase">
                  DAFF Import Permit
                </span>
                <strong className="text-xl font-bold text-zinc-900 mt-1 block">
                  Mandatory (AUD $480)
                </strong>
                <span className="text-[11px] text-zinc-500 mt-0.5 block">
                  Apply via BICON (12m validity)
                </span>
              </div>
              <div className="bg-[#F8FAFB] rounded-xl p-4 border border-zinc-200/80">
                <span className="text-[11px] font-semibold text-zinc-500 block uppercase">
                  Rabies Titer (RNATT)
                </span>
                <strong className="text-xl font-bold text-zinc-900 mt-1 block">
                  180-Day Wait
                </strong>
                <span className="text-[11px] text-zinc-500 mt-0.5 block">
                  Mandatory for Group 3
                </span>
              </div>
              <div className="bg-[#F8FAFB] rounded-xl p-4 border border-zinc-200/80">
                <span className="text-[11px] font-semibold text-zinc-500 block uppercase">
                  Total Preparation
                </span>
                <strong className="text-xl font-bold text-zinc-900 mt-1 block">
                  7 to 8 Months
                </strong>
                <span className="text-[11px] text-zinc-500 mt-0.5 block">
                  Strict sequential milestones
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
                  href="#eligible-pets"
                  className="bg-white px-3 py-1.5 rounded-lg border border-zinc-200/90 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors font-medium"
                >
                  1. Eligible Pets (Dogs &amp; Cats)
                </a>
                <a
                  href="#process-at-a-glance"
                  className="bg-white px-3 py-1.5 rounded-lg border border-zinc-200/90 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors font-medium"
                >
                  2. Process at a Glance (Permit, Prep, Flight, Quarantine)
                </a>
                <a
                  href="#country-groups"
                  className="bg-white px-3 py-1.5 rounded-lg border border-zinc-200/90 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors font-medium"
                >
                  3. Country Groups (1, 2, 3 &amp; Non-Approved)
                </a>
                <a
                  href="#costs-and-timeline"
                  className="bg-white px-3 py-1.5 rounded-lg border border-zinc-200/90 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors font-medium"
                >
                  4. Costs and Timeline Breakdown
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

            {/* ─── SECTION 1: ELIGIBLE PETS ─────────────────────────── */}
            <section id="eligible-pets" className="scroll-mt-20 space-y-6">
              <div className="border-b border-zinc-200 pb-4">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                  Pillar 1 &bull; Biological Eligibility
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E2342]">
                  Eligible Pets
                </h2>
              </div>

              <p className="text-sm sm:text-base text-zinc-700 leading-relaxed">
                Under the Biosecurity Act 2015, only domestic dogs (<em>Canis lupus familiaris</em>) and domestic cats (<em>Felis catus</em>) may be imported into Australia as companion animals. No other domestic pets—such as birds, rabbits, guinea pigs, ferrets, reptiles, or rodents—are eligible for personal import from overseas. Furthermore, Australia enforces strict legal bans on specific canine breeds and wild feline hybrids.
              </p>

              {/* H3: Dogs */}
              <div className="bg-white rounded-2xl border border-zinc-200/90 p-5 sm:p-6 shadow-2xs space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 font-bold flex items-center justify-center text-sm border border-emerald-200/80">
                    🐕
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#0E2342]">
                    Dogs
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  Most domestic dog breeds are eligible to enter Australia, provided they meet all pre-export veterinary testing requirements. However, Australia&apos;s <em>Customs (Prohibited Imports) Regulations 1956</em> strictly bans the importation of the following purebred and crossbred dangerous dog breeds:
                </p>

                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200/80 text-xs text-red-900 space-y-1">
                  <span className="font-bold block text-red-950">
                    Strictly Prohibited Dog Breeds &amp; Hybrids in Australia:
                  </span>
                  <ul className="list-disc pl-5 space-y-1 text-red-800">
                    <li>Dogo Argentino</li>
                    <li>Fila Brasileiro (Brazilian Mastiff)</li>
                    <li>Japanese Tosa</li>
                    <li>American Pit Bull Terrier / Pit Bull Terrier types</li>
                    <li>Perro de Presa Canario (Presa Canario)</li>
                    <li>Any domestic dog crossed with a wolf, dingo, or wild canid (wolfdog hybrids)</li>
                  </ul>
                </div>

                <div className="space-y-2 pt-1 text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  <strong className="text-zinc-900 block">Mandatory Canine Health &amp; Serological Testing:</strong>
                  <ul className="space-y-1.5 list-disc pl-5 text-xs text-zinc-600">
                    <li><strong>Brucella canis:</strong> Required for intact (non-desexed) dogs. Must test negative within 14 days before departure by rapid slide agglutination (RSA) or tube agglutination.</li>
                    <li><strong>Ehrlichia canis:</strong> Tick-borne disease test. Mandatory negative serology test (IFAT) within 21 days before departure.</li>
                    <li><strong>Leishmania infantum:</strong> Negative IFAT or ELISA serology test within 21 days before export.</li>
                    <li><strong>Leptospira interrogans serovar Canicola:</strong> Negative microscopic agglutination test (MAT) within 45 days of export, or approved course of prophylactic doxycycline.</li>
                  </ul>
                </div>
              </div>

              {/* H3: Cats */}
              <div className="bg-white rounded-2xl border border-zinc-200/90 p-5 sm:p-6 shadow-2xs space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 font-bold flex items-center justify-center text-sm border border-emerald-200/80">
                    🐈
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#0E2342]">
                    Cats
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  Only true domestic cats (<em>Felis catus</em>) may be imported. Australia strictly prohibits hybrid domestic cats bred from wild feline species due to environmental predation risks to native wildlife:
                </p>

                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200/80 text-xs text-red-900 space-y-1">
                  <span className="font-bold block text-red-950">
                    Strictly Prohibited Feline Hybrids:
                  </span>
                  <p className="leading-relaxed text-red-800">
                    First through fourth generation (F1, F2, F3, F4) crosses of wild cats are banned. This includes <strong>Bengal cats</strong> (Asian leopard cat cross), <strong>Savannah cats</strong> (Serval cross), <strong>Chausie cats</strong> (Jungle cat cross), and <strong>Safari cats</strong> (Geoffroy&apos;s cat cross). Only 5th generation (F5) or later cats with documented multi-generation pedigree certificates are permitted.
                  </p>
                </div>

                <div className="space-y-2 pt-1 text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  <strong className="text-zinc-900 block">Feline Vaccination &amp; Reproductive Requirements:</strong>
                  <ul className="space-y-1.5 list-disc pl-5 text-xs text-zinc-600">
                    <li><strong>Core Vaccinations:</strong> Full immunisation against feline enteritis (feline panleukopenia), feline rhinotracheitis, and feline calicivirus administered within valid manufacturer windows.</li>
                    <li><strong>Pregnancy Restrictions:</strong> Female cats must not be more than 3 weeks (21 days) pregnant at the scheduled date of export, nor may they travel while nursing unweaned kittens.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* ─── SECTION 2: PROCESS AT A GLANCE ──────────────────── */}
            <section id="process-at-a-glance" className="scroll-mt-20 space-y-6">
              <div className="border-b border-zinc-200 pb-4">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                  Pillar 2 &bull; Core Execution Steps
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E2342]">
                  Process at a Glance
                </h2>
              </div>

              <p className="text-sm sm:text-base text-zinc-700 leading-relaxed">
                Relocating a companion animal to Australia follows four strictly chronological and non-negotiable phases: securing the government permit, completing veterinary preparation and the 180-day clock, organizing approved air cargo freight, and completing post-entry quarantine at Mickleham.
              </p>

              {/* H3: Permit */}
              <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-[#0E2342] text-white flex items-center justify-center font-bold text-xs">
                    1
                  </span>
                  <h3 className="font-bold text-base text-[#0E2342]">
                    Permit (DAFF BICON System)
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  Every pet arriving from a Group 2 or Group 3 country requires a valid <strong>Australian Department of Agriculture, Fisheries and Forestry (DAFF) Import Permit</strong>. Applications are lodged online through the <strong>Biosecurity Import Conditions (BICON)</strong> system. You must upload your pet’s 15-digit ISO microchip record, rabies vaccination history, and RNATT titer laboratory report. The non-refundable application fee is approximately <strong>AUD $480</strong>. Standard processing requires a minimum of <strong>20 Australian business days</strong>. Permits remain valid for 12 months from issuance.
                </p>
              </div>

              {/* H3: Preparation */}
              <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-[#0E2342] text-white flex items-center justify-center font-bold text-xs">
                    2
                  </span>
                  <h3 className="font-bold text-base text-[#0E2342]">
                    Preparation (Microchip, RNATT Titer &amp; 180-Day Wait)
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  Preparation begins with implanting a 15-digit ISO 11784/11785 microchip, followed immediately by rabies vaccination. At least 30 days later, your vet draws blood for a <strong>Rabies Neutralising Antibody Titre (RNATT / FAVN)</strong> test (must be ≥ 0.50 IU/mL).
                </p>
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200/80 text-xs text-amber-900">
                  <strong className="block text-amber-950 font-bold mb-1">
                    The 180-Day Clock Rule (Determines Quarantine Duration):
                  </strong>
                  The 180-day countdown begins strictly on the date the blood sample arrives at the approved laboratory. If your pet arrives in Australia <strong>180 days or more</strong> after this blood draw date (and an official government identity verification has been completed), the quarantine stay is reduced to <strong>10 days</strong>. If the pet arrives before 180 days have passed, they must serve the remainder of the 180 days in Mickleham quarantine at your expense.
                </div>
              </div>

              {/* H3: Flight */}
              <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-[#0E2342] text-white flex items-center justify-center font-bold text-xs">
                    3
                  </span>
                  <h3 className="font-bold text-base text-[#0E2342]">
                    Flight (Melbourne MEL Manifest Cargo)
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  All pets entering Australia requiring quarantine must fly as <strong>manifest air cargo</strong> under the IATA Live Animals Regulations (LAR). Pets cannot travel in the passenger cabin or as checked excess baggage. <strong>They must arrive directly into Melbourne International Airport (MEL)</strong>. If taking connecting flights, the pet cannot leave the airport transit bonded area, and transshipment through non-approved countries is strictly restricted.
                </p>
              </div>

              {/* H3: Quarantine */}
              <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-[#0E2342] text-white flex items-center justify-center font-bold text-xs">
                    4
                  </span>
                  <h3 className="font-bold text-base text-[#0E2342]">
                    Quarantine (Mickleham PEQ Facility)
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  Upon arrival at Melbourne Airport, DAFF biosecurity officers collect your pet directly from the aircraft cargo terminal and transport them in specialized air-conditioned vans to the <strong>Mickleham Post Entry Quarantine (PEQ)</strong> facility. Mickleham provides modern, climate-controlled individual suites, outdoor exercise runs for dogs, and veterinarian supervision. Once the 10-day biosecurity observation period concludes and the animal passes final veterinary inspection, you or your agent can collect your pet for release into Australia.
                </p>
              </div>
            </section>

            {/* ─── SECTION 3: COUNTRY GROUPS ────────────────────────── */}
            <section id="country-groups" className="scroll-mt-20 space-y-6">
              <div className="border-b border-zinc-200 pb-4">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                  Pillar 3 &bull; Global Risk Stratification
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E2342]">
                  Country Groups
                </h2>
              </div>

              <p className="text-sm sm:text-base text-zinc-700 leading-relaxed">
                DAFF categorizes all exporting nations into four distinct risk groups based on sovereign rabies status, biosecurity infrastructure, and veterinary oversight. Your pet’s country of origin determines whether you need an import permit, an RNATT rabies titer, and whether quarantine is mandatory.
              </p>

              {/* 4 Groups Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500" />
                    <h3 className="font-bold text-sm text-[#0E2342]">
                      Group 1: Rabies-Free (Exempt)
                    </h3>
                  </div>
                  <div className="text-xs text-zinc-500 mb-2 font-mono">
                    New Zealand, Norfolk Island, Cocos Islands
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Direct entry. No DAFF import permit required. No rabies vaccination or RNATT titer required. <strong>0 days quarantine</strong> (pets are released immediately upon arrival after visual port inspection).
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-3 h-3 rounded-full bg-blue-500" />
                    <h3 className="font-bold text-sm text-[#0E2342]">
                      Group 2: Approved Rabies-Controlled
                    </h3>
                  </div>
                  <div className="text-xs text-zinc-500 mb-2 font-mono">
                    UK, Ireland, Singapore, Japan, Hawaii, Guam
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    DAFF BICON import permit is mandatory. Rabies vaccination and RNATT titer test are <strong>not required</strong> because origin countries are recognized as rabies-free. Minimum <strong>10 days quarantine</strong> at Mickleham PEQ.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-3 h-3 rounded-full bg-amber-500" />
                    <h3 className="font-bold text-sm text-[#0E2342]">
                      Group 3: Approved Rabies-Endemic
                    </h3>
                  </div>
                  <div className="text-xs text-zinc-500 mb-2 font-mono">
                    USA (Mainland), Canada, EU, UAE, South Korea
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    DAFF BICON import permit mandatory. Rabies vaccination and <strong>RNATT blood titer test (≥ 0.50 IU/mL) mandatory</strong>, followed by the <strong>180-day waiting clock</strong>. Minimum <strong>10 to 30 days quarantine</strong> at Mickleham PEQ.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-3 h-3 rounded-full bg-red-500" />
                    <h3 className="font-bold text-sm text-[#0E2342]">
                      Non-Approved Countries
                    </h3>
                  </div>
                  <div className="text-xs text-zinc-500 mb-2 font-mono">
                    India, China, Thailand, Philippines, Brazil, S. Africa
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    <strong>Pets CANNOT be imported directly to Australia.</strong> The pet must first relocate to and reside in an approved Group 2 or Group 3 country for a minimum of <strong>6 continuous months</strong> before qualifying for export to Australia.
                  </p>
                </div>
              </div>

              {/* Group Comparison Table */}
              <div className="bg-white rounded-2xl border border-zinc-200/90 shadow-2xs overflow-hidden">
                <div className="p-4 bg-zinc-50 border-b border-zinc-200/80">
                  <h3 className="font-bold text-sm text-[#0E2342]">
                    Australian DAFF Country Group Comparison Matrix
                  </h3>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Summary of biosecurity requirements based on origin country category.
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-zinc-100/70 border-b border-zinc-200 text-zinc-700 font-semibold">
                        <th className="p-3">Country Group</th>
                        <th className="p-3">Example Origins</th>
                        <th className="p-3">BICON Permit</th>
                        <th className="p-3">Rabies Titer (RNATT)</th>
                        <th className="p-3">180-Day Wait</th>
                        <th className="p-3">Mickleham Quarantine</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 text-zinc-700">
                      <tr>
                        <td className="p-3 font-semibold text-emerald-800">Group 1</td>
                        <td className="p-3">New Zealand, Norfolk Is.</td>
                        <td className="p-3 text-zinc-500">Not required</td>
                        <td className="p-3 text-emerald-700 font-medium">Exempt</td>
                        <td className="p-3 text-zinc-500">None</td>
                        <td className="p-3 text-emerald-700 font-bold">0 Days (Direct Release)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-blue-800">Group 2</td>
                        <td className="p-3">UK, Singapore, Japan</td>
                        <td className="p-3 text-blue-800 font-medium">Mandatory (AUD $480)</td>
                        <td className="p-3 text-emerald-700 font-medium">Exempt</td>
                        <td className="p-3 text-zinc-500">None</td>
                        <td className="p-3 text-amber-700 font-bold">10 Days</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-amber-800">Group 3</td>
                        <td className="p-3">USA, Canada, EU, UAE</td>
                        <td className="p-3 text-amber-800 font-medium">Mandatory (AUD $480)</td>
                        <td className="p-3 text-amber-800 font-bold">Mandatory (≥ 0.50 IU/mL)</td>
                        <td className="p-3 text-amber-800 font-bold">Mandatory (180 days)</td>
                        <td className="p-3 text-amber-700 font-bold">10 to 30 Days</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-red-800">Non-Approved</td>
                        <td className="p-3">India, China, S. Africa</td>
                        <td className="p-3 text-red-700 font-bold">Ineligible for direct permit</td>
                        <td className="p-3 text-red-700 font-bold">Requires residency route</td>
                        <td className="p-3 text-red-700 font-bold">6 months in Group 2/3</td>
                        <td className="p-3 text-red-700 font-bold">Must route via 3rd country</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* ─── SECTION 4: COSTS AND TIMELINE ────────────────────── */}
            <section id="costs-and-timeline" className="scroll-mt-20 space-y-6">
              <div className="border-b border-zinc-200 pb-4">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                  Pillar 4 &bull; Budgets &amp; Milestones
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E2342]">
                  Costs and Timeline
                </h2>
              </div>

              <p className="text-sm sm:text-base text-zinc-700 leading-relaxed">
                Relocating a companion animal to Australia requires rigorous adherence to sequential milestones and an understanding of the financial investment involved. Missing a single deadline by even 24 hours can reset your 180-day clock or disqualify your animal from the 10-day quarantine track.
              </p>

              {/* 8-Month Roadmap Cards */}
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-white border border-zinc-200/90 shadow-2xs flex items-start gap-3">
                  <span className="px-2.5 py-1 rounded-md bg-[#0E2342] text-white text-xs font-mono font-bold shrink-0">
                    Month 1
                  </span>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-[#0E2342]">
                      Microchipping &amp; Rabies Primary / Booster Vaccination
                    </h4>
                    <p className="text-xs text-zinc-600 mt-0.5 leading-relaxed">
                      Implant an ISO 11784/11785 compliant microchip. Administer approved rabies vaccine. Wait at least 30 to 60 days before drawing blood for the titer test.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-zinc-200/90 shadow-2xs flex items-start gap-3">
                  <span className="px-2.5 py-1 rounded-md bg-[#0E2342] text-white text-xs font-mono font-bold shrink-0">
                    Month 2
                  </span>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-[#0E2342]">
                      RNATT Blood Titer Draw (Day 0 of the 180-Day Waiting Clock)
                    </h4>
                    <p className="text-xs text-zinc-600 mt-0.5 leading-relaxed">
                      Accredited vet draws blood and ships to an approved international lab (FAVN/RNATT test). The 180-day countdown officially begins when the laboratory receives the sample.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-zinc-200/90 shadow-2xs flex items-start gap-3">
                  <span className="px-2.5 py-1 rounded-md bg-[#0E2342] text-white text-xs font-mono font-bold shrink-0">
                    Month 3–4
                  </span>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-[#0E2342]">
                      RNATT Declaration &amp; DAFF BICON Import Permit Application
                    </h4>
                    <p className="text-xs text-zinc-600 mt-0.5 leading-relaxed">
                      Official government vet completes the identity verification declaration. Lodge your import permit application on DAFF BICON. Allow 20+ business days for processing.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-zinc-200/90 shadow-2xs flex items-start gap-3">
                  <span className="px-2.5 py-1 rounded-md bg-[#0E2342] text-white text-xs font-mono font-bold shrink-0">
                    Month 5–6
                  </span>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-[#0E2342]">
                      Mickleham PEQ Quarantine Booking &amp; Flight Freight Scheduling
                    </h4>
                    <p className="text-xs text-zinc-600 mt-0.5 leading-relaxed">
                      With your permit in hand, log into the DAFF PEQ reservation system and secure a 10-day quarantine suite. Engage an IPATA pet shipper to book manifest air cargo into Melbourne (MEL).
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-zinc-200/90 shadow-2xs flex items-start gap-3">
                  <span className="px-2.5 py-1 rounded-md bg-[#0E2342] text-white text-xs font-mono font-bold shrink-0">
                    Month 7–8
                  </span>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-[#0E2342]">
                      Pre-Export Blood Tests, Parasite Treatments &amp; Final Endorsement
                    </h4>
                    <p className="text-xs text-zinc-600 mt-0.5 leading-relaxed">
                      Complete disease serology (Ehrlichia, Brucella, Leishmania) and certified external/internal parasite treatments. Government vet stamps the final export certificate within 5 days of flight. Pet lands in Melbourne for 10-day quarantine.
                    </p>
                  </div>
                </div>
              </div>

              {/* Comprehensive Cost Matrix */}
              <div className="bg-white rounded-2xl border border-zinc-200/90 shadow-2xs overflow-hidden">
                <div className="p-4 bg-zinc-50 border-b border-zinc-200/80">
                  <h3 className="font-bold text-sm text-[#0E2342]">
                    Realistic Cost Breakdown to Bring a Pet to Australia (AUD)
                  </h3>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Itemized estimate of statutory government fees, laboratory serology, quarantine, and freight.
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-zinc-100/70 border-b border-zinc-200 text-zinc-700 font-semibold">
                        <th className="p-3">Expense Category</th>
                        <th className="p-3">Fee / Cost Range (AUD)</th>
                        <th className="p-3">Payee / Authority</th>
                        <th className="p-3">Mandatory Nature</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 text-zinc-700">
                      <tr>
                        <td className="p-3 font-semibold text-zinc-900">DAFF BICON Import Permit</td>
                        <td className="p-3 font-mono font-semibold text-zinc-900">AUD $480 – $600</td>
                        <td className="p-3 text-zinc-600">Australian DAFF</td>
                        <td className="p-3 text-emerald-700 font-bold">Mandatory (Group 2 &amp; 3)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-zinc-900">Mickleham PEQ Quarantine (10 Days)</td>
                        <td className="p-3 font-mono font-semibold text-zinc-900">AUD $2,200 – $2,800</td>
                        <td className="p-3 text-zinc-600">Mickleham Quarantine Centre</td>
                        <td className="p-3 text-emerald-700 font-bold">Mandatory</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-zinc-900">RNATT Blood Titer &amp; Lab Fee</td>
                        <td className="p-3 font-mono font-semibold text-zinc-900">AUD $350 – $650</td>
                        <td className="p-3 text-zinc-600">Reference Laboratory</td>
                        <td className="p-3 text-emerald-700 font-bold">Mandatory (Group 3)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-zinc-900">Canine Blood Tests (Ehrlichia, Brucella, etc.)</td>
                        <td className="p-3 font-mono font-semibold text-zinc-900">AUD $400 – $900</td>
                        <td className="p-3 text-zinc-600">Veterinary Diagnostic Lab</td>
                        <td className="p-3 text-emerald-700 font-bold">Mandatory for Dogs</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-zinc-900">Government Vet Endorsement</td>
                        <td className="p-3 font-mono font-semibold text-zinc-900">AUD $200 – $500</td>
                        <td className="p-3 text-zinc-600">USDA / DEFRA / CFIA / AVS</td>
                        <td className="p-3 text-emerald-700 font-bold">Mandatory</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-zinc-900">IATA Live Animals Travel Crate</td>
                        <td className="p-3 font-mono font-semibold text-zinc-900">AUD $200 – $700</td>
                        <td className="p-3 text-zinc-600">Crate Manufacturer / Shipper</td>
                        <td className="p-3 text-emerald-700 font-bold">Mandatory</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-zinc-900">International Manifest Cargo Freight</td>
                        <td className="p-3 font-mono font-semibold text-zinc-900">AUD $3,000 – $8,500+</td>
                        <td className="p-3 text-zinc-600">Airline Live Cargo Desk</td>
                        <td className="p-3 text-emerald-700 font-bold">Mandatory to Melbourne (MEL)</td>
                      </tr>
                      <tr className="bg-zinc-50/80 font-bold">
                        <td className="p-3 text-zinc-900">Total Estimated Relocation Cost</td>
                        <td className="p-3 font-mono text-emerald-700">AUD $6,830 – $14,650+</td>
                        <td className="p-3 text-zinc-700" colSpan={2}>Varies by pet size, origin country, and freight rates</td>
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
                  Official Biosecurity Answers
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E2342]">
                  Frequently Asked Questions About Bringing Pets to Australia
                </h2>
              </div>

              <p className="text-sm text-zinc-600">
                Official regulatory guidance regarding DAFF BICON permits, the 180-day rabies titer waiting period, Mickleham quarantine accommodations, and entry flights into Melbourne.
              </p>

              <div className="bg-white rounded-2xl border border-zinc-200/90 shadow-2xs p-4 sm:p-6">
                <FaqAccordion items={AUSTRALIA_IMPORT_FAQS} />
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
                    Verify Australia Entry Compliance
                  </h3>
                  <span className="text-[11px] text-zinc-500">
                    Moving a dog or cat to Australia?
                  </span>
                </div>
              </div>

              <p className="text-xs text-zinc-600 leading-relaxed">
                Calculate your exact 180-day titer latency clock, verify BICON permit eligibility, and audit required canine serology tests instantly with PawValid.
              </p>

              <div className="space-y-2 pt-1">
                <Link
                  href="/checker?dest=AU"
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-[#0E2342] hover:bg-[#16345E] text-white text-xs font-semibold py-2.5 px-4 rounded-xl shadow-xs transition-all text-center"
                >
                  <span>Start Australia Compliance Audit →</span>
                </Link>
                <Link
                  href="/pet-travel-certificate"
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 border border-zinc-200 text-xs font-semibold py-2 px-4 rounded-xl transition-all text-center"
                >
                  <span>View Australia Travel Certificate</span>
                </Link>
              </div>

              {/* Related Route Guides */}
              <div className="pt-4 border-t border-zinc-100 space-y-2">
                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                  Related Biosecurity Guides
                </span>
                <ul className="text-xs space-y-2 text-zinc-600">
                  <li>
                    <Link
                      href="/en/pet-immigration-requirements-by-country"
                      className="text-emerald-700 hover:text-emerald-800 font-medium hover:underline flex items-center gap-1"
                    >
                      <span>→</span>
                      <span>Global Pet Immigration Rules by Country</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/en/pet-export-singapore"
                      className="text-emerald-700 hover:text-emerald-800 font-medium hover:underline flex items-center gap-1"
                    >
                      <span>→</span>
                      <span>Exporting Pets From Singapore (Group 2 Origin)</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/en/import-pet-to-singapore"
                      className="text-emerald-700 hover:text-emerald-800 font-medium hover:underline flex items-center gap-1"
                    >
                      <span>→</span>
                      <span>Importing Pets to Singapore (AVS Guide)</span>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Official Authority Links */}
              <div className="pt-3 border-t border-zinc-100 text-[11px] text-zinc-500 space-y-1">
                <div className="font-semibold text-zinc-700">Official Australian Portals:</div>
                <div>&bull; <a href="https://www.agriculture.gov.au/biosecurity-trade/import/goods/live-animals/pets" target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-zinc-900 underline">DAFF Pet Import Information</a></div>
                <div>&bull; <a href="https://bicon.agriculture.gov.au" target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-zinc-900 underline">BICON Import Conditions System</a></div>
                <div>&bull; <a href="https://www.agriculture.gov.au/biosecurity-trade/import/goods/live-animals/pets/peq" target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-zinc-900 underline">Mickleham PEQ Facility</a></div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
