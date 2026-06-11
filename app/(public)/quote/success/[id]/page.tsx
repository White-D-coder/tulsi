'use client';
import { useParams } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import Link from 'next/link';
import { useEffect } from 'react';

export default function QuoteSuccessPage() {
  const params = useParams();
  const id = params.id as string;
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '917878304759';

  // Build direct WhatsApp message
  const waMsg = `Hi Tulsi Office Solution,\n\nI submitted quote request: QT-${id}.\n\nPlease review and share pricing.\nThank you!`;
  const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(waMsg)}`;

  // Clear localstorage cart upon successfully reaching success screen
  useEffect(() => {
    try {
      localStorage.removeItem('cart');
      window.dispatchEvent(new Event('cart-updated'));
    } catch (e) {}
  }, []);

  return (
    <Container className="py-20 text-center max-w-xl mx-auto space-y-6 animate-fade-in">
      <div className="w-16 h-16 bg-zinc-100 text-black rounded-full flex items-center justify-center text-2xl mx-auto border border-zinc-200">
        ✓
      </div>

      <div>
        <h1 className="font-outfit text-2xl font-bold uppercase tracking-widest text-black">Quote Request Received</h1>
        <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 mt-3">
          Your quotation reference number is: <span className="font-mono font-bold text-black bg-zinc-100 border border-zinc-200 px-2.5 py-1 rounded-full">QT-{id}</span>.
        </p>
      </div>

      <p className="text-xs text-zinc-550 leading-relaxed font-medium">
        We have received your request and emailed a confirmation copy to you. To expedite invoicing, click the button below to notify our support team directly via WhatsApp.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-6">
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-grow border border-zinc-355 hover:bg-zinc-50 text-zinc-800 font-bold py-3.5 px-6 rounded-full text-center text-xs uppercase tracking-wider transition-all"
        >
          Verify on WhatsApp
        </a>
        <Link
          href="/products"
          className="flex-grow bg-black hover:bg-zinc-800 text-white font-bold py-3.5 px-6 rounded-full text-center text-xs uppercase tracking-wider transition-all"
        >
          Continue Browsing
        </Link>
      </div>
    </Container>
  );
}
