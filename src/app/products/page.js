'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { ShoppingBag, Loader2, SearchX } from 'lucide-react';

function ProductsContent() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();
    const query = searchParams.get('q');

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const res = await fetch('/api/products');
                const json = await res.json();
                if (json.success) {
                    setProducts(json.data);
                }
            } catch (error) {
                console.error('Failed to fetch products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = query 
        ? products.filter(p => 
            p.name.toLowerCase().includes(query.toLowerCase()) || 
            p.type.toLowerCase().includes(query.toLowerCase())
          )
        : products;

    return (
        <div className="bg-white min-h-screen font-sans selection:bg-orange-100 selection:text-orange-900">
            <Navbar />

            <main className="max-w-[1550px] mx-auto pt-36 pb-16 px-2 sm:px-6 lg:px-8">
                
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 uppercase tracking-tight leading-none">
                        Our Products
                    </h1>
                    <div className="flex justify-center mt-6">
                        <div className="h-1 w-20 bg-orange-500 rounded-full" />
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-2 gap-2 md:gap-10 lg:grid-cols-3">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="flex flex-col animate-pulse">
                                <div className="w-full aspect-square border border-gray-200 rounded-2xl mb-4" />
                                <div className="space-y-2 px-1">
                                    <div className="h-4 w-3/4 border border-gray-200 rounded-md" />
                                    <div className="h-3 w-1/2 border border-gray-200/60 rounded-md" />
                                    <div className="h-8 w-full border border-gray-200 rounded-xl mt-3" />
                                </div>
                            </div>
                        ))}
                   </div>
                ) : (
                    <>
                        <div className="grid grid-cols-2 gap-2 md:gap-10 lg:grid-cols-3">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>

                        {filteredProducts.length === 0 && (
                            <div className="py-32 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200 mt-8">
                                <SearchX size={48} className="mx-auto mb-4 text-gray-300" />
                                <h3 className="text-lg font-bold text-gray-900 mb-1">
                                    {query ? "No items found" : "Coming Soon"}
                                </h3>
                                <p className="text-xs text-gray-500 font-medium max-w-xs mx-auto">
                                    {query ? "Try searching for a different keyword like 'Almonds' or 'Cashews'." : "Our collection is currently being curated. Check back soon for fresh batches."}
                                </p>
                            </div>
                        )}
                    </>
                )}

            </main>

            <Footer />
        </div>
    );
}

export default function ProductsPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="animate-spin text-orange-600" size={32} />
            </div>
        }>
            <ProductsContent />
        </Suspense>
    );
}
