'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Instagram, 
  Facebook, 
  Youtube, 
  Twitter,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Sparkles,
  Heart
} from 'lucide-react';

export default function Footer() {
  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    const fetchRecentProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const json = await res.json();
        if (json.success && json.data.length > 0) {
          const sorted = [...json.data].sort((a,b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
          setRecentProducts(sorted.slice(0, 6));
        }
      } catch (error) {
        console.error('Failed to fetch recent products for footer:', error);
      }
    };
    fetchRecentProducts();
  }, []);

  return (
    <footer className="bg-zinc-950 text-white border-t border-white/5 pt-10 md:pt-20 pb-12 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-600/50 to-transparent" />
      
      <div className="w-full px-[10px] md:px-5 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-20">
          
          {/* Brand Section */}
          <div className="space-y-8 group">
            <Link href="/" className="flex items-center">
              <div className="relative h-20 w-40 transition-all duration-500">
                <Image 
                  src="/fusionofdriednutslogo.webp" 
                  alt="Fusion of Dried Nuts Logo" 
                  fill 
                  className="object-contain group-hover:scale-105 transition-transform"
                />
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              At the intersection of traditional wellness and modern quality. Delivering the finest premium dried nuts and fruits sourced with uncompromising standards.
            </p>
            <div className="flex space-x-6">
              {[
                { 
                  Icon: (props) => <Instagram {...props} />, 
                  href: "https://www.instagram.com/fusionofdriednutspvtltd.co.in/" 
                },
                { 
                  Icon: (props) => <Facebook {...props} />, 
                  href: "https://www.facebook.com/profile.php?id=61570765351450#" 
                },
                { 
                  Icon: (props) => (
                    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  ), 
                  href: "https://wa.me/917369935610" 
                }
              ].map(({ Icon, href }, i) => (
                <Link key={i} href={href} className="p-3 bg-white/5 rounded-full text-gray-400 hover:text-orange-500 hover:bg-orange-500/10 transition-all">
                  <Icon className="w-[18px] h-[18px]" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-semibold text-white mb-8">Curated Collections</h4>
            <ul className="space-y-4">
              {recentProducts.length > 0 ? recentProducts.map((product) => (
                <li key={product._id}>
                  <Link href={`/product/${product._id}`} className="text-sm text-gray-400 hover:text-white transition-colors flex items-center group">
                    {product.name}
                    <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform opacity-0 group-hover:opacity-100" />
                  </Link>
                </li>
              )) : (
                 <li className="text-sm text-gray-400">Loading products...</li>
              )}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-base font-semibold text-white mb-8">Help & Assistance</h4>
            <ul className="space-y-4">
              {[
                { href: '/bulk-order', label: 'Bulk Order Enquiry' },
                { href: '/track-order', label: 'Track Order' },
                { href: '/orders', label: 'My Orders' },
                { href: '/shipping', label: 'Shipping Policies' },
                { href: '/refund', label: 'Refund Policies' },
                { href: '/privacy', label: 'Privacy Policies' },
                { href: '/terms', label: 'Terms & Conditions' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-8">
            <h4 className="text-base font-semibold text-white">Contact Us</h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <div className="p-2.5 bg-white/5 rounded-xl text-orange-500">
                  <MapPin size={18} />
                </div>
                <span className="text-sm text-gray-400 leading-relaxed">Block- GD, 1st Floor, 1863 Rajdanga Main Road, <br />E.K.T Kolkata, Kol-700107 West Bengal</span>
              </li>
              <li className="flex items-start gap-4">
                <div className="p-2.5 bg-white/5 rounded-xl text-orange-500 mt-1">
                  <Mail size={18} />
                </div>
                <div className="flex flex-col">
                  <a href="mailto:Info@fusionofdriednutspvtltd.co.in" className="text-sm text-gray-400 break-all hover:text-white transition-colors">Info@fusionofdriednutspvtltd.co.in</a>
                  <a href="mailto:fusionofdriednuts19pvtltd@gmail.com" className="text-sm text-gray-400 break-all hover:text-white transition-colors mt-1">fusionofdriednuts19pvtltd@gmail.com</a>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <div className="p-2.5 bg-white/5 rounded-xl text-orange-500">
                  <Phone size={18} />
                </div>
                <span className="text-sm font-semibold text-white">+91 73699 35610</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Brand Tags */}
        <div className="mt-10 md:mt-20 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Fusion of Dried Nuts Private Limited. All rights reserved.
          </p>
          
        </div>

        {/* New Row: Webitya Attribution */}
        <div className="mt-6 md:mt-8 pt-6 border-t border-white/5 flex justify-center">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>Website Designed & Maintained with</span>
            <Heart size={12} className="text-red-500 fill-red-500 animate-pulse" />
            <span>by</span>
            <Link href="https://webitya.com" target="_blank" className="text-gray-400 hover:text-orange-500 transition-colors">
              Webitya
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
