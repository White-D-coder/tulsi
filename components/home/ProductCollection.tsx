'use client';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { trpc } from '@/lib/trpc/client';
import Link from 'next/link';

export function ProductCollection() {
  const { data, isLoading } = trpc.product.getAll.useQuery({ limit: 12 });
  const products = data?.products || [];
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: direction === 'left' ? -400 : 400, behavior: 'smooth' });
    setTimeout(checkScroll, 300);
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-zinc-100 h-64 shimmer" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="featured-products" className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-[#967e67]" />
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-zinc-400">Featured Collection</span>
            </div>
            <h2 className="font-serif text-4xl font-light text-black">
              Popular <span className="italic">Picks</span>
            </h2>
            <p className="text-xs text-zinc-500 max-w-md leading-relaxed font-medium">
              Our most requested wholesale office and housekeeping supplies, ready for bulk ordering.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Scroll Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className="rounded-full border border-zinc-300 p-2.5 text-black transition-all hover:bg-black hover:text-white disabled:opacity-20 disabled:hover:bg-transparent hover:border-black"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className="rounded-full border border-zinc-300 p-2.5 text-black transition-all hover:bg-black hover:text-white disabled:opacity-20 disabled:hover:bg-transparent hover:border-black"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <Link
              href="/products"
              className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#967e67] hover:text-black transition-colors group"
            >
              View All
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        {/* Scrollable Cards */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="scrollbar-hide flex gap-5 overflow-x-auto pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product, idx) => (
            <motion.div
              key={product.sku}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04, duration: 0.4 }}
              viewport={{ once: true }}
              className="min-w-[270px] sm:min-w-[300px] flex-shrink-0"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Strip */}
        <div className="mt-10 flex items-center justify-center">
          <Link
            href="/products"
            className="bg-[#1c1b1a] hover:bg-black text-white rounded-full px-8 py-3.5 text-xs font-bold uppercase tracking-widest transition-all hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2"
          >
            Browse All 141+ Products
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
