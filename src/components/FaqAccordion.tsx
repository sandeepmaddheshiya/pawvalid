'use client';

import { useState } from 'react';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const LEFT_FAQS: FaqItem[] = [
  {
    id: 'l1',
    question: 'Does PawRoute provide official government approval?',
    answer:
      'No. Petvia is an independent regulatory compliance software platform. We cross-reference and verify your documents against official government biosecurity statutes (EU 2026/131, USDA APHIS, DEFRA UK, and MAFF Japan) so you and your accredited veterinarian can secure official government endorsement without mistakes or delays.',
  },
  {
    id: 'l2',
    question: 'Can you check transit countries?',
    answer:
      'Yes. Many international transit hubs (such as London Heathrow, Frankfurt, or Singapore Changi) enforce stringent transit quarantine permits, microchip checks, or carrier rules even if your pet remains airside. Petvia audits your entire travel chain.',
  },
  {
    id: 'l3',
    question: 'What documents can I upload?',
    answer:
      'You can upload Pet Passports, Vaccination Records, Rabies Certificates, Rabies Serological Titer Reports (FAVN/RNATT), and International Veterinary Health Certificates in PDF, JPG, PNG, or DOCX format.',
  },
];

const RIGHT_FAQS: FaqItem[] = [
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
      'Yes. Petvia calculates your exact earliest legal travel date by mathematically computing mandatory 21-day primary vaccination lags, 90-day EU titer windows, or 180-day rabies latency periods.',
  },
  {
    id: 'r3',
    question: 'How accurate is the information?',
    answer:
      'Our requirements database is continuously audited against official government agriculture and border control statutes, IATA live animal regulations, and embassy protocols across 120+ countries.',
  },
];

export default function FaqAccordion() {
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggle = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto text-left">
      {/* Left Column */}
      <div className="space-y-3">
        {LEFT_FAQS.map((faq) => {
          const isOpen = openIds.includes(faq.id);
          return (
            <div
              key={faq.id}
              className={`border rounded-xl transition-all duration-200 ${
                isOpen
                  ? 'bg-white border-zinc-300 shadow-xs'
                  : 'bg-white border-zinc-200/80 hover:border-zinc-300'
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(faq.id)}
                className="w-full px-5 py-4 text-left flex items-center justify-between gap-3 focus:outline-none"
                aria-expanded={isOpen}
              >
                <h4 className="text-xs sm:text-[13px] font-semibold text-[#0E2342] leading-snug">
                  {faq.question}
                </h4>
                <span className="text-sm font-bold text-zinc-400 shrink-0">
                  {isOpen ? '−' : '+'}
                </span>
              </button>

              {isOpen && (
                <div className="px-5 pb-4 pt-1 text-xs text-zinc-600 leading-relaxed border-t border-zinc-100">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Right Column */}
      <div className="space-y-3">
        {RIGHT_FAQS.map((faq) => {
          const isOpen = openIds.includes(faq.id);
          return (
            <div
              key={faq.id}
              className={`border rounded-xl transition-all duration-200 ${
                isOpen
                  ? 'bg-white border-zinc-300 shadow-xs'
                  : 'bg-white border-zinc-200/80 hover:border-zinc-300'
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(faq.id)}
                className="w-full px-5 py-4 text-left flex items-center justify-between gap-3 focus:outline-none"
                aria-expanded={isOpen}
              >
                <h4 className="text-xs sm:text-[13px] font-semibold text-[#0E2342] leading-snug">
                  {faq.question}
                </h4>
                <span className="text-sm font-bold text-zinc-400 shrink-0">
                  {isOpen ? '−' : '+'}
                </span>
              </button>

              {isOpen && (
                <div className="px-5 pb-4 pt-1 text-xs text-zinc-600 leading-relaxed border-t border-zinc-100">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
