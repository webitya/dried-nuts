'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const carouselItems = [
  {
    id: 1,
    image: "/premium_harvest_hero.png",
  },
  {
    id: 2,
    image: "/premium_harvest_hero.png",
  },
  {
    id: 3,
    image: "/premium_harvest_hero.png",
  }
];

export default function HomeCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative w-full h-[220px] md:h-[500px] overflow-hidden bg-gray-50 mt-[128px] md:mt-[88px]">
      {/* Slides Container */}
      <div 
        className="flex transition-transform duration-1000 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {carouselItems.map((item) => (
          <div
            key={item.id}
            className="relative w-full h-full flex-shrink-0"
          >
            <Image
              src={item.image}
              alt="Premium Collection"
              fill
              priority
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="absolute inset-0 flex items-center justify-between px-4 md:px-10 z-20 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={prevSlide}
          className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-black/10 text-white hover:bg-black/30 transition-all backdrop-blur-sm pointer-events-auto"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-black/10 text-white hover:bg-black/30 transition-all backdrop-blur-sm pointer-events-auto"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1 transition-all duration-700 ${
              index === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
