'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomeCarousel from '@/components/HomeCarousel';
import CircleCategories from '@/components/CircleCategories';
import ProductCard from '@/components/ProductCard';
import ReviewsSection from '@/components/ReviewsSection';
import FaqsSection from '@/components/FaqsSection';
import Link from 'next/link';
import { ShoppingBag, MoveRight, Sparkles } from 'lucide-react';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch('/api/products');
        const json = await res.json();
        if (json.success) {
          setFeaturedProducts(json.data.slice(0, 8));
        }
      } catch (error) {
        console.error('Failed to fetch featured products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-orange-100 selection:text-orange-900 overflow-x-hidden">
      <Navbar />
      
      {/* 1. Full-Width Edge-to-Edge Carousel */}
      <HomeCarousel />
      
      {/* 2. Premium Category Circles */}
      <CircleCategories />

      {/* 4. Home Bestsellers Showcase with Creative Wave Separator */}
      <section className="bg-white pt-4 pb-24 relative overflow-visible">
        {/* Top Wave Divider */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] -translate-y-[99%]">
          <svg className="relative block w-[calc(100%+1.3px)] h-[60px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,73.84-4.36,147.54,16.88,218.2,35.26,69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" className="fill-orange-50"></path>
          </svg>
        </div>

        <div className="max-w-[1550px] mx-auto px-3 md:px-12 relative z-10">
          
          {/* Section Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 uppercase tracking-tight leading-none">
              Our Products
            </h2>
            <div className="flex justify-center mt-6">
              <div className="h-1 w-20 bg-orange-500 rounded-full" />
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 gap-4 md:gap-8 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex flex-col animate-pulse opacity-40">
                  <div className="w-full aspect-[4/5] border-2 border-gray-100 rounded-3xl mb-4" />
                  <div className="space-y-3 px-2">
                    <div className="h-4 w-full border border-gray-100 rounded-full" />
                    <div className="h-3 w-2/3 border border-gray-100/50 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 md:gap-10 lg:grid-cols-3">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          {!loading && featuredProducts.length === 0 && (
            <div className="text-center py-20 bg-gray-50/50 rounded-3xl border border-gray-100">
              <ShoppingBag size={48} className="mx-auto mb-6 text-gray-200" />
              <h3 className="text-xl font-bold text-gray-900 mb-2 uppercase tracking-tight">Fresh Harvest Coming Soon</h3>
              <p className="text-gray-500 max-w-sm mx-auto font-medium">We're currently curating our next batch of premium selections. Stay tuned.</p>
            </div>
          )}
        </div>

        {/* Bottom Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] translate-y-[99%]">
          <svg className="relative block w-[calc(100%+1.3px)] h-[60px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,73.84-4.36,147.54,16.88,218.2,35.26,69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" className="fill-orange-50 rotate-180"></path>
          </svg>
        </div>
      </section>

      {/* 6. Client Testimonials */}
      <ReviewsSection />
      
      {/* 7. FAQ Hub */}
      <FaqsSection />

      <Footer />
    </div>
  );
}
