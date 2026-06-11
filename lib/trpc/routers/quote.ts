import { z } from 'zod';
import { router, publicProcedure, protectedProcedure } from '../server';
import { prisma } from '@/lib/db';
import { sendWhatsAppToAdmin } from '@/lib/whatsapp/client';
import { sendQuoteConfirmationEmail } from '@/lib/email/resend';

const quoteInputSchema = z.object({
  productSKU: z.string().min(6),
  quantity: z.number().min(1),
  customerName: z.string().min(2),
  customerEmail: z.string().email(),
  customerPhone: z.string().regex(/^[6-9]\d{9}$/),
  message: z.string().optional(),
});

export const quoteRouter = router({
  create: publicProcedure
    .input(quoteInputSchema)
    .mutation(async ({ input }) => {
      // Verify product exists
      const product = await prisma.product.findUnique({
        where: { sku: input.productSKU },
      });
      if (!product) {
        throw new Error('Product not found');
      }

      // Create quote in DB
      const quote = await prisma.quote.create({
        data: {
          productSKU: input.productSKU,
          quantity: input.quantity,
          customerName: input.customerName,
          customerEmail: input.customerEmail,
          customerPhone: input.customerPhone,
          message: input.message,
        },
      });

      // Send notifications asynchronously (don't await)
      sendQuoteConfirmationEmail(quote, product).catch(console.error);
      sendWhatsAppToAdmin(quote, product).catch(console.error);

      return { quoteId: quote.id, success: true };
    }),

  getAll: protectedProcedure.query(async () => {
    return await prisma.quote.findMany({
      include: { product: true },
      orderBy: { createdAt: 'desc' },
    });
  }),

  updateStatus: protectedProcedure
    .input(z.object({ id: z.string(), status: z.enum(['PENDING', 'CONTACTED', 'QUOTED', 'ORDERED', 'EXPIRED']) }))
    .mutation(async ({ input }) => {
      return await prisma.quote.update({
        where: { id: input.id },
        data: { status: input.status },
      });
    }),
});
