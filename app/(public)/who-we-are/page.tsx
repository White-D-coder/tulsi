import { Container } from '@/components/ui/Container';
import { Sparkles, ShieldCheck, Truck, Users } from 'lucide-react';

export const metadata = {
  title: 'Who We Are — Tulsi Office Solution',
  description: 'Learn about Tulsi Office Solution, NCR\'s premier B2B corporate solutions provider simplifying workspace procurement.',
};

export default function WhoWeArePage() {
  return (
    <Container className="py-12 space-y-16">
      {/* Banner / Header Card */}
      <div className="relative overflow-hidden bg-[#f2efe9] border border-zinc-200/50 rounded-3xl p-8 sm:p-12 shadow-sm">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#967e67]/10 to-transparent rounded-full -mr-16 -mt-16 pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#967e67]">Corporate Identity</span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-black leading-tight">
            Who We <span className="italic font-normal">Are</span>
          </h1>
          <p className="text-xs text-zinc-550 leading-relaxed max-w-lg">
            Tulsi Office Solution is NCR's premier B2B corporate partner, standardising procurement across stationery, printing, facilities housekeeping, and washroom solutions.
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-light text-black">
            Simplifying Workspace Supplies
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-zinc-650 leading-relaxed">
            <p className="font-semibold text-black">
              We understand that maintaining a fully stocked, functional office is vital yet time-consuming. From high-quality printing cartridges to bio-degradable housekeeping chemicals, multiple vendor relationships often lead to administration strain.
            </p>
            <p>
              Tulsi was built to solve this exact problem. By cataloging over 140 core workspace products and offering flexible Minimum Order Quantities (MOQ), we provide a single, unified contract that handles everything.
            </p>
            <p>
              Operating out of Noida, UP, we service corporate offices, hospitality zones, and industrial sites across India, ensuring tax-compliant invoicing, fast dispatch timelines, and dedicated support.
            </p>
          </div>
        </div>
        
        {/* Visual Stats Column */}
        <div className="lg:col-span-5 bg-[#967e67] text-white p-8 sm:p-10 rounded-3xl space-y-6 shadow-sm">
          <span className="text-[9px] uppercase font-bold tracking-[0.2.em] text-zinc-200">Our Footprint</span>
          <div className="grid grid-cols-2 gap-6 pt-4">
            <div>
              <h3 className="text-4xl font-light font-serif">140+</h3>
              <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-200 mt-1">Catalogued Items</p>
            </div>
            <div>
              <h3 className="text-4xl font-light font-serif">15+</h3>
              <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-200 mt-1">Major Clients</p>
            </div>
            <div className="col-span-2 h-px bg-white/20 my-2" />
            <div className="col-span-2">
              <h3 className="text-2xl font-light font-serif">PAN-India</h3>
              <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-200 mt-1">Direct Doorstep Delivery</p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="space-y-8">
        <div className="text-center lg:text-left space-y-2">
          <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-400">Our Pillars</span>
          <h2 className="font-serif text-3xl font-light text-black">Core Sourcing Values</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-white border border-zinc-200/60 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-800 flex items-center justify-center">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-lg text-black font-light">Uncompromised Quality</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              We stock only standardised, certified brands like Taski Diversey, Solo, Reynolds, and Kangaroo, ensuring product safety and performance in every delivery.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-zinc-200/60 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-800 flex items-center justify-center">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-lg text-black font-light">Flexible MOQ Policies</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Whether you are restocking a small board room or fitting out a new building, we align minimum order limits to suit your corporate budget.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-zinc-200/60 shadow-sm space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-800 flex items-center justify-center">
              <Truck className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-lg text-black font-light">Reliable Fulfillment</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Equipped with robust logistics partners, we secure dispatch deadlines so your facilities never run short of essential cleaning liquids or printer reams.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
