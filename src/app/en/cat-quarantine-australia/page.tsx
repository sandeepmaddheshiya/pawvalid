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
  title: 'Cat Quarantine in Australia: Requirements and Process (2026 DAFF Guide) | PawValid',
  description:
    'Complete guide to importing a cat into Australia under DAFF biosecurity rules. Understand cat health requirements, FVRCP vaccines, rabies titer clocks, hybrid cat breed bans (Bengal/Savannah), and the Mickleham cattery experience.',
  keywords: [
    'cat quarantine australia',
    'bring cat to australia',
    'import cat australia',
    'australia cat quarantine requirements',
    'bengal cat import australia',
    'savannah cat ban australia',
    'mickleham cattery quarantine',
    'cat import permit australia',
    'DAFF cat import requirements',
  ],
  alternates: getHreflangAlternates('/cat-quarantine-australia'),
  openGraph: {
    title: 'Cat Quarantine in Australia: Requirements & Process (DAFF Guide) | PawValid',
    description:
      'Definitive feline guide to moving your cat to Australia. Master FVRCP vaccinations, rabies titer timelines, wild hybrid restrictions, and Mickleham cattery care.',
    url: 'https://pawvalid.online/en/cat-quarantine-australia',
    siteName: 'PawValid',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cat Quarantine in Australia: Requirements & Process | PawValid',
    description:
      'Feline-specific rules for entering Australia: health tests, hybrid breed bans, pregnancy limits, and the Mickleham cattery experience.',
  },
};

const CAT_QUARANTINE_FAQS = [
  {
    q: 'Do cats have to stay in quarantine when moving to Australia?',
    a: 'Yes. All cats entering Australia from approved Group 2 countries (e.g. UK, Singapore, Japan) and Group 3 countries (e.g. USA, Canada, EU) must complete a mandatory stay of at least 10 days at the Mickleham Post Entry Quarantine (PEQ) facility in Melbourne, Victoria. Only cats coming directly from New Zealand (Group 1) are exempt from quarantine.',
  },
  {
    q: 'Are Bengal cats allowed into Australia?',
    a: 'Only 5th generation (F5) or higher Bengal cats are legally permitted into Australia. Under the Environment Protection and Biodiversity Conservation Act 1999 (EPBC Act), all first to fourth generation (F1, F2, F3, F4) Bengal cats are classified as wild hybrid felids and strictly banned from importation. Importers of F5+ Bengal cats must provide official certified five-generation pedigree certificates registered with TICA, CFA, or GCCF.',
  },
  {
    q: 'Are Savannah cats permitted to enter Australia?',
    a: 'No. Savannah cats (crosses between domestic cats and the African Serval, Leptailurus serval) are completely banned from importation into Australia at all generational levels (F1 through F5+). They are designated as an extreme threat to native Australian wildlife.',
  },
  {
    q: 'What vaccinations are required for cats entering Australia?',
    a: 'Cats must receive a full course of core feline vaccines protecting against Feline Enteritis (panleukopenia), Feline Rhinotracheitis (feline herpesvirus), and Feline Calicivirus (FVRCP vaccine). The vaccine must be valid and administered within the manufacturer’s licensed window. Additionally, cats from Group 3 countries must receive an approved inactivated rabies vaccine and pass an RNATT blood titer test (≥ 0.50 IU/mL).',
  },
  {
    q: 'Can pregnant cats travel to Australia?',
    a: 'No. DAFF biosecurity regulations strictly mandate that female cats must not be more than 3 weeks (21 days) pregnant at the scheduled time of departure, nor may they travel while nursing unweaned kittens. If a cat is found to be in late gestation upon arrival, quarantine will be extended and significant veterinary surcharge fees will apply.',
  },
  {
    q: 'What is the cattery environment like at Mickleham?',
    a: 'The Mickleham PEQ cattery is an acoustically isolated, climate-controlled feline compound completely separate from canine housing. Each cat is accommodated in an individual multi-level suite featuring climbing ledges, scratching posts, private sleeping compartments, and separate litter trays. Compatible cats from the same household may share a suite upon request.',
  },
];

