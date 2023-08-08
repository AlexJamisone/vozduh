import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import {
	createTRPCRouter,
	privetProcedure,
	publicProcedure,
} from '~/server/api/trpc';
import { ratelimit } from '~/server/helpers/ratelimit';

export const favoritesRouter = createTRPCRouter({
	get: publicProcedure.query(async ({ ctx }) => {
		if (!ctx.userId) return null;
		return await ctx.prisma.user.findUnique({
			where: {
				id: ctx.userId,
			},
			select: {
				favorites: {
					where: {
						product: {
							NOT: {
								archived: true,
							},
						},
					},
				},
			},
		});
	}),
	favoritesProducts: privetProcedure.query(async ({ ctx }) => {
		return ctx.prisma.user.findUnique({
			where: {
				id: ctx.userId,
			},
			select: {
				favorites: {
					select: {
						product: {
							include: {
								priceHistory: {
									orderBy: {
										effectiveFrom: 'desc',
									},
								},
								size: true,
								additionalServices: {
									include: {
										additionalServicesOption: true,
									},
								},
							},
						},
					},
				},
			},
		});
	}),
	countOfFavorites: publicProcedure.query(async ({ ctx, input }) => {
		if (!ctx.userId) return null;
		const count = await ctx.prisma.favorites.findMany({
			where: {
				userId: ctx.userId,
			},
		});
		return count.length;
	}),
	addOrRemove: privetProcedure
		.input(
			z.object({
				id: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			if (!ctx.userId) throw new TRPCError({ code: 'UNAUTHORIZED' });
			const { success } = await ratelimit.favorites.limit(ctx.userId);
			if (!success)
				throw new TRPCError({
					code: 'TOO_MANY_REQUESTS',
					message: 'Слишком много запросов❌',
				});
			const existingFav = await ctx.prisma.favorites.findUnique({
				where: {
					productId: input.id,
				},
			});
			if (!existingFav) {
				return await ctx.prisma.favorites.create({
					data: {
						productId: input.id,
						userId: ctx.userId,
					},
				});
			} else {
				return await ctx.prisma.favorites.delete({
					where: {
						productId: input.id,
					},
				});
			}
		}),
});
