'use client';

import { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const FAQS: FaqItem[] = [
  {
    category: 'Border & Airline Enforcement',
    question: 'Can airlines deny my pet boarding even if my pet already has a passport?',
    answer:
      'Yes. Airlines are legally required to verify that your pet meets the sovereign entry requirements of the destination country before boarding. If a health certificate is dated outside the mandatory 10-day window, a rabies vaccination was administered prior to microchip implantation, or a 90-day waiting period has not elapsed, airlines face severe fines and will turn you away at the check-in counter. An EU pet passport is only valid when every vaccination and clinical examination section complies with destination regulations.',
  },
  {
    category: 'Planning Timelines',
    question: 'How far in advance should I start preparing my pet\'s paperwork?',
    answer:
      'It depends strictly on your origin and destination countries. For travel between low-risk countries (such as United States to Canada or intra-EU travel), 3 to 4 weeks is typically sufficient. However, for travel from high-risk or unlisted rabies countries (such as India, Turkey, UAE, or Brazil) to the European Union, United Kingdom, Japan, or Australia, you must begin 4 to 7 months in advance due to mandatory 21-day vaccine waiting times, blood titer lab turnaround, and mandatory 90-day to 180-day waiting periods.',
  },
  {
    category: 'Authority & Certification',
    question: 'Is Petvia an official government agency or visa issuer?',
    answer:
      'No. Petvia is an independent regulatory compliance intelligence platform. We decode, cross-reference, and verify your travel itinerary against official government biosecurity statutes (such as Regulation EU 2026/131, USDA APHIS, DEFRA UK, and MAFF Japan). We provide the exact requirements, mathematical timelines, and document discrepancy checks so you and your licensed veterinarian can obtain official government endorsements without errors.',
  },
  {
    category: 'Document Verification',
    question: 'What documents can I upload to the Automated Document Check?',
    answer:
      'You can upload European Pet Passports, National Vaccination Records, Rabies Certificates, Rabies Neutralising Antibody Titre Test reports (FAVN or RNATT laboratory reports), and International Veterinary Health Certificates in PDF, JPEG, or PNG format. Our engine verifies microchip ISO compliance, vaccination validity dates, laboratory authorization, and wait period windows.',
  },
  {
    category: 'Plans & Pricing',
    question: 'What is the difference between the Readiness Scan and the Complete Travel Plan?',
    answer:
      'The free Readiness Scan flags whether your route has mandatory waiting periods or critical blockers based on high-level inputs. The Complete Travel Plan (£19) delivers an exhaustive, route-specific itinerary: date-locked milestone calendars, step-by-step instructions for your veterinarian, required bilingual health certificate forms, entry port biosecurity instructions, and ongoing airline policy checklists.',
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-3 max-w-4xl mx-auto">
      {FAQS.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className={`border rounded-2xl transition-all duration-200 ${
              isOpen
                ? 'bg-white border-zinc-300 shadow-sm'
                : 'bg-white/80 hover:bg-white border-zinc-200/80 hover:border-zinc-300'
            }`}
          >
            <button
              type="button"
              onClick={() => toggle(idx)}
              className="w-full px-6 py-5 text-left flex items-start justify-between gap-4 focus:outline-none"
              aria-expanded={isOpen}
            >
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                  {faq.category}
                </span>
                <h4 className="font-display font-bold text-zinc-900 text-sm sm:text-base leading-snug">
                  {faq.question}
                </h4>
              </div>
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-zinc-500 border border-zinc-200 transition-transform duration-200 mt-0.5 ${
                  isOpen ? 'rotate-180 bg-zinc-100 text-zinc-900' : 'bg-zinc-50'
                }`}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>

            {isOpen && (
              <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-zinc-100 mt-1">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
