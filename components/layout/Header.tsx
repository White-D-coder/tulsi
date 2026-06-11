'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingCart } from 'lucide-react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Read cart count from localstorage if available
    const handleCartChange = () => {
      try {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const count = cart.reduce((acc: number, item: any) => acc + (item.quantity || 1), 0);
        setCartCount(count);
      } catch (e) {
        setCartCount(0);
      }
    };

    handleCartChange();
    window.addEventListener('storage', handleCartChange);
    // Custom event to trigger updates within the same page
    window.addEventListener('cart-updated', handleCartChange);
    return () => {
      window.removeEventListener('storage', handleCartChange);
      window.removeEventListener('cart-updated', handleCartChange);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full px-4 sm:px-6 lg:px-8 pt-4">
      <div className="mx-auto max-w-7xl rounded-full border border-zinc-200/60 bg-white/90 shadow-sm backdrop-blur-md px-6 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <img src="/logo.svg" alt="Tulsi Office Solution" className="h-10 sm:h-12 w-auto transition-transform group-hover:scale-105" />
          <div className="hidden sm:flex flex-col justify-center leading-tight">
            <span className="font-outfit font-black text-sm text-black tracking-tight group-hover:text-[#967e67] transition-colors">
              T U L S I
            </span>
            <span className="font-outfit font-semibold text-[10px] text-zinc-400 uppercase tracking-[0.15em]">
              Office Solution
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-semibold text-zinc-650">
          <Link href="/who-we-are" className="hover:text-black transition-colors">Who We Are</Link>
          <Link href="/#sourcing-process" className="hover:text-black transition-colors">Sourcing Process</Link>
          <Link href="/#featured-products" className="hover:text-black transition-colors">Featured Products</Link>
          <Link href="/products" className="hover:text-black transition-colors">Catalogue</Link>
        </nav>

        {/* Actions (Pill Button in Tan) */}
        <div className="flex items-center gap-2">
          <Link
            href="/quote/request"
            className="bg-[#967e67] hover:bg-[#836c56] text-white rounded-full px-5 py-2.5 text-xs font-bold transition-all flex items-center gap-2 shadow-sm"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Request Quote</span>
            {cartCount > 0 && (
              <span className="bg-white text-[#967e67] text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-500 hover:text-black md:hidden"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Nav */}
      {mobileMenuOpen && (
        <div className="mt-2 mx-auto max-w-7xl rounded-2xl border border-zinc-200/60 bg-white shadow-md p-4 space-y-3 md:hidden text-xs font-semibold text-zinc-650">
          <Link
            href="/who-we-are"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg hover:bg-zinc-50 hover:text-black"
          >
            Who We Are
          </Link>
          <Link
            href="/#sourcing-process"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg hover:bg-zinc-50 hover:text-black"
          >
            Sourcing Process
          </Link>
          <Link
            href="/#featured-products"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg hover:bg-zinc-50 hover:text-black"
          >
            Featured Products
          </Link>
          <Link
            href="/products"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg hover:bg-zinc-50 hover:text-black"
          >
            Catalogue
          </Link>
        </div>
      )}
    </header>
  );
}
