'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { trpc } from '@/lib/trpc/client';
import { Container } from '@/components/ui/Container';
import { MessageCircle, ShoppingCart, ArrowLeft, Plus, Minus, Check, Loader2 } from 'lucide-react';
import { generateWhatsAppLink } from '@/lib/whatsapp/client';
import Link from 'next/link';

export default function ProductDetailPage() {
  const params = useParams();
  const sku = params.sku as string;
  const [tab, setTab] = useState<'details' | 'specs'>('details');
  const [qty, setQty] = useState<number | null>(null); // null = not yet loaded
  const [added, setAdded] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  const { data: product, isLoading, error } = trpc.product.getBySKU.useQuery(
    { sku },
    {
      onSuccess: (p) => {
        if (qty === null) setQty(p.moq);
      },
    }
  );

  if (isLoading) {
    return (
      <Container className="py-28 flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-[#967e67]" />
        <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest">Loading product...</p>
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container className="py-20 text-center text-red-500 font-bold uppercase tracking-wider text-xs">
        Product not found.
      </Container>
    );
  }

  const imagesList = (product.images as any) || [];
  const imageUrl = imagesList[0]?.url || '/static/placeholder.webp';
  const whatsappLink = generateWhatsAppLink(product.sku, product.name);
  const currentQty = qty ?? product.moq;

  const increment = () => setQty((q) => (q ?? product.moq) + 1);
  const decrement = () => setQty((q) => Math.max(product.moq, (q ?? product.moq) - 1));

  const handleAddToCart = () => {
    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existing = cart.find((item: any) => item.sku === product.sku);
      if (existing) {
        existing.quantity += currentQty;
      } else {
        cart.push({
          sku: product.sku,
          name: product.name,
          price: Number(product.price) || 0,
          thumbnail: imageUrl,
          quantity: currentQty,
          unit: product.unit,
        });
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('cart-updated'));
      setAdded(true);
      setIsInCart(true);
      setTimeout(() => setAdded(false), 1800);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container className="py-12">
      <Link
        href="/products"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-black mb-8 transition-colors group"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to Catalogue
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded-3xl border border-zinc-200/60 p-6 md:p-10 shadow-sm">

        {/* ── Left: Image Panel ── */}
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square rounded-2xl bg-[#faf8f6] border border-zinc-200/60 overflow-hidden flex items-center justify-center">
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full h-full object-contain p-8 transition-transform duration-500 hover:scale-105"
            />
            {/* Badges */}
            <span className="absolute top-4 left-4 bg-white border border-zinc-200 shadow-sm text-zinc-700 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider">
              MOQ {product.moq} {product.unit.toLowerCase()}
            </span>
            <span className="absolute top-4 right-4 bg-[#967e67] text-white px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider">
              {product.category}
            </span>
          </div>
        </div>

        {/* ── Right: Info & Controls ── */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">
              {product.category} · {product.unit}
            </span>
            <h1 className="font-serif text-3xl font-light text-black leading-tight">
              {product.name}
            </h1>
            <p className="text-[9px] font-outfit text-zinc-400 tracking-wide">{product.sku}</p>
          </div>

          {/* Price Card */}
          <div className="p-5 rounded-2xl bg-[#f2efe9] border border-zinc-200/60 flex items-center justify-between">
            <div>
              <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Estimated Bulk Price</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-black text-black">
                  {product.price ? `₹${Number(product.price).toFixed(0)}` : 'Contact for pricing'}
                </span>
                <span className="text-xs text-zinc-400 font-bold">/ {product.unit.toLowerCase()}</span>
              </div>
            </div>
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider">
              In Stock
            </span>
          </div>

          {/* Tabs */}
          <div className="border-t border-zinc-200 pt-5">
            <div className="flex gap-6 border-b border-zinc-100 pb-2 mb-4">
              {(['details', 'specs'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`text-[10px] font-bold uppercase tracking-widest pb-1.5 transition-colors border-b-2 -mb-2 ${
                    tab === t ? 'border-[#967e67] text-[#967e67]' : 'border-transparent text-zinc-400 hover:text-zinc-700'
                  }`}
                >
                  {t === 'details' ? 'Description' : 'Specifications'}
                </button>
              ))}
            </div>
            <div className="text-xs leading-relaxed text-zinc-600 min-h-[80px]">
              {tab === 'details' ? (
                <div className="space-y-3">
                  <p>{product.description || 'No description provided.'}</p>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 bg-zinc-50 p-3 rounded-xl border border-zinc-200">
                    Min. wholesale dispatch: {product.moq} {product.unit.toLowerCase()}(s)
                  </div>
                </div>
              ) : (
                <div className="divide-y divide-zinc-100">
                  {[
                    ['Unit Type', product.unit.toLowerCase()],
                    ['Min Order', `${product.moq} units`],
                    ['Category', product.category],
                    ...(product.weight ? [['Weight', `${product.weight} g`]] : []),
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between py-2.5">
                      <span className="font-bold text-zinc-400 uppercase tracking-wider text-[9px]">{label}</span>
                      <span className="font-bold text-zinc-800 text-xs capitalize">{value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── Quantity Stepper ── */}
          <div className="space-y-3 pt-2 border-t border-zinc-100">
            <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">Quantity</p>
            <div className="flex items-center gap-3">
              <button
                onClick={decrement}
                disabled={currentQty <= product.moq}
                className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-500 hover:border-zinc-400 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <Minus className="h-4 w-4" />
              </button>

              <div className="flex-1 h-10 rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentQty}
                    initial={{ y: -14, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 14, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="absolute text-sm font-bold text-black tabular-nums"
                  >
                    {currentQty} <span className="text-zinc-400 font-medium text-xs">{product.unit.toLowerCase()}</span>
                  </motion.span>
                </AnimatePresence>
              </div>

              <button
                onClick={increment}
                className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-500 hover:border-zinc-400 hover:text-black transition-all"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <motion.button
                onClick={handleAddToCart}
                whileTap={{ scale: 0.96 }}
                className={`flex items-center justify-center gap-2 rounded-full py-3.5 text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                  added
                    ? 'bg-emerald-500 text-white'
                    : isInCart
                    ? 'bg-[#7c634d] text-white'
                    : 'bg-[#967e67] hover:bg-[#7c634d] text-white'
                }`}
              >
                <AnimatePresence mode="wait">
                  {added ? (
                    <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-1.5">
                      <Check className="h-4 w-4" /> Added!
                    </motion.span>
                  ) : (
                    <motion.span key="add" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-1.5">
                      <ShoppingCart className="h-4 w-4" /> {isInCart ? 'Add More' : 'Add to Cart'}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <Link
                href={`/quote/request?sku=${product.sku}&quantity=${currentQty}`}
                className="inline-flex items-center justify-center rounded-full bg-transparent hover:bg-zinc-50 text-zinc-800 border border-zinc-300 font-bold py-3.5 text-xs uppercase tracking-widest transition-colors"
              >
                Request Quote
              </Link>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-zinc-300 hover:bg-zinc-50 text-zinc-800 font-bold py-3.5 text-xs uppercase tracking-widest gap-1.5 transition-colors"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
