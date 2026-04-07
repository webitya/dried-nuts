'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PremiumHero from '@/components/PremiumHero';
import SelectionGrid from '@/components/SelectionGrid';
import PurityStory from '@/components/PurityStory';
import ProductCard from '@/components/ProductCard';
import ReviewsSection from '@/components/ReviewsSection';
import FaqsSection from '@/components/FaqsSection';
import { ArrowRight, MoveRight, ShoppingBag, Leaf, Flame, ShieldCheck, Truck, Sparkles } from 'lucide-react';

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
      
      {/* 1. Cinematic Hero Section */}
      <PremiumHero />

      {/* 2. Curated Selection Grid */}
      <SelectionGrid />

      {/* 3. Path to Purity Section (Industrial Dark) */}
      <PurityStory />

      {/* 4. Luxury Bestsellers Showcase */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <p className="text-orange-600 text-[10px] font-black uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                <Sparkles size={14} />
                Fresh Stock Arrivals
              </p>
              <h2 className="text-4xl sm:text-6xl font-black text-gray-900 tracking-tighter leading-none mb-6">
                The Curated <br />
                <span className="text-orange-600 italic font-medium">Bestsellers.</span>
              </h2>
            </div>
            
            <a
              href="/products"
              className="group inline-flex items-center gap-4 text-xs font-black text-gray-900 border-2 border-black px-8 py-4 rounded-full hover:bg-black hover:text-white transition-all uppercase tracking-widest"
            >
              Discover All
              <MoveRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </a>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="flex flex-col animate-pulse rounded-[2.5rem] p-3 border border-gray-100 bg-gray-50/50">
                  <div className="w-full aspect-square bg-white rounded-[2rem] mb-4" />
                  <div className="space-y-2 px-4">
                    <div className="h-2 w-16 bg-white rounded-full" />
                    <div className="h-4 w-full bg-white rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          {!loading && featuredProducts.length === 0 && (
            <div className="text-center py-24 bg-gray-50 rounded-[4rem] border-2 border-dashed border-gray-100">
              <ShoppingBag size={64} className="mx-auto mb-6 text-gray-200" />
              <h3 className="text-xl font-black text-gray-900 uppercase tracking-widest mb-2">Restocking Perfection</h3>
              <p className="text-sm text-gray-500 font-medium">Fresh batches are being cured as we speak.</p>
            </div>
          )}
        </div>
      </section>

      {/* 5. Luxury Proof Section */}
      <div className="bg-[#FAF9F6]">
        <ReviewsSection />
      </div>
      
      {/* 6. Knowledge Hub (FAQs) */}
      <div className="bg-white">
        <FaqsSection />
      </div>

      <Footer />
    </div>
  );
}
