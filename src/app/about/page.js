'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { Leaf, Heart, Award, ArrowRight, Star, ShieldCheck, Target, Coffee, Utensils, History, MapPin, Users, Sparkles } from 'lucide-react';

export default function About() {
  return (
    <div className="bg-white min-h-screen font-sans selection:bg-orange-100 selection:text-orange-900">
      <Navbar />

      <main>
        {/* Simple Hero Section */}
        <section className="relative pt-32 pb-12 px-4 border-b border-gray-50">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-none">
              Premium Nuts, <br />
              <span className="text-orange-600 italic font-medium">Modern Standards.</span>
            </h1>
            <p className="text-sm md:text-base text-gray-500 font-medium max-w-xl mx-auto leading-relaxed">
              We are on a mission to deliver the finest natural produce and premium nuts, curated for a healthier lifestyle.
            </p>
          </div>
        </section>

        {/* Dense Story Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div className="space-y-1">
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight uppercase">Our Heritage</h2>
                <p className="text-xs text-orange-600 font-bold uppercase tracking-[0.2em]">The Legacy of Home</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-600 text-xs md:text-sm font-medium leading-relaxed">
                <div className="space-y-4">
                  <p className="text-gray-900 font-bold">
                    Fusion of Dried Nuts was born from a simple longing — the taste of pure, healthy bites that no supermarket shelf could replicate.
                  </p>
                  <p>
                    Started with a passion for health, our journey began with a focus on sourcing the finest nuts and traditional ingredients. We realized that the "soul" of authentic quality was being lost in mass production.
                  </p>
                </div>
                <div className="space-y-4">
                  <p>
                    We chose to go back to the basics: sourcing directly from farms, air-drying naturally, and preserving without chemicals. Our founders personally verify every batch of almonds, cashews, and dry fruits.
                  </p>
                  <p>
                    Every premium nut, dried fruit, and healthy bite we ship is a testament to this uncompromising standard of purity and quality.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-50">
                {[
                  { icon: Target, title: 'Our Mission', sub: 'Purity over profit' },
                  { icon: Utensils, title: 'The Process', sub: 'Traditional craft' },
                  { icon: Coffee, title: 'The Secret', sub: 'Grandma\'s recipes' },
                ].map(({ icon: Icon, title, sub }) => (
                  <div key={title} className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl flex-1 min-w-[150px]">
                    <Icon size={18} className="text-orange-600 flex-shrink-0" />
                    <div>
                      <h3 className="text-[10px] font-bold uppercase text-gray-900 tracking-wider whitespace-nowrap">{title}</h3>
                      <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Compact Image Card */}
            <div className="relative h-[300px] lg:h-[450px] w-full rounded-2xl overflow-hidden shadow-xl shadow-gray-100 border border-gray-100">
              <Image
                src="/hero-collection.png"
                alt="Our Tradition"
                fill
                className="object-cover transition-transform duration-1000 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-6 right-6">
                <h4 className="text-white text-xs font-bold italic mb-1">Guaranteed Authenticity</h4>
                <p className="text-white/70 text-[10px] uppercase tracking-widest font-bold">From our heart to your home.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Simpler CTA */}
        <section className="py-16 px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight italic">
              Taste the True India.
            </h2>
            <button
              onClick={() => window.location.href = '/products'}
              className="inline-flex items-center gap-2 bg-gray-900 hover:bg-orange-600 text-white px-8 py-3.5 uppercase tracking-widest text-[9px] font-bold rounded-xl transition-all shadow-lg shadow-gray-200"
            >
              Start Shopping
              <ArrowRight size={14} />
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
