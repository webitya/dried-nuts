'use client';

import { useState, useEffect, use } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { 
    Leaf, 
    Clock, 
    ShieldCheck, 
    Info, 
    ChevronLeft, 
    ChevronRight, 
    ShoppingBag,
    Scale,
    Calendar,
    ListChecks,
    Sparkles
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function ProductPage({ params }) {
    const unwrappedParams = use(params);
    const { id } = unwrappedParams;
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [activeImage, setActiveImage] = useState('');
    const [gallery, setGallery] = useState([]);

    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/products`);
                const json = await res.json();
                if (json.success) {
                    const found = json.data.find(p => p._id === id);
                    if (found) {
                        setProduct(found);
                        setSelectedVariant(found.variants[0]);
                        setActiveImage(found.variants[0].images[0] || found.images[0] || '');
                        // Combine variant images and gallery images
                        const allImgs = [
                            ...found.variants.flatMap(v => v.images || []),
                            ...(found.images || [])
                        ].filter((v, i, a) => v && a.indexOf(v) === i); // Unique & valid images
                        setGallery(allImgs);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch product:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (isAdding) return;
        setIsAdding(true);
        addToCart(product, selectedVariant || product.variants[0]);
        setTimeout(() => setIsAdding(false), 1000);
    };

    if (loading) {
        return (
            <div className="bg-white min-h-screen flex flex-col pt-20">
                <Navbar />
                <div className="max-w-7xl mx-auto px-4 py-20 w-full animate-pulse">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-16">
                        <div className="aspect-square bg-gray-50 rounded-3xl" />
                        <div className="space-y-6 mt-10 lg:mt-0">
                            <div className="h-4 w-24 bg-gray-50 mb-4" />
                            <div className="h-10 w-3/4 bg-gray-50 mb-6" />
                            <div className="h-20 w-full bg-gray-50" />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (!product) return notFound();

    return (
        <div className="bg-white min-h-screen flex flex-col selection:bg-orange-100 selection:text-orange-900">
            <Navbar />

            <main className="flex-grow pt-36 md:pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumb / Category */}
                    <div className="flex items-center space-x-2 text-xs font-semibold text-gray-400 mb-4 border-b border-gray-50 pb-2">
                        <Link href="/" className="hover:text-black transition-colors">Home</Link>
                        <span>/</span>
                        <Link href="/products" className="hover:text-black transition-colors">Catalogue</Link>
                        <span>/</span>
                        <span className="text-orange-600">{product.type}</span>
                    </div>

                    <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 items-start">
                        
                        {/* LEFT: Cinematic Gallery */}
                        <div className="lg:col-span-5 space-y-4">
                            <div className="relative aspect-square bg-white border border-gray-100 rounded-[2rem] overflow-hidden group shadow-sm">
                                <Image
                                    src={activeImage || (selectedVariant && selectedVariant.images && selectedVariant.images[0]) || '/placeholder.png'}
                                    alt={product.name}
                                    fill
                                    className="object-cover transition-transform duration-700 hover:scale-105"
                                    priority
                                />
                            </div>

                            {/* Thumbnail Grid */}
                            <div className="flex space-x-2 overflow-x-auto pb-2 px-1 custom-scrollbar">
                                {gallery.map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveImage(img)}
                                        className={classNames(
                                            "relative h-14 w-14 lg:h-16 lg:w-16 shrink-0 rounded-xl overflow-hidden border-2 transition-all cursor-pointer",
                                            activeImage === img ? "border-orange-600 shadow-sm" : "border-transparent opacity-60 hover:opacity-100"
                                        )}
                                    >
                                        <Image src={img} alt={`Gallery ${i}`} fill className="object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT: Transactional Info */}
                        <div className="lg:col-span-7 mt-4 lg:mt-0 lg:sticky lg:top-32 space-y-3">
                            
                            {/* Header & Pricing */}
                            <div className="space-y-1">
                                <span className="text-[10px] font-bold text-orange-600 bg-orange-50/50 px-2 py-0.5 rounded-full inline-block">
                                    {product.type}
                                </span>
                                <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-gray-900 leading-none">
                                    {product.name}
                                </h1>
                                <div className="pt-1 flex items-baseline space-x-3">
                                    {selectedVariant?.discountPrice ? (
                                        <>
                                            <span className="text-2xl font-bold tracking-tight text-orange-600">₹{selectedVariant.discountPrice}</span>
                                            <span className="text-base font-medium tracking-tight text-gray-300 line-through">₹{selectedVariant.price}</span>
                                        </>
                                    ) : (
                                        <span className="text-2xl font-bold tracking-tight text-gray-900">₹{selectedVariant?.price || product.variants[0].price}</span>
                                    )}
                                    <span className="text-[9px] font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded">Incl. of tax</span>
                                </div>
                            </div>

                            {/* Quick Specs - Flex Style */}
                            <div className="flex items-center space-x-8 border-y border-gray-50 py-3">
                                <div className="flex items-center space-x-2.5 group">
                                    <div className="h-7 w-7 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-orange-50 group-hover:text-orange-600 transition-colors">
                                        <Scale size={14} strokeWidth={2.5} />
                                    </div>
                                    <div>
                                        <p className="text-[7px] font-bold text-gray-400 leading-none mb-0.5">Weight</p>
                                        <p className="text-[10px] font-bold text-gray-900">{selectedVariant?.weight || product.variants[0].weight}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Pack Size Selection */}
                            <div className="space-y-3">
                                <div className="flex justify-between items-center px-1">
                                    <h3 className="text-[9px] font-bold text-gray-400">Select Pack Size</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    {product.variants.map((v) => (
                                        <button
                                            key={v.name}
                                            onClick={() => {
                                                setSelectedVariant(v);
                                                setActiveImage(v.images?.[0] || '');
                                            }}
                                            className={classNames(
                                                "relative p-4 text-left border transition-all cursor-pointer rounded-none",
                                                selectedVariant?.name === v.name
                                                    ? "border-orange-500 bg-orange-50/40 ring-1 ring-orange-500 shadow-sm"
                                                    : "border-gray-200 hover:border-gray-300 bg-white"
                                            )}
                                        >
                                            <p className={classNames(
                                                "text-[10px] font-bold leading-none mb-1",
                                                selectedVariant?.name === v.name ? "text-orange-600" : "text-gray-900"
                                            )}>{v.name}</p>
                                            <p className="text-[9px] font-medium text-gray-400">{v.weight}</p>
                                            {selectedVariant?.name === v.name && (
                                                <div className="absolute top-3 right-3 h-1.5 w-1.5 rounded-full bg-orange-600 animate-pulse" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Description (Truncated) */}
                            <div className="space-y-1">
                                <h3 className="text-[9px] font-bold text-gray-400">The Tradition</h3>
                                <p className="text-xs text-gray-600 leading-relaxed font-medium">
                                    {product.description?.substring(0, 100)}
                                    {product.description?.length > 100 && '...'}
                                </p>
                            </div>

                            {/* CTAs remain here */}
                            <div className="space-y-4 pt-4">
                                {/* Add to Cart CTA */}
                                <div className="pt-0.5">
                                    <button
                                        type="button"
                                        disabled={isAdding}
                                        className={classNames(
                                            "w-full py-3.5 rounded-lg text-[10px] font-bold transition-all shadow-lg active:scale-[0.98] flex items-center justify-center cursor-pointer space-x-3",
                                            isAdding ? "bg-orange-600 text-white" : "bg-black text-white hover:bg-orange-600"
                                        )}
                                        onClick={handleAddToCart}
                                    >
                                        <ShoppingBag size={14} strokeWidth={2.5} className={isAdding ? "animate-bounce" : ""} />
                                        <span>{isAdding ? 'Success!' : 'Add to Bag'}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* NEW: Bottom Storytelling & Ingredients Section */}
                    <div className="mt-8 md:mt-[50px] grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 border-t border-gray-100 pt-10">
                        <div className="lg:col-span-12">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 border-l-4 border-orange-500 pl-4">The Pure Heritage</h2>
                        </div>
                        
                        <div className="lg:col-span-7 space-y-4">
                            <h3 className="text-xs font-semibold text-gray-400">Detailed Description</h3>
                            <div className="prose prose-sm prose-orange max-w-none">
                                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line font-medium italic">
                                    {product.description}
                                </p>
                            </div>

                            {/* Allergen Disclaimer */}
                            {product.allergenInfo && (
                                <div className="mt-8 p-4 bg-gray-50 border-l-4 border-gray-200">
                                    <div className="flex items-center space-x-2 text-gray-500 mb-1">
                                        <ShieldCheck size={14} />
                                        <span className="text-[10px] font-bold uppercase tracking-wider">Allergen Information</span>
                                    </div>
                                    <p className="text-[11px] text-gray-600 font-medium">
                                        {product.allergenInfo}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="lg:col-span-5">
                            {product.ingredients && product.ingredients.length > 0 && (
                                <div className="bg-gray-50/50 border border-gray-100 rounded-2xl p-6 sticky top-32">
                                    <div className="flex items-center space-x-2 text-orange-600 mb-4">
                                        <h3 className="text-base font-bold">Premium Highlights</h3>
                                    </div>
                                    <p className="text-[10px] text-gray-400 font-semibold mb-4">Uncompromising quality standards</p>
                                    <div className="flex flex-wrap gap-2">
                                        {product.ingredients.map((feature, i) => (
                                            <span key={i} className="text-[9px] font-bold bg-white text-gray-900 px-3 py-1.5 rounded-lg border border-gray-100 shadow-sm transition-transform hover:scale-105">
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
