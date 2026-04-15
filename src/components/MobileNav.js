'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function MobileNav() {
  const pathname = usePathname();
  const { cartCount } = useCart();

  const navItems = [
    { label: 'Home', icon: Home, href: '/' },
    { label: 'Shop', icon: ShoppingBag, href: '/products' },
    { label: 'Cart', icon: ShoppingBag, href: '/cart', isCart: true },
    { label: 'Account', icon: User, href: '/login' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 z-[100] safe-area-inset-bottom shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.label} 
              href={item.href}
              className={`flex flex-col items-center gap-1 transition-all duration-300 ${
                isActive ? 'text-orange-600 scale-110' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <div className="relative">
                <item.icon size={20} className={isActive ? 'fill-orange-600/10' : ''} />
                {item.isCart && cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 h-4 w-4 flex items-center justify-center text-[8px] font-bold text-white bg-orange-600 rounded-full ring-2 ring-white">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-tighter">
                {item.label}
              </span>
              {isActive && (
                <div className="w-1 h-1 rounded-full bg-orange-600 mt-0.5 animate-pulse" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
