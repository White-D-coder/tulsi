'use client';
import Link from 'next/link';
import { trpc } from '@/lib/trpc/client';

function StatItem({ value, label, loading }: { value: string; label: string; loading: boolean }) {
  return (
    <div className="space-y-0.5">
      {loading ? (
        <div className="h-8 w-16 rounded-lg bg-white/10 animate-pulse" />
      ) : (
        <p className="text-2xl font-serif font-light text-white">{value}</p>
      )}
      <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">{label}</p>
    </div>
  );
}

export function HeroSection() {
  const { data: stats, isLoading } = trpc.product.getStats.useQuery();

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-6 pb-0">
      <div className="mx-auto max-w-7xl">

        {/* Main Hero Card */}
        <div className="relative overflow-hidden rounded-[2rem] h-[520px] sm:h-[620px] lg:h-[680px] flex items-end border border-zinc-200/40 shadow-xl">

          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-[8000ms] hover:scale-100"
            style={{ backgroundImage: `url('/hero_workspace.png')` }}
          />

          {/* Layered Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

          {/* Floating badge top-right */}
          <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-2.5 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white text-[10px] font-bold uppercase tracking-[0.15em]">PAN India Delivery</span>
          </div>

          {/* Content */}
          <div className="relative z-10 w-full p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">

            {/* Left: Heading */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-[#967e67]" />
                <span className="text-[#c4a882] text-[10px] font-bold uppercase tracking-[0.25em]">Tulsi Office Solution</span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-white leading-[1.1]">
                Bringing <span className="italic text-[#e8d5bc]">Simplicity</span><br />
                In Workspace<br />
                Procurement
              </h1>

              {/* Live Stats Row */}
              <div className="flex items-center gap-8 pt-2">
                <StatItem
                  value={stats ? `${stats.totalProducts}+` : '—'}
                  label="Products"
                  loading={isLoading}
                />
                <div className="w-px h-8 bg-white/20" />
                <StatItem
                  value={stats ? `${stats.corporateClients}+` : '—'}
                  label="Corporate Clients"
                  loading={isLoading}
                />
                <div className="w-px h-8 bg-white/20" />
                <StatItem
                  value={stats ? `${stats.categories}` : '—'}
                  label="Categories"
                  loading={isLoading}
                />
              </div>
            </div>

            {/* Right: CTA */}
            <div className="lg:col-span-5 flex flex-col md:items-end justify-end gap-5">
              <p className="text-sm text-zinc-300/90 font-medium leading-relaxed max-w-xs lg:text-right">
                One unified contract covering stationery, housekeeping chemicals, washroom dispensers, and facility machinery.
              </p>
              <div className="flex items-center gap-3 flex-wrap lg:justify-end">
                <Link
                  href="/products"
                  className="bg-white hover:bg-zinc-100 text-zinc-950 rounded-full px-7 py-3.5 text-xs font-bold uppercase tracking-widest shadow-xl transition-all hover:shadow-2xl hover:-translate-y-0.5"
                >
                  Explore Catalogue
                </Link>
                <Link
                  href="/who-we-are"
                  className="border border-white/30 hover:border-white/60 hover:bg-white/10 text-white rounded-full px-7 py-3.5 text-xs font-bold uppercase tracking-widest transition-all"
                >
                  Who We Are
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Marquee Strip — items duplicated for seamless loop */}
        <div className="mt-5 overflow-hidden rounded-2xl bg-[#967e67] py-3">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...Array(2)].map((_, copy) =>
              ['Stationery & Folders', 'Housekeeping Chemicals', 'Washroom Solutions', 'Printing & Letterheads', 'Workspace Machinery', 'B2B Corporate Contracts', 'MOQ Flexible Orders', 'Tax-Compliant Invoicing'].map((t, i) => (
                <span key={`${copy}-${i}`} className="flex items-center gap-4 px-6 text-white text-[10px] font-bold uppercase tracking-[0.2em] shrink-0">
                  <span className="w-1 h-1 rounded-full bg-white/50" />
                  {t}
                </span>
              ))
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
