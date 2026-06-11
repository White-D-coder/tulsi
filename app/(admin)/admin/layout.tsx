import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-950 flex flex-col">
      <header className="border-b border-zinc-200 bg-white py-4 px-6 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="font-outfit font-black text-lg tracking-widest text-black uppercase">
            TULSI ADMIN
          </Link>
          <nav className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
            <Link href="/admin/products" className="hover:text-black transition-colors">Products</Link>
            <Link href="/admin/quotes" className="hover:text-black transition-colors">Quotes</Link>
          </nav>
        </div>
        <Link href="/" className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 hover:text-black underline">
          View Storefront
        </Link>
      </header>
      <main className="flex-grow p-6 md:p-10">{children}</main>
    </div>
  );
}
