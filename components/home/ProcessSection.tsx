'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, ClipboardList, MessageCircle, Truck } from 'lucide-react';

const STEPS = [
  {
    num: '01',
    title: 'Browse Bulk Catalogue',
    short: 'Discover products',
    desc: 'Explore our categorised wholesale inventory of stationery, facility housekeeping liquids, washer dispensers, and machinery. Search easily by SKU code or product name.',
    icon: Search,
    color: 'from-amber-500/20 to-amber-600/5',
    iconColor: 'text-amber-700 bg-amber-500/15',
    accentColor: '#c49a3c',
  },
  {
    num: '02',
    title: 'Add MOQ-Compliant Items',
    short: 'Build your cart',
    desc: 'B2B sourcing operates on Minimum Order Quantity parameters. Verify item MOQ rules on the product details screens before staging your request in the sourcing cart.',
    icon: ShoppingCart,
    color: 'from-emerald-500/20 to-emerald-600/5',
    iconColor: 'text-emerald-700 bg-emerald-500/15',
    accentColor: '#2d9e6b',
  },
  {
    num: '03',
    title: 'Submit Sourcing Cart',
    short: 'Review & confirm',
    desc: 'Review your selected items inside the sourcing cart. Modify amounts dynamically and fill in your company delivery and billing addresses before submitting.',
    icon: ClipboardList,
    color: 'from-blue-500/20 to-blue-600/5',
    iconColor: 'text-blue-700 bg-blue-500/15',
    accentColor: '#3b7dd8',
  },
  {
    num: '04',
    title: 'Verify via WhatsApp',
    short: 'Confirm pricing',
    desc: 'Receive an immediate WhatsApp chat verification link to align on custom pricing adjustments, bulk discounts, and delivery timelines with our dedicated support team.',
    icon: MessageCircle,
    color: 'from-violet-500/20 to-violet-600/5',
    iconColor: 'text-violet-700 bg-violet-500/15',
    accentColor: '#8b5cf6',
  },
  {
    num: '05',
    title: 'Doorstep Bulk Delivery',
    short: 'Receive your order',
    desc: 'Receive formal GST-compliant tax invoices and track your order delivery. Enjoy direct PAN-India doorstep delivery with dedicated logistics to your corporate facility.',
    icon: Truck,
    color: 'from-rose-500/20 to-rose-600/5',
    iconColor: 'text-rose-700 bg-rose-500/15',
    accentColor: '#e54b6a',
  }
];

export function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);

  const active = STEPS[activeStep];
  const ActiveIcon = active.icon;

  return (
    <section id="sourcing-process" className="px-4 sm:px-6 lg:px-8 py-20 bg-[#faf8f6]">
      <div className="mx-auto max-w-7xl space-y-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-[#967e67]" />
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-zinc-400">Our Sourcing Model</span>
            </div>
            <h2 className="font-serif text-4xl font-light text-black">
              How We Simplify <span className="italic">Sourcing</span>
            </h2>
          </div>
          <p className="text-xs text-zinc-400 max-w-xs leading-relaxed font-medium">
            From browse to doorstep in 5 streamlined steps, built for modern B2B operations.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

          {/* Left: Step List */}
          <div className="lg:col-span-5 flex flex-col gap-2">
            {STEPS.map((step, idx) => {
              const StepIcon = step.icon;
              const isActive = activeStep === idx;
              return (
                <button
                  key={step.num}
                  onMouseEnter={() => setActiveStep(idx)}
                  onClick={() => setActiveStep(idx)}
                  className={`group w-full text-left rounded-2xl border transition-all duration-300 flex items-start gap-4 overflow-hidden ${
                    isActive
                      ? 'bg-white border-zinc-200/80 shadow-md p-5'
                      : 'bg-transparent border-transparent hover:bg-white/70 hover:border-zinc-200/60 hover:shadow-sm p-5'
                  }`}
                >
                  {/* Number + Icon */}
                  <div className={`flex-shrink-0 flex flex-col items-center gap-1 transition-all duration-300`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black transition-all duration-300 ${
                      isActive ? step.iconColor : 'bg-zinc-100 text-zinc-500 group-hover:bg-zinc-200'
                    }`}>
                      <StepIcon className="h-4 w-4" />
                    </div>
                    <span className={`text-[9px] font-black tabular-nums transition-colors ${isActive ? 'text-zinc-400' : 'text-zinc-300'}`}>
                      {step.num}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className={`font-outfit font-bold text-sm transition-colors ${isActive ? 'text-black' : 'text-zinc-600 group-hover:text-zinc-800'}`}>
                        {step.title}
                      </h4>
                      {!isActive && (
                        <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-300 group-hover:text-zinc-400 shrink-0 transition-colors">
                          {step.short}
                        </span>
                      )}
                    </div>

                    <AnimatePresence>
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          transition={{ duration: 0.25, ease: 'easeOut' }}
                          className="text-xs text-zinc-500 leading-relaxed"
                        >
                          {step.desc}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Active Indicator line */}
                  {isActive && (
                    <motion.div
                      layoutId="activeBar"
                      className="absolute left-0 top-0 h-full w-[3px] rounded-full"
                      style={{ backgroundColor: active.accentColor }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right: Preview Showcase */}
          <div className="lg:col-span-7 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="h-full"
              >
                <div className={`rounded-[2rem] bg-gradient-to-br ${active.color} border border-zinc-200/50 p-10 sm:p-12 h-full min-h-[380px] flex flex-col justify-between relative overflow-hidden`}>

                  {/* Background number watermark */}
                  <div
                    className="absolute right-6 top-6 font-black text-[120px] leading-none select-none pointer-events-none"
                    style={{ color: active.accentColor, opacity: 0.06 }}
                  >
                    {active.num}
                  </div>

                  <div className="space-y-6 relative z-10">
                    {/* Step Label */}
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${active.iconColor}`}>
                        <ActiveIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-zinc-400">
                          Step {active.num}
                        </span>
                        <p className="text-xs font-bold uppercase tracking-wider text-zinc-600">{active.short}</p>
                      </div>
                    </div>

                    {/* Main Content */}
                    <div className="space-y-3">
                      <h3 className="font-serif text-3xl sm:text-4xl font-light text-black leading-tight">
                        {active.title}
                      </h3>
                      <p className="text-sm text-zinc-600 leading-relaxed max-w-lg">
                        {active.desc}
                      </p>
                    </div>
                  </div>

                  {/* Step Progress Dots */}
                  <div className="flex items-center gap-2 relative z-10 mt-8">
                    {STEPS.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveStep(i)}
                        className="transition-all duration-300"
                        style={{
                          width: i === activeStep ? 24 : 6,
                          height: 6,
                          borderRadius: 9999,
                          backgroundColor: i === activeStep ? active.accentColor : '#d4d4d8',
                        }}
                      />
                    ))}
                    <span className="ml-2 text-[9px] uppercase font-bold tracking-wider text-zinc-400">
                      {activeStep + 1} / {STEPS.length}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
