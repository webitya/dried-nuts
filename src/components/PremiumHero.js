'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MoveRight, Sparkles, Star } from 'lucide-react';

export default function PremiumHero() {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      subtitle: 'Premium Collection 2024',
      title: 'Artisanal Nuts & \nCurated Dried Fruits',
      desc: 'Sourced from the heart of Kashmir and the finest global orchards, delivered to your doorstep with uncompromising purity.',
      image: '/hero-collection.png',
      tag: 'Limited Selection'
    },
    {
      subtitle: 'Naturally Sourced',
      title: 'Pure Wellness In \nEvery Single Bite',
      desc: 'We believe health is a luxury. Our vacuum-packed selections ensure the crunch and nutrients remain exactly as nature intended.',
      image: '/nuts-collection.png',
      tag: 'Best Quality'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[90vh] md:h-[100vh] overflow-hidden bg-[#1A110B]">
      {/* Background Layer */}
      {slides.map((slide, i) => (
        <div 
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === activeSlide ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10" />
          <Image 
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover scale-105 animate-ken-burns"
            priority
          />
        </div>
      ))}

      {/* Content Layer */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-4 flex flex-col justify-center">
        <div className="max-w-3xl space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-600/10 border border-orange-600/20 text-orange-500 text-[10px] font-black uppercase tracking-[0.2em] animate-fade-in">
            <Sparkles size={12} />
            {slides[activeSlide].subtitle}
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl md:text-8xl font-black text-white leading-tight tracking-tighter mix-blend-difference">
              {slides[activeSlide].title.split('\n').map((line, idx) => (
                <div key={idx} className="text-reveal">
                  <span style={{ animationDelay: `${idx * 0.2}s` }}>{line}</span>
                </div>
              ))}
            </h1>
            <p className="text-gray-400 text-sm md:text-xl font-medium leading-relaxed max-w-xl animate-fade-in delay-500">
              {slides[activeSlide].desc}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-4 animate-fade-in delay-700">
            <Link 
              href="/products"
              className="px-8 py-5 bg-orange-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-full hover:bg-orange-500 transition-all flex items-center gap-3 group shadow-2xl shadow-orange-600/20"
            >
              Shop Collection
              <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </Link>
            
            <Link 
              href="/about"
              className="px-8 py-5 border border-white/20 text-white font-black text-xs uppercase tracking-[0.2em] rounded-full hover:bg-white hover:text-black transition-all"
            >
              Our Story
            </Link>
          </div>

          {/* Social Proof Mini */}
          <div className="flex items-center gap-8 pt-12 animate-fade-in delay-1000 border-t border-white/10 max-w-lg">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-gray-800 overflow-hidden relative">
                  <div className="absolute inset-0 bg-orange-600/20" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-black bg-[#2D241E] flex items-center justify-center text-[10px] font-black text-orange-500">
                +5K
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1 text-orange-500 mb-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
              </div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Trusted by Health Enthusiasts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Slider Controls */}
      <div className="absolute bottom-12 right-12 z-20 flex gap-4">
        {slides.map((_, i) => (
          <button 
            key={i}
            onClick={() => setActiveSlide(i)}
            className={`h-1 transition-all duration-500 ${i === activeSlide ? 'w-12 bg-orange-600' : 'w-6 bg-white/20'}`}
          />
        ))}
      </div>

      {/* Decorative Gradient */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-orange-600/5 to-transparent pointer-events-none" />
    </section>
  );
}
