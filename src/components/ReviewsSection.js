'use client';

import { Star, Check, User, ShieldCheck, Leaf, Truck, Heart } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    name: "Anita Verma",
    location: "Lucknow",
    rating: 5,
    text: "The dry fruits tasted exactly like the finest quality! Perfectly fresh with just the right balance of flavours.",
    date: "April 2026",
    verified: true
  },
  {
    id: 2,
    name: "Rajan Sharma",
    location: "Patna",
    rating: 5,
    text: "Ordered for Diwali gifting and the whole family loved it. The quality was exceptional — perfectly fresh.",
    date: "March 2026",
    verified: true
  },
  {
    id: 3,
    name: "Sunita Mishra",
    location: "Varanasi",
    rating: 5,
    text: "The cashews are absolutely premium! Buttery, fresh, and packed so well. Impressive quality.",
    date: "April 2026",
    verified: true
  },
  {
    id: 4,
    name: "Priya Singh",
    location: "Mumbai",
    rating: 5,
    text: "Superb quality wallnuts. Very crunchy and fresh. Fast delivery within Mumbai area.",
    date: "April 2026",
    verified: true
  },
  {
    id: 5,
    name: "Vikram Raj",
    location: "Bangalore",
    rating: 5,
    text: "Best almonds I have ordered online. They are large and very flavorful. Worth the price.",
    date: "March 2026",
    verified: true
  },
  {
    id: 6,
    name: "Rohan Gupta",
    location: "Delhi",
    rating: 5,
    text: "Great variety of trail mixes. Healthy and tasty snack for work. Highly recommended.",
    date: "April 2026",
    verified: true
  },
  {
    id: 7,
    name: "Sonia Das",
    location: "Kolkata",
    rating: 5,
    text: "Authentic taste of Kashmiri apricots. Very soft and naturally sweet. Premium packaging.",
    date: "Feb 2026",
    verified: true
  },
  {
    id: 8,
    name: "Amit Patel",
    location: "Ahmedabad",
    rating: 5,
    text: "Consistency in quality is what I like about Fusion Nuts. Every batch is top notch.",
    date: "April 2026",
    verified: true
  }
];

function ReviewCard({ review }) {
  return (
    <div className="bg-white p-6 rounded-[2rem] border border-gray-50 shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2 flex flex-col h-full relative group overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-orange-50/50 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700" />
      
      <div className="flex gap-1 mb-4 relative z-10">
        {[...Array(review.rating)].map((_, i) => (
          <Star key={i} size={12} className="fill-orange-600 text-transparent" />
        ))}
      </div>

      <p className="text-gray-700 text-[13px] leading-relaxed mb-6 flex-grow font-medium italic relative z-10">
        "{review.text}"
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-gray-50 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-orange-500 group-hover:text-white transition-all duration-500 rotate-3 group-hover:rotate-0 shadow-inner">
            <User size={18} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="text-[12px] font-bold text-gray-900 tracking-tight">{review.name}</h4>
              {review.verified && (
                <div className="flex items-center justify-center w-3 h-3 rounded-full bg-green-100 text-green-600">
                  <Check size={8} strokeWidth={4} />
                </div>
              )}
            </div>
            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">{review.location} · {review.date}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <section className="py-20 bg-[#F8FAFC] overflow-hidden border-y border-gray-100">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Trusted by <span className="text-orange-600">Health Lovers.</span>
          </h2>
          <div className="flex items-center justify-center gap-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={10} className="fill-gray-200 text-transparent" />
              ))}
            </div>
            <span>1200+ Verified Reviews</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {REVIEWS.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

      </div>
    </section>
  );
}
