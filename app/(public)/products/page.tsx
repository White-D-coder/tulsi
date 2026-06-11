'use client';
import { useState } from 'react';
import { ProductCard } from '@/components/home/ProductCard';
import { trpc } from '@/lib/trpc/client';
import { Container } from '@/components/ui/Container';
import { Search, SlidersHorizontal, ArrowUpDown, ChevronDown, Check, Loader2 } from 'lucide-react';

const CATEGORIES = [
  { code: 'ST', label: 'Stationery', count: '35 items' },
  { code: 'HK', label: 'Housekeeping', count: '68 items' },
  { code: 'PR', label: 'Printing', count: '5 items' },
  { code: 'WF', label: 'Washroom', count: '31 items' },
  { code: 'MS', label: 'Machines', count: '12 items' },
] as const;

type CategoryCode = typeof CATEGORIES[number]['code'];

export default function ProductsPage() {
  const [category, setCategory] = useState<CategoryCode | undefined>(undefined);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<'name' | 'priceAsc' | 'priceDesc'>('name');

  // Fetch using tRPC
  const { data, isLoading } = trpc.product.getAll.useQuery({
    category,
    search: search || undefined,
    page,
    limit: 12
  });

  const products = data?.products || [];
  const totalPages = data?.totalPages || 1;

  // Client-side sort for immediate response
  const sortedProducts = [...products];
  if (sortBy === 'priceAsc') {
    sortedProducts.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
  } else if (sortBy === 'priceDesc') {
    sortedProducts.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
  } else if (sortBy === 'name') {
    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
  }

  return (
    <Container className="py-12">
      {/* Banner / Header Card */}
      <div className="relative overflow-hidden bg-[#f2efe9] border border-zinc-200/50 rounded-3xl p-8 sm:p-12 mb-12 shadow-sm">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#967e67]/10 to-transparent rounded-full -mr-16 -mt-16 pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#967e67]">Tulsi Office Solution</span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-black leading-tight">
            Workspace <span className="italic font-normal">Catalogue</span>
          </h1>
          <p className="text-xs text-zinc-550 leading-relaxed max-w-lg">
            Explore our curated inventory of bulk corporate supplies. Sort items, select categories, and stage products inside your quote cart to initiate wholesale price negotiations.
          </p>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Filters */}
        <aside className="space-y-6 lg:sticky lg:top-24 h-fit">
          
          {/* Categories Card */}
          <div className="bg-white border border-zinc-200/60 rounded-3xl p-6 shadow-sm">
            <h3 className="font-outfit font-bold text-[10px] uppercase tracking-[0.2em] text-zinc-400 mb-6 flex items-center gap-2">
              <SlidersHorizontal className="h-3.5 w-3.5" /> Categories
            </h3>
            <div className="flex flex-col gap-1.5">
              <button
                onClick={() => {
                  setCategory(undefined);
                  setPage(1);
                }}
                className={`flex items-center justify-between px-4 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all border ${
                  category === undefined
                    ? 'bg-[#967e67] text-white border-[#967e67] shadow-sm'
                    : 'text-zinc-650 bg-transparent border-transparent hover:bg-zinc-50 hover:text-black'
                }`}
              >
                <span>All Categories</span>
                {category === undefined && <Check className="h-3.5 w-3.5" />}
              </button>
              
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.code}
                  onClick={() => {
                    setCategory(cat.code);
                    setPage(1);
                  }}
                  className={`flex items-center justify-between px-4 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all border ${
                    category === cat.code
                      ? 'bg-[#967e67] text-white border-[#967e67] shadow-sm'
                      : 'text-zinc-650 bg-transparent border-transparent hover:bg-zinc-50 hover:text-black'
                  }`}
                >
                  <div className="flex flex-col items-start text-left">
                    <span>{cat.label}</span>
                    <span className={`text-[9px] font-medium mt-0.5 ${category === cat.code ? 'text-zinc-200' : 'text-zinc-400'}`}>
                      {cat.count}
                    </span>
                  </div>
                  {category === cat.code && <Check className="h-3.5 w-3.5" />}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white border border-zinc-200/60 rounded-3xl p-4 shadow-sm">
            {/* Search Input */}
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-4 top-3 h-4 w-4 text-zinc-400" />
              <input
                type="search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search SKU or name..."
                className="w-full bg-zinc-50 border border-zinc-200/80 rounded-full py-2.5 pl-10 pr-5 text-xs text-black placeholder-zinc-400 focus:outline-none focus:bg-white focus:border-zinc-400 transition-all"
              />
            </div>

            {/* Sorting Select */}
            <div className="relative w-full sm:w-auto flex items-center justify-end gap-2 text-xs font-semibold text-zinc-650">
              <span className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-zinc-400">
                <ArrowUpDown className="h-3.5 w-3.5" /> Sort By:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-zinc-50 hover:bg-zinc-100 border border-zinc-200/80 rounded-full py-2 px-4 text-xs font-bold text-zinc-800 focus:outline-none cursor-pointer transition-colors"
              >
                <option value="name">Name (A-Z)</option>
                <option value="priceAsc">Price (Low to High)</option>
                <option value="priceDesc">Price (High to Low)</option>
              </select>
            </div>
          </div>

          {/* Grid Content */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-28 text-zinc-400">
              <Loader2 className="h-8 w-8 animate-spin text-[#967e67] mb-4" />
              <span className="text-xs uppercase font-bold tracking-widest">Loading products...</span>
            </div>
          ) : sortedProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {sortedProducts.map((p) => (
                  <ProductCard key={p.sku} product={p} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-6">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="px-5 py-2.5 bg-white hover:bg-zinc-50 text-xs font-bold uppercase tracking-wider rounded-full border border-zinc-300 text-black disabled:opacity-20 transition-all shadow-sm"
                  >
                    Previous
                  </button>
                  <span className="text-xs text-zinc-500 font-bold uppercase tracking-widest px-4">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                    className="px-5 py-2.5 bg-white hover:bg-zinc-50 text-xs font-bold uppercase tracking-wider rounded-full border border-zinc-300 text-black disabled:opacity-20 transition-all shadow-sm"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-24 text-zinc-400 border border-zinc-200 border-dashed rounded-3xl bg-white shadow-sm flex flex-col items-center justify-center gap-4">
              <span className="text-3xl">📭</span>
              <p className="font-bold text-xs uppercase tracking-widest">No products found matching these criteria.</p>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
