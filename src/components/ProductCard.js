'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation';
import { ShoppingCart, ArrowRight } from 'lucide-react';

export default function ProductCard({ product }) {
    const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
    const { addToCart } = useCart();
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);

    const handleAction = (action) => {
        if (isProcessing) return;
        setIsProcessing(true);
        action();
        setTimeout(() => setIsProcessing(false), 1000);
    };

    const handleBuyNow = (e) => {
        e.preventDefault();
        e.stopPropagation();
        handleAction(() => {
            addToCart(product, selectedVariant);
            router.push('/checkout');
        });
    };

    return (
        <div className="group relative flex flex-col bg-white border border-gray-200 rounded-2xl sm:rounded-[2rem] p-1.5 sm:p-3 transition-all duration-500 hover:shadow-2xl hover:shadow-gray-200/50">
            {/* Image Section */}
            <Link
                href={`/product/${product._id}`}
                className="block relative w-full aspect-square bg-gray-50 rounded-xl sm:rounded-[1.5rem] overflow-hidden mb-4 group-hover:scale-[0.98] transition-transform duration-500 cursor-pointer"
            >
                <Image
                    src={(selectedVariant.images && selectedVariant.images[0]) || (product.variants[0].images && product.variants[0].images[0]) || '/placeholder.png'}
                    alt={`${product.name} - ${selectedVariant.name}`}
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    priority
                />
                
                {/* Variant Swipe Overlay - Shows Pack Sizes */}
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black/40 to-transparent flex justify-center gap-2">
                  {product.variants.map((v) => (
                    <button 
                      key={v.name}
                      onClick={(e) => { e.preventDefault(); setSelectedVariant(v); }}
                      className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${selectedVariant.name === v.name ? 'bg-white w-4' : 'bg-white/60 hover:bg-white'}`}
                      title={v.weight}
                    />
                  ))}
                </div>
            </Link>

            {/* Content Section */}
            <div className="space-y-2.5 px-2 pb-1">
                <div className="flex justify-between items-start gap-2">
                    <div className="flex-1 min-w-0">
                        <Link href={`/product/${product._id}`} className="cursor-pointer">
                            <h3 className="text-base font-black text-gray-900 group-hover:text-orange-600 transition-colors truncate uppercase tracking-tight">
                                {product.name}
                            </h3>
                        </Link>
                    </div>
                    <div className="text-right shrink-0">
                        {selectedVariant.discountPrice ? (
                            <div className="flex flex-col items-end">
                                <span className="text-base font-black text-orange-600 tracking-tight leading-none">₹{selectedVariant.discountPrice}</span>
                                <span className="text-[9px] font-bold text-gray-300 line-through tracking-tighter">₹{selectedVariant.price}</span>
                            </div>
                        ) : (
                            <p className="text-base font-black text-gray-900 tracking-tight leading-none">
                                ₹{selectedVariant.price}
                            </p>
                        )}
                    </div>
                </div>

                {/* Metadata Stack - Clean Rows */}
                <div className="space-y-0.5">
                    <p className="text-[9px] font-bold text-orange-600 uppercase tracking-widest">{product.type}</p>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.15em] leading-none">
                        {Array.from(new Set(product.variants.map(v => v.weight))).join(' | ')}
                    </p>
                </div>

                {/* Features Row - Compact */}
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {product.features?.slice(0, 2).map((f) => (
                    <span key={f} className="text-[8px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100">{f}</span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-2">
                    <button
                        onClick={handleBuyNow}
                        disabled={isProcessing}
                        className={`w-full sm:flex-1 bg-black text-white text-[10px] font-bold uppercase tracking-widest py-3.5 rounded-xl hover:bg-orange-600 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        {isProcessing ? 'Processing' : 'Buy Now'}
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            handleAction(() => addToCart(product, selectedVariant));
                        }}
                        disabled={isProcessing}
                        className={`w-full sm:w-auto px-4 py-3 bg-white text-gray-900 border border-gray-200 rounded-xl hover:border-orange-500 hover:text-orange-600 transition-all active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
                        title="Add to Cart"
                    >
                        <ShoppingCart size={16} className={isProcessing ? 'animate-spin' : ''} />
                        <span className="text-[9px] font-black uppercase tracking-widest">Add to Bag</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