export default function CatQuarantineAustraliaPage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Countries', url: '/en/countries' },
    { name: 'Australia', url: '/en/countries/australia' },
    { name: 'Cat Quarantine in Australia', url: '/en/cat-quarantine-australia' },
  ];

  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);
  const faqSchema = getFaqSchema(CAT_QUARANTINE_FAQS);
  const medicalSchema = getMedicalWebPageSchema({
    name: 'Cat Quarantine in Australia: Requirements and Process (DAFF Biosecurity Guide)',
    description:
      'Official statutory guidance for importing cats into Australia under DAFF regulations, including hybrid breed bans and Mickleham cattery care.',
    url: '/en/cat-quarantine-australia',
    authority: 'Department of Agriculture, Fisheries and Forestry (DAFF Australia)',
    authorityUrl: 'https://www.agriculture.gov.au/biosecurity-trade/import/goods/live-animals/pets/cats',
    lastReviewed: '2026-10-14',
    reviewerName: 'Dr. Sarah Miller, DVM',
    reviewerTitle: 'Veterinary Biosecurity Specialist & Cross-Border Compliance Auditor',
  });
  const howToSchema = getHowToSchema({
    title: 'How to Prepare Your Cat for Australia Import & Quarantine',
    description:
      'Step-by-step feline preparation roadmap for Australian entry and Mickleham release.',
    steps: [
      {
        step: 1,
        title: 'Microchip & Rabies Vaccine',
        description: 'Implant 15-digit ISO microchip and administer approved rabies vaccine.',
      },
      {
        step: 2,
        title: 'RNATT Blood Titer Test & 180-Day Wait',
        description: 'Draw blood for RNATT titer test (Group 3) and commence the 180-day countdown.',
      },
      {
        step: 3,
        title: 'Apply for DAFF BICON Import Permit',
        description: 'Submit import permit application via DAFF BICON at least 4 months prior to flight.',
      },
      {
        step: 4,
        title: 'Administer FVRCP Core Vaccines & Parasite Doses',
        description: 'Ensure Feline Enteritis and viral vaccines are up to date and administer external/internal parasite doses.',
      },
      {
        step: 5,
        title: 'Final Health Exam & Cargo Flight to Melbourne',
        description: 'Within 5 days of flight, accredited vet completes health exam and cat flies as manifest cargo to Melbourne.',
      },
      {
        step: 6,
        title: '10-Day Stay in Mickleham Cattery',
        description: 'Cat completes 10 days in the Mickleham cattery before release to owner.',
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
              Cat Quarantine in Australia
            </span>
          </nav>
          <div className="inline-flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80 text-[11px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>DAFF Feline Biosecurity Standards</span>
          </div>
        </div>
      </div>

      {/* ─── HERO SECTION ────────────────────────────────────────────── */}
      <section className="bg-white border-b border-zinc-200/80 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200/80 text-xs font-bold uppercase tracking-wider mb-4">
              <span>Feline Biosecurity Protocol</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0E2342] tracking-tight leading-tight mb-4">
              Cat Quarantine in Australia: Requirements and Process
            </h1>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed mb-6">
              Relocating a cat to Australia requires navigating strict veterinary protocols established by the <strong>Department of Agriculture, Fisheries and Forestry (DAFF)</strong>. While cats do not require the extensive canine bacterial serology tests mandated for dogs (such as <em>Ehrlichia</em> or <em>Brucella</em>), they face rigorous scrutiny regarding core viral immunizations, <strong>mandatory rabies blood titer (RNATT) 180-day waiting periods</strong>, strict statutory bans on wild feline hybrids, and a mandatory 10-day stay at the <strong>Mickleham Post Entry Quarantine (PEQ)</strong> facility in Melbourne.
            </p>

            {/* Reviewer Trust Banner */}
            <div className="flex items-center gap-3 p-3.5 bg-[#F8FAFB] border border-zinc-200/80 rounded-xl text-xs text-zinc-600 mb-8">
              <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 font-bold shrink-0">
                SM
              </div>
              <div className="flex-1 leading-snug">
                <span className="font-bold text-zinc-900">Statutorily &amp; Medically Reviewed</span> by Dr. Sarah Miller, DVM &bull; Verified against Australian DAFF Feline Biosecurity Import Conditions, EPBC Act Hybrid Restrictions, and Mickleham Cattery Protocols (Updated October 2026).
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              <div className="bg-[#F8FAFB] rounded-xl p-4 border border-zinc-200/80">
                <span className="text-[11px] font-semibold text-zinc-500 block uppercase">
                  Quarantine Duration
                </span>
                <strong className="text-xl font-bold text-zinc-900 mt-1 block">
                  10 Days
                </strong>
                <span className="text-[11px] text-zinc-500 mt-0.5 block">
                  Mickleham cattery suite
                </span>
              </div>
              <div className="bg-[#F8FAFB] rounded-xl p-4 border border-zinc-200/80">
                <span className="text-[11px] font-semibold text-zinc-500 block uppercase">
                  Hybrid Cat Status
                </span>
                <strong className="text-xl font-bold text-zinc-900 mt-1 block">
                  Strictly Banned
                </strong>
                <span className="text-[11px] text-zinc-500 mt-0.5 block">
                  F1–F4 Bengal, Savannah, etc.
                </span>
              </div>
              <div className="bg-[#F8FAFB] rounded-xl p-4 border border-zinc-200/80">
                <span className="text-[11px] font-semibold text-zinc-500 block uppercase">
                  Rabies Titer Wait
                </span>
                <strong className="text-xl font-bold text-zinc-900 mt-1 block">
                  180 Days
                </strong>
                <span className="text-[11px] text-zinc-500 mt-0.5 block">
                  Mandatory for Group 3 cats
                </span>
              </div>
              <div className="bg-[#F8FAFB] rounded-xl p-4 border border-zinc-200/80">
                <span className="text-[11px] font-semibold text-zinc-500 block uppercase">
                  Pregnancy Limit
                </span>
                <strong className="text-xl font-bold text-zinc-900 mt-1 block">
                  &lt; 3 Weeks
                </strong>
                <span className="text-[11px] text-zinc-500 mt-0.5 block">
                  Strictly enforced at intake
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
                  href="#cat-health-requirements"
                  className="bg-white px-3 py-1.5 rounded-lg border border-zinc-200/90 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors font-medium"
                >
                  1. Cat Health Requirements
                </a>
                <a
                  href="#restricted-breeds"
                  className="bg-white px-3 py-1.5 rounded-lg border border-zinc-200/90 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors font-medium"
                >
                  2. Restricted Breeds (Hybrid Cats)
                </a>
                <a
                  href="#quarantine-facility-experience"
                  className="bg-white px-3 py-1.5 rounded-lg border border-zinc-200/90 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors font-medium"
                >
                  3. Quarantine Facility Experience (Mickleham Cattery)
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

            {/* ─── SECTION 1: CAT HEALTH REQUIREMENTS ───────────────── */}
            <section id="cat-health-requirements" className="scroll-mt-20 space-y-6">
              <div className="border-b border-zinc-200 pb-4">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                  Veterinary Protocol
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E2342]">
                  Cat Health Requirements
                </h2>
              </div>

              <p className="text-sm sm:text-base text-zinc-700 leading-relaxed">
                Veterinary preparation for cats moving to Australia focuses on three core areas: permanent ISO electronic identification, core viral immunizations, and strict internal and external parasitic eradication.
              </p>

              {/* Feline Requirements Breakdown */}
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-[#0E2342] text-white flex items-center justify-center font-bold text-xs">
                      1
                    </span>
                    <h3 className="font-bold text-sm sm:text-base text-[#0E2342]">
                      Microchip Implantation &amp; Verification
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Your cat must be identified with a <strong>15-digit ISO 11784/11785 compliant microchip</strong>. The microchip must be scanned and officially recorded prior to any vaccination, rabies blood draw, or veterinary procedure. If the chip is unreadable at Melbourne Airport intake, the cat cannot enter Australia.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-[#0E2342] text-white flex items-center justify-center font-bold text-xs">
                      2
                    </span>
                    <h3 className="font-bold text-sm sm:text-base text-[#0E2342]">
                      Rabies Vaccination &amp; 180-Day RNATT Titer (Group 3)
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    For cats originating in Group 3 countries (e.g. USA, Canada, EU), an approved inactivated or recombinant rabies vaccine must be administered. At least 30 days later, blood is drawn for an <strong>RNATT / FAVN rabies titer test</strong> (must achieve ≥ 0.50 IU/mL). The cat cannot enter Australia until <strong>180 days have passed</strong> since the laboratory received the blood sample. Cats originating in Group 2 (UK, Singapore, Japan) are exempt from rabies requirements.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-[#0E2342] text-white flex items-center justify-center font-bold text-xs">
                      3
                    </span>
                    <h3 className="font-bold text-sm sm:text-base text-[#0E2342]">
                      Core Feline Vaccines (FVRCP / Feline Enteritis)
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Cats must be fully vaccinated against <strong>Feline Enteritis (Panleukopenia)</strong>, <strong>Feline Viral Rhinotracheitis (Herpesvirus)</strong>, and <strong>Feline Calicivirus</strong>. The final booster must be administered at least 14 days before export and remain within its valid duration of immunity on the date of entry.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-[#0E2342] text-white flex items-center justify-center font-bold text-xs">
                      4
                    </span>
                    <h3 className="font-bold text-sm sm:text-base text-[#0E2342]">
                      Parasite Treatments &amp; Pregnancy Verification
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Cats must receive certified veterinary treatment against external parasites (fleas and ticks) starting at least 21 days before export and again within <strong>5 days of departure</strong>. Internal parasite treatment (Praziquantel) must be administered twice, 14 days apart, with the final dose within 5 days of travel. Additionally, female cats must be certified by a vet as <strong>not more than 3 weeks pregnant</strong>.
                  </p>
                </div>
              </div>
            </section>

            {/* ─── SECTION 2: RESTRICTED BREEDS ─────────────────────── */}
            <section id="restricted-breeds" className="scroll-mt-20 space-y-6">
              <div className="border-b border-zinc-200 pb-4">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                  Biosecurity &amp; Ecology
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E2342]">
                  Restricted Breeds (Hybrid Cats)
                </h2>
              </div>

              <p className="text-sm sm:text-base text-zinc-700 leading-relaxed">
                Australia&apos;s wildlife is uniquely vulnerable to non-native predators. Under the <em>Environment Protection and Biodiversity Conservation Act 1999 (EPBC Act)</em>, the Australian Government strictly prohibits the importation of domestic cat crosses with wild feline species.
              </p>

              {/* Hybrid Bans Grid */}
              <div className="p-5 rounded-2xl bg-red-50 border border-red-200/90 text-xs text-red-900 space-y-3">
                <h3 className="font-bold text-sm text-red-950 flex items-center gap-1.5">
                  <span>🚫</span> Banned Wild Feline Hybrids in Australia
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-red-900">
                  <div className="p-2.5 bg-white/70 rounded-lg border border-red-200/80 font-medium">
                    &bull; Savannah Cat (Domestic cat × Serval) &ndash; Completely Banned
                  </div>
                  <div className="p-2.5 bg-white/70 rounded-lg border border-red-200/80 font-medium">
                    &bull; Safari Cat (Domestic cat × Geoffroy&apos;s cat) &ndash; Completely Banned
                  </div>
                  <div className="p-2.5 bg-white/70 rounded-lg border border-red-200/80 font-medium">
                    &bull; Chausie Cat (Domestic cat × Jungle cat) &ndash; Completely Banned
                  </div>
                  <div className="p-2.5 bg-white/70 rounded-lg border border-red-200/80 font-medium">
                    &bull; F1 to F4 Bengal Cat (Domestic cat × Asian Leopard Cat) &ndash; Banned
                  </div>
                </div>
              </div>

              {/* Bengal Cat Rule Callout */}
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/80 text-xs text-amber-900 space-y-1.5">
                <div className="font-bold text-amber-950 flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-amber-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>Strict Rules for Bengal Cats: Generation 5 (F5) or Higher Only</span>
                </div>
                <p className="leading-relaxed">
                  Bengal cats are only permitted into Australia if they are <strong>at least 5 generations removed</strong> from their Asian Leopard Cat (<em>Prionailurus bengalensis</em>) ancestor. To obtain an import permit for a Bengal cat, you must upload a certified, multi-generation pedigree certificate issued by an approved cat registry (e.g. TICA, CFA, GCCF) proving pure domestic ancestry back five full ancestral generations. Cats without verified five-generation pedigree papers are automatically rejected.
                </p>
              </div>
            </section>

            {/* ─── SECTION 3: QUARANTINE FACILITY EXPERIENCE ────────── */}
            <section id="quarantine-facility-experience" className="scroll-mt-20 space-y-6">
              <div className="border-b border-zinc-200 pb-4">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                  Mickleham Cattery
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E2342]">
                  Quarantine Facility Experience
                </h2>
              </div>

              <p className="text-sm sm:text-base text-zinc-700 leading-relaxed">
                Many cat owners worry about their pet&apos;s stress levels during post-entry quarantine. Australia&apos;s <strong>Mickleham Post Entry Quarantine (PEQ)</strong> facility in Victoria was specifically engineered to cater to feline behavioral needs and reduce environmental stress.
              </p>

              {/* Cattery Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs space-y-2">
                  <h3 className="font-bold text-sm text-[#0E2342] flex items-center gap-1.5">
                    <span className="text-emerald-700">✓</span> Acoustic Separation from Dogs
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    The cattery building is fully isolated and physically detached from all canine boarding wings. Cats never hear dog barking or see other animals during their stay, eliminating the primary driver of feline stress.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs space-y-2">
                  <h3 className="font-bold text-sm text-[#0E2342] flex items-center gap-1.5">
                    <span className="text-emerald-700">✓</span> Multi-Level Private Suites
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Each cat has an individual, climate-controlled suite equipped with vertical climbing perches, hiding hideaways, scratching posts, and separate elevated sleeping zones away from the litter box.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs space-y-2">
                  <h3 className="font-bold text-sm text-[#0E2342] flex items-center gap-1.5">
                    <span className="text-emerald-700">✓</span> Specialized Feeding &amp; Litter Care
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Mickleham stocks premium wet and dry cat foods (Royal Canin, Hills). Litter boxes are cleaned multiple times daily. Owners can specify dietary preferences and supply prescription medications if required.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs space-y-2">
                  <h3 className="font-bold text-sm text-[#0E2342] flex items-center gap-1.5">
                    <span className="text-emerald-700">✓</span> Multi-Cat Cohabitation
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Cats from the same household traveling on the same itinerary may share a large cattery suite upon request, providing familiar companionship and reducing daily boarding fees.
                  </p>
                </div>
              </div>
            </section>

            {/* ─── SECTION 4: FAQS ──────────────────────────────────── */}
            <section id="faqs" className="scroll-mt-20 space-y-6">
              <div className="border-b border-zinc-200 pb-4">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                  Official Guidance
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E2342]">
                  Frequently Asked Questions About Cat Quarantine in Australia
                </h2>
              </div>

              <p className="text-sm text-zinc-600">
                Official regulatory guidance regarding feline health requirements, wild hybrid cat restrictions, and the Mickleham cattery experience.
              </p>

              <div className="bg-white rounded-2xl border border-zinc-200/90 shadow-2xs p-4 sm:p-6">
                <FaqAccordion items={CAT_QUARANTINE_FAQS} />
              </div>
            </section>

          </main>

          {/* Right Sidebar (4 cols) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Interactive Checker Sticky Card */}
            <div className="bg-white rounded-2xl border border-zinc-200/90 p-5 shadow-sm space-y-4 lg:sticky lg:top-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs border border-emerald-200/80">
                  🐈
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#0E2342]">
                    Audit Cat Entry Rules
                  </h3>
                  <span className="text-[11px] text-zinc-500">
                    Moving your cat to Australia?
                  </span>
                </div>
              </div>

              <p className="text-xs text-zinc-600 leading-relaxed">
                Verify FVRCP vaccine dates, calculate the 180-day rabies titer latency clock, and confirm hybrid breed eligibility with PawValid.
              </p>

              <div className="space-y-2 pt-1">
                <Link
                  href="/checker?dest=AU&species=cat"
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-[#0E2342] hover:bg-[#16345E] text-white text-xs font-semibold py-2.5 px-4 rounded-xl shadow-xs transition-all text-center"
                >
                  <span>Start Cat Compliance Audit →</span>
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
                <div>&bull; <a href="https://www.agriculture.gov.au/biosecurity-trade/import/goods/live-animals/pets/cats" target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-zinc-900 underline">DAFF Feline Import Rules</a></div>
                <div>&bull; <a href="https://bicon.agriculture.gov.au" target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-zinc-900 underline">DAFF BICON System</a></div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
