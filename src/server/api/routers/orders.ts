import {
	adminProcedure,
	createTRPCRouter,
	privetProcedure,
	publicProcedure,
} from '~/server/api/trpc';

export const ordersRouter = createTRPCRouter({
	getForUsers: privetProcedure.query(async ({ ctx }) => {
		return await ctx.prisma.order.findMany({
			where: {
				userId: ctx.userId,
			},
			orderBy: {
				createdAt: 'desc',
			},
			include: {
				orderItem: {
					include: {
						product: true,
					},
				},
			},
		});
	}),
	getForAdmin: adminProcedure.query(async ({ ctx }) => {
		return await ctx.prisma.order.findMany({
			orderBy: {
				createdAt: 'desc',
			},
		});
	}),
	getIncomeOrder: publicProcedure.query(async ({ ctx }) => {
		const orders = await ctx.prisma.order.findMany({
			where: {
				viewed: false,
			},
		});
		return orders.length;
	}),
});
