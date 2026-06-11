'use client';
import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export default function CatalogueDownloadPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    // In production, we'd trigger a PDF generation or download
    alert('PDF Catalogue generation simulated. Initiating download...');
    window.open('/static/placeholder.webp', '_blank'); // Mock PDF download
  };

  return (
    <Container className="py-16 max-w-md mx-auto text-center space-y-6">
      <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl flex items-center justify-center text-2xl mx-auto">
        📥
      </div>

      <div>
        <h1 className="font-outfit text-2xl font-extrabold text-white">Download Print Catalogue</h1>
        <p className="text-xs text-slate-400 mt-2">Enter your corporate email address to receive our comprehensive B2B office supplies catalog in PDF format.</p>
      </div>

      {submitted ? (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs font-semibold">
          Thank you! The catalog PDF should open in a new tab shortly.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter corporate email..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 px-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
          <Button type="submit" className="w-full">
            Download Catalogue
          </Button>
        </form>
      )}
    </Container>
  );
}
