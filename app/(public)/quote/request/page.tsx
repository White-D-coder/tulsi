'use client';
import { useState, useEffect, Suspense } from 'react';
import { QuoteForm } from '@/components/quote/QuoteForm';
import { Container } from '@/components/ui/Container';

export default function QuoteRequestPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    try {
      const items = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartItems(items);
    } catch (e) {
      setCartItems([]);
    }
  }, []);

  const totalValue = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <Container className="py-12 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
        {/* Quote Form */}
        <div className="md:col-span-3 bg-white border border-zinc-200 rounded-3xl p-6 md:p-8 shadow-sm">
          <Suspense fallback={<div className="text-zinc-400 text-xs font-bold uppercase tracking-widest">Loading Form...</div>}>
            <QuoteForm />
          </Suspense>
        </div>

        {/* Cart/Items Summary */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-[#fafafa] border border-zinc-200 rounded-3xl p-6 shadow-sm">
            <h3 className="font-outfit font-bold text-xs text-black mb-4 uppercase tracking-widest">Cart Summary</h3>
            {cartItems.length > 0 ? (
              <ul className="divide-y divide-zinc-200 max-h-72 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <li key={item.sku} className="py-3 flex items-center gap-3">
                    <div className="h-10 w-10 bg-white border border-zinc-200 rounded flex items-center justify-center p-1">
                      <img src={item.thumbnail || '/static/placeholder.webp'} alt={item.name} className="h-full w-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-black truncate">{item.name}</h4>
                      <p className="text-[9px] font-outfit text-zinc-400 tracking-wide">{item.sku}</p>
                      <span className="text-[10px] text-zinc-500 font-medium">Qty: {item.quantity}</span>
                    </div>
                    <div className="text-right text-xs font-black text-black">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-zinc-550 py-4 font-medium leading-relaxed">No items added to cart. You can request quote for single item using SKU.</p>
            )}
            <div className="border-t border-zinc-200 mt-4 pt-4 flex justify-between items-baseline">
              <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Estimated Total:</span>
              <span className="text-base font-black text-black">₹{totalValue.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
