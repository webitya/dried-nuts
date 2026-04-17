'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Toast from '@/components/Toast';

import {
    ArrowLeft,
    Calendar,
    Package,
    Truck,
    ShoppingBag,
    CreditCard,
    MapPin,
    Copy,
    Check,
    ChevronRight,
    Mail,
    Box,
    CheckCircle2
} from 'lucide-react';

const BASE_STEPS = ['Processing', 'Order Confirmed', 'Shipped', 'Delivered'];
const RETURN_STEPS = ['Return/Replacement Initiated', 'Refund completed'];



const STATUS_PRIORITY = {
    'Pending': 0,
    'Processing': 1,
    'Order Confirmed': 2,
    'Shipped': 3,
    'Delivered': 4,
    'Return/Replacement Initiated': 5,
    'Refund completed': 6
};

const getStatusStyle = (status) => {
    switch (status) {
        case 'Delivered': return 'bg-green-50 text-green-700 border-green-100';
        case 'Refund completed': return 'bg-green-100 text-green-800 border-green-200';
        case 'Shipped': return 'bg-blue-50 text-blue-700 border-blue-100';
        case 'Order Confirmed': return 'bg-indigo-50 text-indigo-700 border-indigo-100';
        case 'Processing': return 'bg-purple-50 text-purple-700 border-purple-100';
        case 'Return/Replacement Initiated': return 'bg-orange-50 text-orange-700 border-orange-100';
        case 'Cancelled': return 'bg-red-50 text-red-700 border-red-100';
        default: return 'bg-yellow-50 text-yellow-700 border-yellow-100';
    }
};

