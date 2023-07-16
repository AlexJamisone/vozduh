import { OrderStatus } from '@prisma/client';
import { z } from 'zod';
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
			include: {
				address: {
					include: {
						point: true,
					},
				},
				orderItem: {
					include: {
						product: {
							include: {
								priceHistory: true,
							},
						},
						additionalServiceOption: {
							include: {
								additionalServices: true,
							},
						},
					},
				},
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
	changeStatus: adminProcedure
		.input(
			z.object({
				status: z.custom<OrderStatus>(),
				orderId: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			return await ctx.prisma.order.update({
				where: {
					id: input.orderId,
				},
				data: {
					status: input.status,
				},
			});
		}),
});
