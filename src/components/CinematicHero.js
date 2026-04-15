'use client';

import Image from 'next/image';

export default function CinematicHero() {
  return (
    <section className="relative w-full h-[300px] md:h-[500px] max-h-[220px] md:max-h-none bg-gray-50 overflow-hidden mt-[72px] md:mt-[88px]">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8">
        <div className="relative w-full h-full rounded-2xl md:rounded-[3rem] overflow-hidden shadow-2xl">
          <Image 
            src="/premium_harvest_hero.png" 
            alt="Premium Dried Nuts Collection" 
            fill 
            className="object-cover animate-ken-burns"
            priority
          />
          {/* Subtle overlay to give it a premium feel without blocking the view */}
          <div className="absolute inset-0 bg-black/5" />
        </div>
      </div>
    </section>
  );
}
