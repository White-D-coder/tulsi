import { HeroSection } from '@/components/home/HeroSection';
import { WhoWeAreSection } from '@/components/home/WhoWeAreSection';
import { CategoryGridSection } from '@/components/home/CategoryGridSection';
import { ProcessSection } from '@/components/home/ProcessSection';
import { ProductCollection } from '@/components/home/ProductCollection';
import { LowGridSection } from '@/components/home/LowGridSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhoWeAreSection />
      <CategoryGridSection />
      <ProcessSection />
      <ProductCollection />
      <LowGridSection />
    </>
  );
}
