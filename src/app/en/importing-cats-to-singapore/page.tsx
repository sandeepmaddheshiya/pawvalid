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
  title: 'Importing Cats to Singapore: Requirements & Process (2026 AVS Guide) | PawValid',
  description:
    'Feline-specific statutory guide to importing cats to Singapore under Animal & Veterinary Service (AVS / NParks) rules. Learn FVRCP vaccine mandates, RNATT rabies titers, Sembawang cattery quarantine, HDB cat licensing, banned hybrids, and airline crate rules.',
  keywords: [
    'importing cats to singapore',
    'bring cat to singapore',
    'cat quarantine singapore',
    'singapore cat import requirements',
    'AVS cat import',
    'cat passport singapore',
    'HDB cat rules singapore',
    'bengal cat singapore ban',
    'feline import singapore',
    'sembawang cattery quarantine',
  ],
  alternates: getHreflangAlternates('/importing-cats-to-singapore'),
  openGraph: {
    title: 'Importing Cats to Singapore: Requirements and Process (2026 Guide) | PawValid',
    description:
      'Comprehensive feline guide to importing cats into Singapore under AVS NParks rules. FVRCP vaccines, rabies titers, cattery quarantine at Sembawang, HDB cat framework, and airline considerations.',
    url: 'https://pawvalid.online/en/importing-cats-to-singapore',
    siteName: 'PawValid',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Importing Cats to Singapore: 2026 AVS Requirements | PawValid',
    description:
      'Everything you need to know about bringing your cat to Singapore — FVRCP vaccines, RNATT titers, cattery quarantine, HDB cat licensing, and airline crates.',
  },
};

const CAT_IMPORT_FAQS = [
  {
    q: 'What vaccinations are mandatory for importing a cat to Singapore?',
    a: 'Under AVS biosecurity regulations, all cats must receive a core FVRCP vaccine (Feline Viral Rhinotracheitis, Calicivirus, Panleukopenia) administered between 14 days and 12 months prior to departure. Additionally, cats originating from Category B, C, and D countries must be vaccinated against Rabies at least 30 days prior to travel. Cats from Category A countries (Australia, New Zealand, UK, Ireland) are legally exempt from rabies vaccination.',
  },
  {
    q: 'Do cats need an RNATT rabies blood titer test for Singapore?',
    a: 'Yes, if arriving from a Category C or Category D origin country (including the United States mainland, Canada, European Union member states, India, UAE, and China). The Rabies Neutralising Antibody Titre (RNATT / FAVN) blood test must show an antibody level of at least 0.50 IU/mL, drawn at least 30 days after the qualifying rabies vaccination and between 30 days and 6 months prior to export. Cats from Category A and Category B countries are exempt from titer testing.',
  },
  {
    q: 'How long is quarantine for cats in Singapore?',
    a: 'Quarantine duration for cats depends strictly on the exporting country category: Category A (Australia, NZ, UK, Ireland) and Category B (Japan, Norway, Sweden, Switzerland, Hong Kong, etc.) qualify for 0 days quarantine (direct release upon landing at Changi Airport). Category C cats undergo 10 to 30 days quarantine, and Category D cats undergo 30 days mandatory quarantine at the Sembawang Animal Quarantine Station (SAQS) cattery.',
  },
  {
    q: 'Are cats legally permitted in Singapore HDB flats under the Cat Management Framework?',
    a: 'Yes. Under the official AVS Cat Management Framework launched by NParks and the Housing & Development Board (HDB), residents of HDB flats are legally permitted to keep up to two cats per household. To qualify, imported cats must be implanted with a 15-digit ISO microchip, licensed with AVS via the Pet Animal Licensing System (PALS), and kept safely indoors with meshed windows/grilles.',
  },
  {
    q: 'Which hybrid cat breeds are prohibited in Singapore?',
    a: 'AVS strictly prohibits first-generation (F1) through fourth-generation (F4) Bengal and Savannah hybrid cats from importation or possession in Singapore. Only fifth-generation (F5) or higher crosses are permitted, and owners must provide certified pedigree genealogical documentation from recognized cat breed registries (such as TICA or CFA) during the GoBusiness import licence application.',
  },
  {
    q: 'Can my cat fly in the passenger cabin to Singapore?',
    a: 'AVS biosecurity regulations permit companion cats to arrive in the passenger cabin or as checked baggage on airlines whose company policies allow in-cabin pets (e.g. Air France, KLM, Lufthansa, Korean Air, Delta), provided the approved AVS Import Licence and CAPQ inspection booking are in place. However, certain airlines (including Singapore Airlines on international flights) require all animals to travel strictly as manifested cargo under IATA Live Animals Regulations.',
  },
  {
    q: 'What are the accommodations like for cats at the Sembawang Animal Quarantine Station (SAQS)?',
    a: 'The SAQS cattery provides individual, air-conditioned rooms designed specifically for feline welfare, featuring multi-level shelving, litter boxes, scratching posts, and clean bedding. Cats are monitored daily by government veterinary staff. Owners can visit their cats during official visiting hours (Mon–Fri 4:00 PM – 6:00 PM; Sat 2:00 PM – 6:00 PM).',
  },
  {
    q: 'What internal and external parasite treatments are required for cats?',
    a: 'Between 2 and 7 days prior to departure, an accredited veterinarian must administer an approved internal parasite treatment effective against nematodes and cestodes (e.g. Praziquantel / fenbendazole) and an approved external parasite treatment effective against fleas and ticks (e.g. Fipronil or selamectin). The product trade names, active ingredients, and administration dates must be recorded on the official AVS Veterinary Health Certificate.',
  },
];

