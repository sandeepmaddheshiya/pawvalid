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
  title: 'Australian Quarantine for Dogs: Rules and Preparation (2026 DAFF Guide) | PawValid',
  description:
    'Complete statutory guide to Australian dog quarantine and import requirements under DAFF biosecurity rules. Detailed serology tests (Brucella, Ehrlichia, Leishmania), vaccinations, parasite treatments, banned breeds, and Mickleham preparation.',
  keywords: [
    'australian quarantine for dogs',
    'dog import australia',
    'bring dog to australia',
    'australia dog quarantine requirements',
    'ehrlichia canis test australia',
    'brucella canis dog australia',
    'leishmania test australia dog',
    'banned dog breeds australia',
    'mickleham dog quarantine',
  ],
  alternates: getHreflangAlternates('/australian-quarantine-for-dogs'),
  openGraph: {
    title: 'Australian Quarantine for Dogs: Rules and Preparation (DAFF Guide) | PawValid',
    description:
      'Everything you need to import your dog into Australia. Master the 5 mandatory canine blood tests, C5 vaccinations, parasite schedules, banned breeds, and Mickleham care.',
    url: 'https://pawvalid.online/en/australian-quarantine-for-dogs',
    siteName: 'PawValid',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Australian Quarantine for Dogs: Rules & Prep (2026) | PawValid',
    description:
      'Canine-specific rules for Australian quarantine: blood tests, core vaccines, parasite protocols, banned breeds, and preparing your dog.',
  },
};

const DOG_QUARANTINE_FAQS = [
  {
    q: 'What blood tests are mandatory for dogs entering Australia?',
    a: 'Dogs entering Australia must undergo comprehensive laboratory testing: (1) Rabies Neutralising Antibody Titre (RNATT) for Group 3 countries (must be ≥ 0.50 IU/mL); (2) Ehrlichia canis IFAT serological test (must test negative within 21 days before export); (3) Leishmania infantum IFAT or ELISA serology (must test negative within 21 days before export); (4) Brucella canis serology for intact/non-desexed dogs (must test negative within 14 days of export); and (5) Leptospira interrogans serovar Canicola (negative MAT test within 45 days or an approved course of prophylactic doxycycline).',
  },
  {
    q: 'Can my dog avoid quarantine in Australia if all tests are negative?',
    a: 'No. Unless your dog is arriving directly from New Zealand (Group 1), all dogs entering Australia from Group 2 (e.g. UK, Singapore, Japan) or Group 3 (e.g. USA, Canada, EU) must complete a mandatory minimum 10-day stay at the Mickleham Post Entry Quarantine (PEQ) facility in Melbourne, Victoria, regardless of how clean their pre-export medical record is.',
  },
  {
    q: 'What happens if my dog tests positive for Ehrlichia or Brucella before travel?',
    a: 'Under Australian biosecurity law, any dog testing positive for Ehrlichia canis, Leishmania infantum, or Brucella canis is disqualified from entering Australia. There are no waivers or exceptions. If your dog tests positive, export to Australia cannot take place.',
  },
  {
    q: 'Are desexed (neutered/spayed) dogs exempt from any tests?',
    a: 'Yes. Dogs that are desexed (castrated males or spayed females) with an official veterinary certificate of desexing or clear anatomical evidence are statutorily exempt from the Brucella canis serological blood test. Intact dogs must undergo Brucella canis testing within 14 days of departure.',
  },
  {
    q: 'Which dog breeds are legally banned from entering Australia?',
    a: 'Under the Customs (Prohibited Imports) Regulations 1956, Australia strictly bans the importation of: Dogo Argentino, Fila Brasileiro, Japanese Tosa, American Pit Bull Terrier (and Pit Bull Terrier types), and Perro de Presa Canario. Domestic dog hybrids (such as wolfdogs or dingo crosses) are also strictly prohibited. If your dog resembles a pit bull or mastiff type, DAFF requires a veterinary statutory breed declaration.',
  },
  {
    q: 'How are dogs exercised and fed during Mickleham quarantine?',
    a: 'At the Mickleham PEQ facility, dogs are housed in climate-controlled indoor/outdoor runs with heated floors. DAFF animal attendants provide twice-daily exercise in secure, grassed outdoor paddocks. Dogs are fed premium commercial dry food twice daily, but owners can arrange prescription diets or daily medications if coordinated in advance with the facility manager.',
  },
];

