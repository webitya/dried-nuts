'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Send, 
  Package, 
  Truck, 
  Handshake, 
  CheckCircle,
  Building2,
  Mail,
  Phone,
  User,
  MessageSquare,
  ShoppingBag
} from 'lucide-react';

export default function BulkOrderPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    product: '',
    quantity: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/bulk-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          product: '',
          quantity: '',
          message: ''
        });
      } else {
        const error = await response.json();
        alert(error.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit enquiry. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FFFAF0]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-48 md:pt-44 pb-12 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-100 rounded-full blur-[120px] opacity-50 -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-yellow-100 rounded-full blur-[120px] opacity-40 translate-y-1/2 -translate-x-1/3" />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-4 md:space-y-6">
            <h1 className="text-3xl md:text-6xl font-bold text-gray-900 tracking-tight leading-[1.1]">
              Elevate Your Gifting & <br /> 
              <span className="brand-text-gradient">Stock With Premium Nuts</span>
            </h1>
            
            <p className="text-sm md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto font-medium px-2">
              Partner with <span className="font-semibold text-gray-900">Fusion of Dried Nuts</span> for premium bulk sourcing, corporate gifting, and wholesale distribution.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid - Hidden or Compact on mobile */}
      <section className="py-8 md:py-12 bg-white/50 border-y border-orange-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {[
              { 
                icon: Handshake, 
                title: "Bespoke Packaging", 
                desc: "Custom branding and luxury packaging solutions." 
              },
              { 
                icon: Truck, 
                title: "Priority Logistics", 
                desc: "Dedicated shipping channels for bulk orders." 
              },
              { 
                icon: CheckCircle, 
                title: "Tiered Pricing", 
                desc: "Exclusive wholesale margins and volume-based discounts." 
              }
            ].map((feature, idx) => (
              <div key={idx} className="flex gap-4 p-4 md:p-6 rounded-2xl md:rounded-3xl hover:bg-white transition-all border border-transparent hover:border-orange-100 group">
                <div className="h-10 w-10 md:h-14 md:w-14 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 shrink-0">
                  <feature.icon size={20} className="md:w-6 md:h-6" />
                </div>
                <div>
                  <h3 className="text-sm md:text-lg font-semibold text-gray-900 mb-1">{feature.title}</h3>
                  <p className="text-xs md:text-sm text-gray-500 leading-relaxed font-medium">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section Heading */}
      <section className="pt-12 md:pt-20 pb-6 md:pb-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-5xl font-bold text-gray-900 tracking-tight mb-3 uppercase">Direct Wholesale Application</h2>
          <div className="h-1 w-16 md:w-24 bg-orange-600 mx-auto rounded-full mb-4" />
          <p className="text-gray-500 max-w-xl mx-auto text-xs md:text-base leading-relaxed font-medium px-4">
            Complete the application below and our B2B experts will contact you.
          </p>
        </div>
      </section>

      {/* Form Section Card */}
      <section className="pb-16 md:pb-32">
        <div className="container mx-auto px-0 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white md:rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.06)] border-y md:border border-gray-100 overflow-hidden">
              
              {/* Form Only Layout */}
              <div className="w-full p-6 md:p-16">
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6 md:space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                      {/* Name */}
                      <div className="space-y-2 md:space-y-3">
                        <label className="text-[10px] md:text-[11px] font-semibold text-gray-500 uppercase tracking-[0.2em] ml-1">Full Name</label>
                        <input 
                          required
                          type="text" 
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your name" 
                          className="w-full bg-white border border-gray-300 rounded-none py-3 md:py-4 px-4 md:px-6 text-sm font-medium placeholder:text-gray-400 focus:bg-orange-50/20 outline-none transition-all"
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-2 md:space-y-3">
                        <label className="text-[10px] md:text-[11px] font-semibold text-gray-500 uppercase tracking-[0.2em] ml-1">Work Email</label>
                        <input 
                          required
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter work email" 
                          className="w-full bg-white border border-gray-300 rounded-none py-3 md:py-4 px-4 md:px-6 text-sm font-medium placeholder:text-gray-400 focus:bg-orange-50/20 outline-none transition-all"
                        />
                      </div>

                      {/* Phone */}
                      <div className="space-y-2 md:space-y-3">
                        <label className="text-[10px] md:text-[11px] font-semibold text-gray-500 uppercase tracking-[0.2em] ml-1">Phone Number</label>
                        <input 
                          required
                          type="tel" 
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Enter phone number" 
                          className="w-full bg-white border border-gray-300 rounded-none py-3 md:py-4 px-4 md:px-6 text-sm font-medium placeholder:text-gray-400 focus:bg-orange-50/20 outline-none transition-all"
                        />
                      </div>

                      {/* Company */}
                      <div className="space-y-2 md:space-y-3">
                        <label className="text-[10px] md:text-[11px] font-semibold text-gray-500 uppercase tracking-[0.2em] ml-1">Company Name</label>
                        <input 
                          type="text" 
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Enter company name" 
                          className="w-full bg-white border border-gray-300 rounded-none py-3 md:py-4 px-4 md:px-6 text-sm font-medium placeholder:text-gray-400 focus:bg-orange-50/20 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                       {/* Product Interests */}
                       <div className="space-y-2 md:space-y-3">
                        <label className="text-[10px] md:text-[11px] font-semibold text-gray-500 uppercase tracking-[0.2em] ml-1">Product Interest</label>
                        <select 
                          name="product"
                          value={formData.product}
                          onChange={handleChange}
                          className="w-full bg-white border border-gray-300 rounded-none py-3 md:py-4 px-4 md:px-6 text-sm font-medium text-gray-900 appearance-none outline-none focus:bg-orange-50/20 transition-all cursor-pointer"
                        >
                          <option value="">Select Category</option>
                          <option value="corporate-gift">Corporate Gift Hampers</option>
                          <option value="raw-wholesale">Raw/Bulk Bulk Sourcing</option>
                          <option value="white-label">White Label Solutions</option>
                          <option value="other">Other Enquiry</option>
                        </select>
                      </div>

                      {/* Quantity */}
                      <div className="space-y-2 md:space-y-3">
                        <label className="text-[10px] md:text-[11px] font-semibold text-gray-500 uppercase tracking-[0.2em] ml-1">Est. Quantity (Kgs/Units)</label>
                        <input 
                          type="text" 
                          name="quantity"
                          value={formData.quantity}
                          onChange={handleChange}
                          placeholder="Enter estimated quantity" 
                          className="w-full bg-white border border-gray-300 rounded-none py-3 md:py-4 px-4 md:px-6 text-sm font-medium placeholder:text-gray-400 focus:bg-orange-50/20 outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2 md:space-y-3">
                      <label className="text-[10px] md:text-[11px] font-semibold text-gray-500 uppercase tracking-[0.2em] ml-1">Tell us more requirements</label>
                      <textarea 
                        rows="3" 
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Enter details..." 
                        className="w-full bg-white border border-gray-300 rounded-none py-4 md:py-5 px-4 md:px-6 text-sm font-medium placeholder:text-gray-400 focus:bg-orange-50/20 outline-none transition-all resize-none"
                      />
                    </div>

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-orange-600 text-white py-4 md:py-6 font-bold uppercase tracking-[0.3em] text-xs hover:bg-black active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer shadow-xl shadow-orange-600/10"
                    >
                      {isSubmitting ? 'Processing Registry...' : 'Submit Application'}
                    </button>
                    
                    <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest leading-relaxed px-4">
                      By submitting, you agree to our <a href="/terms" className="text-orange-600 hover:underline">Terms</a> & <a href="/privacy" className="text-orange-600 hover:underline">Privacy</a>
                    </p>
                  </form>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center py-20 animate-fade-in">
                    <div className="h-24 w-24 rounded-full bg-green-50 flex items-center justify-center text-green-500 mb-8 animate-tracking-pulse">
                      <CheckCircle size={48} />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Inquiry Received!</h2>
                    <p className="text-gray-500 max-w-sm mb-10 leading-relaxed">
                      Thank you for your interest in Fusion of Dried Nuts. One of our wholesale specialists will contact you within 2-4 business hours.
                    </p>
                    <button 
                      onClick={() => setSubmitted(false)}
                      className="px-10 py-4 bg-gray-50 text-gray-900 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-orange-50 hover:text-orange-600 transition-all border border-gray-100"
                    >
                      Send Another Request
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
