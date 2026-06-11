import Link from 'next/link';

export function Footer() {
  const email = process.env.NEXT_PUBLIC_COMPANY_EMAIL || 'info@JpElite24corexsolutionpvt.ltd';
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '917878304759';

  return (
    <footer className="border-t border-zinc-200 bg-[#f2efe9] py-16 text-zinc-650 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2 space-y-5">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="Tulsi Office Solution" className="h-12 w-auto" />
            <div className="flex flex-col justify-center leading-tight">
              <span className="font-outfit font-black text-sm text-black tracking-tight group-hover:text-[#967e67] transition-colors">
                T U L S I
              </span>
              <span className="font-outfit font-semibold text-[10px] text-zinc-400 uppercase tracking-[0.2em]">
                Office Solution
              </span>
            </div>
          </div>
          <p className="text-xs leading-relaxed max-w-sm text-zinc-500">
            Premium B2B E-commerce supplier. Standardising facility management, washroom items, stationery, and printing solutions for modern corporations.
          </p>
        </div>
        <div>
          <h4 className="text-black font-bold uppercase tracking-widest text-[11px] mb-4">Categories</h4>
          <ul className="space-y-2 text-xs font-semibold">
            <li><Link href="/products?category=ST" className="hover:text-black transition-colors">Stationery</Link></li>
            <li><Link href="/products?category=HK" className="hover:text-black transition-colors">Housekeeping</Link></li>
            <li><Link href="/products?category=PR" className="hover:text-black transition-colors">Printing & Branding</Link></li>
            <li><Link href="/products?category=WF" className="hover:text-black transition-colors">Washroom Solutions</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-black font-bold uppercase tracking-widest text-[11px] mb-4">Support</h4>
          <p className="text-xs font-medium">Email: {email}</p>
          <p className="text-xs mt-1 font-medium">WhatsApp: +{whatsapp}</p>
          <p className="text-xs mt-1 font-medium">Address: G-14, Sector 63, Noida, UP, India</p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-zinc-300 text-center text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
        &copy; {new Date().getFullYear()} Tulsi Office Solution. All rights reserved.
      </div>
    </footer>
  );
}
