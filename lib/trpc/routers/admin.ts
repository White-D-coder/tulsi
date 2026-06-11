import { z } from 'zod';
import { router, protectedProcedure } from '../server';
import { prisma } from '@/lib/db';

const productInputSchema = z.object({
  sku: z.string().min(6).max(15),
  name: z.string().min(2).max(200),
  description: z.string().optional(),
  category: z.enum(['ST', 'HK', 'PR', 'WF', 'MS']),
  subcategory: z.string().optional(),
  brand: z.string().optional(),
  unit: z.enum(['PIECE', 'BOX', 'PACK', 'ROLL', 'SET']).default('PIECE'),
  moq: z.number().min(1).default(1),
  price: z.number().optional(),
  discountPrice: z.number().optional(),
  inStock: z.boolean().default(true),
  stockQuantity: z.number().default(0),
  images: z.array(z.object({
    url: z.string(),
    alt: z.string(),
    isPrimary: z.boolean()
  })).default([]),
  tags: z.array(z.string()).default([]),
});

export const adminRouter = router({
  createProduct: protectedProcedure
    .input(productInputSchema)
    .mutation(async ({ input }) => {
      return await prisma.product.create({
        data: input
      });
    }),

  updateProduct: protectedProcedure
    .input(z.object({
      sku: z.string(),
      data: productInputSchema.partial()
    }))
    .mutation(async ({ input }) => {
      return await prisma.product.update({
        where: { sku: input.sku },
        data: input.data as any
      });
    }),

  deleteProduct: protectedProcedure
    .input(z.object({ sku: z.string() }))
    .mutation(async ({ input }) => {
      return await prisma.product.delete({
        where: { sku: input.sku }
      });
    }),

  bulkUpload: protectedProcedure
    .input(z.array(productInputSchema))
    .mutation(async ({ input }) => {
      const operations = input.map(item => 
        prisma.product.upsert({
          where: { sku: item.sku },
          update: item as any,
          create: item as any
        })
      );
      await Promise.all(operations);
      return { success: true, count: input.length };
    })
});
