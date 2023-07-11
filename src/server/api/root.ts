import { userRouter } from '~/server/api/routers/user';
import { createTRPCRouter } from '~/server/api/trpc';
import { addressRouter } from './routers/address';
import { categorysRouter } from './routers/categorys';
import { cdekRouter } from './routers/cdek';
import { favoritesRouter } from './routers/favorites';
import { ordersRouter } from './routers/orders';
import { productRouter } from './routers/product';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	user: userRouter,
	address: addressRouter,
	categorys: categorysRouter,
	cdek: cdekRouter,
	order: ordersRouter,
	favorites: favoritesRouter,
	product: productRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
