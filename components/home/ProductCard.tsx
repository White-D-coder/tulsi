'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { MessageCircle, Plus, Minus, ShoppingCart, Check } from 'lucide-react';
import type { Product } from '@prisma/client';
import { generateWhatsAppLink } from '@/lib/whatsapp/client';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const imagesList = (product.images as any) || [];
  const imageUrl = imagesList[0]?.url || '/static/placeholder.webp';
  const whatsappLink = generateWhatsAppLink(product.sku, product.name);

  // Quantity stepper state
  const [qty, setQty] = useState(product.moq);
  const [added, setAdded] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  const increment = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQty((q) => q + 1);
  };

  const decrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQty((q) => Math.max(product.moq, q - 1));
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existing = cart.find((item: any) => item.sku === product.sku);
      if (existing) {
        existing.quantity += qty;
      } else {
        cart.push({
          sku: product.sku,
          name: product.name,
          price: Number(product.price) || 0,
          thumbnail: imageUrl,
          quantity: qty,
          unit: product.unit,
        });
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('cart-updated'));

      // Flash success state
      setAdded(true);
      setIsInCart(true);
      setTimeout(() => setAdded(false), 1800);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group relative flex flex-col bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden hover:shadow-lg hover:border-zinc-300 transition-all duration-300"
    >
      {/* Image Container */}
      <Link
        href={`/products/${product.sku}`}
        className="relative aspect-square bg-[#faf8f6] flex items-center justify-center border-b border-zinc-100 overflow-hidden"
      >
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* MOQ Badge */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-zinc-700 border border-zinc-200 font-bold text-[9px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
          MOQ {product.moq}
        </span>
        {/* Category Badge */}
        <span className="absolute top-3 right-3 bg-[#967e67]/90 backdrop-blur-sm text-white font-bold text-[9px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
          {product.category}
        </span>
      </Link>

      {/* Info + Controls */}
      <div className="p-4 flex-1 flex flex-col justify-between gap-3">
        {/* Name & SKU */}
        <div>
          <Link href={`/products/${product.sku}`}>
            <h3 className="font-outfit font-bold text-black text-sm line-clamp-2 min-h-[40px] hover:text-[#967e67] transition-colors leading-snug">
              {product.name}
            </h3>
          </Link>
          <p className="text-[9px] font-outfit text-zinc-400 mt-1 tracking-wide">{product.sku}</p>
        </div>

        {/* Price Row */}
        <div className="flex items-center justify-between border-t border-zinc-100 pt-3">
          <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">Est. Price</span>
          <span className="text-sm font-black text-black">
            {product.price ? `₹${Number(product.price).toFixed(0)}` : 'On Quote'}
          </span>
        </div>

        {/* Quantity Stepper + Add Button */}
        <div className="space-y-2">
          {/* Stepper Row */}
          <div className="flex items-center gap-2">
            {/* Minus */}
            <button
              onClick={decrement}
              disabled={qty <= product.moq}
              className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-500 hover:border-zinc-400 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-all flex-shrink-0"
            >
              <Minus className="h-3 w-3" />
            </button>

            {/* Qty Display */}
            <div className="flex-1 h-8 rounded-full bg-zinc-50 border border-zinc-200 flex items-center justify-center relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={qty}
                  initial={{ y: -12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 12, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="absolute text-xs font-bold text-black tabular-nums"
                >
                  {qty} <span className="text-zinc-400 font-medium text-[9px]">{product.unit.toLowerCase()}</span>
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Plus */}
            <button
              onClick={increment}
              className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-500 hover:border-zinc-400 hover:text-black transition-all flex-shrink-0"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            {/* Add to Cart */}
            <motion.button
              onClick={handleAddToCart}
              whileTap={{ scale: 0.95 }}
              className={`relative flex items-center justify-center gap-1.5 rounded-full px-3 py-2.5 text-[10px] font-bold uppercase tracking-wider transition-all duration-300 overflow-hidden ${
                added
                  ? 'bg-emerald-500 text-white'
                  : isInCart
                  ? 'bg-[#7c634d] text-white'
                  : 'bg-[#967e67] hover:bg-[#7c634d] text-white'
              }`}
            >
              <AnimatePresence mode="wait">
                {added ? (
                  <motion.span
                    key="check"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="flex items-center gap-1"
                  >
                    <Check className="h-3 w-3" /> Added!
                  </motion.span>
                ) : (
                  <motion.span
                    key="add"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="flex items-center gap-1"
                  >
                    <ShoppingCart className="h-3 w-3" />
                    {isInCart ? 'Add More' : 'Add'}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* WhatsApp */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50 text-zinc-700 font-bold text-[10px] py-2.5 transition-all gap-1 uppercase tracking-wider"
            >
              <MessageCircle className="h-3 w-3" /> Chat
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
