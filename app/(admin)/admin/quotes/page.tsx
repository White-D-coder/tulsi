'use client';
import { trpc } from '@/lib/trpc/client';

export default function AdminQuotesPage() {
  const utils = trpc.useUtils();
  const { data: quotes, isLoading } = trpc.quote.getAll.useQuery();

  const updateMutation = trpc.quote.updateStatus.useMutation({
    onSuccess: () => {
      utils.quote.getAll.invalidate();
      alert('Quote status updated!');
    }
  });

  const handleStatusChange = (id: string, status: any) => {
    updateMutation.mutate({ id, status });
  };

  if (isLoading) {
    return <div className="text-center py-20 text-zinc-500 text-xs font-bold uppercase tracking-widest">Loading quote requests...</div>;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-outfit text-2xl font-bold uppercase tracking-widest text-black">Quotation Requests</h1>
        <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 mt-2">Review B2B customer requests, verify contact details, and update process status.</p>
      </div>

      <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-[#fafafa] font-bold uppercase tracking-widest text-[9px] text-zinc-500 border-b border-zinc-200">
              <tr>
                <th className="p-4">Customer</th>
                <th className="p-4">SKU / Item</th>
                <th className="p-4">Quantity</th>
                <th className="p-4">Message</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {quotes?.map((q) => (
                <tr key={q.id} className="hover:bg-zinc-50 transition-colors">
                  <td className="p-4 space-y-0.5">
                    <div className="font-bold text-black">{q.customerName}</div>
                    <div className="text-zinc-500 text-[10px]">{q.customerEmail}</div>
                    <div className="text-zinc-500 text-[10px]">{q.customerPhone}</div>
                  </td>
                  <td className="p-4">
                    <span className="font-mono font-bold text-black bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200 text-xxs">
                      {q.productSKU}
                    </span>
                    <div className="text-zinc-500 text-[10px] truncate max-w-xs mt-1">{q.product.name}</div>
                  </td>
                  <td className="p-4 font-semibold text-black">{q.quantity} unit(s)</td>
                  <td className="p-4 text-zinc-600 max-w-xs truncate">{q.message || '—'}</td>
                  <td className="p-4 text-zinc-400 font-mono text-xxs">
                    {new Date(q.createdAt).toLocaleString()}
                  </td>
                  <td className="p-4">
                    <select
                      value={q.status}
                      onChange={(e) => handleStatusChange(q.id, e.target.value as any)}
                      className={`bg-white border rounded py-1 px-2.5 text-[10px] font-bold uppercase tracking-wider focus:outline-none cursor-pointer ${
                        q.status === 'PENDING' ? 'text-amber-600 border-amber-300 bg-amber-50' :
                        q.status === 'CONTACTED' ? 'text-blue-600 border-blue-300 bg-blue-50' :
                        q.status === 'QUOTED' ? 'text-emerald-600 border-emerald-300 bg-emerald-50' :
                        'text-zinc-500 border-zinc-300 bg-zinc-50'
                      }`}
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="CONTACTED">CONTACTED</option>
                      <option value="QUOTED">QUOTED</option>
                      <option value="ORDERED">ORDERED</option>
                      <option value="EXPIRED">EXPIRED</option>
                    </select>
                  </td>
                </tr>
              ))}
              {(!quotes || quotes.length === 0) && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
                    No quote requests available yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