export default function OrderDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [copiedField, setCopiedField] = useState(null);
    const [mounted, setMounted] = useState(false);
    const [showHelpDropdown, setShowHelpDropdown] = useState(false);
    const [toast, setToast] = useState({ message: '', isVisible: false });

    const showToast = (message) => {
        setToast({ message, isVisible: true });
    };


    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const fetchOrder = async () => {
            if (!params?.id) return;

            try {
                const res = await fetch(`/api/orders/${params.id}`);
                const json = await res.json();
                if (json.success) {
                    setOrder(json.data);
                } else {
                    console.error('Order fetch failed:', json.message);
                }
            } catch (error) {
                console.error('Failed to fetch order:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [params?.id]);

    const handleOrderAction = async (action) => {
        if (!window.confirm(`Are you sure you want to ${action === 'cancel' ? 'cancel' : 'initiate return for'} this order?`)) return;

        setLoading(true);
        try {
            const res = await fetch(`/api/orders/${params.id}/action`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action })
            });

            const json = await res.json();
            if (json.success) {
                setOrder(json.data);
                showToast(json.message || `Order successfully ${action === 'cancel' ? 'cancelled' : 'returned'}`);
                setShowHelpDropdown(false);
            } else {

                alert(json.message || `Failed to ${action} order`);
            }
        } catch (error) {
            console.error(`Order ${action} error:`, error);
            alert(`An error occurred while processing your request.`);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text, field) => {
        if (!text) return;
        if (typeof navigator !== 'undefined' && navigator.clipboard) {
            navigator.clipboard.writeText(String(text))
                .then(() => {
                    setCopiedField(field);
                    setTimeout(() => setCopiedField(null), 2000);
                })
                .catch(err => console.error('Failed to copy text: ', err));
        }
    };

    if (loading) {
        return (
            <div className="bg-white min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-8 w-8 border-2 border-black border-t-transparent animate-spin rounded-full"></div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 animate-pulse">Loading Details</p>
                </div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="bg-white min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-grow flex items-center justify-center p-4">
                    <div className="text-center max-w-md">
                        <Package className="h-10 w-10 text-gray-200 mx-auto mb-4" />
                        <h1 className="text-lg font-bold text-gray-900 uppercase mb-2">Order Not Found</h1>
                        <p className="text-xs text-gray-500 mb-6">We couldn't locate this order in our records.</p>
                        <Link href="/orders" className="bg-black text-white px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest">Return to Orders</Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    const currentStatus = order?.status || 'Pending';
    const orderId = order?._id ? String(order._id) : 'N/A';
    const isCancelled = currentStatus === 'Cancelled';

    return (
        <div className="bg-white min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow w-full max-w-5xl mx-auto pt-36 pb-12 px-4">
                {/* Compact Breadcrumb */}
                <div className="mb-6">
                    <Link href="/orders" className="inline-flex items-center text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
                        <ArrowLeft size={12} className="mr-2" /> Back to orders
                    </Link>
                </div>

                {/* Header Card */}
                <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 mb-6 shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10">
                        <div className="flex-grow min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex flex-wrap items-center gap-3">
                                    <h1 className="text-sm sm:text-lg md:text-xl font-bold text-gray-900 tracking-tight break-all line-clamp-1 group/id flex items-center gap-2">
                                        #{orderId.toUpperCase()}
                                        <button onClick={() => copyToClipboard(orderId, 'order_id')} className="p-1 hover:bg-gray-100 rounded transition-colors shrink-0">
                                            {copiedField === 'order_id' ? <Check size={12} className="text-green-500" /> : <Copy size={12} className="text-gray-400 opacity-0 group-hover/id:opacity-100" />}
                                        </button>
                                    </h1>
                                    <span className={`px-2 py-0.5 rounded-md text-[8px] sm:text-[9px] font-bold uppercase border whitespace-nowrap shrink-0 ${getStatusStyle(currentStatus)}`}>
                                        {currentStatus}
                                    </span>
                                </div>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap">
                                    <Calendar size={12} /> {mounted && order?.createdAt ? `Placed on ${new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}` : 'Loading date...'}
                                </p>
                            </div>
                        </div>

                        {/* Need Help Dropdown */}
                        <div className="relative shrink-0">
                            <button
                                onClick={() => setShowHelpDropdown(!showHelpDropdown)}
                                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-50 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all group cursor-pointer"
                            >
                                Need Help?
                                <ChevronRight size={14} className={`transition-transform duration-300 ${showHelpDropdown ? 'rotate-90' : ''}`} />
                            </button>

                            {showHelpDropdown && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setShowHelpDropdown(false)}></div>
                                    <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-xl shadow-xl z-20 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                        <div className="p-2 space-y-1">
                                            <a
                                                href={`mailto:fusionofdriednuts19pvtltd@gmail.com?subject=Help with Order #${orderId.toUpperCase()}`}
                                                className="flex items-center gap-3 px-3 py-2.5 text-[10px] font-bold uppercase tracking-widest text-gray-600 hover:bg-gray-50 hover:text-black rounded-lg transition-colors"
                                            >
                                                <Mail size={14} />
                                                Customer Support Email
                                            </a>

                                            {/* Cancel Option - Only before Shipped */}
                                            {['Pending', 'Processing', 'Order Confirmed'].includes(currentStatus) && (
                                                <button
                                                    onClick={() => handleOrderAction('cancel')}
                                                    className="w-full flex items-center gap-3 px-3 py-2.5 text-[10px] font-bold uppercase tracking-widest text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                                >
                                                    <Box size={14} />
                                                    Cancel Order
                                                </button>
                                            )}

                                            {/* Return Option - Only after Delivered and not already returned */}
                                            {currentStatus === 'Delivered' && (
                                                <button
                                                    onClick={() => handleOrderAction('return')}
                                                    className="w-full flex items-center gap-3 px-3 py-2.5 text-[10px] font-bold uppercase tracking-widest text-orange-600 hover:bg-orange-50 rounded-lg transition-colors cursor-pointer"
                                                >
                                                    <Package size={14} />
                                                    Return Order
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Timeline */}
                    {!isCancelled ? (
                        <div className="w-full relative group">
                            <div className="w-full overflow-x-auto pb-4 scrollbar-hide">
                                <div className="min-w-[600px] sm:min-w-[800px] px-4">
                                    <div className="flex justify-between relative mb-4">
                                        {(() => {
                                            const isReturnMode = ['Return/Replacement Initiated', 'Refund completed'].includes(currentStatus);
                                            const visibleSteps = isReturnMode ? [...BASE_STEPS, ...RETURN_STEPS] : BASE_STEPS;

                                            return visibleSteps.map((step, idx, arr) => {
                                                const currentPos = STATUS_PRIORITY[currentStatus] || 0;
                                                const stepPos = STATUS_PRIORITY[step] || 0;
                                                const isDone = stepPos <= currentPos;
                                                const isActive = stepPos === currentPos;
                                                const isCompleted = stepPos < currentPos;

                                                const isCurrentLine = isActive && idx < arr.length - 1 && currentStatus !== 'Delivered' && currentStatus !== 'Refund completed' && currentStatus !== 'Cancelled';
                                                const isUpcoming = !isDone && (idx > 0 && STATUS_PRIORITY[visibleSteps[idx - 1]] === currentPos);

                                                return (
                                                    <div key={idx} className="flex flex-col items-center relative flex-1">
                                                        {/* Segmented Line */}
                                                        {idx < arr.length - 1 && (
                                                            <div className={`absolute top-4 left-1/2 w-full h-[2px] transition-all ${isCompleted ? 'bg-black' :
                                                                isCurrentLine ? 'animate-line-flow' : 'bg-gray-100'
                                                                }`} />
                                                        )}

                                                        {/* Status Circle */}
                                                        <div className={`relative z-10 shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${isDone ? 'bg-black border-black text-white' :
                                                            'bg-white border-gray-300 text-gray-400'
                                                            } ${isActive ? 'ring-4 ring-black/5 scale-110 shadow-lg' : ''} ${(isActive || isUpcoming) && (currentStatus !== 'Delivered' && currentStatus !== 'Refund completed' && currentStatus !== 'Cancelled') ? 'animate-tracking-pulse' : ''
                                                            }`}>
                                                            {isDone ? <CheckCircle2 size={14} /> : <div className="w-1.5 h-1.5 rounded-full bg-current" />}
                                                        </div>
                                                        <span className={`mt-3 text-[8px] font-bold uppercase tracking-tighter text-center px-1 leading-tight ${isDone ? 'text-black' : 'text-gray-500'}`}>
                                                            {step}
                                                        </span>
                                                    </div>
                                                );
                                            });
                                        })()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-red-50 p-4 rounded-xl border border-red-100 text-center">
                            <p className="text-[10px] font-bold text-red-700 uppercase tracking-widest">Order Cancelled</p>
                        </div>
                    )}

                    {/* Tracking Number Section */}
                    {order?.trackingNumber && (
                        <div className="mt-8 pt-8 border-t border-gray-100">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50 p-4 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white rounded-lg">
                                        <Truck size={18} className="text-blue-500" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Tracking Information</p>
                                        <p className="text-xs font-bold text-gray-900 uppercase">{(order?.courierPartner || 'Courier')} Tracking</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 min-w-0">
                                    <p className="text-xs sm:text-sm font-bold text-gray-900 truncate">{order?.trackingNumber}</p>
                                    <button
                                        onClick={() => copyToClipboard(order?.trackingNumber, 'trackNum')}
                                        className="p-2 hover:bg-white rounded-lg transition-all"
                                    >
                                        {copiedField === 'trackNum' ? <Check size={14} className="text-green-500" /> : <Copy size={14} className="text-gray-400" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column: Items */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center gap-2 mb-6 text-gray-400">
                                <ShoppingBag size={14} />
                                <h2 className="text-[10px] font-bold uppercase tracking-widest">Order Items ({order.items?.length || 0})</h2>
                            </div>
                            <div className="divide-y divide-gray-50">
                                {order.items?.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                                        <div className="w-16 h-20 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 flex-shrink-0 flex items-center justify-center">
                                            {item?.image ? (
                                                <img 
                                                    src={item.image} 
                                                    onError={(e) => { e.target.parentElement.innerHTML = '<div class="flex items-center justify-center w-full h-full text-gray-200"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-package"><path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"></path><path d="M12 22V12"></path><path d="m3.3 7 8.7 5 8.7-5"></path><path d="m7.5 4.5 7.4 4.3"></path></svg></div>'; }} 
                                                    alt="" 
                                                    className="w-full h-full object-cover" 
                                                />
                                            ) : (
                                                <Package size={24} className="text-gray-200" />
                                            )}
                                        </div>
                                        <div className="flex-grow pr-4">
                                            <h3 className="text-sm font-bold text-gray-900 mb-1 uppercase tracking-tight">{item?.name || 'Unknown Item'}</h3>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-bold px-2 py-0.5 bg-gray-50 rounded text-gray-500 uppercase">Qty: {item?.quantity || 1}</span>
                                                {item?.variantName && <span className="text-[10px] font-bold px-2 py-0.5 bg-gray-50 rounded text-gray-500 uppercase">{item.variantName}</span>}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-bold text-gray-900">₹{((item?.price || 0) * (item?.quantity || 1)).toLocaleString()}</p>
                                            <p className="text-[10px] text-gray-400 font-medium">₹{(item?.price || 0).toLocaleString()} ea</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Metadata */}
                    <div className="space-y-6">
                        <div className="bg-black text-white rounded-2xl p-6 shadow-lg">
                            <h2 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                                <CreditCard size={14} /> Total Amount
                            </h2>
                            <div className="space-y-4">
                                <div className="flex justify-between text-xs font-medium text-gray-400">
                                    <span>Subtotal</span>
                                    <span>₹{(order?.totalAmount || 0).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-xs font-medium text-gray-400">
                                    <span>Shipping</span>
                                    <span className="text-green-400">FREE</span>
                                </div>
                                <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Grand Total</span>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold tracking-tighter">₹{(order?.totalAmount || 0).toLocaleString()}</p>
                                        {order?.paymentMethod === 'COD' && (
                                            <p className="text-[9px] font-black text-yellow-500 uppercase tracking-widest mt-1">Pay on Delivery</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                            <h2 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-5 flex items-center gap-2">
                                <MapPin size={14} /> Shipping details
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm font-bold text-gray-900 uppercase mb-3">{order?.customerDetails?.name || 'Customer'}</p>
                                    <div className="space-y-2">
                                        <div className="flex items-start justify-between group/addr">
                                            <p className="text-xs text-gray-500 leading-snug flex-1">{order?.customerDetails?.address || 'Address N/A'}</p>
                                            <button onClick={() => copyToClipboard(order?.customerDetails?.address, 'addr')} className="opacity-0 group-hover/addr:opacity-100 transition-opacity p-1.5 hover:bg-gray-50 rounded border border-transparent hover:border-gray-100 ml-2">
                                                {copiedField === 'addr' ? <Check size={12} className="text-green-500" /> : <Copy size={12} className="text-gray-400" />}
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between group/zip">
                                            <p className="text-xs text-gray-500">{order?.customerDetails?.city || ''}, {order?.customerDetails?.zip || ''}</p>
                                            <button onClick={() => copyToClipboard(order?.customerDetails?.zip, 'zip')} className="opacity-0 group-hover/zip:opacity-100 transition-opacity p-1.5 hover:bg-gray-50 rounded border border-transparent hover:border-gray-100 ml-2">
                                                {copiedField === 'zip' ? <Check size={12} className="text-green-500" /> : <Copy size={12} className="text-gray-400" />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-4 border-t border-gray-50">
                                    <div className="flex items-center justify-between group/phone">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[9px] font-bold text-gray-400 uppercase">Contact</span>
                                            <p className="text-xs font-bold text-gray-900">{order?.customerDetails?.phone || 'N/A'}</p>
                                        </div>
                                        <button onClick={() => copyToClipboard(order?.customerDetails?.phone, 'phone')} className="opacity-0 group-hover/phone:opacity-100 transition-opacity p-1.5 hover:bg-gray-50 rounded border border-transparent hover:border-gray-100 ml-2">
                                            {copiedField === 'phone' ? <Check size={12} className="text-green-500" /> : <Copy size={12} className="text-gray-400" />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main >
            <Footer />
            <Toast
                message={toast.message}
                isVisible={toast.isVisible}
                onClose={() => setToast({ ...toast, isVisible: false })}
            />
        </div >
    );
}