export default function AustralianQuarantineForDogsPage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Countries', url: '/en/countries' },
    { name: 'Australia', url: '/en/countries/australia' },
    { name: 'Australian Quarantine for Dogs', url: '/en/australian-quarantine-for-dogs' },
  ];

  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);
  const faqSchema = getFaqSchema(DOG_QUARANTINE_FAQS);
  const medicalSchema = getMedicalWebPageSchema({
    name: 'Australian Quarantine for Dogs: Rules and Preparation (DAFF Biosecurity Guide)',
    description:
      'Statutory canine-specific biosecurity requirements for importing dogs into Australia under DAFF regulations.',
    url: '/en/australian-quarantine-for-dogs',
    authority: 'Department of Agriculture, Fisheries and Forestry (DAFF Australia)',
    authorityUrl: 'https://www.agriculture.gov.au/biosecurity-trade/import/goods/live-animals/pets/dogs',
    lastReviewed: '2026-10-14',
    reviewerName: 'Dr. Sarah Miller, DVM',
    reviewerTitle: 'Veterinary Biosecurity Specialist & Cross-Border Compliance Auditor',
  });
  const howToSchema = getHowToSchema({
    title: 'How to Prepare Your Dog for Australian Quarantine',
    description:
      'Step-by-step canine preparation timeline for Australian biosecurity compliance and 10-day Mickleham release.',
    steps: [
      {
        step: 1,
        title: 'Microchip & Rabies Vaccination',
        description: 'Implant 15-digit ISO microchip and administer approved rabies vaccine.',
      },
      {
        step: 2,
        title: 'RNATT Blood Titer Test & 180-Day Wait',
        description: 'Draw blood for RNATT titer test and commence the mandatory 180-day waiting clock.',
      },
      {
        step: 3,
        title: 'DAFF BICON Permit Application',
        description: 'Apply for the DAFF import permit on BICON at least 4 months prior to travel.',
      },
      {
        step: 4,
        title: 'Pre-Export Canine Serology Testing',
        description: 'Complete blood tests for Ehrlichia, Leishmania, Brucella, and Leptospira within required windows.',
      },
      {
        step: 5,
        title: 'Mandatory Parasite Treatments & Health Endorsement',
        description: 'Administer dual internal/external parasite treatments and secure official government vet endorsement.',
      },
      {
        step: 6,
        title: 'Cargo Flight to Melbourne & 10-Day Quarantine',
        description: 'Fly as manifest cargo into Melbourne (MEL) and complete 10 days at Mickleham PEQ.',
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
              Quarantine for Dogs
            </span>
          </nav>
          <div className="inline-flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80 text-[11px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>DAFF Canine Biosecurity Standards</span>
          </div>
        </div>
      </div>

      {/* ─── HERO SECTION ────────────────────────────────────────────── */}
      <section className="bg-white border-b border-zinc-200/80 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200/80 text-xs font-bold uppercase tracking-wider mb-4">
              <span>Canine Biosecurity Directive</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0E2342] tracking-tight leading-tight mb-4">
              Australian Quarantine for Dogs: Rules and Preparation
            </h1>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed mb-6">
              Importing a dog into Australia is subject to the strictest veterinary biosecurity scrutiny in the world. Because Australia is free of canine rabies, <em>Brucella canis</em>, and vector-borne tick diseases like <em>Ehrlichia canis</em>, the <strong>Department of Agriculture, Fisheries and Forestry (DAFF)</strong> enforces zero-tolerance testing protocols, specific vaccination timelines, mandatory external and internal parasite regimens, and strict quarantine stays at the <strong>Mickleham Post Entry Quarantine (PEQ)</strong> facility. This guide outlines every veterinary requirement and clinical milestone needed to prepare your dog.
            </p>

            {/* Reviewer Trust Banner */}
            <div className="flex items-center gap-3 p-3.5 bg-[#F8FAFB] border border-zinc-200/80 rounded-xl text-xs text-zinc-600 mb-8">
              <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 font-bold shrink-0">
                SM
              </div>
              <div className="flex-1 leading-snug">
                <span className="font-bold text-zinc-900">Statutorily &amp; Medically Reviewed</span> by Dr. Sarah Miller, DVM &bull; Verified against DAFF Canine Import Standards, WOAH Biosecurity Directives, and Australian Biosecurity Act 2015 (Updated October 2026).
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              <div className="bg-[#F8FAFB] rounded-xl p-4 border border-zinc-200/80">
                <span className="text-[11px] font-semibold text-zinc-500 block uppercase">
                  Quarantine Stay
                </span>
                <strong className="text-xl font-bold text-zinc-900 mt-1 block">
                  10 Days
                </strong>
                <span className="text-[11px] text-zinc-500 mt-0.5 block">
                  Standard compliant track
                </span>
              </div>
              <div className="bg-[#F8FAFB] rounded-xl p-4 border border-zinc-200/80">
                <span className="text-[11px] font-semibold text-zinc-500 block uppercase">
                  Blood Serology
                </span>
                <strong className="text-xl font-bold text-zinc-900 mt-1 block">
                  4 Tests
                </strong>
                <span className="text-[11px] text-zinc-500 mt-0.5 block">
                  Ehrlichia, Brucella, Leishmania, Lepto
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
                  From blood sample arrival
                </span>
              </div>
              <div className="bg-[#F8FAFB] rounded-xl p-4 border border-zinc-200/80">
                <span className="text-[11px] font-semibold text-zinc-500 block uppercase">
                  Flight Mode
                </span>
                <strong className="text-xl font-bold text-zinc-900 mt-1 block">
                  Manifest Cargo
                </strong>
                <span className="text-[11px] text-zinc-500 mt-0.5 block">
                  Direct to Melbourne (MEL)
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
                  href="#dog-health-requirements"
                  className="bg-white px-3 py-1.5 rounded-lg border border-zinc-200/90 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors font-medium"
                >
                  1. Dog Health Requirements (Blood Tests, Vaccines, Parasites)
                </a>
                <a
                  href="#banned-breeds"
                  className="bg-white px-3 py-1.5 rounded-lg border border-zinc-200/90 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors font-medium"
                >
                  2. Banned and Restricted Breeds
                </a>
                <a
                  href="#preparing-your-dog"
                  className="bg-white px-3 py-1.5 rounded-lg border border-zinc-200/90 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors font-medium"
                >
                  3. Preparing Your Dog for Quarantine
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

            {/* ─── SECTION 1: DOG HEALTH REQUIREMENTS ───────────────── */}
            <section id="dog-health-requirements" className="scroll-mt-20 space-y-6">
              <div className="border-b border-zinc-200 pb-4">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                  Veterinary Protocol
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E2342]">
                  Dog Health Requirements
                </h2>
              </div>

              <p className="text-sm sm:text-base text-zinc-700 leading-relaxed">
                Before your dog can board an international flight bound for Melbourne, your accredited private vet must execute a series of diagnostic blood tests, vaccinations, and certified parasitic treatments within strictly defined chronological windows.
              </p>

              {/* H3: Blood tests */}
              <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-[#0E2342] text-white flex items-center justify-center font-bold text-xs">
                    1
                  </span>
                  <h3 className="font-bold text-base text-[#0E2342]">
                    Mandatory Blood Tests &amp; Serology
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  Every blood test must be processed by an approved government or reference laboratory, and all results must test negative (except the RNATT rabies titer which must show protective antibodies):
                </p>

                <div className="space-y-3">
                  <div className="p-3.5 bg-zinc-50 rounded-xl border border-zinc-200/80 text-xs space-y-1">
                    <strong className="text-zinc-900 block font-bold">
                      1. Rabies Neutralising Antibody Titre (RNATT / FAVN):
                    </strong>
                    <p className="text-zinc-600 leading-relaxed">
                      Required for dogs originating in Group 3 countries. The blood draw must show an antibody level of <strong>≥ 0.50 IU/mL</strong>. The mandatory <strong>180-day waiting clock</strong> starts on the day the laboratory receives the blood sample.
                    </p>
                  </div>

                  <div className="p-3.5 bg-zinc-50 rounded-xl border border-zinc-200/80 text-xs space-y-1">
                    <strong className="text-zinc-900 block font-bold">
                      2. Ehrlichia canis (Canine Monocytic Ehrlichiosis):
                    </strong>
                    <p className="text-zinc-600 leading-relaxed">
                      Tick-borne bacterial infection. Blood sample must be tested using an Indirect Fluorescent Antibody Test (IFAT) within <strong>21 days before export</strong> and produce a negative result at a dilution of 1:40 (or 1:50 depending on lab protocol).
                    </p>
                  </div>

                  <div className="p-3.5 bg-zinc-50 rounded-xl border border-zinc-200/80 text-xs space-y-1">
                    <strong className="text-zinc-900 block font-bold">
                      3. Leishmania infantum:
                    </strong>
                    <p className="text-zinc-600 leading-relaxed">
                      Protozoan parasite transmitted by sandflies. Blood sample must be tested using an IFAT or ELISA test within <strong>21 days before export</strong> and test negative.
                    </p>
                  </div>

                  <div className="p-3.5 bg-zinc-50 rounded-xl border border-zinc-200/80 text-xs space-y-1">
                    <strong className="text-zinc-900 block font-bold">
                      4. Brucella canis:
                    </strong>
                    <p className="text-zinc-600 leading-relaxed">
                      Mandatory for intact (non-desexed) dogs. Must test negative by rapid slide agglutination test (RSA) or tube agglutination within <strong>14 days before export</strong>. Desexed dogs with a veterinary desexing certificate are exempt.
                    </p>
                  </div>

                  <div className="p-3.5 bg-zinc-50 rounded-xl border border-zinc-200/80 text-xs space-y-1">
                    <strong className="text-zinc-900 block font-bold">
                      5. Leptospira interrogans serovar Canicola:
                    </strong>
                    <p className="text-zinc-600 leading-relaxed">
                      Requires a negative microscopic agglutination test (MAT) within <strong>45 days before export</strong>, OR a full 14-day pre-export course of oral doxycycline.
                    </p>
                  </div>
                </div>
              </div>

              {/* H3: Vaccinations */}
              <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-[#0E2342] text-white flex items-center justify-center font-bold text-xs">
                    2
                  </span>
                  <h3 className="font-bold text-base text-[#0E2342]">
                    Core Canine Vaccinations
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  Dogs must be fully immunized against core viral pathogens at least 14 days before travel and within the manufacturer’s licensed duration of immunity:
                </p>
                <ul className="list-disc pl-5 text-xs text-zinc-600 space-y-1.5 leading-relaxed">
                  <li><strong>Canine Distemper Virus (CDV)</strong></li>
                  <li><strong>Infectious Canine Hepatitis / Adenovirus (CAV)</strong></li>
                  <li><strong>Canine Parvovirus (CPV)</strong></li>
                  <li><strong>Canine Parainfluenza &amp; Bordetella bronchiseptica (C5 component):</strong> Recommended for kennel cough protection during flight and PEQ stay.</li>
                  <li><strong>Rabies Vaccine:</strong> Approved inactivated or recombinant vaccine administered on or after microchip implantation date.</li>
                </ul>
              </div>

              {/* H3: Parasite treatments */}
              <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-[#0E2342] text-white flex items-center justify-center font-bold text-xs">
                    3
                  </span>
                  <h3 className="font-bold text-base text-[#0E2342]">
                    Parasite Treatments (Ticks, Fleas &amp; Tapeworms)
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  Because Australia is free of brown dog ticks carrying <em>Ehrlichia canis</em> and exotic tick vectors, parasite treatments must follow a strict statutory schedule:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 text-xs space-y-1">
                    <strong className="text-zinc-900 block font-bold">External Parasite Treatment (Ticks/Fleas):</strong>
                    <p className="text-zinc-600 leading-relaxed">
                      Must start at least 21 days before export and be continuous until departure. A second treatment must be administered within <strong>5 days of export</strong>. Only DAFF-approved products (e.g. fipronil, permethrin, fluralaner) are accepted.
                    </p>
                  </div>
                  <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 text-xs space-y-1">
                    <strong className="text-zinc-900 block font-bold">Internal Parasite Treatment (Tapeworms):</strong>
                    <p className="text-zinc-600 leading-relaxed">
                      Must be administered twice by a vet, 14 days apart. The medication must contain <strong>Praziquantel</strong> (effective against <em>Echinococcus granulosus</em>). The second dose must be given within <strong>5 days of export</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ─── SECTION 2: BANNED AND RESTRICTED BREEDS ──────────── */}
            <section id="banned-breeds" className="scroll-mt-20 space-y-6">
              <div className="border-b border-zinc-200 pb-4">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                  Breed Restrictions
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E2342]">
                  Banned and Restricted Breeds
                </h2>
              </div>

              <p className="text-sm sm:text-base text-zinc-700 leading-relaxed">
                The Australian Commonwealth Government strictly enforces the <em>Customs (Prohibited Imports) Regulations 1956</em>. Attempting to import a prohibited purebred, crossbred, or hybrid dog will result in immediate seizure and destruction or re-export at Melbourne Airport.
              </p>

              {/* Banned Breeds Card */}
              <div className="p-5 rounded-2xl bg-red-50 border border-red-200/90 text-xs text-red-900 space-y-3">
                <h3 className="font-bold text-sm text-red-950 flex items-center gap-1.5">
                  <span>🚫</span> Strictly Banned Dog Breeds (and Crosses Thereof)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-red-900">
                  <div className="p-2.5 bg-white/70 rounded-lg border border-red-200/80 font-medium">
                    &bull; American Pit Bull Terrier (and Pit Bull types)
                  </div>
                  <div className="p-2.5 bg-white/70 rounded-lg border border-red-200/80 font-medium">
                    &bull; Dogo Argentino
                  </div>
                  <div className="p-2.5 bg-white/70 rounded-lg border border-red-200/80 font-medium">
                    &bull; Fila Brasileiro (Brazilian Mastiff)
                  </div>
                  <div className="p-2.5 bg-white/70 rounded-lg border border-red-200/80 font-medium">
                    &bull; Japanese Tosa
                  </div>
                  <div className="p-2.5 bg-white/70 rounded-lg border border-red-200/80 font-medium">
                    &bull; Perro de Presa Canario (Presa Canario)
                  </div>
                  <div className="p-2.5 bg-white/70 rounded-lg border border-red-200/80 font-medium">
                    &bull; Domestic wolf-dog hybrids (Wolfdog crosses)
                  </div>
                </div>
              </div>

              {/* Pit Bull / Bully Breed Scrutiny */}
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/80 text-xs text-amber-900 space-y-1.5">
                <div className="font-bold text-amber-950 flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-amber-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>Special Scrutiny for Staffordshire Terriers, Bull Terriers &amp; Mastiffs</span>
                </div>
                <p className="leading-relaxed">
                  If your dog is registered as an American Staffordshire Terrier, Staffordshire Bull Terrier, English Bull Terrier, or Bullmastiff, DAFF biosecurity officers will examine pedigree documents, photographs, and genealogical records closely. You will be required to submit a <strong>veterinary statutory declaration</strong> confirming the dog possesses zero American Pit Bull Terrier lineage.
                </p>
              </div>
            </section>

            {/* ─── SECTION 3: PREPARING YOUR DOG FOR QUARANTINE ──────── */}
            <section id="preparing-your-dog" className="scroll-mt-20 space-y-6">
              <div className="border-b border-zinc-200 pb-4">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                  Practical Preparation
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E2342]">
                  Preparing Your Dog for Quarantine
                </h2>
              </div>

              <p className="text-sm sm:text-base text-zinc-700 leading-relaxed">
                Relocating across oceans and spending 10 days in a government quarantine compound can be mentally and physically demanding for dogs. Proactive behavioral conditioning and logistical preparation make all the difference.
              </p>

              {/* 3 Practical Prep Pillars */}
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs space-y-2">
                  <h3 className="font-bold text-sm text-[#0E2342] flex items-center gap-1.5">
                    <span className="text-emerald-700">1.</span> Crate Conditioning for Long-Haul Cargo
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Under IATA Container Requirement 1, your dog’s travel crate must allow them to stand fully erect without their ears touching the ceiling, turn around easily, and lie down in a natural posture. Acclimate your dog to the crate 2 to 3 months before departure by feeding meals inside and encouraging relaxed sleeping sessions.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs space-y-2">
                  <h3 className="font-bold text-sm text-[#0E2342] flex items-center gap-1.5">
                    <span className="text-emerald-700">2.</span> Diet &amp; Medication Coordination at Mickleham
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Mickleham supplies premium dry food (Royal Canin, Hills, Advance). If your dog requires a specific therapeutic diet (e.g. renal, hypoallergenic, gastrointestinal) or daily prescription medications (e.g. for cardiac, thyroid, or joint conditions), you can submit a Dietary and Medication Request form along with vet-labeled medication bottles during PEQ intake.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs space-y-2">
                  <h3 className="font-bold text-sm text-[#0E2342] flex items-center gap-1.5">
                    <span className="text-emerald-700">3.</span> Post-Release Interstate Transit in Australia
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Once released from Mickleham on Day 10, your dog is considered legally inside Australian biosecurity territory. There are zero internal border checkpoints between Victoria, New South Wales, Queensland, and other states for domestic companion dogs. You can drive your dog home or arrange an onward domestic flight with Virgin Australia or Qantas.
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
                  Frequently Asked Questions About Dog Quarantine in Australia
                </h2>
              </div>

              <p className="text-sm text-zinc-600">
                Official regulatory guidance regarding mandatory canine blood serology, vaccinations, parasite treatments, and banned breeds.
              </p>

              <div className="bg-white rounded-2xl border border-zinc-200/90 shadow-2xs p-4 sm:p-6">
                <FaqAccordion items={DOG_QUARANTINE_FAQS} />
              </div>
            </section>

          </main>

          {/* Right Sidebar (4 cols) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Interactive Checker Sticky Card */}
            <div className="bg-white rounded-2xl border border-zinc-200/90 p-5 shadow-sm space-y-4 lg:sticky lg:top-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs border border-emerald-200/80">
                  🐕
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#0E2342]">
                    Audit Dog Entry Rules
                  </h3>
                  <span className="text-[11px] text-zinc-500">
                    Importing your dog to Australia?
                  </span>
                </div>
              </div>

              <p className="text-xs text-zinc-600 leading-relaxed">
                Verify your dog&apos;s breed eligibility, calculate Ehrlichia/Leishmania testing dates, and verify RNATT titer clocks with PawValid.
              </p>

              <div className="space-y-2 pt-1">
                <Link
                  href="/checker?dest=AU&species=dog"
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-[#0E2342] hover:bg-[#16345E] text-white text-xs font-semibold py-2.5 px-4 rounded-xl shadow-xs transition-all text-center"
                >
                  <span>Start Dog Compliance Audit →</span>
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
                <div>&bull; <a href="https://www.agriculture.gov.au/biosecurity-trade/import/goods/live-animals/pets/dogs" target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-zinc-900 underline">DAFF Canine Import Requirements</a></div>
                <div>&bull; <a href="https://bicon.agriculture.gov.au" target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-zinc-900 underline">BICON System</a></div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
