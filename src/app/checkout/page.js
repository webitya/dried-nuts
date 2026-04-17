'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { CreditCard, Banknote } from 'lucide-react';

export default function CheckoutPage() {
    const { cart, clearCart } = useCart();
    const { user } = useAuth();
    const router = useRouter();
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        landmark: '',
        city: '',
        zip: '',
        paymentMethod: 'ONLINE'
    });

    // 1. Load initial data (User Profile > LocalStorage > Default)
    useEffect(() => {
        const savedData = localStorage.getItem('fusion_nuts_checkout_details');
        let initialData = {};

        if (savedData) {
            try {
                initialData = JSON.parse(savedData);
            } catch (e) {
                console.error('Failed to parse cached checkout data');
            }
        }

        setFormData(prev => ({
            ...prev,
            ...initialData,
            // Always prioritize active session data if available
            name: user?.name || initialData.name || '',
            email: user?.email || initialData.email || '',
            phone: user?.phone || initialData.phone || '',
        }));
    }, [user]);

    const subtotal = cart.reduce((total, item) => {
        const activePrice = item.variant.discountPrice || item.variant.price;
        return total + activePrice * item.quantity;
    }, 0);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedData = { ...formData, [name]: value };
        setFormData(updatedData);

        // Save to browser cache for easy re-filling (excluding payment method/sensitive info)
        const cacheData = { ...updatedData };
        delete cacheData.paymentMethod;
        localStorage.setItem('fusion_nuts_checkout_details', JSON.stringify(cacheData));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        const orderData = {
            customerDetails: formData,
            items: cart.map(item => {
                const activePrice = item.variant.discountPrice || item.variant.price;
                return {
                    productId: item._id,
                    name: item.name,
                    quantity: item.quantity,
                    price: activePrice,
                    variantName: item.variant.name,
                    image: (item.variant.images && item.variant.images[0]) || (item.images && item.images[0]) || '/placeholder.png'
                };
            }),
            totalAmount: subtotal,
            paymentMethod: formData.paymentMethod
        };

        try {
            if (formData.paymentMethod === 'ONLINE') {
                // Create Razorpay order
                const res = await fetch('/api/payment/initiate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(orderData),
                });

                const data = await res.json();

                if (data.success) {
                    // Initialize Razorpay Checkout
                    const options = {
                        key: data.keyId,
                        amount: data.amount,
                        currency: data.currency,
                        name: 'Fusion of Dried Nuts',
                        description: 'Order Payment',
                        order_id: data.orderId,
                        handler: async function (response) {
                            // Payment successful, verify on backend
                            try {
                                await fetch('/api/payment/callback', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                        razorpay_order_id: response.razorpay_order_id,
                                        razorpay_payment_id: response.razorpay_payment_id,
                                        razorpay_signature: response.razorpay_signature,
                                        transactionId: data.transactionId,
                                    }),
                                });
                                clearCart();
                            } catch (error) {
                                console.error('Verification error:', error);
                            }

                            // Always redirect to status page
                            router.push(`/payment/status?id=${data.transactionId}`);
                        },
                        prefill: {
                            name: formData.name,
                            email: formData.email,
                            contact: formData.phone
                        },
                        theme: {
                            color: '#ea580c'
                        },
                        modal: {
                            ondismiss: function () {
                                setSaving(false);
                            }
                        }
                    };

                    const razorpayInstance = new window.Razorpay(options);
                    razorpayInstance.open();
                } else {
                    alert('Payment initiation failed: ' + (data.error || 'Unknown error'));
                    setSaving(false);
                }
            } else {
                // COD Flow
                const res = await fetch('/api/orders', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(orderData),
                });

                const data = await res.json();
                if (data.success) {
                    clearCart();
                    // Redirect to track-order for guest/unauthenticated users, otherwise to /orders
                    if (!user) {
                        router.push(`/track-order?id=${data.data._id}`);
                    } else {
                        router.push('/orders');
                    }
                } else {
                    alert('Checkout failed: ' + data.error);
                }
                setSaving(false);
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert('An error occurred during checkout.');
            setSaving(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="bg-white dark:bg-black min-h-screen">
                <Navbar />
                <main className="max-w-7xl mx-auto py-24 px-4 text-center">
                    <h1 className="text-4xl font-bold mb-4 uppercase">Your bag is empty</h1>
                    <p className="mb-8 text-gray-500 font-light">Add items to your collection to proceed.</p>
                    <button onClick={() => router.push('/products')} className="bg-black text-white px-10 py-4 rounded-2xl font-bold uppercase tracking-widest cursor-pointer hover:bg-gray-800 transition-all">Explore Shop</button>
                </main>
                <Footer />
            </div>
        )
    }

    return (
        <div className="bg-white dark:bg-black min-h-screen">
            <Script 
                src="https://checkout.razorpay.com/v1/checkout.js" 
                strategy="lazyOnload" 
            />
            <Navbar />

            <main className="max-w-7xl mx-auto pt-36 sm:pt-40 pb-16 px-4 sm:px-6 lg:px-8">
                <h1 className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8 uppercase tracking-tight">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-x-8">
                    <div className="lg:col-span-7 bg-gray-50 dark:bg-zinc-900 p-4 sm:p-5 rounded-lg border border-gray-100 dark:border-gray-800 order-2 lg:order-1">
                        <h2 className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider">Shipping</h2>
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <div className="space-y-3">
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 gap-4">
                                        <div>
                                            <label htmlFor="name" className="block text-[10px] font-medium text-gray-400 mb-1 uppercase tracking-widest">Full Name</label>
                                            <input
                                                required
                                                type="text"
                                                name="name"
                                                id="name"
                                                autoComplete="shipping name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all shadow-sm"
                                                placeholder="Enter your full name"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div>
                                            <label htmlFor="email" className="block text-[10px] font-medium text-gray-400 mb-1 uppercase tracking-widest">Email Address</label>
                                            <input
                                                required
                                                type="email"
                                                name="email"
                                                id="email"
                                                autoComplete="shipping email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all shadow-sm"
                                                placeholder="Enter your email address"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="phone" className="block text-[10px] font-medium text-gray-400 mb-1 uppercase tracking-widest">Phone Number</label>
                                            <input
                                                required
                                                type="tel"
                                                name="phone"
                                                id="phone"
                                                autoComplete="shipping tel"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all shadow-sm"
                                                placeholder="Enter your phone number"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="address" className="block text-[10px] font-medium text-gray-400 mb-1 uppercase tracking-widest">Delivery Address</label>
                                        <input
                                            required
                                            type="text"
                                            name="address"
                                            id="address"
                                            autoComplete="shipping street-address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            className="w-full bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm outline-none focus:border-black dark:focus:border-white transition-all shadow-sm"
                                            placeholder="Enter your delivery address"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                        <div className="sm:col-span-2">
                                            <label htmlFor="landmark" className="block text-[10px] font-medium text-gray-400 mb-1 uppercase tracking-widest">Landmark (Optional)</label>
                                            <input
                                                type="text"
                                                name="landmark"
                                                id="landmark"
                                                value={formData.landmark}
                                                onChange={handleChange}
                                                className="w-full bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all shadow-sm"
                                                placeholder="Enter a nearby landmark"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="zip" className="block text-[10px] font-medium text-gray-400 mb-1 uppercase tracking-widest">Postal Code</label>
                                            <input
                                                required
                                                type="text"
                                                name="zip"
                                                id="zip"
                                                autoComplete="shipping postal-code"
                                                value={formData.zip}
                                                onChange={handleChange}
                                                className="w-full bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all shadow-sm"
                                                placeholder="Enter 6-digit PIN code"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="city" className="block text-[10px] font-medium text-gray-400 mb-1 uppercase tracking-widest">City</label>
                                        <input
                                            required
                                            type="text"
                                            name="city"
                                            id="city"
                                            autoComplete="shipping address-level2"
                                            value={formData.city}
                                            onChange={handleChange}
                                            className="w-full bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm outline-none focus:border-black dark:focus:border-white transition-all shadow-sm"
                                            placeholder="Enter your city"
                                        />
                                    </div>
                                </div>
                                <div className="pt-2">
                                    <label className="block text-[10px] font-medium text-gray-500 mb-2">Payment Method</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, paymentMethod: 'ONLINE' })}
                                            className={`flex items-center justify-center space-x-3 py-3 px-4 rounded-xl border transition-all text-xs font-bold ${formData.paymentMethod === 'ONLINE' ? 'border-orange-600 bg-orange-600 text-white shadow-lg' : 'border-gray-200 bg-white text-gray-600 hover:border-orange-200'}`}
                                        >
                                            <div className="flex gap-1">
                                                {['/p1.png', '/p2.png', '/p3.png'].map((img, i) => (
                                                    <div key={i} className="h-5 w-5 rounded-full border border-white/20 overflow-hidden bg-white ring-2 ring-transparent">
                                                        <img src={img} className="w-full h-full object-contain p-0.5" alt="Payment" />
                                                    </div>
                                                ))}
                                            </div>
                                            <span>ONLINE PAY</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, paymentMethod: 'COD' })}
                                            className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-xl border transition-all text-xs font-bold ${formData.paymentMethod === 'COD' ? 'border-orange-600 bg-orange-600 text-white shadow-lg' : 'border-gray-200 bg-white text-gray-600 hover:border-orange-200'}`}
                                        >
                                            <Banknote size={14} />
                                            <span>CASH (COD)</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5 border-t border-gray-100 dark:border-gray-800 pt-4">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="w-full bg-orange-600 text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center justify-center shadow-xl shadow-orange-600/20"
                                >
                                    {saving ? (
                                        <>
                                            <span className="animate-spin rounded-full h-3 w-3 border-t-2 border-white mr-2"></span>
                                            Processing...
                                        </>
                                    ) : (
                                        `Place Order (₹${subtotal.toLocaleString()})`
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="lg:col-span-5 order-1 lg:order-2">
                        <h2 className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider">Summary</h2>
                        <div className="bg-gray-50 dark:bg-zinc-900 rounded-lg p-4 sm:p-5 border border-gray-100 dark:border-gray-800 space-y-4">
                            <ul className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                {cart.map((item, index) => {
                                    const activePrice = item.variant.discountPrice || item.variant.price;
                                    return (
                                        <li key={index} className="flex justify-between items-center">
                                            <div className="flex items-center space-x-3">
                                                <div className="h-14 w-12 bg-white rounded-lg overflow-hidden border border-gray-100 relative shrink-0">
                                                    <img src={(item.variant.images && item.variant.images[0]) || (item.images && item.images[0]) || '/placeholder.png'} alt={item.name} className="object-cover w-full h-full" />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-xs font-bold text-gray-900 dark:text-white truncate">{item.name}</p>
                                                    <p className="text-[10px] text-gray-400">Variant: {item.variant.name} • Qty: {item.quantity}</p>
                                                </div>
                                            </div>
                                            <span className="text-xs font-bold text-gray-900 dark:text-white">₹{(activePrice * item.quantity).toLocaleString()}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                            <div className="border-t border-gray-100 dark:border-gray-800 pt-4 flex justify-between items-center font-bold text-gray-900 dark:text-white text-base">
                                <span className="uppercase text-xs tracking-wider text-gray-400">Total Amount</span>
                                <span>₹{subtotal.toLocaleString()}</span>
                            </div>
                            <div className="pt-2 flex items-center space-x-2 text-[10px] text-gray-400">
                                <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                                <span>Secure Checkout & Verified Delivery</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
