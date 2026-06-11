import { Rocket, ShieldCheck, MessageCircle } from 'lucide-react';

export function AboutSection() {
  return (
    <section className="bg-white py-20 border-b border-zinc-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
          <h2 className="font-outfit text-2xl font-bold uppercase tracking-widest text-black">Why Partner with Tulsi</h2>
          <div className="h-0.5 w-12 bg-black mx-auto"></div>
          <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">Customised procurement services for modern workspaces.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#fafafa] p-8 rounded-2xl border border-zinc-200 flex gap-4 hover:shadow-sm transition-all">
            <Rocket className="h-6 w-6 text-black flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-outfit font-bold uppercase tracking-wider text-black text-xs">Quick Quotations</h4>
              <p className="text-zinc-500 text-xs mt-2 leading-relaxed">Get comprehensive quotes with tax details, bulk weight pricing, and lead periods delivered straight to your email in minutes.</p>
            </div>
          </div>
          <div className="bg-[#fafafa] p-8 rounded-2xl border border-zinc-200 flex gap-4 hover:shadow-sm transition-all">
            <ShieldCheck className="h-6 w-6 text-black flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-outfit font-bold uppercase tracking-wider text-black text-xs">Standardised Quality</h4>
              <p className="text-zinc-500 text-xs mt-2 leading-relaxed">Every stationery pack, washroom dispenser, housekeeping liquid, and print set complies with standard workspace verification checks.</p>
            </div>
          </div>
          <div className="bg-[#fafafa] p-8 rounded-2xl border border-zinc-200 flex gap-4 hover:shadow-sm transition-all">
            <MessageCircle className="h-6 w-6 text-black flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-outfit font-bold uppercase tracking-wider text-black text-xs">WhatsApp Support</h4>
              <p className="text-zinc-500 text-xs mt-2 leading-relaxed">Chat directly with account executives, modify quantities dynamically, and receive real-time order verification links via Meta templates.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
