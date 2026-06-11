import Link from 'next/link';
import { BookOpen, Sparkles, Printer, Droplet, Cpu, ArrowUpRight } from 'lucide-react';

const CATEGORIES = [
  {
    code: 'ST',
    label: 'Stationery & Folders',
    desc: 'Premium binders, cobra files, notebook sets, adhesives, writing pens, and executive desk accessories.',
    icon: BookOpen,
    accent: '#c49a3c',
    bg: 'bg-amber-50',
    iconBg: 'bg-amber-500/15 text-amber-800',
    border: 'hover:border-amber-300/60',
    count: '35+'
  },
  {
    code: 'HK',
    label: 'Housekeeping',
    desc: 'Commercial Diversey liquids, stainless steel scrub sets, squeegees, heavy-duty trolleys, and caution boards.',
    icon: Sparkles,
    accent: '#2d9e6b',
    bg: 'bg-emerald-50',
    iconBg: 'bg-emerald-500/15 text-emerald-800',
    border: 'hover:border-emerald-300/60',
    count: '68+'
  },
  {
    code: 'PR',
    label: 'Printing & Letterheads',
    desc: 'Custom-printed corporate letterheads, window envelopes, and cloth-lined green dispatch covers.',
    icon: Printer,
    accent: '#3b7dd8',
    bg: 'bg-blue-50',
    iconBg: 'bg-blue-500/15 text-blue-800',
    border: 'hover:border-blue-300/60',
    count: '5+'
  },
  {
    code: 'WF',
    label: 'Washroom Solutions',
    desc: 'Auto aerosol fresheners, touchless soap dispensers, HRT/M-fold paper tissues, and high-speed hand dryers.',
    icon: Droplet,
    accent: '#0ea5c9',
    bg: 'bg-sky-50',
    iconBg: 'bg-sky-500/15 text-sky-800',
    border: 'hover:border-sky-300/60',
    count: '31+'
  },
  {
    code: 'MS',
    label: 'Workspace Machinery',
    desc: 'Auto sensor shoe shiners, industrial wet & dry vacuum units, and walk-behind floor buffer scrubbers.',
    icon: Cpu,
    accent: '#8b5cf6',
    bg: 'bg-violet-50',
    iconBg: 'bg-violet-500/15 text-violet-800',
    border: 'hover:border-violet-300/60',
    count: '12+'
  }
];

export function CategoryGridSection() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 bg-white">
      <div className="mx-auto max-w-7xl space-y-10">

        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-[#967e67]" />
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-zinc-400">Procurement Segments</span>
            </div>
            <h2 className="font-serif text-4xl font-light text-black">
              Browse Sourcing <span className="italic">Categories</span>
            </h2>
          </div>
          <Link
            href="/products"
            className="text-xs font-bold uppercase tracking-widest text-[#967e67] hover:text-black flex items-center gap-2 transition-colors group"
          >
            View All Products
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* 3+2 Asymmetric Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORIES.map((cat, i) => {
            const Icon = cat.icon;
            const isWide = i === 3; // 4th item spans 2 on desktop for balance
            return (
              <Link
                key={cat.code}
                href={`/products?category=${cat.code}`}
                className={`group relative flex flex-col justify-between p-8 rounded-[1.75rem] bg-white border border-zinc-200/60 ${cat.border} hover:shadow-xl transition-all duration-300 min-h-[240px] overflow-hidden ${isWide ? 'lg:col-span-1' : ''}`}
              >
                {/* Subtle gradient background on hover */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${cat.bg}`} />

                <div className="relative z-10 space-y-4">
                  {/* Icon + Count Row */}
                  <div className="flex items-start justify-between">
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${cat.iconBg} transition-transform group-hover:scale-110 duration-300`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-300 group-hover:text-zinc-400 transition-colors">
                      {cat.count} items
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-xl font-light text-black group-hover:text-black transition-colors leading-snug">
                      {cat.label}
                    </h3>
                    <p className="text-xs text-zinc-500 leading-relaxed mt-2">
                      {cat.desc}
                    </p>
                  </div>
                </div>

                {/* Bottom Arrow */}
                <div className="relative z-10 mt-6 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 group-hover:text-[#967e67] transition-colors">
                    Explore products
                  </span>
                  <div className="w-8 h-8 rounded-full border border-zinc-200 group-hover:border-[#967e67] group-hover:bg-[#967e67] flex items-center justify-center transition-all duration-300">
                    <ArrowUpRight className="h-3.5 w-3.5 text-zinc-400 group-hover:text-white transition-colors" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
