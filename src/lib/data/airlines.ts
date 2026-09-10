export interface AirlinePolicy {
  slug: string;
  name: string;
  code: string;
  logoText: string;
  alliance: string;
  headquarters: string;
  summary: string;
  inCabinAllowed: boolean;
  inCabinMaxWeightKg?: number;
  inCabinCarrierDimensions?: string;
  inCabinFeeRange: string;
  holdAllowed: boolean;
  holdMaxWeightKg?: number;
  cargoOnlyMandatory: boolean;
  cargoCarrier: string;
  brachycephalicPolicy: string;
  transitHubCare: string;
  keyRules: string[];
  bookingSteps: string[];
  faqs: Array<{ q: string; a: string }>;
}

export const AIRLINES: AirlinePolicy[] = [
  {
    slug: 'lufthansa',
    name: 'Lufthansa',
    code: 'LH',
    logoText: 'LH',
    alliance: 'Star Alliance',
    headquarters: 'Frankfurt & Munich, Germany',
    summary:
      'Lufthansa is one of the most pet-friendly European carriers, permitting small dogs and cats up to 8 kg (17.6 lbs) in the passenger cabin. Larger animals travel in pressurized, temperature-controlled cargo holds with layover care at the world-renowned Frankfurt Animal Lounge.',
    inCabinAllowed: true,
    inCabinMaxWeightKg: 8,
    inCabinCarrierDimensions: '55 × 40 × 23 cm (21.6 × 15.7 × 9.0 in), water-repellent soft bag',
    inCabinFeeRange: '€60 (domestic) • €100 (Europe) • €110–€120 (intercontinental)',
    holdAllowed: true,
    holdMaxWeightKg: 75,
    cargoOnlyMandatory: false,
    cargoCarrier: 'Lufthansa Cargo Live/td',
    brachycephalicPolicy:
      'Snub-nosed (brachycephalic) dog and cat breeds are strictly banned from cargo holds due to respiratory risks. They may only travel in-cabin if under 8 kg.',
    transitHubCare:
      'Frankfurt Animal Lounge (FRA): A 4,000 m² veterinary transit facility offering dedicated veterinarians, walking paddocks, and specialized feeding during layovers.',
    keyRules: [
      'Registration must occur at least 72 hours prior to flight departure.',
      'Only 2 pets per passenger permitted (either 2 in cabin, 2 in hold, or 1 in each).',
      'Minimum age of 12 weeks for domestic/EU flights; 16 weeks for travel from rabies-risk origins.',
      'Soft-sided, leak-proof carrier mandatory for in-cabin travel; hard crates strictly prohibited under the seat.',
      'The pet must remain fully enclosed inside the carrier under the seat in front throughout taxi, takeoff, and landing.',
    ],
    bookingSteps: [
      'Confirm route feasibility and verify whether the destination country permits in-cabin arrival (e.g., UK does not).',
      'Reserve your ticket, then immediately contact the Lufthansa Service Center to register pet quota availability.',
      'Complete the mandatory Lufthansa "Transporting an Animal in the Passenger Cabin" release declaration.',
      'Present veterinary health certificates, microchip confirmation, and signed release at the airport check-in desk at least 2.5 hours before departure.',
    ],
    faqs: [
      {
        q: 'Can I take my dog in the cabin on Lufthansa?',
        a: 'Yes, provided the total weight of your pet including the soft-sided carrier does not exceed 8 kg (17.6 lbs) and the carrier dimensions do not exceed 55 × 40 × 23 cm.',
      },
      {
        q: 'What happens during a Lufthansa layover in Frankfurt?',
        a: 'Pets traveling in the cargo hold transit through the Frankfurt Animal Lounge, where dedicated veterinary staff inspect, water, feed, and care for your animal in climate-controlled quarters.',
      },
      {
        q: 'Does Lufthansa accept pitbulls or snub-nosed breeds?',
        a: 'Fighting breeds (Pitbulls, Staffordshire Bull Terriers) are subject to special CR-82 reinforced crate mandates in the hold. Brachycephalic (snub-nosed) breeds are banned from the hold entirely.',
      },
    ],
  },
  {
    slug: 'british-airways',
    name: 'British Airways',
    code: 'BA',
    logoText: 'BA',
    alliance: 'Oneworld',
    headquarters: 'London Heathrow, United Kingdom',
    summary:
      'Under UK statutory biosecurity laws, British Airways does not permit any companion pets in the passenger cabin on commercial flights (except recognized assistance dogs certified by ADI or IGDF). All companion dogs and cats must travel as manifest cargo via IAG Cargo.',
    inCabinAllowed: false,
    inCabinFeeRange: 'Not Available (Assistance Dogs Free)',
    holdAllowed: true,
    cargoOnlyMandatory: true,
    cargoCarrier: 'IAG Cargo (Live Animals Desk)',
    brachycephalicPolicy:
      'Pugs, French Bulldogs, and Persian cats face seasonal embargoes and strict temperature limits on IAG Cargo. Snub-nosed pets mandate 10% larger crates with 4-sided ventilation.',
    transitHubCare:
      'Heathrow Animal Reception Centre (HARC): Managed by the City of London Corporation, inspecting microchips, veterinary certificates, and DEFRA tapeworm treatments 24/7.',
    keyRules: [
      'Companion pets cannot travel as excess baggage; bookings must be placed as manifest cargo through IAG Cargo or an IPATA-certified pet shipper.',
      'All pets entering Great Britain must arrive through London Heathrow (LHR) or London Gatwick (LGW) at approved Animal Reception Centres.',
      'Only Assistance Dogs accredited by Assistance Dogs International (ADI) or International Guide Dog Federation (IGDF) may fly in-cabin without charge.',
      'Dogs entering the UK mandate veterinary tapeworm treatment (Praziquantel) administered 24–120 hours before scheduled arrival.',
    ],
    bookingSteps: [
      'Contact an IPATA-accredited pet transport agent or IAG Cargo directly at least 4–6 weeks before intended flight.',
      'Obtain an approved IATA-compliant rigid crate with metal bolts and 4-sided ventilation.',
      'Have your accredited vet issue an Animal Health Certificate (AHC) or USDA VEHCS certificate within 10 days of travel.',
      'Have your vet administer Praziquantel tapeworm treatment between 24 and 120 hours before UK landing and record it in Section II.',
      'Drop pet at IAG Cargo facility 4–6 hours prior to flight departure.',
    ],
    faqs: [
      {
        q: 'Why does British Airways not allow dogs in the cabin?',
        a: 'The UK government (DEFRA) strictly enforces rabies quarantine prevention. All companion animals entering the UK must be processed through an approved Border Inspection Post (like HARC at Heathrow) directly from the cargo manifest.',
      },
      {
        q: 'How much does it cost to fly a dog on British Airways?',
        a: 'Because travel occurs via manifest cargo, rates depend on total volumetric crate dimensions and weight. Typical transatlantic fees range from £800 to £2,500+ plus customs clearance charges.',
      },
      {
        q: 'Can emotional support animals (ESAs) fly in-cabin on British Airways?',
        a: 'No. British Airways does not recognize Emotional Support Animals for in-cabin travel. Only service animals accredited by ADI or IGDF are accepted.',
      },
    ],
  },
  {
    slug: 'delta-air-lines',
    name: 'Delta Air Lines',
    code: 'DL',
    logoText: 'DL',
    alliance: 'SkyTeam',
    headquarters: 'Atlanta, Georgia, United States',
    summary:
      'Delta Air Lines permits small dogs, cats, and household birds to travel in the passenger cabin on most domestic and selected international flights. Pets must remain inside an approved carrier under the seat in front for the entire duration of the flight.',
    inCabinAllowed: true,
    inCabinCarrierDimensions: 'Varies by aircraft; recommended soft kennel 18 × 11 × 11 in (45 × 28 × 28 cm)',
    inCabinFeeRange: '$95 (US/Canada/Puerto Rico) • $200 (International) • $75 (Brazil)',
    holdAllowed: false,
    cargoOnlyMandatory: false,
    cargoCarrier: 'Delta Cargo (Pet First) — Active military and State Dept personnel only',
    brachycephalicPolicy:
      'Delta Cargo bans all snub-nosed dog and cat breeds from cargo holds year-round. In-cabin travel remains permitted for small brachycephalic pets that fit safely under the seat.',
    transitHubCare:
      'Dedicated pet relief areas at Atlanta Hartsfield-Jackson (ATL), Salt Lake City (SLC), Minneapolis (MSP), and Detroit (DTW) post-security.',
    keyRules: [
      'In-cabin carry-on pets count as the passenger’s single personal carry-on item.',
      'Minimum pet age is 10 weeks for domestic US flights and 16 weeks for international travel.',
      'Pets are not permitted in-cabin on flights to the UK, Ireland, Australia, South Africa, or Hawaii due to local quarantine laws.',
      'Only one pet per kennel is permitted, with exceptions for female cats/dogs with unweaned litters under 6 months.',
      'No checked baggage pets accepted; commercial passengers cannot book pets as checked baggage.',
    ],
    bookingSteps: [
      'Book your passenger itinerary online or via the Delta app.',
      'Immediately call Delta Reservations (1-800-221-1212) to request pet space; capacity is strictly capped per cabin (usually 2 in First Class, 4 in Main Cabin).',
      'Ensure kennel fits within your specific aircraft seat footprint (A321, B737, A350 have different under-seat clearances).',
      'Pay pet carry-on fee at the airport special assistance check-in counter on travel day.',
    ],
    faqs: [
      {
        q: 'How much does Delta charge for an in-cabin pet?',
        a: 'Delta charges $95 each way for flights within the US, Canada, and Puerto Rico, and $200 each way for eligible international routes.',
      },
      {
        q: 'Can I buy a seat for my dog on Delta?',
        a: 'No. You cannot buy a passenger seat for a dog. The pet must remain fully enclosed inside an airline-compliant soft carrier under the seat in front of you throughout the flight.',
      },
      {
        q: 'Does Delta fly dogs in the cargo hold?',
        a: 'Delta Cargo Pet First is restricted exclusively to active-duty U.S. military personnel and U.S. State Department Foreign Service officers traveling on official permanent change of station (PCS) orders.',
      },
    ],
  },
  {
    slug: 'air-france',
    name: 'Air France',
    code: 'AF',
    logoText: 'AF',
    alliance: 'SkyTeam',
    headquarters: 'Paris Charles de Gaulle, France',
    summary:
      'Air France enables companion pets to travel in the passenger cabin (up to 8 kg / 17.6 lbs total weight) or in the ventilated, heated cargo hold (up to 75 kg / 165 lbs combined weight). Pets transiting Paris CDG benefit from direct EU border inspection protocols.',
    inCabinAllowed: true,
    inCabinMaxWeightKg: 8,
    inCabinCarrierDimensions: '46 × 28 × 24 cm (18.1 × 11.0 × 9.4 in), flexible closed bag mandatory',
    inCabinFeeRange: '€70 (France) • €125 (Europe) • €125–€200 (Intercontinental)',
    holdAllowed: true,
    holdMaxWeightKg: 75,
    cargoOnlyMandatory: false,
    cargoCarrier: 'Air France KLM Cargo Pet Desk',
    brachycephalicPolicy:
      'Snub-nosed breeds (Pugs, Boxers, French Bulldogs, Persians) are strictly prohibited from flying in the hold on Air France flights due to respiratory distress risks. In-cabin travel under 8 kg is permitted.',
    transitHubCare:
      'Paris-Charles de Gaulle (CDG) live animal transit: Handled in compliance with IATA Live Animal Regulations with ramp transfers conducted via dedicated temperature-monitored vans.',
    keyRules: [
      'Travel reservations for pets must be made by telephone at least 48 hours prior to departure.',
      'Snub-nosed animals are strictly barred from the cargo hold.',
      'In the cabin, rigid pet carriers are prohibited; you must use a flexible, leak-proof travel bag with dimensions not exceeding 46 × 28 × 24 cm.',
      'Passengers traveling with a pet in the cabin cannot be seated in emergency exit rows or in Business Class on Boeing 777/787 long-haul aircraft.',
    ],
    bookingSteps: [
      'Verify European Union Regulation 576/2013 entry compliance (microchip, rabies vaccine with 21-day latency, Annex IV certificate).',
      'Contact Air France Customer Service by phone to secure pet quota confirmation.',
      'Download and sign the Air France "Conditions of Transport for a Dog or Cat in the Hold" document if traveling via hold.',
      'Check in at Paris CDG or departure airport at least 3 hours prior to long-haul departure.',
    ],
    faqs: [
      {
        q: 'What is the maximum weight for a dog in cabin on Air France?',
        a: 'The combined weight of the dog (or cat) and the transport bag must not exceed 8 kg (17.6 lbs).',
      },
      {
        q: 'Does Air France accept pets on layovers in Paris?',
        a: 'Yes, companion pets can transit through Paris Charles de Gaulle (CDG) and Paris Orly (ORY), provided transit time exceeds minimum connection windows and transfer stays within Schengen borders.',
      },
      {
        q: 'What crate is required for the hold on Air France?',
        a: 'You must use a rigid plastic or fiberglass IATA-compliant kennel fastened with metal bolts. Wheels must be removed or taped, and doors must feature central multi-point locking.',
      },
    ],
  },
  {
    slug: 'emirates',
    name: 'Emirates',
    code: 'EK',
    logoText: 'EK',
    alliance: 'Independent / Global Partner Network',
    headquarters: 'Dubai International Airport, United Arab Emirates',
    summary:
      'Emirates operates one of the most advanced live animal logistics hubs in the world via Emirates SkyCargo. Except for service dogs for the visually impaired and falcons between specific Middle Eastern destinations, all companion dogs and cats must travel as cargo.',
    inCabinAllowed: false,
    inCabinFeeRange: 'Not Available in Cabin (Service Animals & Falcons Only)',
    holdAllowed: true,
    cargoOnlyMandatory: true,
    cargoCarrier: 'Emirates SkyCargo (Pets Care Desk)',
    brachycephalicPolicy:
      'Strict embargoes on brachycephalic dog and cat breeds from May to October across the Gulf region due to extreme desert temperatures. Specific crate oversizing mandatory year-round.',
    transitHubCare:
      'Emirates SkyCentral Animal Facility at Dubai World Central (DWC) and DXB: Features temperature-regulated kennels, veterinary staff, exercise runs, and chilled ground transport.',
    keyRules: [
      'No pets allowed in passenger cabin on any commercial route, regardless of size or weight.',
      'Animals transiting Dubai (DXB) during summer months are subject to strict aircraft connection thresholds to prevent tarmac heat stress.',
      'Importing dogs into the UAE requires a formal import permit from the Ministry of Climate Change and Environment (MOCCAE) and an official RNATT rabies titer test.',
      'Certain breeds (Pitbulls, American Staffordshire Terriers, Rottweilers) are classified as dangerous and banned from entry into the UAE.',
    ],
    bookingSteps: [
      'Contact Emirates SkyCargo local station at least 6–8 weeks before scheduled departure.',
      'Submit veterinary passport, FAVN rabies serological titer report, and health certificates to Emirates SkyCargo for pre-clearance.',
      'Obtain MOCCAE import permit if Dubai is your final destination.',
      'Purchase an IATA CR-1 container with metal ventilation grilles and secure drinking bowls.',
      'Deliver pet to Emirates SkyCargo facility 4 to 6 hours prior to scheduled flight.',
    ],
    faqs: [
      {
        q: 'Can small dogs fly in cabin on Emirates?',
        a: 'No. Emirates does not permit companion dogs or cats in the passenger cabin under any circumstances, even if they are small puppies or kittens.',
      },
      {
        q: 'Is it safe for pets to transit Dubai on Emirates during summer?',
        a: 'Emirates enforces strict heat protocols. Pets are transferred between aircraft and the climate-controlled SkyCentral animal facility in dedicated refrigerated vans to avoid ground heat.',
      },
      {
        q: 'How much does Emirates charge to fly a dog?',
        a: 'Cargo pricing is calculated based on crate dimensional weight and flight distance. Rates typically start at $500 to $1,800+ USD plus handling and customs clearance fees.',
      },
    ],
  },
  {
    slug: 'united-airlines',
    name: 'United Airlines',
    code: 'UA',
    logoText: 'UA',
    alliance: 'Star Alliance',
    headquarters: 'Chicago, Illinois, United States',
    summary:
      'United Airlines welcomes domesticated dogs and cats to travel in the aircraft cabin on domestic and select international flights when space is available. The pet must remain inside an airline-approved hard or soft kennel that fits under the seat in front of the customer.',
    inCabinAllowed: true,
    inCabinCarrierDimensions: 'Hard: 17.5 × 12 × 7.5 in (44 × 30 × 19 cm) • Soft: 18 × 11 × 11 in (45 × 28 × 28 cm)',
    inCabinFeeRange: '$150 each way ($300 roundtrip)',
    holdAllowed: false,
    cargoOnlyMandatory: false,
    cargoCarrier: 'United PetSafe (Currently suspended for standard civilian passengers)',
    brachycephalicPolicy:
      'Brachycephalic pets may travel in cabin provided they fit comfortably under the seat. United PetSafe cargo program remains suspended.',
    transitHubCare:
      'Pet relief stations available at all major United hubs including Houston (IAH), Newark (EWR), Chicago (ORD), Denver (DEN), and San Francisco (SFO).',
    keyRules: [
      'Carry-on pets are limited to dogs and cats only.',
      'Pet must be at least 2 months old for domestic travel and 4 months old for international itineraries.',
      'United does not permit pets in the cabin on flights to or from Hawaii, the UK, Australia, or Guam.',
      'Passengers traveling with in-cabin pets cannot sit in exit rows or bulkhead seats.',
      'The pet fee is $150 each way with a $150 service charge for each layover of more than four hours within the U.S.',
    ],
    bookingSteps: [
      'Book your ticket on united.com or the United mobile app.',
      'Select "Add pet to reservation" during booking or manage your trip online to secure pet quota.',
      'Verify kennel clearance against your specific aircraft seat diagram.',
      'Check in with a United customer service agent at the airport counter to verify kennel sizing and receive your pet tag.',
    ],
    faqs: [
      {
        q: 'What is United Airlines pet fee?',
        a: 'United charges $150 each way for a pet traveling in the cabin, plus an additional $150 for any domestic layover exceeding four hours.',
      },
      {
        q: 'Can I fly my large dog in cargo on United?',
        a: 'No. United Airlines indefinitely suspended its civilian PetSafe cargo program. Large pets that cannot fit under the seat cannot currently fly on United commercial flights.',
      },
      {
        q: 'Does United allow two cats in one carrier?',
        a: 'United allows two small puppies or kittens of the same breed between 2 and 6 months old in one carrier, provided they have enough room to stand and turn around naturally.',
      },
    ],
  },
  {
    slug: 'american-airlines',
    name: 'American Airlines',
    code: 'AA',
    logoText: 'AA',
    alliance: 'Oneworld',
    headquarters: 'Fort Worth, Texas, United States',
    summary:
      'American Airlines allows small cats and dogs to travel in the cabin on qualifying flights up to 12 hours (or within the 48 contiguous United States, Canada, Mexico, and the Caribbean). The pet must stay in their kennel under the seat for the flight.',
    inCabinAllowed: true,
    inCabinCarrierDimensions: 'Soft: 18 × 11 × 11 in (45 × 28 × 28 cm) • Hard: 19 × 13 × 9 in (48 × 33 × 22 cm)',
    inCabinFeeRange: '$150 each way per kennel',
    holdAllowed: false,
    cargoOnlyMandatory: false,
    cargoCarrier: 'American Airlines Cargo (ExpediteTC Live)',
    brachycephalicPolicy:
      'American Airlines will not accept brachycephalic dogs or cats of any mix for checked baggage or cargo travel. They may only fly in-cabin if they meet standard carry-on size rules.',
    transitHubCare:
      'Dedicated pet relief stations available at Dallas/Fort Worth (DFW), Charlotte (CLT), Miami (MIA), and Philadelphia (PHL).',
    keyRules: [
      'Carry-on pet fee is $150 per kennel each way.',
      'As of 2024–2026, passengers with an in-cabin pet may also bring one standard carry-on bag or personal item on board.',
      'Pets cannot travel in-cabin to the UK, Ireland, Hawaii, Jamaica, Argentina, Chile, or Uruguay.',
      'Checked pet travel in the hold is restricted exclusively to active-duty U.S. military and State Dept personnel.',
    ],
    bookingSteps: [
      'Contact American Airlines Reservations (800-433-7300) immediately after ticket purchase to reserve pet space.',
      'Check in at the ticket counter on departure day at least 2 hours prior to domestic departure and 3 hours prior to international.',
      'Pay the $150 fee at the desk and receive your kennel approval tag.',
      'Keep pet inside the carrier in airport gate areas and onboard the aircraft.',
    ],
    faqs: [
      {
        q: 'Can I bring a carry-on bag and a dog on American Airlines?',
        a: 'Yes! American Airlines updated its policy to allow pet parents to bring both their pet carrier and a regular carry-on bag or personal item into the cabin.',
      },
      {
        q: 'How many pets can American Airlines carry per flight?',
        a: 'American allows up to 7 carry-on kennels on mainline flights and up to 5 on regional American Eagle flights, allocated on a first-come, first-served basis.',
      },
      {
        q: 'Does American Airlines accept pets on flights to London?',
        a: 'No in-cabin pets are accepted on American Airlines flights to London Heathrow due to UK DEFRA quarantine entry mandates.',
      },
    ],
  },
  {
    slug: 'qatar-airways',
    name: 'Qatar Airways',
    code: 'QR',
    logoText: 'QR',
    alliance: 'Oneworld',
    headquarters: 'Doha, Qatar',
    summary:
      'Qatar Airways does not permit companion dogs or cats in the passenger cabin (except service animals and falcons in Economy Class). Companion pets travel as checked baggage or manifest cargo in pressurized, temperature-regulated holds with transit care at Hamad International Airport (DOH).',
    inCabinAllowed: false,
    inCabinFeeRange: 'Not Available in Cabin (Service Dogs & Falcons Only)',
    holdAllowed: true,
    holdMaxWeightKg: 75,
    cargoOnlyMandatory: false,
    cargoCarrier: 'Qatar Airways Cargo (Live Animal Service)',
    brachycephalicPolicy:
      'Snub-nosed breeds are not accepted for checked baggage or cargo travel during warmer months. During cooler windows, CR-82 oversized crates and veterinarian fit-to-fly letters are required.',
    transitHubCare:
      'Hamad International Airport Live Animal Centre: A 4,200 m² state-of-the-art facility featuring 24/7 veterinary supervision, temperature-controlled isolation rooms, and walking areas.',
    keyRules: [
      'All companion pets travel in the temperature-controlled hold; cabin space is restricted to service animals and trained falcons.',
      'Pet bookings must be notified to Qatar Airways at least 48 hours before departure.',
      'Container must comply strictly with IATA Live Animal Regulations with metal fasteners and exterior water funnels.',
      'Checked baggage pet fees range from $200 to $450 depending on weight and dimensions.',
    ],
    bookingSteps: [
      'Reserve your flight booking on qatarairways.com.',
      'Submit the Qatar Airways Pet Travel Request form with crate dimensions and pet weight at least 48 hours before flight.',
      'Ensure veterinary health certificate, microchip, and destination import permits are verified.',
      'Present pet at Hamad International Airport or departure station 3 to 4 hours before departure.',
    ],
    faqs: [
      {
        q: 'Are dogs allowed in cabin on Qatar Airways?',
        a: 'No companion dogs are allowed in the cabin. Only certified service dogs for visual or hearing impairment and falcons (maximum 6 in Economy) are permitted in the cabin.',
      },
      {
        q: 'How does Qatar Airways care for pets during Doha layovers?',
        a: 'Pets in transit are transferred to the dedicated Live Animal Centre at Hamad International Airport, where veterinary staff inspect, water, and exercise them in climate-controlled environments.',
      },
      {
        q: 'What are Qatar Airways fees for flying a dog in the hold?',
        a: 'Checked baggage pet fees range from $200 for kennels up to 32 kg, to $350–$450 for crates between 32 kg and 75 kg.',
      },
    ],
  },
  {
    slug: 'klm',
    name: 'KLM Royal Dutch Airlines',
    code: 'KL',
    logoText: 'KL',
    alliance: 'SkyTeam',
    headquarters: 'Amsterdam Schiphol, Netherlands',
    summary:
      'KLM is renowned for its animal-friendly services, housing the world’s largest airline Animal Hotel at Amsterdam Schiphol. Small dogs and cats can fly in-cabin up to 8 kg, while larger pets travel in temperature-controlled holds.',
    inCabinAllowed: true,
    inCabinMaxWeightKg: 8,
    inCabinCarrierDimensions: '46 × 28 × 24 cm (18.1 × 11.0 × 9.4 in), flexible travel bag',
    inCabinFeeRange: '€75–€100 (Europe) • €150–€200 (Intercontinental)',
    holdAllowed: true,
    holdMaxWeightKg: 75,
    cargoOnlyMandatory: false,
    cargoCarrier: 'Air France KLM Cargo Pet Desk',
    brachycephalicPolicy:
      'Snub-nosed dog and cat breeds are strictly prohibited from flying in the cargo hold. They may only fly in the cabin if they weigh under 8 kg in a compliant soft bag.',
    transitHubCare:
      'KLM Animal Hotel at Amsterdam Schiphol (AMS): A world-class transit sanctuary staffed 24/7 by animal attendants and veterinarians, providing custom meals and dog walking runs.',
    keyRules: [
      'Pet reservations must be completed by telephone at least 48 hours before departure.',
      'Maximum 3 pets in the hold per passenger.',
      'Wooden crates and plastic latches without metal bolts are strictly rejected for hold travel.',
      'In-cabin pets cannot travel in Premium Comfort Class or Business Class on intercontinental flights due to seat design.',
    ],
    bookingSteps: [
      'Call KLM Customer Contact Centre to verify pet quota availability on your flight.',
      'Ensure EU Pet Passport or non-commercial health certificate (Annex IV) is issued by accredited veterinarian.',
      'Complete and print the KLM "Checklist for transport in the hold" form.',
      'Arrive at Amsterdam Schiphol check-in at least 3 hours prior to long-haul departure.',
    ],
    faqs: [
      {
        q: 'Can my dog travel in cabin on KLM?',
        a: 'Yes, if your dog or cat weighs no more than 8 kg (17.6 lbs) including their carrier, and the carrier does not exceed 46 × 28 × 24 cm.',
      },
      {
        q: 'What is the KLM Animal Hotel at Schiphol?',
        a: 'Located at Amsterdam Airport Schiphol, the KLM Animal Hotel is a 24/7 facility where transiting pets receive food, fresh water, medication, and outdoor walks during layovers exceeding 2 hours.',
      },
      {
        q: 'Does KLM allow pugs or bulldogs in the hold?',
        a: 'No. KLM strictly bans all brachycephalic (snub-nosed) breeds from the cargo hold. They can only travel in the cabin if they meet the 8 kg limit.',
      },
    ],
  },
  {
    slug: 'virgin-atlantic',
    name: 'Virgin Atlantic',
    code: 'VS',
    logoText: 'VS',
    alliance: 'SkyTeam',
    headquarters: 'London Heathrow, United Kingdom',
    summary:
      'In compliance with United Kingdom DEFRA regulations, Virgin Atlantic does not permit companion pets in the passenger cabin (except recognized assistance dogs). All companion animals must fly as manifest cargo in pressurized, temperature-monitored holds via Virgin Atlantic Cargo.',
    inCabinAllowed: false,
    inCabinFeeRange: 'Not Available in Cabin (Assistance Dogs Free)',
    holdAllowed: true,
    cargoOnlyMandatory: true,
    cargoCarrier: 'Virgin Atlantic Cargo (Live Animals Team)',
    brachycephalicPolicy:
      'Brachycephalic breeds (Bulldogs, Pugs, Persian cats) are not accepted for cargo transport on Virgin Atlantic due to high respiratory risk during transit.',
    transitHubCare:
      'Heathrow Animal Reception Centre (HARC): Operates 24/7 to provide veterinary inspections, quarantine clearance, and microchip scanning immediately upon aircraft docking.',
    keyRules: [
      'No companion pets allowed in passenger cabin on commercial flights.',
      'Bookings must be arranged via an IPATA-approved pet shipping company or through Virgin Atlantic Cargo directly.',
      'All pets arriving into the UK must have a valid Great Britain Pet Health Certificate and veterinary tapeworm treatment administered 24–120 hours prior to landing.',
      'Crates must be rigid IATA CR-1 containers with all metal fastening bolts and attached exterior feeding funnels.',
    ],
    bookingSteps: [
      'Contact Virgin Atlantic Cargo (cargo.liveanimals@fly.virgin.com) or an IPATA agent 6 to 8 weeks before departure.',
      'Measure your dog using the IATA formula (Length A + Half Foreleg B) to ensure a minimum 3-inch head clearance in the crate.',
      'Obtain USDA APHIS VEHCS endorsement within 10 days of UK landing.',
      'Administer Praziquantel tapeworm treatment between 24 and 120 hours before UK landing.',
      'Deliver pet to Virgin Atlantic Cargo counter 4 hours prior to scheduled takeoff.',
    ],
    faqs: [
      {
        q: 'Can I fly my dog in the cabin on Virgin Atlantic?',
        a: 'No companion pets are permitted in the cabin on Virgin Atlantic. Only trained service animals accredited by ADI or IGDF are accepted in the passenger cabin.',
      },
      {
        q: 'How does Virgin Atlantic transport pets into the UK?',
        a: 'Pets travel in a dedicated, heated, pressurized cargo compartment. Upon arrival at London Heathrow, bonded transfer teams escort pets directly to the Heathrow Animal Reception Centre.',
      },
      {
        q: 'How much does it cost to fly a pet on Virgin Atlantic Cargo?',
        a: 'Transatlantic pet cargo shipping typically ranges between £1,000 and £2,500+ depending on crate volumetric weight and airport clearance charges.',
      },
    ],
  },
];
