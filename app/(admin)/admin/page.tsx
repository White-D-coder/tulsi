'use client';
import { trpc } from '@/lib/trpc/client';
import Link from 'next/link';

export default function AdminPage() {
  const { data: quotesData } = trpc.quote.getAll.useQuery();
  const { data: productsData } = trpc.product.getAll.useQuery({ limit: 1 });

  const quotesCount = quotesData?.length || 0;
  const productsCount = productsData?.total || 0;

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="font-outfit text-2xl font-bold uppercase tracking-widest text-black">Dashboard Overview</h1>
        <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 mt-2">Quick statistics and operational links for B2B operations.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white border border-zinc-200 rounded-2xl p-6 space-y-2 shadow-sm">
          <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">Products in Stock</span>
          <div className="text-3xl font-black text-black">{productsCount}</div>
          <Link href="/admin/products" className="inline-block text-xs font-bold text-zinc-700 hover:text-black hover:underline uppercase tracking-wider">
            Manage Products {"->"}
          </Link>
        </div>

        <div className="bg-white border border-zinc-200 rounded-2xl p-6 space-y-2 shadow-sm">
          <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">Corporate Quotes</span>
          <div className="text-3xl font-black text-black">{quotesCount}</div>
          <Link href="/admin/quotes" className="inline-block text-xs font-bold text-zinc-700 hover:text-black hover:underline uppercase tracking-wider">
            Review Enquiries {"->"}
          </Link>
        </div>
      </div>
    </div>
  );
}
