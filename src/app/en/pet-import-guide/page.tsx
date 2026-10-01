import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllCountries } from '@/lib/data/countries';
import FaqAccordion from '@/components/FaqAccordion';
import { getBreadcrumbSchema, getFaqSchema } from '@/lib/seo/schema';
import { getHreflangAlternates } from '@/lib/seo/hreflang';

export const metadata: Metadata = {
  title: 'Pet Import Guide: How to Bring a Pet Into Another Country (2026) | PawValid',
  description:
    'Comprehensive statutory guide to international pet import. Master import permits, veterinary health certificates, ISO microchips, rabies vaccination timelines, FAVN titer blood tests, and border biosecurity entry inspections for dogs and cats worldwide.',
  keywords: [
    'pet import',
    'pet guidance',
    'import pets internationally',
    'pet import requirements',
    'how to import a pet',
    'pet import guide',
    'international pet travel',
    'pet health certificate',
    'pet import permit',
    'pet rabies vaccination',
    'rabies blood titer test',
    'dog import requirements',
    'cat import requirements',
  ],
  alternates: getHreflangAlternates('/pet-import-guide'),
  openGraph: {
    title: 'Pet Import Guide: How to Bring a Pet Into Another Country | PawValid',
    description:
      'Step-by-step statutory guide covering import permits, veterinary health certificates, microchipping, rabies vaccinations, and blood titer tests required to bring your pet to another country.',
    url: 'https://pawvalid.online/en/pet-import-guide',
    siteName: 'PawValid',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pet Import Guide: How to Bring a Pet Into Another Country | PawValid',
    description:
      'Everything you need to know about importing your dog or cat to another country — permits, health certs, vaccines, titers, and border clearance.',
  },
};

const IMPORT_GUIDE_FAQS = [
  {
    q: 'How long does it take to prepare a pet for international import?',
    a: 'Preparation timelines depend heavily on the biosecurity classification of your destination. For standard destinations (EU member states, Canada, Mexico), the timeline is typically 21 to 30 days — primarily driven by the mandatory 21-day latency period following a primary rabies vaccination. However, for strict rabies-free or rabies-controlled island nations (such as Australia, Japan, Singapore, or New Zealand), preparation takes 6 to 7 months because these countries enforce a mandatory 180-day waiting period following a successful FAVN/RNATT rabies antibody blood titer test before entry is permitted without extended quarantine.',
  },
  {
    q: 'What is a pet import permit and which countries require one?',
    a: 'An import permit is an official government-issued legal authorization granted by the destination country’s national veterinary or biosecurity ministry allowing your pet entry through customs. Australia (DAFF BICON import permit), Singapore (AVS GoBusiness electronic import licence), the United Arab Emirates (MOCCAE import permit), and Japan (MAFF advance notification approval) strictly require advance import permits. In contrast, the European Union, the United Kingdom, Canada, and the United States (for personal companion dogs and cats) do not require a separate import permit, relying instead on an endorsed international Veterinary Health Certificate.',
  },
  {
    q: 'Is a rabies blood titer test (FAVN/RNATT) required for all countries?',
    a: 'No. Rabies antibody titer testing is only required by specific high-biosecurity jurisdictions or when traveling from high-rabies endemic countries into low-rabies regions. Countries like the United Kingdom, European Union member states, Canada, and the United States do not require a titer test when pets arrive from rabies-controlled origin countries. However, Australia, Japan, Singapore, and the UAE require a FAVN or RNATT titer test confirming a neutralizing antibody level of at least 0.50 IU/mL, processed exclusively by an officially accredited international reference laboratory.',
  },
  {
    q: 'What happens if my pet fails the border inspection upon arrival?',
    a: 'If your pet arrives with missing, expired, or non-compliant paperwork, the border veterinary authority at the Port of Entry has statutory jurisdiction to take three enforcement actions: (1) place the animal into mandatory government quarantine at the owner’s sole expense until compliance is achieved or testing completed; (2) issue an immediate deportation order returning the pet to the origin country on the next available flight; or (3) in extreme non-compliance scenarios in strict island biosecurity zones, subject the animal to euthanasia. Ensuring complete compliance before departure eliminates this risk.',
  },
  {
    q: 'Can I import a pet without an ISO 11784/11785 microchip?',
    a: 'Virtually all international customs and veterinary authorities mandate a 15-digit ISO 11784/11785 compliant microchip operating at 134.2 kHz. If your pet has an older non-ISO chip (such as a 10-digit 125 kHz AVID or HomeAgain chip common in North America), you must either have an ISO-compliant chip implanted before any required vaccines are given, or you must travel with your own portable microchip scanner capable of reading the non-ISO frequency at border inspection.',
  },
  {
    q: 'What is the difference between a veterinary health certificate and an import permit?',
    a: 'A Veterinary Health Certificate is a clinical document completed by a licensed, accredited veterinarian certifying your pet’s physical health, microchip number, vaccination history, and parasite treatments, which must subsequently be officially stamped and endorsed by the national agricultural ministry of the exporting country (e.g., USDA APHIS, DEFRA/APHA, CFIA). An Import Permit is a formal entry authorization issued in advance by the importing government’s biosecurity department. Some destinations require both documents; others require only the endorsed health certificate.',
  },
  {
    q: 'What is the rule regarding rabies vaccination timing relative to microchipping?',
    a: 'Under international veterinary law, the ISO microchip must be implanted before or on the exact same day as the qualifying rabies vaccination. Any rabies vaccination administered before microchip implantation is legally invalid for international travel because there is no statutory proof linking that vaccination record to the specific animal. If your pet was vaccinated prior to microchipping, they must be re-vaccinated after the chip is placed, and you must observe any required waiting periods.',
  },
  {
    q: 'What are the rules for tapeworm (Echinococcus multilocularis) treatments?',
    a: 'Several countries — including the United Kingdom, Republic of Ireland, Finland, Norway, and Malta — legally require dogs to receive an approved tapeworm treatment containing Praziquantel (or an equivalent active substance) administered by a licensed veterinarian strictly within 24 to 120 hours (1 to 5 days) prior to the scheduled arrival time at the destination port. The exact time, date, product name, and manufacturer must be officially recorded on the health certificate.',
  },
  {
    q: 'Can I travel with a puppy or kitten internationally?',
    a: 'International import of young puppies and kittens is heavily restricted. Because most countries require a valid rabies vaccination, and puppies/kittens cannot medically receive an initial rabies vaccine until they reach at least 12 weeks of age, plus a mandatory 21-day post-vaccination latency period, the practical minimum age for international travel is 15 weeks (approx. 3.5 months). Several countries, including the United States under 2024 CDC guidelines, enforce a strict minimum age requirement of 6 months for dogs arriving from high-risk rabies countries.',
  },
  {
    q: 'How does flying in-cabin versus manifest cargo affect import compliance?',
    a: 'The veterinary import requirements (microchip, vaccinations, health certificate, import permit) remain identical regardless of transport method. However, airline transport regulations differ significantly. Certain countries (notably the United Kingdom, Australia, and the United Arab Emirates) prohibit pets from arriving in the passenger cabin or as checked baggage on commercial flights; all companion animals must enter strictly as manifest cargo under IATA Live Animals Regulations (LAR) booked through a licensed pet freight forwarder.',
  },
];

