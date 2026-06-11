'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { useSearchParams, useRouter } from 'next/navigation';
import { trpc } from '@/lib/trpc/client';

const quoteSchema = z.object({
  productSKU: z.string().min(1, 'Product SKU is required'),
  quantity: z.coerce.number().min(1, 'Quantity must be at least 1'),
  customerName: z.string().min(2, 'Name must be at least 2 characters'),
  customerEmail: z.string().email('Please enter a valid email address'),
  customerPhone: z.string().regex(/^[6-9]\d{9}$/, 'Must be a valid 10-digit phone number starting with 6-9'),
  message: z.string().optional(),
});

type QuoteFormValues = z.infer<typeof quoteSchema>;

export function QuoteForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const { register, handleSubmit, formState: { errors } } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      productSKU: searchParams.get('sku') || '',
      quantity: Number(searchParams.get('quantity')) || 1,
    },
  });

  const mutation = trpc.quote.create.useMutation({
    onSuccess: (data) => {
      router.push(`/quote/success/${data.quoteId}`);
    },
  });

  const onSubmit = (data: QuoteFormValues) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-[9px] font-bold uppercase tracking-widest text-zinc-400 mb-1.5">
          Product SKU *
        </label>
        <input
          type="text"
          {...register('productSKU')}
          className="w-full bg-white border border-zinc-300 rounded-full py-3 px-5 text-xs text-black focus:outline-none focus:border-black transition-colors font-mono"
          placeholder="e.g. TOS-ST-001"
        />
        {errors.productSKU && (
          <p className="text-[9px] font-bold uppercase tracking-wider text-red-650 mt-1.5">{errors.productSKU.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[9px] font-bold uppercase tracking-widest text-zinc-400 mb-1.5">
            Quantity Required *
          </label>
          <input
            type="number"
            {...register('quantity')}
            className="w-full bg-white border border-zinc-300 rounded-full py-3 px-5 text-xs text-black focus:outline-none focus:border-black transition-colors"
          />
          {errors.quantity && (
            <p className="text-[9px] font-bold uppercase tracking-wider text-red-650 mt-1.5">{errors.quantity.message}</p>
          )}
        </div>

        <div>
          <label className="block text-[9px] font-bold uppercase tracking-widest text-zinc-400 mb-1.5">
            WhatsApp Phone Number *
          </label>
          <input
            type="tel"
            {...register('customerPhone')}
            placeholder="e.g. 9876543210"
            className="w-full bg-white border border-zinc-300 rounded-full py-3 px-5 text-xs text-black focus:outline-none focus:border-black transition-colors"
          />
          {errors.customerPhone && (
            <p className="text-[9px] font-bold uppercase tracking-wider text-red-650 mt-1.5">{errors.customerPhone.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[9px] font-bold uppercase tracking-widest text-zinc-400 mb-1.5">
            Full / Corporate Name *
          </label>
          <input
            type="text"
            {...register('customerName')}
            className="w-full bg-white border border-zinc-300 rounded-full py-3 px-5 text-xs text-black focus:outline-none focus:border-black transition-colors"
          />
          {errors.customerName && (
            <p className="text-[9px] font-bold uppercase tracking-wider text-red-650 mt-1.5">{errors.customerName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-[9px] font-bold uppercase tracking-widest text-zinc-400 mb-1.5">
            Corporate Email Address *
          </label>
          <input
            type="email"
            {...register('customerEmail')}
            className="w-full bg-white border border-zinc-300 rounded-full py-3 px-5 text-xs text-black focus:outline-none focus:border-black transition-colors"
          />
          {errors.customerEmail && (
            <p className="text-[9px] font-bold uppercase tracking-wider text-red-650 mt-1.5">{errors.customerEmail.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-[9px] font-bold uppercase tracking-widest text-zinc-400 mb-1.5">
          Special Delivery Instructions / Notes
        </label>
        <textarea
          {...register('message')}
          rows={4}
          placeholder="Mention custom printing specs, MOQ adjustments or corporate billing terms..."
          className="w-full bg-white border border-zinc-300 rounded-2xl py-3 px-5 text-xs text-black focus:outline-none focus:border-black transition-colors resize-none"
        ></textarea>
      </div>

      {mutation.error && (
        <p className="text-[10px] font-bold uppercase tracking-wider text-red-650 bg-red-50 p-4 rounded-xl border border-red-200">
          Error: {mutation.error.message}
        </p>
      )}

      <Button type="submit" disabled={mutation.isPending} className="w-full py-4 rounded-full">
        {mutation.isPending ? 'Submitting...' : 'Submit Quote Request'}
      </Button>
    </form>
  );
}