export default function ImportingCatsToSingaporePage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Countries', url: '/en/countries' },
    { name: 'Singapore', url: '/en/countries/singapore' },
    { name: 'Importing Cats to Singapore', url: '/en/importing-cats-to-singapore' },
  ];

  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);
  const faqSchema = getFaqSchema(CAT_IMPORT_FAQS);
  const medicalSchema = getMedicalWebPageSchema({
    name: 'Importing Cats to Singapore: Requirements and Process (AVS Feline Guide)',
    description:
      'Statutory biosecurity guidance for importing domestic cats into Singapore under AVS NParks rules, covering FVRCP vaccines, RNATT titers, cattery quarantine, and HDB licensing.',
    url: '/en/importing-cats-to-singapore',
    authority: 'Animal & Veterinary Service (AVS / NParks Singapore)',
    authorityUrl: 'https://www.nparks.gov.sg/avs',
    lastReviewed: '2026-10-04',
    reviewerName: 'Dr. Sarah Miller, DVM',
    reviewerTitle: 'Veterinary Biosecurity Specialist & Feline Travel Auditor',
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
              Importing Cats to Singapore
            </span>
          </nav>
          <div className="inline-flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80 text-[11px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>2026 AVS Feline Biosecurity &amp; HDB Cat Framework</span>
          </div>
        </div>
      </div>

      {/* ─── HERO SECTION ────────────────────────────────────────────── */}
      <section className="bg-white border-b border-zinc-200/80 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200/80 text-xs font-bold uppercase tracking-wider mb-4">
              <span>Feline Relocation Protocol</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0E2342] tracking-tight leading-tight mb-4">
              Importing Cats to Singapore: Requirements and Process
            </h1>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed mb-6">
              Relocating a feline companion to Singapore requires strict adherence to statutory biosecurity standards enforced by the <strong>Animal &amp; Veterinary Service (AVS / NParks)</strong>. While cats share many regulatory touchpoints with dogs, feline import involves specific clinical immunizations (mandatory <strong>FVRCP tri-cat vaccines</strong>), hybrid breed bans (F1–F4 Bengal and Savannah cats), Sembawang cattery quarantine reservations, in-cabin airline options, and compliance with the <strong>AVS Cat Management Framework for HDB housing</strong>. This definitive guide outlines the end-to-end feline relocation pathway.
            </p>

            {/* Reviewer Trust Banner */}
            <div className="flex items-center gap-3 p-3.5 bg-[#F8FAFB] border border-zinc-200/80 rounded-xl text-xs text-zinc-600 mb-8">
              <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 font-bold shrink-0">
                SM
              </div>
              <div className="flex-1 leading-snug">
                <span className="font-bold text-zinc-900">Medically &amp; Statutorily Reviewed</span> by Dr. Sarah Miller, DVM &bull; Veterinary Biosecurity Specialist. Verified against AVS Cat Import Regulations, HDB Cat Framework, and IATA Live Animals Regulations (LAR).
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              <div className="bg-[#F8FAFB] rounded-xl p-4 border border-zinc-200/80">
                <span className="text-[11px] font-semibold text-zinc-500 block uppercase">
                  Mandatory Vaccine
                </span>
                <strong className="text-xl font-bold text-zinc-900 mt-1 block">
                  FVRCP Core
                </strong>
                <span className="text-[11px] text-zinc-500 mt-0.5 block">
                  14d to 12mo pre-flight
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
                  Category C &amp; D origins
                </span>
              </div>
              <div className="bg-[#F8FAFB] rounded-xl p-4 border border-zinc-200/80">
                <span className="text-[11px] font-semibold text-zinc-500 block uppercase">
                  HDB Cat Allowance
                </span>
                <strong className="text-xl font-bold text-emerald-700 mt-1 block">
                  Up to 2 Cats
                </strong>
                <span className="text-[11px] text-zinc-500 mt-0.5 block">
                  Under Cat Framework
                </span>
              </div>
              <div className="bg-[#F8FAFB] rounded-xl p-4 border border-zinc-200/80">
                <span className="text-[11px] font-semibold text-zinc-500 block uppercase">
                  Cattery Quarantine
                </span>
                <strong className="text-xl font-bold text-zinc-900 mt-1 block">
                  0 to 30 Days
                </strong>
                <span className="text-[11px] text-zinc-500 mt-0.5 block">
                  Origin country tiered
                </span>
              </div>
            </div>

            {/* Quick Navigation */}
            <div className="bg-[#F8FAFB] rounded-xl p-3 sm:p-4 border border-zinc-200/80">
              <span className="text-xs font-bold text-zinc-800 uppercase tracking-wide block mb-2">
                Table of Contents &amp; Quick Jump
              </span>
              <div className="flex flex-wrap gap-2 text-xs">
                <a
                  href="#cat-vaccinations-tests"
                  className="bg-white px-3 py-1.5 rounded-lg border border-zinc-200/90 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors font-medium"
                >
                  1. Cat-Specific Vaccinations &amp; Tests
                </a>
                <a
                  href="#permit-documentation"
                  className="bg-white px-3 py-1.5 rounded-lg border border-zinc-200/90 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors font-medium"
                >
                  2. Permit &amp; Documentation
                </a>
                <a
                  href="#quarantine-and-housing"
                  className="bg-white px-3 py-1.5 rounded-lg border border-zinc-200/90 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors font-medium"
                >
                  3. Quarantine &amp; Housing (HDB Rules)
                </a>
                <a
                  href="#airline-considerations"
                  className="bg-white px-3 py-1.5 rounded-lg border border-zinc-200/90 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors font-medium"
                >
                  4. Airline Considerations for Cats
                </a>
                <a
                  href="#cat-import-faqs"
                  className="bg-white px-3 py-1.5 rounded-lg border border-zinc-200/90 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors font-medium"
                >
                  5. Frequently Asked Questions
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 1: CAT VACCINATIONS & TESTS ─────────────────────── */}
      <section id="cat-vaccinations-tests" className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
              Clinical Biosecurity
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E2342] tracking-tight mb-3">
              Cat-Specific Vaccinations and Tests
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              When <strong>importing cats to Singapore</strong>, veterinary preparations must follow an exact chronological protocol. Any discrepancy in vaccination timing or microchip sequencing will void your paperwork at the border inspection post.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Microchip & FVRCP Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-zinc-200/80 shadow-2xs space-y-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200/80">
                <span>Mandatory Universal Step</span>
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#0E2342]">
                1. ISO Microchip &amp; Core FVRCP Vaccine
              </h3>
              <div className="space-y-3 text-xs sm:text-sm text-zinc-600 leading-relaxed">
                <p>
                  <strong>ISO 11784/11785 Microchip:</strong> Must be a 15-digit non-encrypted 134.2 kHz microchip implanted strictly <em>before</em> any qualifying rabies vaccinations, core vaccines, or titer blood draws.
                </p>
                <p>
                  <strong>FVRCP Core Vaccination:</strong> AVS mandates vaccination against the three core feline viral pathogens:
                </p>
                <ul className="space-y-1 text-xs text-zinc-700 list-disc list-inside bg-[#F8FAFB] p-3 rounded-xl border border-zinc-200/80">
                  <li><strong>Feline Viral Rhinotracheitis (FVR)</strong> (Feline Herpesvirus 1)</li>
                  <li><strong>Feline Calicivirus (FCV)</strong></li>
                  <li><strong>Feline Panleukopenia Virus (FPV)</strong> (Feline Enteritis)</li>
                </ul>
                <p className="text-xs text-zinc-500">
                  <em>Timing:</em> Administered at least 14 days and not more than 12 months prior to departure.
                </p>
              </div>
            </div>

            {/* Rabies & RNATT Titer Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-zinc-200/80 shadow-2xs space-y-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-200/80">
                <span>Category B, C &amp; D Origins</span>
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#0E2342]">
                2. Rabies Vaccine &amp; RNATT Titer Test
              </h3>
              <div className="space-y-3 text-xs sm:text-sm text-zinc-600 leading-relaxed">
                <p>
                  <strong>Rabies Vaccination:</strong> Cats from Category B, C, and D origins must receive an inactivated or recombinant rabies vaccine at least 30 days prior to departure. (Category A cats from Australia, NZ, UK, Ireland are exempt).
                </p>
                <p>
                  <strong>RNATT Blood Titer Test (≥ 0.50 IU/mL):</strong> Mandatory for Category C &amp; D cats. The blood draw must be performed:
                </p>
                <ul className="space-y-1 text-xs text-zinc-700 list-disc list-inside bg-[#F8FAFB] p-3 rounded-xl border border-zinc-200/80">
                  <li>At least <strong>30 days</strong> after the qualifying rabies vaccination.</li>
                  <li>Between <strong>30 days and 6 months</strong> prior to export date.</li>
                  <li>Processed at an AVS-approved reference laboratory.</li>
                </ul>
              </div>
            </div>

            {/* Parasite Treatments Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-zinc-200/80 shadow-2xs space-y-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-800 text-xs font-semibold border border-purple-200/80">
                <span>Pre-Flight Clinical Window</span>
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#0E2342]">
                3. Parasite Treatments (2 to 7 Days)
              </h3>
              <div className="space-y-3 text-xs sm:text-sm text-zinc-600 leading-relaxed">
                <p>
                  Within <strong>2 to 7 days prior to departure</strong>, an accredited veterinarian must administer two separate parasite treatments:
                </p>
                <div className="space-y-2 text-xs">
                  <div className="bg-[#F8FAFB] p-3 rounded-xl border border-zinc-200/80">
                    <strong className="text-zinc-900 block font-bold">Internal Parasites (Deworming):</strong>
                    <span>Licensed product effective against nematodes and cestodes (e.g. Praziquantel, Fenbendazole, Milbemycin).</span>
                  </div>
                  <div className="bg-[#F8FAFB] p-3 rounded-xl border border-zinc-200/80">
                    <strong className="text-zinc-900 block font-bold">External Parasites (Fleas/Ticks):</strong>
                    <span>Licensed topical or oral product effective against fleas and ticks (e.g. Fipronil, Selamectin, Fluralaner).</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Prohibited Hybrid Cats Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-zinc-200/80 shadow-2xs space-y-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-red-50 text-red-800 text-xs font-semibold border border-red-200/80">
                <span>Prohibited Breeds</span>
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-zinc-900">
                4. Banned Hybrid Cat Breeds (Bengal &amp; Savannah)
              </h3>
              <div className="space-y-3 text-xs sm:text-sm text-zinc-600 leading-relaxed">
                <p>
                  Under Singapore wildlife and biosecurity statutes, wild cat hybrids of the <strong>first (F1) through fourth (F4) generations</strong> are strictly banned from import:
                </p>
                <div className="bg-red-50/70 p-3.5 rounded-xl border border-red-200/80 text-xs text-red-950 space-y-1">
                  <strong className="text-red-900 block font-bold">Prohibited Crosses:</strong>
                  <p>• Bengal Cat (Asian Leopard Cat x Domestic Cat, F1–F4)</p>
                  <p>• Savannah Cat (African Serval x Domestic Cat, F1–F4)</p>
                  <p className="pt-1 text-[11px] text-red-900/90 font-medium">
                    <em>Only 5th generation (F5) and beyond</em> are permitted, requiring official certified pedigree genealogical registration papers from CFA or TICA.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: PERMIT AND DOCUMENTATION ─────────────────────── */}
      <section
        id="permit-documentation"
        className="py-12 sm:py-16 bg-white border-y border-zinc-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
              Statutory Paperwork
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E2342] tracking-tight mb-3">
              Permit and Documentation
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Every cat entering Singapore must travel with an approved digital portfolio of official permits, laboratory reports, and government-endorsed certificates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-[#F8FAFB] rounded-2xl p-6 border border-zinc-200/80 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block">
                Document 1
              </span>
              <h3 className="font-serif text-base font-bold text-[#0E2342]">
                AVS Electronic Import Licence
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Applied online via the Singapore <strong>GoBusiness Licensing</strong> portal strictly within <strong>30 days prior to arrival</strong>. Standard fee is SGD $50. Valid for 30 days from issuance.
              </p>
            </div>

            <div className="bg-[#F8FAFB] rounded-2xl p-6 border border-zinc-200/80 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block">
                Document 2
              </span>
              <h3 className="font-serif text-base font-bold text-[#0E2342]">
                AVS Veterinary Health Certificate
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Completed by an accredited vet within <strong>7 days of departure</strong> and officially stamped/endorsed by the exporting competent authority (USDA APHIS, CFIA, DEFRA).
              </p>
            </div>

            <div className="bg-[#F8FAFB] rounded-2xl p-6 border border-zinc-200/80 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block">
                Document 3
              </span>
              <h3 className="font-serif text-base font-bold text-[#0E2342]">
                Captain&apos;s Declaration (Transit)
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                If transiting through non-approved third countries, the airline captain or handling agent must certify that the cat remained sealed in its IATA container without leaving the airport.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: QUARANTINE AND HOUSING ───────────────────────── */}
      <section id="quarantine-and-housing" className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
              Housing &amp; Welfare Standards
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E2342] tracking-tight mb-3">
              Quarantine and Housing (HDB Cat Rules)
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Understanding where your cat will stay upon landing and the municipal housing laws governing domestic cats across Singapore.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* SAQS Cattery Quarantine */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-zinc-200/80 shadow-2xs space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-700 block">
                Sembawang SAQS Cattery
              </span>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#0E2342]">
                Cat Quarantine at Sembawang (SAQS)
              </h3>
              <div className="space-y-3 text-xs sm:text-sm text-zinc-600 leading-relaxed">
                <p>
                  Cats from Category C (10–30 days) and Category D (30 days) must stay at the Sembawang Animal Quarantine Station.
                </p>
                <div className="bg-[#F8FAFB] p-4 rounded-xl border border-zinc-200/80 space-y-2 text-xs">
                  <strong className="text-zinc-900 block font-bold">Cattery Features &amp; Fees:</strong>
                  <p>• <strong>Air-Conditioned Rooms:</strong> Approx. SGD $25.30 per day.</p>
                  <p>• <strong>Naturally Ventilated Rooms:</strong> Approx. SGD $18.70 per day.</p>
                  <p>• <strong>Visiting Hours:</strong> Owners can visit Monday–Friday (4 PM – 6 PM) and Saturday (2 PM – 6 PM).</p>
                  <p>• <strong>QMS Booking:</strong> Because cattery units are limited, reserve via QMS at least <strong>3 to 4 months in advance</strong>.</p>
                </div>
              </div>
            </div>

            {/* HDB Cat Management Framework */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-zinc-200/80 shadow-2xs space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block">
                Municipal Housing Bylaws
              </span>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#0E2342]">
                AVS Cat Management Framework for HDB Flats
              </h3>
              <div className="space-y-3 text-xs sm:text-sm text-zinc-600 leading-relaxed">
                <p>
                  Following historic regulatory reforms by NParks and HDB, cats are legally permitted in Singapore government HDB flats under the official <strong>Cat Management Framework</strong>:
                </p>
                <div className="bg-[#F8FAFB] p-4 rounded-xl border border-zinc-200/80 space-y-2 text-xs">
                  <strong className="text-zinc-900 block font-bold">HDB Feline Regulations:</strong>
                  <p>• <strong>Household Allowance:</strong> Up to <strong>2 cats per HDB flat</strong>.</p>
                  <p>• <strong>Mandatory Licensing:</strong> All pet cats must be microchipped and licensed with AVS on GoBusiness (PALS).</p>
                  <p>• <strong>Safety Mandate:</strong> Owners must keep cats safely indoors and install protective mesh/grilles on windows and balconies.</p>
                  <p>• <strong>Private Condos:</strong> Up to 3 cats permitted, subject to individual MCST condominium management bylaws.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: AIRLINE CONSIDERATIONS FOR CATS ───────────────── */}
      <section
        id="airline-considerations"
        className="py-12 sm:py-16 bg-white border-y border-zinc-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
              Aviation &amp; Animal Welfare
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E2342] tracking-tight mb-3">
              Airline Considerations for Cats
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Transporting cats by air requires careful carrier selection, IATA crate compliance, and feline stress mitigation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-[#F8FAFB] rounded-2xl p-6 border border-zinc-200/80 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 block">
                Transport Mode
              </span>
              <h3 className="font-serif text-base font-bold text-zinc-900">
                In-Cabin vs. Cargo
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                AVS permits cats to arrive in the passenger cabin or as checked baggage on carriers that allow in-cabin pets (e.g. Air France, KLM, Lufthansa, Korean Air). However, airlines like Singapore Airlines require cats to travel strictly as manifested cargo under IATA Live Animals Regulations.
              </p>
            </div>

            <div className="bg-[#F8FAFB] rounded-2xl p-6 border border-zinc-200/80 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block">
                IATA Compliance
              </span>
              <h3 className="font-serif text-base font-bold text-zinc-900">
                IATA Container Requirement 1
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Cargo travel requires a rigid plastic or fiberglass carrier with secure metal wire doors, spring-loaded latches, non-collapsible walls, absorbent bedding, and outside-accessible water bowls. Wheels must be removed.
              </p>
            </div>

            <div className="bg-[#F8FAFB] rounded-2xl p-6 border border-zinc-200/80 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-red-700 block">
                Feline Welfare
              </span>
              <h3 className="font-serif text-base font-bold text-zinc-900">
                Sedation Warnings &amp; Welfare
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                IATA and veterinary biosecurity authorities strictly advise against chemical sedation or tranquilizers during flight, as sedatives impair a cat’s ability to regulate body temperature and balance during atmospheric pressure changes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: FAQS ─────────────────────────────────────────── */}
      <section id="cat-import-faqs" className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
              Feline Q&amp;A
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E2342] tracking-tight mb-3">
              Frequently Asked Questions About Importing Cats to Singapore
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Statutory guidance answering the most common questions regarding feline vaccinations, AVS import licences, cattery quarantine, and HDB flat rules.
            </p>
          </div>

          <div className="max-w-4xl">
            <FaqAccordion items={CAT_IMPORT_FAQS} columns={2} defaultOpenIndex={0} />
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: CROSS-LINKS & RELATED GUIDES ─────────────────── */}
      <section className="py-12 sm:py-16 bg-white border-t border-zinc-200/80 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
              Singapore Hub
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0E2342]">
              Related Singapore Relocation Resources
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 mt-1">
              Explore our comprehensive Singapore pet import master guide, country regulatory portal, and certificate verification scanner.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/en/import-pet-to-singapore"
              className="p-5 rounded-2xl border border-zinc-200/80 bg-[#F8FAFB] hover:bg-white hover:border-emerald-600/70 transition-all group"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">Master Guide</span>
              <strong className="text-sm font-bold text-[#0E2342] group-hover:text-emerald-700 transition-colors block mb-1">
                How to Import a Pet to Singapore
              </strong>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Complete AVS category guide, GoBusiness licence filing, dog licensing, and Sembawang quarantine.
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
                Official AVS statutory requirements, entry airports, and inbound flight corridor checklists.
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
                Blood draw timing, accredited laboratories, and 0.50 IU/mL titer score certification.
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
                Compare Pet Passports, AHCs, and Government Export Certificates with official endorsement rules.
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
                  <span>Singapore Cat Import Check</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0E2342] leading-tight">
                  Verify your cat&apos;s paperwork for Singapore arrival
                </h2>

                <p className="text-sm sm:text-base text-zinc-600 leading-relaxed max-w-xl">
                  Ensure your cat&apos;s FVRCP vaccine dates, RNATT blood titer report, and AVS GoBusiness Import Licence are 100% compliant with Singapore biosecurity laws before heading to the airport.
                </p>

                {/* 3 Practical Feature Checks */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-zinc-700">
                  <div className="bg-white p-3.5 rounded-xl border border-zinc-200/80 flex items-start gap-2 shadow-2xs">
                    <span className="text-emerald-600 font-bold shrink-0">✓</span>
                    <span>FVRCP &amp; rabies sequence audit</span>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-zinc-200/80 flex items-start gap-2 shadow-2xs">
                    <span className="text-emerald-600 font-bold shrink-0">✓</span>
                    <span>RNATT titer &amp; cattery booking check</span>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-zinc-200/80 flex items-start gap-2 shadow-2xs">
                    <span className="text-emerald-600 font-bold shrink-0">✓</span>
                    <span>AVS licence &amp; parasite timeline check</span>
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
                    Scan Cat Travel Dossier
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    Upload your cat&apos;s vaccination records, RNATT lab report, or AVS Veterinary Health Certificate for an automated readiness review.
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
                    href="/en/import-pet-to-singapore"
                    className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 border border-zinc-200/80 font-semibold text-xs rounded-xl transition-all"
                  >
                    <span>Read Singapore Pet Import Guide</span>
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
