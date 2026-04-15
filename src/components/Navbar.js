'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  User, 
  Search, 
  ChevronDown
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { cartCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      router.push(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav 
        className="fixed top-0 w-full z-[100] transition-all duration-500 bg-white shadow-xl py-2 md:py-3 border-b border-gray-50"
      >
        <div className="w-full px-4 md:px-8">
          <div className="flex justify-between items-center h-auto">
            
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <div className="relative h-14 w-28 md:h-20 md:w-40 transition-all duration-500">
                <Image 
                  src="/fusionofdriednutslogo.webp" 
                  alt="Fusion of Dried Nuts" 
                  fill 
                  className="object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </Link>

            {/* Right Section (Search + Navigation + Icons) */}
            <div className="flex items-center gap-6 flex-grow justify-end">
              
              {/* Desktop Navigation (Relocated to Right) */}
              <div className="hidden md:flex items-center gap-8 mr-4">
                {[
                  { href: '/', label: 'HOME' },
                  { href: '/products', label: 'SHOP' },
                  { href: '/about', label: 'ABOUT US' },
                ].map(({ href, label }) => {
                  const isActive = pathname === href;
                  return (
                    <Link
                      key={href}
                      href={href}
                      className={`text-xs font-bold uppercase tracking-widest transition-all duration-300 relative group shrink-0 ${
                        isActive ? 'text-orange-600' : 'text-gray-900 hover:text-orange-500'
                      }`}
                    >
                      {label}
                      <span className={`absolute -bottom-1 left-0 h-[1.5px] bg-orange-500 transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}></span>
                    </Link>
                  );
                })}
              </div>

              {/* Desktop Search Bar */}
              <div className="relative hidden lg:block w-full max-w-sm group">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearch}
                  className="w-full bg-white border border-gray-200 rounded-full py-2.5 pl-12 pr-10 text-sm shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)] focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none text-gray-700 placeholder:text-gray-400"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" size={18} />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-600 transition-colors"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Desktop Cart */}
              <Link
                href="/cart"
                className="relative hidden md:flex p-2 transition-all duration-300 hover:scale-110 text-gray-900 hover:text-orange-500"
              >
                <ShoppingBag size={22} strokeWidth={2} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-[10px] font-bold text-white bg-orange-600 rounded-full ring-2 ring-white shadow-lg">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Profile */}
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-1 p-2 transition-all duration-300 hover:scale-110 text-gray-900 hover:text-orange-500"
                >
                  <User size={22} strokeWidth={2} />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-4 w-64 bg-white rounded-2xl shadow-2xl py-4 border border-gray-100 z-50 animate-fade-in">
                    {isAuthenticated ? (
                      <>
                        <div className="px-6 py-3 border-b border-gray-50 mb-2">
                          <p className="text-[10px] font-bold text-orange-600 uppercase tracking-wider mb-1">Authenticated</p>
                          <p className="text-sm font-bold text-gray-900 truncate">{user?.name}</p>
                        </div>
                        <Link href="/account" className="block px-6 py-2.5 text-xs font-semibold text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors uppercase tracking-wide">Dashboard</Link>
                        <Link href="/orders" className="block px-6 py-2.5 text-xs font-semibold text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors uppercase tracking-wide">Purchase History</Link>
                        <button onClick={logout} className="w-full text-left px-6 py-3 text-xs font-bold text-red-500 hover:bg-red-50 transition-colors uppercase tracking-wide mt-2 border-t border-gray-50">Sign Out</button>
                      </>
                    ) : (
                      <div className="p-3">
                        <Link href="/login" className="block w-full py-3.5 text-center bg-black text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl shadow-black/10">Login/Signup</Link>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-2 transition-all duration-300 text-gray-900"
              >
                <Menu size={28} />
              </button>
            </div>
          </div>

          {/* Mobile Search Bar (3D Inset Effect)平衡 */}
          <div className="md:hidden mt-2 mb-1 px-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-11 pr-10 text-sm shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors" size={18} />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-600 transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[200] transition-all duration-700 md:hidden ${mobileMenuOpen ? 'visible' : 'invisible'}`}>
        <div className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-700 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setMobileMenuOpen(false)} />
        <div className={`absolute top-0 right-0 w-full max-w-sm h-full bg-white shadow-2xl transition-transform duration-700 cubic-bezier(0.77, 0, 0.175, 1) ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col h-full p-8">
            <div className="flex items-center justify-between mb-12">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                <div className="relative h-14 w-28">
                  <Image 
                    src="/fusionofdriednutslogo.webp" 
                    alt="Fusion of Dried Nuts" 
                    fill 
                    className="object-contain"
                  />
                </div>
              </Link>
              <button onClick={() => setMobileMenuOpen(false)} className="p-3 bg-gray-50 rounded-full text-gray-400">
                <X size={24} />
              </button>
            </div>
            <nav className="flex flex-col gap-8">
              {[
                { href: '/', label: 'HOME' },
                { href: '/products', label: 'SHOP' },
                { href: '/about', label: 'ABOUT US' },
                { href: '/track-order', label: 'TRACKING' },
              ].map(({ href, label }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`text-4xl font-bold transition-colors tracking-tight ${
                      isActive ? 'text-orange-600' : 'text-gray-900 hover:text-orange-500'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-auto pt-10 border-t border-gray-100">
              <Link 
                href="/login" 
                className="block w-full py-4 text-center bg-black text-white rounded-2xl font-bold uppercase tracking-widest hover:bg-orange-600 transition-all text-[10px]" 
                onClick={() => setMobileMenuOpen(false)}
              >
                Login / Signup
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
