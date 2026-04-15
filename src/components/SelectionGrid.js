'use client';

import { ArrowRight, Leaf, Sparkles, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function SelectionGrid() {
  const selections = [
    {
      title: 'Premium Almonds',
      subtitle: 'King of Kernels',
      image: '/nuts-collection.png',
      color: 'bg-orange-50',
      tag: 'Kashmiri'
    },
    {
      title: 'Exotic Cashews',
      subtitle: 'Buttery Soft',
      image: '/hero-collection.png',
      color: 'bg-blue-50',
      tag: 'Mangalore'
    },
    {
      title: 'Luxury Pistachios',
      subtitle: 'Nutrient Rich',
      image: '/nuts-collection.png',
      color: 'bg-green-50',
      tag: 'Iranian'
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <p className="text-orange-600 text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
              <Sparkles size={14} />
              The Signature Selection
            </p>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight leading-tight mb-6">
              Curated for the <br />
              <span className="text-orange-600">Extraordinary.</span>
            </h2>
          </div>
          <p className="text-gray-500 font-medium text-sm md:text-lg max-w-sm leading-relaxed border-l-4 border-orange-100 pl-6">
            We don't just source nuts; we curate experiences. Each batch is hand-sorted for quality, crunch, and vitality.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {selections.map((sel, i) => (
            <div key={i} className="group relative">
              <div className={`aspect-[4/5] rounded-[2rem] overflow-hidden relative mb-6 transition-all duration-700 shadow-2xl shadow-gray-200/50`}>
                <Image 
                  src={sel.image}
                  alt={sel.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay Tag */}
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-gray-900 shadow-xl">
                  {sel.tag}
                </div>

                {/* Hover Details */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <Link 
                    href="/products"
                    className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-orange-600 transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-100 shadow-2xl"
                  >
                    <ArrowRight size={20} />
                  </Link>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">{sel.subtitle}</span>
                <h3 className="text-xl font-bold text-gray-900 tracking-tight">{sel.title}</h3>
                <Link href="/products" className="text-[10px] font-bold text-gray-400 border-b border-transparent hover:border-orange-600 hover:text-orange-600 transition-all py-1 inline-block uppercase tracking-wider">
                  View Collection
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
