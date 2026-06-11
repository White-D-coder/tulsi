'use client';
import Link from 'next/link';
import { trpc } from '@/lib/trpc/client';

export function WhoWeAreSection() {
  const { data: stats, isLoading } = trpc.product.getStats.useQuery();

  const statTiles = [
    { val: stats ? `${stats.totalProducts}+` : '—', label: 'Products Catalogued' },
    { val: stats ? `${stats.corporateClients}+` : '—', label: 'Corporate Accounts' },
    { val: stats ? `${stats.categories}` : '—', label: 'Product Categories' },
    { val: 'PAN India', label: 'Delivery Network' },
  ];

  return (
    <section id="who-we-are" className="px-4 sm:px-6 lg:px-8 py-16">
      <div className="mx-auto max-w-7xl">

        {/* Section Label */}
        <div className="flex items-center gap-3 mb-10">
          <div className="h-px w-8 bg-[#967e67]" />
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-zinc-400">Our Story</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

          {/* Left: Large Tan Info Card */}
          <div className="lg:col-span-8 bg-[#f2efe9] rounded-[2rem] p-10 sm:p-12 border border-zinc-200/40 shadow-sm flex flex-col justify-between gap-10 min-h-[380px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h2 className="font-serif text-4xl sm:text-5xl font-light text-black leading-tight">
                  Who We <span className="italic">Are</span>
                </h2>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  At Tulsi, we understand the challenges of maintaining productive, fully-stocked workspaces. As NCR's premier B2B corporate solutions provider, we simplify facility and office supply procurement under one unified contract.
                </p>
                <Link
                  href="/who-we-are"
                  className="inline-flex items-center gap-2 bg-[#967e67] hover:bg-[#7c634d] text-white rounded-full px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all hover:shadow-lg hover:-translate-y-0.5 w-fit"
                >
                  Learn More
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </div>
              <div className="space-y-4">
                <p className="text-xs text-zinc-500 leading-relaxed border-l-2 border-[#967e67] pl-4">
                  Operating out of Noida, UP, we service corporate offices, hospitality zones, and industrial sites across India — ensuring tax-compliant invoicing, fast dispatch timelines, and dedicated account management.
                </p>
                {/* Live Stats Grid */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {statTiles.map((s) => (
                    <div key={s.label} className="bg-white rounded-2xl p-4 border border-zinc-200/60">
                      {isLoading && s.val === '—' ? (
                        <div className="h-7 w-12 rounded bg-zinc-100 animate-pulse mb-1" />
                      ) : (
                        <p className="font-serif text-2xl font-light text-[#967e67]">{s.val}</p>
                      )}
                      <p className="text-[9px] uppercase font-bold tracking-wider text-zinc-400 mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Dark Brand Card */}
          <div className="lg:col-span-4 bg-[#1c1b1a] rounded-[2rem] p-10 border border-zinc-800 shadow-sm flex flex-col justify-between gap-6 min-h-[320px]">
            <div className="space-y-4">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-500">Our Mission</span>
              <h3 className="font-serif text-3xl font-light text-white leading-tight">
                One Partner.<br />Every <span className="italic text-[#c4a882]">Supply Need.</span>
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                From a single toner cartridge to 100-litre Taski Diversey chemical deliveries, we scale to your volume. B2B procurement made effortless.
              </p>
            </div>
            <div className="border-t border-zinc-800 pt-6 space-y-3">
              {['Certified brand sourcing', 'Flexible MOQ policies', 'Doorstep bulk delivery'].map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#967e67]" />
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
