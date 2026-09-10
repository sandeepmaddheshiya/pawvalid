export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const LEFT_FAQS: FaqItem[] = [
  {
    id: 'l1',
    question: 'Does PawValid provide official government approval?',
    answer:
      'No. PawValid is an independent regulatory compliance software platform. We cross-reference and verify your documents against official government biosecurity statutes (EU 2026/131, USDA APHIS, DEFRA UK, and MAFF Japan) so you and your accredited veterinarian can secure official government endorsement without mistakes or delays.',
  },
  {
    id: 'l2',
    question: 'Can you check transit countries?',
    answer:
      'Yes. Many international transit hubs (such as London Heathrow, Frankfurt, or Singapore Changi) enforce stringent transit quarantine permits, microchip checks, or carrier rules even if your pet remains airside. PawValid audits your entire travel chain.',
  },
  {
    id: 'l3',
    question: 'What documents can I upload?',
    answer:
      'You can upload Pet Passports, Vaccination Records, Rabies Certificates, Rabies Serological Titer Reports (FAVN/RNATT), and International Veterinary Health Certificates in PDF, JPG, PNG, or DOCX format.',
  },
];

export const RIGHT_FAQS: FaqItem[] = [
  {
    id: 'r1',
    question: 'What happens if documents contain different information?',
    answer:
      'Our engine performs multi-document cross-verification, flagging any inconsistencies between microchip dates, vaccine batch records, or pet descriptions so you can resolve them with your vet before airport check-in.',
  },
  {
    id: 'r2',
    question: 'Can you tell me when my pet can travel?',
    answer:
      'Yes. PawValid calculates your exact earliest legal travel date by mathematically computing mandatory 21-day primary vaccination lags, 90-day EU titer windows, or 180-day rabies latency periods.',
  },
  {
    id: 'r3',
    question: 'How accurate is the information?',
    answer:
      'Our requirements database is continuously audited against official government agriculture and border control statutes, IATA live animal regulations, and embassy protocols across 120+ countries.',
  },
];

export const HOME_FAQS = [...LEFT_FAQS, ...RIGHT_FAQS];
