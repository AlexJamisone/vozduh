import { createTRPCRouter, privetProcedure } from '~/server/api/trpc';

export const favoritesRouter = createTRPCRouter({
	get: privetProcedure.query(async ({ ctx }) => {
		return await ctx.prisma.user.findMany({
			where: {
				id: ctx.userId,
			},
			include: {
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
});
