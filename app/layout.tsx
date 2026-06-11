import type { Metadata } from 'next';
import { TRPCProvider } from '@/components/providers/TRPCProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'TULSI OFFICE SOLUTION – Office & Housekeeping Supplies',
  description: 'Premium stationery, housekeeping, printing, and facility supplies. Bulk orders. PAN India delivery.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light">
      <body className="bg-[#faf8f6] text-[#2c2a29]">
        <TRPCProvider>{children}</TRPCProvider>
      </body>
    </html>
  );
}
