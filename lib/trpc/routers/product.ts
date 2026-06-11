import { z } from 'zod';
import { router, publicProcedure } from '../server';
import { prisma } from '@/lib/db';

export const productRouter = router({
  getAll: publicProcedure
    .input(
      z.object({
        category: z.enum(['ST', 'HK', 'PR', 'WF', 'MS']).optional(),
        search: z.string().optional(),
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(100).default(20),
        inStock: z.boolean().optional(),
      })
    )
    .query(async ({ input }) => {
      const { category, search, page, limit, inStock } = input;
      const skip = (page - 1) * limit;

      const where: any = {};
      if (category) where.category = category;
      if (inStock !== undefined) where.inStock = inStock;
      if (search) {
        where.OR = [
          { name: { contains: search, mode: 'insensitive' } },
          { sku: { contains: search, mode: 'insensitive' } },
        ];
      }

      const [products, total] = await Promise.all([
        prisma.product.findMany({
          where,
          skip,
          take: limit,
          orderBy: { name: 'asc' },
        }),
        prisma.product.count({ where }),
      ]);

      return { products, total, page, limit, totalPages: Math.ceil(total / limit) };
    }),

  getBySKU: publicProcedure
    .input(z.object({ sku: z.string().min(6) }))
    .query(async ({ input }) => {
      const product = await prisma.product.findUnique({
        where: { sku: input.sku },
      });
      if (!product) throw new Error('Product not found');
      return product;
    }),

  getStats: publicProcedure.query(async () => {
    const [total, byCategory] = await Promise.all([
      prisma.product.count(),
      prisma.product.groupBy({
        by: ['category'],
        _count: { category: true },
      }),
    ]);

    const categoryMap: Record<string, number> = {};
    for (const row of byCategory) {
      categoryMap[row.category] = row._count.category;
    }

    return {
      totalProducts: total,
      categories: Object.keys(categoryMap).length,
      categoryBreakdown: categoryMap,
      // static business metrics (can be moved to DB/env later)
      corporateClients: 15,
    };
  }),
});
