import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#faf8f6] text-[#2c2a29]">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