export default function PetImportGuidePage() {
  const countries = getAllCountries();

  // Map fine-grained regions to broad groups for a cleaner hub layout
  const MACRO_REGION: Record<string, string> = {
    'Western Europe / Great Britain': 'Europe & United Kingdom',
    'Western Europe / European Union': 'Europe & United Kingdom',
    'Central Europe / European Union': 'Europe & United Kingdom',
    'Central Europe (Schengen Area)': 'Europe & United Kingdom',
    'Southern Europe / Iberian Peninsula': 'Europe & United Kingdom',
    'Southern Europe / European Union': 'Europe & United Kingdom',
    'North America': 'North America',
    'North America / Latin America': 'North America',
    'Southeast Asia': 'Asia-Pacific',
    'East Asia': 'Asia-Pacific',
    'Middle East / Gulf Cooperation Council': 'Middle East',
    'Oceania': 'Oceania',
  };

  // Group by macro region
  const countryByRegion: Record<string, typeof countries> = {};
  for (const c of countries) {
    const region = MACRO_REGION[c.region] || c.region || 'Other';
    if (!countryByRegion[region]) countryByRegion[region] = [];
    countryByRegion[region].push(c);
  }

  const BROAD_ORDER = ['Europe & United Kingdom', 'North America', 'Asia-Pacific', 'Middle East', 'Oceania'];
  const sortedRegions = Object.keys(countryByRegion).sort((a, b) => {
    const aIdx = BROAD_ORDER.indexOf(a);
    const bIdx = BROAD_ORDER.indexOf(b);
    return (aIdx === -1 ? 99 : aIdx) - (bIdx === -1 ? 99 : bIdx);
  });

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Pet Import Guide', url: '/en/pet-import-guide' },
  ];

  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);
  const faqSchema = getFaqSchema(IMPORT_GUIDE_FAQS);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 font-sans">
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ─── BREADCRUMBS ────────────────────────────────────────────── */}
      <div className="w-full bg-white border-b border-zinc-200/80 py-3 text-xs text-zinc-500">
        <div className="section-container flex items-center justify-between flex-wrap gap-2">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-zinc-600 text-xs">
            <Link href="/" className="hover:text-zinc-900 transition-colors">Home</Link>
            <span className="text-zinc-300">/</span>
            <span className="font-semibold text-zinc-900">Pet Import Guide</span>
          </nav>
          <div className="inline-flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80 text-[11px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Statutory Standards: 2026 Regulations</span>
          </div>
        </div>
      </div>

      {/* ─── HERO SECTION ────────────────────────────────────────────── */}
      <section className="bg-white border-b border-zinc-200/80 py-12 sm:py-16">
        <div className="section-container">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200/80 text-xs font-bold uppercase tracking-wider mb-4">
              <span>Official Global Compliance Architecture</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 tracking-tight leading-tight mb-4">
              Pet Import Guide: How to Bring a Pet Into Another Country
            </h1>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed mb-6">
              Relocating internationally with a dog or cat requires navigating complex biosecurity statutes, veterinary health protocols, and national customs frameworks. Every sovereign nation enforces strict entry criteria designed to protect native fauna and public health against communicable zoonoses—primarily rabies, <em>Echinococcus multilocularis</em> tapeworms, and vector-borne parasites. This master hub details the statutory pet import requirements worldwide, provides sequential timelines, and links directly to official country-specific compliance guides.
            </p>

            {/* Quick reference stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-200/80">
                <span className="text-[11px] font-semibold text-zinc-500 block uppercase">Country Hubs</span>
                <strong className="text-xl font-bold text-zinc-900 mt-1 block">{countries.length} Jurisdictions</strong>
                <span className="text-[11px] text-zinc-500 mt-0.5 block">Full statutory breakdowns</span>
              </div>
              <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-200/80">
                <span className="text-[11px] font-semibold text-zinc-500 block uppercase">Microchip Standard</span>
                <strong className="text-xl font-bold text-zinc-900 mt-1 block">ISO 11784/11785</strong>
                <span className="text-[11px] text-zinc-500 mt-0.5 block">15-digit FDX-B (134.2 kHz)</span>
              </div>
              <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-200/80">
                <span className="text-[11px] font-semibold text-zinc-500 block uppercase">Titer Threshold</span>
                <strong className="text-xl font-bold text-zinc-900 mt-1 block">≥ 0.50 IU/mL</strong>
                <span className="text-[11px] text-zinc-500 mt-0.5 block">FAVN / RNATT certified</span>
              </div>
              <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-200/80">
                <span className="text-[11px] font-semibold text-zinc-500 block uppercase">Lead Time Range</span>
                <strong className="text-xl font-bold text-zinc-900 mt-1 block">21 Days – 7 Mo</strong>
                <span className="text-[11px] text-zinc-500 mt-0.5 block">Destination dependent</span>
              </div>
            </div>

            {/* Quick Jump Anchor Navigation */}
            <div className="bg-zinc-50 rounded-xl p-3 sm:p-4 border border-zinc-200/80">
              <span className="text-xs font-bold text-zinc-800 uppercase tracking-wide block mb-2">
                Table of Contents & Quick Navigation
              </span>
              <div className="flex flex-wrap gap-2 text-xs">
                <a href="#how-it-works" className="bg-white px-3 py-1.5 rounded-lg border border-zinc-200/90 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors">
                  1. How Pet Import Works
                </a>
                <a href="#common-requirements" className="bg-white px-3 py-1.5 rounded-lg border border-zinc-200/90 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors">
                  2. Universal Requirements
                </a>
                <a href="#timeline" className="bg-white px-3 py-1.5 rounded-lg border border-zinc-200/90 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors">
                  3. Preparation Timeline
                </a>
                <a href="#species-differences" className="bg-white px-3 py-1.5 rounded-lg border border-zinc-200/90 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors">
                  4. Dogs vs. Cats Rules
                </a>
                <a href="#risk-categories" className="bg-white px-3 py-1.5 rounded-lg border border-zinc-200/90 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors">
                  5. Biosecurity Risk Tiers
                </a>
                <a href="#country-guides" className="bg-white px-3 py-1.5 rounded-lg border border-zinc-200/90 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors">
                  6. Country Directory
                </a>
                <a href="#common-mistakes" className="bg-white px-3 py-1.5 rounded-lg border border-zinc-200/90 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors">
                  7. Common Mistakes
                </a>
                <a href="#faqs" className="bg-white px-3 py-1.5 rounded-lg border border-zinc-200/90 text-zinc-700 hover:text-zinc-900 hover:border-zinc-300 transition-colors">
                  8. FAQs
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 1: HOW PET IMPORT WORKS ─────────────────────────── */}
      <section id="how-it-works" className="py-12 sm:py-16">
        <div className="section-container">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
              Core Biosecurity Architecture
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight mb-3">
              How Pet Import Works
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Importing a companion animal across international borders is a legally binding veterinary and customs process governed by statutory biosecurity acts (such as the UK Animal Health Act, US 9 CFR Regulations, EU Regulation 576/2013, and Australian Biosecurity Act 2015). The import workflow is structured into three mandatory pillars: securing prior government import authorization, completing certified veterinary health certifications, and passing physical border biosecurity inspections upon arrival.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Import Permit */}
            <div className="bg-white rounded-2xl p-6 border border-zinc-200/90 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-sm mb-4 border border-emerald-200/80">
                  01
                </div>
                <h3 className="font-serif text-lg font-bold text-zinc-900 mb-2.5">
                  Import Permit
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-3">
                  An Import Permit is an official statutory entry license issued in advance by the importing country’s ministry of agriculture or biosecurity department. It confirms that the receiving authority has pre-approved your animal’s entry based on verified origin health records and disease-status declarations.
                </p>
                <div className="bg-zinc-50 rounded-lg p-3 border border-zinc-200/80 text-xs text-zinc-700 space-y-1.5">
                  <div className="font-semibold text-zinc-900">Key Jurisdictions:</div>
                  <div>• <strong>Australia:</strong> DAFF BICON Permit (valid 12 months)</div>
                  <div>• <strong>Singapore:</strong> AVS GoBusiness Licence (valid 30 days)</div>
                  <div>• <strong>UAE:</strong> MOCCAE Import Permit (valid 30 days)</div>
                  <div>• <strong>Japan:</strong> MAFF Advance Notification (40+ days prior)</div>
                </div>
              </div>
              <p className="text-[11px] text-zinc-500 mt-4 pt-3 border-t border-zinc-100">
                <em>Note: EU member states, Great Britain, the US, and Canada do not require separate import permits for standard personal companion dogs and cats.</em>
              </p>
            </div>

            {/* Health Certificate */}
            <div className="bg-white rounded-2xl p-6 border border-zinc-200/90 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-sm mb-4 border border-emerald-200/80">
                  02
                </div>
                <h3 className="font-serif text-lg font-bold text-zinc-900 mb-2.5">
                  Health Certificate
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-3">
                  The International Veterinary Health Certificate is a standardized clinical legal document issued by an accredited private veterinarian. It certifies the animal’s microchip details, rabies vaccination validity, antibody titer scores, and internal/external parasite treatments.
                </p>
                <div className="bg-zinc-50 rounded-lg p-3 border border-zinc-200/80 text-xs text-zinc-700 space-y-1.5">
                  <div className="font-semibold text-zinc-900">Endorsement Protocols:</div>
                  <div>• <strong>USA:</strong> USDA APHIS electronic VEHCS seal</div>
                  <div>• <strong>UK:</strong> DEFRA / APHA Official Veterinarian stamp</div>
                  <div>• <strong>Canada:</strong> CFIA official ink endorsement</div>
                  <div>• <strong>Validity:</strong> Strictly 10 days from issuance to entry</div>
                </div>
              </div>
              <p className="text-[11px] text-zinc-500 mt-4 pt-3 border-t border-zinc-100">
                <em>Health certificates must be printed in the destination’s official bilingual format and carry verifiable wet-ink or cryptographic digital signatures.</em>
              </p>
            </div>

            {/* Entry Inspection */}
            <div className="bg-white rounded-2xl p-6 border border-zinc-200/90 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-sm mb-4 border border-emerald-200/80">
                  03
                </div>
                <h3 className="font-serif text-lg font-bold text-zinc-900 mb-2.5">
                  Entry Inspection
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-3">
                  Upon landing at a designated international Border Inspection Post (BIP) or Border Control Post (BCP), an official border veterinarian inspects the animal. Officers scan the transponder, audit all endorsed certificates, verify tapeworm treatments, and conduct a physical clinical examination.
                </p>
                <div className="bg-zinc-50 rounded-lg p-3 border border-zinc-200/80 text-xs text-zinc-700 space-y-1.5">
                  <div className="font-semibold text-zinc-900">Inspection Outcomes:</div>
                  <div>• <strong>Direct Clearance:</strong> Unrestricted release to owner</div>
                  <div>• <strong>Mandatory Quarantine:</strong> Direct transfer to facility</div>
                  <div>• <strong>Non-Compliance:</strong> Quarantine or deportation order</div>
                  <div>• <strong>Fees:</strong> Statutory border clearance levies apply</div>
                </div>
              </div>
              <p className="text-[11px] text-zinc-500 mt-4 pt-3 border-t border-zinc-100">
                <em>Arrivals outside regular border veterinary operating hours often require advance notice (24–72 hours) to schedule on-duty inspection staff.</em>
              </p>
            </div>
          </div>

          {/* Deep dive callout box on border inspection logistics */}
          <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-200/80">
            <h4 className="font-serif text-base font-bold text-zinc-900 mb-2">
              Understanding Designated Ports of Entry (BIPs / BCPs)
            </h4>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-3">
              Pets cannot enter a country through any arbitrary airport or border crossing. Sovereign states restrict companion animal arrivals to designated <strong>Border Inspection Posts (BIPs)</strong> equipped with certified veterinary quarantine officers and microchip scanning stations. For example:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="bg-white p-3 rounded-xl border border-zinc-200/80">
                <strong className="text-zinc-900 block mb-0.5">United Kingdom</strong>
                <span className="text-zinc-600">London Heathrow (LHR HARC), London Gatwick (LGW), Manchester (MAN).</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-zinc-200/80">
                <strong className="text-zinc-900 block mb-0.5">Australia</strong>
                <span className="text-zinc-600">Strictly Melbourne (MEL) for direct transfer to Mickleham Quarantine Facility.</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-zinc-200/80">
                <strong className="text-zinc-900 block mb-0.5">Japan</strong>
                <span className="text-zinc-600">Tokyo Narita (NRT), Tokyo Haneda (HND), Kansai (KIX), Chubu (NGO).</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-zinc-200/80">
                <strong className="text-zinc-900 block mb-0.5">United States</strong>
                <span className="text-zinc-600">Designated CDC Port of Entry animal care facilities (JFK, MIA, LAX, ATL, ORD, IAD).</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: REQUIREMENTS COMMON TO MOST COUNTRIES ────────── */}
      <section id="common-requirements" className="py-12 sm:py-16 bg-white border-y border-zinc-200/80">
        <div className="section-container">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
              Universal Statutory Criteria
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight mb-3">
              Requirements Common to Most Countries
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              While detailed biosecurity protocols vary based on origin disease classifications, three core statutory requirements form the universal foundation of international pet import regulations. Every pet owner must satisfy these prerequisites before pursuing destination-specific permits.
            </p>
          </div>

          <div className="space-y-6 max-w-4xl">
            {/* 1. Microchip */}
            <div className="bg-zinc-50 rounded-2xl p-6 sm:p-7 border border-zinc-200/80">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-white text-zinc-800 flex items-center justify-center font-bold text-lg shrink-0 border border-zinc-200/80 shadow-2xs">
                  🔬
                </div>
                <div className="space-y-3 flex-1">
                  <h3 className="font-serif text-lg font-bold text-zinc-900">
                    Microchip (ISO 11784/11785 Standard)
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                    The electronic transponder is the primary legal mechanism linking an individual animal to its veterinary records, vaccination history, and titer test results. International veterinary law mandates an <strong>ISO 11784/11785 compliant 15-digit microchip</strong> operating at the 134.2 kHz frequency (FDX-B standard).
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    <div className="bg-white p-3.5 rounded-xl border border-zinc-200/80 text-xs">
                      <strong className="text-zinc-900 block mb-1">The Implantation Sequence Rule</strong>
                      <p className="text-zinc-600 leading-relaxed">
                        The microchip must be implanted <em>strictly prior to or on the same calendar day</em> as the qualifying rabies vaccination. Any vaccination administered prior to microchip implantation is legally void for international import.
                      </p>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-zinc-200/80 text-xs">
                      <strong className="text-zinc-900 block mb-1">Non-ISO Microchip Protocols</strong>
                      <p className="text-zinc-600 leading-relaxed">
                        If your pet carries a 10-digit 125 kHz chip (e.g., legacy AVID/HomeAgain chips), you must either have a second ISO 11784/11785 chip implanted and re-vaccinate, or travel with a portable reader capable of decoding the legacy frequency.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Rabies Vaccination */}
            <div className="bg-zinc-50 rounded-2xl p-6 sm:p-7 border border-zinc-200/80">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-white text-zinc-800 flex items-center justify-center font-bold text-lg shrink-0 border border-zinc-200/80 shadow-2xs">
                  💉
                </div>
                <div className="space-y-3 flex-1">
                  <h3 className="font-serif text-lg font-bold text-zinc-900">
                    Rabies Vaccination Protocols
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                    Rabies remains the most stringently regulated zoonotic disease globally. All sovereign nations enforce strict vaccine formulation and latency standards to prevent viral introduction into domestic animal populations.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 text-xs">
                    <div className="bg-white p-3.5 rounded-xl border border-zinc-200/80">
                      <strong className="text-zinc-900 block mb-1">21-Day Latency Period</strong>
                      <p className="text-zinc-600 leading-relaxed">
                        Primary rabies vaccinations require a mandatory 21-day incubation window post-injection before the animal is legally eligible to travel. Booster vaccinations administered before the previous certificate expires are effective immediately without a waiting period.
                      </p>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-zinc-200/80">
                      <strong className="text-zinc-900 block mb-1">Approved Vaccine Formulations</strong>
                      <p className="text-zinc-600 leading-relaxed">
                        Vaccines must be an inactivated (killed) virus or recombinant formulation licensed by the exporting nation’s regulatory agency. Modified-live rabies vaccines are explicitly prohibited by nearly all international authorities.
                      </p>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-zinc-200/80">
                      <strong className="text-zinc-900 block mb-1">1-Year vs. 3-Year Durations</strong>
                      <p className="text-zinc-600 leading-relaxed">
                        While the EU and US accept 3-year rabies boosters (provided manufacturer guidelines are documented), several destinations (including Japan, Singapore, and Mexico) recognize vaccinations for only 12 months regardless of label duration.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Blood Tests */}
            <div className="bg-zinc-50 rounded-2xl p-6 sm:p-7 border border-zinc-200/80">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-white text-zinc-800 flex items-center justify-center font-bold text-lg shrink-0 border border-zinc-200/80 shadow-2xs">
                  🧪
                </div>
                <div className="space-y-3 flex-1">
                  <h3 className="font-serif text-lg font-bold text-zinc-900">
                    Blood Tests (FAVN / RNATT Titer)
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                    The <strong>Fluorescent Antibody Virus Neutralization (FAVN)</strong> or <strong>Rabies Neutralising Antibody Titre Test (RNATT)</strong> measures the level of neutralizing antibodies present in the pet’s serum. High-biosecurity rabies-free island states mandate this test to verify active immunological protection.
                  </p>
                  
                  <div className="bg-white p-4 rounded-xl border border-zinc-200/80 space-y-2 text-xs">
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-zinc-100">
                      <span className="font-bold text-zinc-900">Statutory Antibody Threshold:</span>
                      <span className="font-mono bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded border border-emerald-200/80">
                        ≥ 0.50 IU/mL (International Standard)
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-zinc-600 leading-relaxed">
                      <div>
                        <strong>Accredited Laboratories:</strong> Samples must be sent to government-approved reference labs (e.g., Kansas State University in the US, ANSES in France, APHA in the UK, OIE reference centers). Private in-clinic tests are rejected.
                      </div>
                      <div>
                        <strong>Post-Titer Waiting Periods:</strong> Australia, Japan, and Hawaii enforce a mandatory 180-day waiting period from the date of blood collection before arrival. Entering earlier results in mandatory quarantine.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Mandatory Parasite Treatments Box */}
            <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-200/80">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-white text-zinc-800 flex items-center justify-center font-bold text-lg shrink-0 border border-zinc-200/80 shadow-2xs">
                  💊
                </div>
                <div className="space-y-2 flex-1">
                  <h3 className="font-serif text-base font-bold text-zinc-900">
                    Pre-Departure Parasite Treatments (Echinococcus & Ticks)
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                    In addition to rabies requirements, several countries enforce mandatory parasite eradication protocols immediately before transit:
                  </p>
                  <ul className="text-xs text-zinc-600 space-y-1.5 list-disc pl-4 pt-1">
                    <li>
                      <strong>Tapeworm Treatment (Praziquantel):</strong> Mandatory for dogs entering the UK, Ireland, Finland, Norway, and Malta. Must be administered by a veterinarian strictly between <strong>24 and 120 hours (1 to 5 days)</strong> prior to scheduled arrival time.
                    </li>
                    <li>
                      <strong>External Parasite Treatment (Fleas & Ticks):</strong> Required for entry into Australia, Singapore, UAE, and South Africa. Must use an approved systemic acaricide/fipronil formulation within specified pre-flight windows.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: STEP-BY-STEP PREPARATION TIMELINE ─────────────── */}
      <section id="timeline" className="py-12 sm:py-16">
        <div className="section-container">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
              Operational Roadmap
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight mb-3">
              Pet Import Step-by-Step Preparation Timeline
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Successfully importing a pet requires executing veterinary and administrative milestones in strict chronological sequence. Missing a single milestone can invalidate your paperwork and delay travel by months.
            </p>
          </div>

          <div className="space-y-4 max-w-4xl">
            {/* Milestone 1 */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-zinc-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="bg-zinc-100 text-zinc-800 font-mono text-xs font-bold px-3 py-1.5 rounded-lg shrink-0 border border-zinc-200">
                  T-7 to T-6 Mo
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 mb-1">
                    Microchip Implantation & Primary Rabies Vaccination
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Implant a 15-digit ISO 11784/11785 microchip. Administer primary rabies vaccination on the same day or afterward. If traveling to strict biosecurity zones (Australia, Japan, Singapore), schedule the FAVN/RNATT blood titer draw at least 30 days post-vaccine.
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/70 shrink-0">
                Phase 1: Foundation
              </span>
            </div>

            {/* Milestone 2 */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-zinc-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="bg-zinc-100 text-zinc-800 font-mono text-xs font-bold px-3 py-1.5 rounded-lg shrink-0 border border-zinc-200">
                  T-4 to T-3 Mo
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 mb-1">
                    Titer Laboratory Certification & Import Permit Application
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Verify titer lab results show ≥ 0.50 IU/mL. Submit advance government import permit applications (DAFF BICON, AVS GoBusiness, MOCCAE). Book mandatory post-arrival quarantine slots where required (Mickleham in Australia, Sembawang in Singapore).
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/70 shrink-0">
                Phase 2: Permits
              </span>
            </div>

            {/* Milestone 3 */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-zinc-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="bg-zinc-100 text-zinc-800 font-mono text-xs font-bold px-3 py-1.5 rounded-lg shrink-0 border border-zinc-200">
                  T-30 to T-14 Days
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 mb-1">
                    Airline Booking & Crate Compliance (IATA LAR)
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Confirm airline pet reservations (in-cabin, excess baggage, or manifest cargo). Ensure travel crate complies with IATA Live Animals Regulations (rigid fiberglass or plastic, metal bolts, spring-loaded lock, dual food/water bowls). Acclimate pet to crate daily.
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-200/70 shrink-0">
                Phase 3: Logistics
              </span>
            </div>

            {/* Milestone 4 */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-zinc-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="bg-zinc-100 text-zinc-800 font-mono text-xs font-bold px-3 py-1.5 rounded-lg shrink-0 border border-zinc-200">
                  T-10 to T-7 Days
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 mb-1">
                    Final Clinical Exam & Government Health Certificate Endorsement
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Accredited veterinarian conducts physical examination and completes destination-specific health certificate. Submit documentation to the national veterinary ministry (USDA APHIS VEHCS, DEFRA/APHA, CFIA) for official endorsement stamp.
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/70 shrink-0">
                Phase 4: Endorsement
              </span>
            </div>

            {/* Milestone 5 */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-zinc-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="bg-zinc-100 text-zinc-800 font-mono text-xs font-bold px-3 py-1.5 rounded-lg shrink-0 border border-zinc-200">
                  T-5 to T-1 Days
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 mb-1">
                    Mandatory Parasite Treatments (24–120 Hour Window)
                  </h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Administer veterinary-witnessed Praziquantel tapeworm treatment (for UK, Ireland, Finland, Norway, Malta) and external flea/tick treatments. Obtain clinical fit-to-fly declaration for the airline.
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/70 shrink-0">
                Phase 5: Departure Ready
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: DOG IMPORT VS CAT IMPORT ──────────────────────── */}
      <section id="species-differences" className="py-12 sm:py-16 bg-white border-y border-zinc-200/80">
        <div className="section-container">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
              Species-Specific Compliance
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight mb-3">
              Dog Import vs. Cat Import: Key Differences
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              While dogs and cats share the same microchip and rabies vaccination frameworks, biosecurity authorities enforce distinct species-specific restrictions regarding banned breeds, auxiliary vaccines, and parasite testing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            {/* Dog Import Specifics */}
            <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-200/80 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🐕</span>
                <h3 className="font-serif text-lg font-bold text-zinc-900">
                  Dog Import Regulations
                </h3>
              </div>
              <ul className="text-xs sm:text-sm text-zinc-600 space-y-3 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold mt-0.5">•</span>
                  <span>
                    <strong>Breed-Specific Legislation (BSL):</strong> Many countries enforce outright bans or strict restrictions on specific breeds, including American Pit Bull Terriers, Staffordshire Bull Terriers, Dogo Argentino, Fila Brasileiro, Japanese Tosa, Boerboels, and American Bully XLs (UK Dangerous Dogs Act 1991, France, Germany, Singapore, UAE, Australia).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold mt-0.5">•</span>
                  <span>
                    <strong>Tapeworm Treatments (Echinococcus):</strong> Mandatory for dogs entering the UK, Ireland, Finland, Norway, and Malta with Praziquantel administered strictly 24–120 hours before arrival.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold mt-0.5">•</span>
                  <span>
                    <strong>Core Auxiliary Vaccines:</strong> Canine Distemper, Infectious Hepatitis, Parvovirus, Parainfluenza, and Leptospirosis (DHPP / DA2PP) are frequently mandated for quarantine entry.
                  </span>
                </li>
              </ul>
            </div>

            {/* Cat Import Specifics */}
            <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-200/80 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🐈</span>
                <h3 className="font-serif text-lg font-bold text-zinc-900">
                  Cat Import Regulations
                </h3>
              </div>
              <ul className="text-xs sm:text-sm text-zinc-600 space-y-3 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold mt-0.5">•</span>
                  <span>
                    <strong>Hybrid Cat Breed Prohibitions:</strong> Wild cat hybrids (such as Bengal cats, Savannah cats, Safari cats, and Chausies) that are within 1st through 4th generations (F1 to F4) are strictly banned from import into Australia, Singapore, the UAE, and restricted in the UK and EU.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold mt-0.5">•</span>
                  <span>
                    <strong>Core Feline Vaccinations (FVRCP):</strong> Mandatory vaccination against Feline Viral Rhinotracheitis (Herpesvirus), Calicivirus, and Panleukopenia (Feline Distemper) is standard for all cat imports.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold mt-0.5">•</span>
                  <span>
                    <strong>No Tapeworm Mandate:</strong> Unlike dogs, cats are universally exempt from pre-entry <em>Echinococcus multilocularis</em> tapeworm treatments for the UK, Ireland, and EU.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: BIOSECURITY RISK TIERS ───────────────────────── */}
      <section id="risk-categories" className="py-12 sm:py-16">
        <div className="section-container">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
              Epidemiological Classifications
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight mb-3">
              Global Biosecurity Frameworks: Origin & Destination Risk Tiers
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Every country evaluates incoming pets based on the epidemiological rabies risk of the <strong>exporting origin country</strong>. The World Organisation for Animal Health (WOAH) and national authorities group jurisdictions into three primary risk categories:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
            {/* Category 1 */}
            <div className="bg-white rounded-2xl p-6 border border-zinc-200/90">
              <div className="inline-flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 text-[11px] font-bold mb-3">
                Tier 1: High Biosecurity
              </div>
              <h3 className="font-serif text-base font-bold text-zinc-900 mb-2">
                Rabies-Free Island States
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed mb-3">
                Islands with zero domestic rabies transmission enforce the strictest entry barriers worldwide.
              </p>
              <div className="bg-zinc-50 rounded-xl p-3 border border-zinc-200/80 text-xs text-zinc-700 space-y-1">
                <div><strong>Key Destinations:</strong> Australia, New Zealand, Japan, Singapore, Ireland, UK, Hawaii.</div>
                <div><strong>Requirements:</strong> Mandatory FAVN/RNATT titer test + up to 180-day post-draw wait + advance import permits + mandatory quarantine if protocols are breached.</div>
              </div>
            </div>

            {/* Category 2 */}
            <div className="bg-white rounded-2xl p-6 border border-zinc-200/90">
              <div className="inline-flex items-center gap-1.5 text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 text-[11px] font-bold mb-3">
                Tier 2: Standard Biosecurity
              </div>
              <h3 className="font-serif text-base font-bold text-zinc-900 mb-2">
                Rabies-Controlled Jurisdictions
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed mb-3">
                Nations with effective wildlife rabies vaccination programs and strict veterinary infrastructure.
              </p>
              <div className="bg-zinc-50 rounded-xl p-3 border border-zinc-200/80 text-xs text-zinc-700 space-y-1">
                <div><strong>Key Destinations:</strong> European Union Member States, United States, Canada, Switzerland, Mexico.</div>
                <div><strong>Requirements:</strong> ISO microchip + valid rabies vaccination (21-day latency) + endorsed bilingual health certificate. No titer required when traveling from other controlled nations.</div>
              </div>
            </div>

            {/* Category 3 */}
            <div className="bg-white rounded-2xl p-6 border border-zinc-200/90">
              <div className="inline-flex items-center gap-1.5 text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 text-[11px] font-bold mb-3">
                Tier 3: Strict Entry Rules
              </div>
              <h3 className="font-serif text-base font-bold text-zinc-900 mb-2">
                High-Rabies Endemic Origins
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed mb-3">
                Countries with endemic canine rabies variants face heightened scrutiny when exporting animals abroad.
              </p>
              <div className="bg-zinc-50 rounded-xl p-3 border border-zinc-200/80 text-xs text-zinc-700 space-y-1">
                <div><strong>Impacted Travellers:</strong> Pets originating from high-risk countries entering US, EU, UK, or Australia.</div>
                <div><strong>Requirements:</strong> Mandatory 3-month post-titer latency for EU entry; US CDC minimum age of 6 months + CDC Dog Import Form + accredited veterinary documentation.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: COUNTRY GUIDES DIRECTORY ───────────────────────── */}
      <section id="country-guides" className="py-12 sm:py-16 bg-white border-y border-zinc-200/80">
        <div className="section-container">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
              Destination Directory
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight mb-3">
              Country Guides: Global Pet Import Directory
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Every country enforces its own statutory biosecurity framework. Select your destination below for comprehensive statutory rules, quarantine periods, accredited certificate forms, and step-by-step checklists.
            </p>
          </div>

          <div className="space-y-10">
            {sortedRegions.map((region) => (
              <div key={region} className="space-y-3">
                <div className="flex items-center justify-between border-b border-zinc-200/80 pb-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700">
                    {region}
                  </h3>
                  <span className="text-[11px] text-zinc-400">
                    {countryByRegion[region].length} Destination{countryByRegion[region].length > 1 ? 's' : ''}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {countryByRegion[region].map((country) => (
                    <Link
                      key={country.slug}
                      href={`/en/countries/${country.slug}`}
                      className="bg-zinc-50 hover:bg-white rounded-xl border border-zinc-200/90 hover:border-zinc-300 p-4 transition-all hover:shadow-xs group flex flex-col justify-between"
                    >
                      <div className="flex items-start gap-3 mb-2">
                        <span className="text-2xl shrink-0 mt-0.5">{country.flag}</span>
                        <div className="min-w-0">
                          <span className="text-sm font-bold text-zinc-900 group-hover:text-[#0E2342] transition-colors block">
                            {country.name}
                          </span>
                          <span className="text-[11px] text-zinc-500 block truncate">
                            Authority: {country.authority.split('(')[0].trim()}
                          </span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-zinc-200/60 flex items-center justify-between text-[11px] text-zinc-500">
                        <span>Lead Time: <strong className="text-zinc-700">{country.leadTime}</strong></span>
                        <span className="group-hover:translate-x-0.5 transition-transform text-zinc-400 group-hover:text-zinc-700">
                          View Guide →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 7: COMMON MISTAKES TO AVOID ─────────────────────── */}
      <section id="common-mistakes" className="py-12 sm:py-16">
        <div className="section-container">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600 block mb-1">
              Biosecurity Pitfalls
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight mb-3">
              Common Mistakes to Avoid
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Administrative and timing errors are the leading causes of pet travel disruption. Any of the following common oversights can result in denied boarding, mandatory quarantine upon arrival, or expensive repatriation orders.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-5xl">
            {/* Mistake 1 */}
            <div className="bg-white rounded-2xl p-5 border border-zinc-200/90 space-y-2">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-red-50 text-red-600 flex items-center justify-center text-xs font-bold shrink-0 border border-red-200/80">✕</span>
                <h3 className="text-sm font-bold text-zinc-900">Vaccinating Before Microchipping</h3>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                The rabies vaccine must strictly follow or occur concurrently with microchip implantation. Vaccinations administered prior to chipping are legally void, necessitating a booster and a new 21-day latency wait.
              </p>
            </div>

            {/* Mistake 2 */}
            <div className="bg-white rounded-2xl p-5 border border-zinc-200/90 space-y-2">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-red-50 text-red-600 flex items-center justify-center text-xs font-bold shrink-0 border border-red-200/80">✕</span>
                <h3 className="text-sm font-bold text-zinc-900">Health Certificate Issued Too Early</h3>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Most sovereign authorities require the International Veterinary Health Certificate to be issued and endorsed within 10 days of departure. Completing it weeks in advance causes it to expire before flight arrival.
              </p>
            </div>

            {/* Mistake 3 */}
            <div className="bg-white rounded-2xl p-5 border border-zinc-200/90 space-y-2">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-red-50 text-red-600 flex items-center justify-center text-xs font-bold shrink-0 border border-red-200/80">✕</span>
                <h3 className="text-sm font-bold text-zinc-900">Ignoring the Post-Titer Waiting Period</h3>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Countries like Australia and Japan require pets to wait 180 days <em>after</em> the FAVN blood draw date before entering quarantine-free. Traveling immediately after getting results will result in months of costly quarantine.
              </p>
            </div>

            {/* Mistake 4 */}
            <div className="bg-white rounded-2xl p-5 border border-zinc-200/90 space-y-2">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-red-50 text-red-600 flex items-center justify-center text-xs font-bold shrink-0 border border-red-200/80">✕</span>
                <h3 className="text-sm font-bold text-zinc-900">Skipping Advance Import Permits</h3>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Failing to secure mandatory government entry licenses (e.g., Australia BICON, Singapore GoBusiness, UAE MOCCAE) means airlines will refuse boarding or customs officers will order immediate deportation at the border.
              </p>
            </div>

            {/* Mistake 5 */}
            <div className="bg-white rounded-2xl p-5 border border-zinc-200/90 space-y-2">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-red-50 text-red-600 flex items-center justify-center text-xs font-bold shrink-0 border border-red-200/80">✕</span>
                <h3 className="text-sm font-bold text-zinc-900">Missing the Tapeworm Treatment Window</h3>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                For the UK, Ireland, Finland, Norway, and Malta, Praziquantel must be given between 24 and 120 hours before arrival. Treating at 23 hours or 121 hours is an automatic statutory failure resulting in border delays.
              </p>
            </div>

            {/* Mistake 6 */}
            <div className="bg-white rounded-2xl p-5 border border-zinc-200/90 space-y-2">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-red-50 text-red-600 flex items-center justify-center text-xs font-bold shrink-0 border border-red-200/80">✕</span>
                <h3 className="text-sm font-bold text-zinc-900">Not Checking Breed-Specific Legislation</h3>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Importing restricted dog breeds (Pit Bull Terriers, Dogo Argentino, Fila Brasileiro, Tosas) or hybrid cats (F1–F4 Bengals/Savannahs) without verifying national legislation leads to permanent confiscation or immediate repatriation.
              </p>
            </div>

            {/* Mistake 7 */}
            <div className="bg-white rounded-2xl p-5 border border-zinc-200/90 space-y-2">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-red-50 text-red-600 flex items-center justify-center text-xs font-bold shrink-0 border border-red-200/80">✕</span>
                <h3 className="text-sm font-bold text-zinc-900">Using Non-IATA Compliant Travel Crates</h3>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Airlines enforce IATA Live Animals Regulations (LAR). Crates with plastic latches, pop-up doors, inadequate ventilation holes, or insufficient headroom will be rejected at cargo check-in.
              </p>
            </div>

            {/* Mistake 8 */}
            <div className="bg-white rounded-2xl p-5 border border-zinc-200/90 space-y-2">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-red-50 text-red-600 flex items-center justify-center text-xs font-bold shrink-0 border border-red-200/80">✕</span>
                <h3 className="text-sm font-bold text-zinc-900">Unapproved Flight Transits & Layovers</h3>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Transiting through a high-rabies country on an unsealed airway bill can compromise your pet’s rabies-free status, subjecting them to unexpected quarantine upon arrival at their final destination.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 8: FAQS ─────────────────────────────────────────── */}
      <section id="faqs" className="py-12 sm:py-16 bg-white border-t border-zinc-200/80">
        <div className="section-container">
          <div className="mb-8 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-1">
              Expert Answers
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight mb-2">
              Frequently Asked Questions About Pet Import
            </h2>
            <p className="text-sm text-zinc-500">
              Clear, authoritative guidance addressing the most critical statutory questions regarding international pet travel and customs clearance.
            </p>
          </div>

          <FaqAccordion items={IMPORT_GUIDE_FAQS} columns={2} defaultOpenIndex={0} />
        </div>
      </section>

      {/* ─── CTA BANNER & COMPLIANCE CHECKER ─────────────────────────── */}
      <section className="py-12 sm:py-16 bg-[#FAFAFA] border-t border-zinc-200/80">
        <div className="section-container">
          <div className="bg-white rounded-2xl border border-zinc-200/90 p-6 sm:p-8 lg:p-10 shadow-2xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>Instant Statutory Verification</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
                  Verify Your Pet’s Documents Before You Fly
                </h2>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  Avoid costly border delays, denied airline boarding, and quarantine surprises. Upload your pet’s microchip records, rabies certificates, blood titer lab reports, and veterinary health forms for an instant, statutory gap analysis against your destination country’s exact 2026 regulations.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <Link
                    href="/en/checker"
                    className="inline-flex items-center justify-center gap-2 bg-[#0E2342] hover:bg-[#16345E] text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-xs transition-colors cursor-pointer text-center"
                  >
                    <span>Check My Pet’s Documents</span>
                    <span>→</span>
                  </Link>
                  <Link
                    href="/en/countries"
                    className="inline-flex items-center justify-center gap-2 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 font-semibold text-xs sm:text-sm px-6 py-3 rounded-xl border border-zinc-200 hover:border-zinc-300 transition-colors cursor-pointer text-center"
                  >
                    <span>Explore Country Directory</span>
                  </Link>
                </div>

                <div className="pt-2 flex items-center gap-4 text-xs text-zinc-500 flex-wrap">
                  <span className="flex items-center gap-1.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Cross-referenced against official statutes</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Comprehensive latency & timing audits</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>100% Free to use</span>
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="bg-zinc-50 rounded-xl border border-zinc-200/90 p-5 space-y-3.5">
                  <div className="flex items-center justify-between pb-2.5 border-b border-zinc-200/70">
                    <span className="text-xs font-bold text-zinc-800 uppercase tracking-wide">
                      Automated Statutory Checklist
                    </span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded">
                      2026 Ready
                    </span>
                  </div>
                  <div className="space-y-2.5 text-xs text-zinc-600">
                    <div className="flex items-start gap-2.5">
                      <span className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5 border border-emerald-200/80">✓</span>
                      <span>Microchip 15-digit ISO compliance & implant date verification</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5 border border-emerald-200/80">✓</span>
                      <span>Rabies vaccine latency calculation (21-day incubation window)</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5 border border-emerald-200/80">✓</span>
                      <span>FAVN/RNATT titer score validation (≥ 0.50 IU/mL threshold)</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5 border border-emerald-200/80">✓</span>
                      <span>Post-titer draw waiting period verification (180-day countdown)</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5 border border-emerald-200/80">✓</span>
                      <span>Tapeworm (Praziquantel) 24–120 hour administration audit</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5 border border-emerald-200/80">✓</span>
                      <span>Import permit requirement check & restricted breed detection</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
