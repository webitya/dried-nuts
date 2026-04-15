'use client';

import { useState } from 'react';
import { Plus, Minus, HelpCircle, ArrowRight } from 'lucide-react';

const FAQS = [
  {
    id: 1,
    question: "How long does shipping typically take?",
    answer: "Orders are processed within 24-48 hours. Domestic shipping within India usually takes 3-5 business days. We use secure, food-grade packaging."
  },
  {
    id: 2,
    question: "Are your products fresh and natural?",
    answer: "Yes! Our products are handpicked and naturally sourced. We ensure premium quality by selecting the finest farms and avoiding any artificial preservatives."
  },
  {
    id: 3,
    question: "What is your return policy?",
    answer: "Since our dried fruits and nuts are edible goods, we do not accept returns. If your order arrives damaged, contact us within 48 hours for a replacement."
  },
  {
    id: 4,
    question: "Do you ship pan-India?",
    answer: "Yes, we deliver to all major cities and towns across India. Free shipping is available on orders above ₹499."
  },
  {
    id: 5,
    question: "Do you accept bulk or corporate orders?",
    answer: "Yes, we specialize in corporate gifting and bulk supplies for events. Please reach out via our contact page for custom pricing and packaging options."
  },
  {
    id: 6,
    question: "How should I store my dried fruits and nuts?",
    answer: "To maintain maximum freshness and crunch, store them in an airtight container in a cool, dry place. For longer shelf life, refrigeration is recommended."
  },
  {
    id: 7,
    question: "What payment methods do you accept?",
    answer: "We accept all major credit/debit cards, UPI, Net Banking, and popular digital wallets. All transactions are processed through a secure payment gateway."
  },
  {
    id: 8,
    question: "Is your packaging eco-friendly?",
    answer: "We prioritize sustainability. Our primary packaging is food-safe and designed to be reused or recycled. We are constantly working on reducing our plastic footprint."
  }
];

function FaqItem({ faq, isOpen, toggle }) {
  return (
    <div className={`border-b border-gray-100 transition-all duration-300 ${isOpen ? 'bg-gray-50/30' : ''}`}>
      <button
        onClick={toggle}
        className="w-full py-4 px-8 flex items-center justify-between text-left group transition-all"
      >
        <span className={`text-sm sm:text-base font-bold tracking-tight transition-colors duration-300 pr-4 ${isOpen ? 'text-orange-600' : 'text-gray-900 group-hover:text-orange-600'}`}>
          {faq.question}
        </span>
        <div className={`flex-shrink-0 p-1.5 rounded-lg transition-all duration-300 ${isOpen ? 'bg-orange-600 text-white' : 'bg-gray-50 text-gray-400 group-hover:bg-gray-100'}`}>
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </div>
      </button>

      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-8 pb-6">
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-4xl font-medium">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FaqsSection() {
  const [openId, setOpenId] = useState(1);

  return (
    <section className="py-5 bg-[#FEF9F2] border-y border-orange-50/30">
      <div className="w-full">
        {/* Header */}
        <div className="text-center py-6 bg-white/40 border-b border-gray-100">
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-1 tracking-tight">
            Got questions? <br /> We've got <span className="text-orange-600">Answers.</span>
          </h2>
        </div>

        {/* FAQ List */}
        <div className="bg-transparent">
          {FAQS.map((faq) => (
            <FaqItem
              key={faq.id}
              faq={faq}
              isOpen={openId === faq.id}
              toggle={() => setOpenId(openId === faq.id ? null : faq.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
