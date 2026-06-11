'use client';
import { useState } from 'react';
import { trpc } from '@/lib/trpc/client';
import { Button } from '@/components/ui/Button';

export default function AdminProductsPage() {
  const utils = trpc.useUtils();
  const { data } = trpc.product.getAll.useQuery({ limit: 100 });
  const products = data?.products || [];

  const [sku, setSku] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState<'ST' | 'HK' | 'PR' | 'WF' | 'MS'>('ST');
  const [unit, setUnit] = useState<'PIECE' | 'BOX' | 'PACK' | 'ROLL' | 'SET'>('PIECE');
  const [moq, setMoq] = useState(1);
  const [desc, setDesc] = useState('');

  const createMutation = trpc.admin.createProduct.useMutation({
    onSuccess: () => {
      utils.product.getAll.invalidate();
      // Reset form
      setSku('');
      setName('');
      setPrice(0);
      setMoq(1);
      setDesc('');
      alert('Product created successfully!');
    }
  });

  const deleteMutation = trpc.admin.deleteProduct.useMutation({
    onSuccess: () => {
      utils.product.getAll.invalidate();
      alert('Product deleted!');
    }
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sku || !name) return;
    createMutation.mutate({
      sku,
      name,
      price,
      category,
      unit,
      moq,
      description: desc,
      images: [],
      tags: []
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-outfit text-2xl font-bold uppercase tracking-widest text-black">Product Inventory</h1>
          <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 mt-2">Manage B2B wholesale items.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <form onSubmit={handleCreate} className="bg-white border border-zinc-200 p-6 rounded-2xl space-y-4 shadow-sm">
          <h3 className="font-outfit font-bold text-[10px] uppercase tracking-widest text-zinc-400 mb-4">Add Product</h3>
          
          <div>
            <label className="block text-[9px] font-bold uppercase tracking-wider text-zinc-400 mb-1">SKU</label>
            <input
              type="text"
              required
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              className="w-full bg-white border border-zinc-300 rounded-full py-2.5 px-4 text-xs text-black focus:outline-none focus:border-black font-mono"
            />
          </div>

          <div>
            <label className="block text-[9px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white border border-zinc-300 rounded-full py-2.5 px-4 text-xs text-black focus:outline-none focus:border-black"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[9px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full bg-white border border-zinc-300 rounded-full py-2.5 px-4 text-xs text-black focus:outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="block text-[9px] font-bold uppercase tracking-wider text-zinc-400 mb-1">MOQ</label>
              <input
                type="number"
                value={moq}
                onChange={(e) => setMoq(Number(e.target.value))}
                className="w-full bg-white border border-zinc-300 rounded-full py-2.5 px-4 text-xs text-black focus:outline-none focus:border-black"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[9px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-white border border-zinc-300 rounded-full py-2.5 px-4 text-xs text-black focus:outline-none"
              >
                <option value="ST">ST (Stationery)</option>
                <option value="HK">HK (Housekeeping)</option>
                <option value="PR">PR (Printing)</option>
                <option value="WF">WF (Washroom)</option>
                <option value="MS">MS (Machines)</option>
              </select>
            </div>
            <div>
              <label className="block text-[9px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Unit</label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value as any)}
                className="w-full bg-white border border-zinc-300 rounded-full py-2.5 px-4 text-xs text-black focus:outline-none"
              >
                <option value="PIECE">PIECE</option>
                <option value="BOX">BOX</option>
                <option value="PACK">PACK</option>
                <option value="ROLL">ROLL</option>
                <option value="SET">SET</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[9px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Description</label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full bg-white border border-zinc-300 rounded-2xl py-2.5 px-4 text-xs text-black focus:outline-none resize-none"
              rows={3}
            ></textarea>
          </div>

          <Button type="submit" className="w-full py-3.5 rounded-full">
            Save Product
          </Button>
        </form>

        {/* List */}
        <div className="lg:col-span-2 bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#fafafa] font-bold uppercase tracking-widest text-[9px] text-zinc-500 border-b border-zinc-200">
                <tr>
                  <th className="p-4">SKU</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">MOQ</th>
                  <th className="p-4">Price</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {products.map((p) => (
                  <tr key={p.sku} className="hover:bg-zinc-50 transition-colors">
                    <td className="p-4 font-mono font-bold text-black">{p.sku}</td>
                    <td className="p-4 truncate max-w-xs">{p.name}</td>
                    <td className="p-4">{p.moq} {p.unit.toLowerCase()}</td>
                    <td className="p-4 font-bold">{p.price ? `₹${Number(p.price).toFixed(2)}` : 'Quote'}</td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => {
                          if (confirm('Delete this product?')) {
                            deleteMutation.mutate({ sku: p.sku });
                          }
                        }}
                        className="text-red-650 hover:text-red-800 font-bold px-2 uppercase tracking-wider text-[10px]"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
