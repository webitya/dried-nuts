'use client';

import Image from 'next/image';
import Link from 'next/link';

const categories = [
  { name: '', image: '/categoryicons/1.jpeg', href: '/products' },
  { name: '', image: '/categoryicons/2.jpeg', href: '/products' },
  { name: '', image: '/categoryicons/3.jpeg', href: '/products' },
  { name: '', image: '/categoryicons/4.jpeg', href: '/products' },
  { name: '', image: '/categoryicons/5.jpeg', href: '/products' },
  { name: '', image: '/categoryicons/6.jpeg', href: '/products' },
  { name: '', image: '/categoryicons/7.jpeg', href: '/products' },
  { name: '', image: '/categoryicons/8.jpeg', href: '/products' },
  { name: '', image: '/categoryicons/9.jpeg', href: '/products' }
];

// Double the categories for seamless loop
const infiniteCategories = [...categories, ...categories];

export default function CircleCategories() {
  return (
    <section className="pb-12 bg-white overflow-hidden">
      {/* Infinite Scroll Container */}
      <div className="relative">
        {/* Left & Right Gradients for Fade Effect */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

        <div className="flex animate-infinite-scroll hover:[animation-play-state:paused] w-max gap-12 py-4">
          {infiniteCategories.map((cat, idx) => (
            <Link 
              key={idx} 
              href={cat.href}
              className="flex flex-col items-center group"
            >
              <div className="relative w-32 h-32 md:w-36 md:h-36 p-1.5 rounded-full border-2 border-transparent group-hover:border-orange-500 transition-all duration-700">
                <div className="relative w-full h-full circle-mask shadow-xl group-hover:shadow-orange-200 transition-all duration-700 bg-gray-50">
                  <Image 
                    src={cat.image} 
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-transparent group-hover:bg-orange-500/10 transition-colors duration-500" />
                </div>
              </div>
              <span className="mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 group-hover:text-orange-600 transition-colors duration-300">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
