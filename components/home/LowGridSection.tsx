import { ShieldCheck, Headphones, Truck, Sparkles, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const PILLARS = [
  {
    icon: ShieldCheck,
    label: 'Certified Quality',
    desc: 'Only standardised brands: Taski Diversey, Solo, Reynolds, Kangaroo — every batch vetted.',
    iconBg: 'bg-amber-500/10 text-amber-700',
  },
  {
    icon: Truck,
    label: 'Reliable Fulfillment',
    desc: 'Robust logistics ensure your facility never runs short of essential cleaning liquids or stationery.',
    iconBg: 'bg-blue-500/10 text-blue-700',
  },
  {
    icon: Headphones,
    label: 'After-Sales Support',
    desc: 'Dedicated corporate account support, immediate order tracking, and hassle-free returns.',
    iconBg: 'bg-emerald-500/10 text-emerald-700',
  },
];

export function LowGridSection() {
  return (
    <section id="why-choose-us" className="px-4 sm:px-6 lg:px-8 py-20">
      <div className="mx-auto max-w-7xl space-y-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-[#967e67]" />
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-zinc-400">Our Commitments</span>
            </div>
            <h2 className="font-serif text-4xl font-light text-black">
              Why Choose <span className="italic">Tulsi</span>
            </h2>
          </div>
          <Link
            href="/who-we-are"
            className="text-xs font-bold uppercase tracking-widest text-[#967e67] hover:text-black flex items-center gap-2 transition-colors group"
          >
            About the company
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left Area: 3 pillar cards + wide image card */}
          <div className="lg:col-span-8 space-y-5">

            {/* 3 Pillar Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {PILLARS.map((p) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.label}
                    className="group bg-white border border-zinc-200/60 rounded-2xl p-7 flex flex-col gap-4 hover:shadow-lg hover:-translate-y-1 hover:border-zinc-300 transition-all duration-300"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${p.iconBg} transition-transform group-hover:scale-110 duration-300`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="font-outfit font-bold text-sm text-black">{p.label}</h3>
                      <p className="text-xs text-zinc-500 leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Wide Image Card */}
            <div className="relative min-h-[260px] rounded-2xl overflow-hidden shadow-sm border border-zinc-200/50 flex items-end group">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('/hero_workspace.png')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
              <div className="relative z-10 p-8 w-full flex justify-between items-end">
                <div className="space-y-1">
                  <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-zinc-300">Verified Cataloguing</span>
                  <h3 className="text-3xl font-serif text-white font-light">Superior Quality <span className="italic">Guaranteed</span></h3>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-white group-hover:bg-white/20 transition-colors">
                  <Sparkles className="h-3.5 w-3.5 text-zinc-200" />
                  <span className="text-[9px] uppercase font-bold tracking-wider">TOS Standardised</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Tall CTA Card */}
          <div className="lg:col-span-4">
            <div className="bg-[#1c1b1a] rounded-2xl p-10 flex flex-col justify-between h-full min-h-[460px] border border-zinc-800 hover:border-zinc-700 transition-colors shadow-sm">
              <div className="space-y-5">
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-500">B2B Sourcing Flexibility</span>
                <h3 className="font-serif text-3xl font-light text-white leading-tight">
                  No Hard<br /><span className="italic text-[#c4a882]">MOQ Limits</span>
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Whether you're a startup needing a few copier reams or a multinational managing facility washroom dispensers, we scale minimum order limits to match your budget.
                </p>
                <div className="space-y-3 pt-2">
                  {['Flexible order volumes', 'Custom pricing contracts', 'GST-compliant invoicing', 'Bespoke branding prints'].map((item) => (
                    <div key={item} className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#967e67]" />
                      <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4 border-t border-zinc-800 pt-6">
                <Link
                  href="/quote/request"
                  className="w-full flex items-center justify-center gap-2 bg-[#967e67] hover:bg-[#7c634d] text-white rounded-xl px-5 py-3 text-xs font-bold uppercase tracking-widest transition-all hover:shadow-lg"
                >
                  Request a Quote
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/products"
                  className="w-full flex items-center justify-center gap-2 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white rounded-xl px-5 py-3 text-xs font-bold uppercase tracking-widest transition-all"
                >
                  View Catalogue
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
