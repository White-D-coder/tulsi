import { router } from '../server';
import { productRouter } from './product';
import { quoteRouter } from './quote';
import { adminRouter } from './admin';

export const appRouter = router({
  product: productRouter,
  quote: quoteRouter,
  admin: adminRouter,
});

export type AppRouter = typeof appRouter;
