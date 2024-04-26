import type { OrderStatus } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import {
	adminProcedure,
	createTRPCRouter,
	privetProcedure,
	publicProcedure,
} from '~/server/api/trpc';

const cartItems = z.array(
	z.object({
		id: z.string(),
		quantity: z.number(),
		size: z.string(),
		additionalServiceOption: z.array(z.string()).or(z.undefined()),
	})
);

export const ordersRouter = createTRPCRouter({
	get: publicProcedure.input(z.string()).query(async ({ ctx, input: id }) => {
		const order = await ctx.prisma.order.findUnique({
			where: {
				id,
			},
			select: {
				total: true,
				orderNumber: true,
			},
		});
		if (!order)
			throw new TRPCError({
				message: 'Такого заказа нет',
				code: 'NOT_FOUND',
			});
		return order;
	}),
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
	getForAdmin: adminProcedure
		.input(
			z.object({
				limit: z.number(),
				cursor: z.string().nullish(),
			})
		)
		.query(async ({ ctx, input }) => {
			const { limit, cursor } = input;
			const items = await ctx.prisma.order.findMany({
				orderBy: {
					createdAt: 'desc',
				},
				include: {
					address: true,
					orderItem: {
						include: {
							product: true,
						},
					},
				},
				take: limit + 1,
				cursor: cursor ? { id: cursor } : undefined,
			});
			let nextCursor: typeof cursor | undefined;
			if (items.length > limit) {
				const nextItem = items.pop();
				nextCursor = nextItem?.id;
			}
			return {
				items,
				nextCursor,
			};
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
	changeView: adminProcedure
		.input(
			z.object({
				orderId: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const updateView = await ctx.prisma.order.update({
				where: {
					id: input.orderId,
				},
				data: {
					viewed: {
						set: true,
					},
				},
			});
			return {
				message: `Заказ #${updateView.orderNumber} просмотрен!`,
			};
		}),
	changePay: adminProcedure
		.input(
			z.object({
				orderId: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const updatedOrder = await ctx.prisma.order.update({
				where: {
					id: input.orderId,
				},
				data: {
					isPayed: {
						set: true,
					},
				},
			});
			return {
				message: `Заказ #${updatedOrder.orderNumber} был оплачен!`,
			};
		}),
	create: publicProcedure
		.input(
			z
				.object({
					id: z.string(),
					firstName: z
						.string()
						.min(1, { message: 'Укажи имя' })
						.optional(),
					lastName: z
						.string()
						.min(1, { message: 'Укажи фамилию' })
						.optional(),
					contactPhone: z
						.string()
						.min(16, { message: 'Укажи телефон' })
						.optional(),
					comment: z.string().optional(),
					point: z
						.string()
						.min(1, { message: 'Укажи ПВЗ' })
						.optional(),
					cart: cartItems,
					total: z.number().positive(),
				})
				.refine((data) => {
					if (!data.id) {
						if (
							!data.firstName ||
							!data.lastName ||
							!data.contactPhone ||
							!data.point
						) {
							return false;
						}
					}
					return true;
				})
		)
		.mutation(async ({ input, ctx }) => {
			const {
				total,
				cart,
				id,
				point,
				firstName,
				lastName,
				contactPhone,
				comment,
			} = input;
			if (!id && firstName && lastName && contactPhone && point) {
				const adr = await ctx.prisma.address.create({
					data: {
						firstName,
						lastName,
						contactPhone,
						point,
						userId: null,
					},
					select: {
						id: true,
					},
				});
				const create = await ctx.prisma.order.create({
					data: {
						addressId: adr.id,
						comment,
						total,
						orderItem: {
							createMany: {
								data: cart.map((item) => ({
									productId: item.id,
									size: item.size,
									quantity: item.quantity,
									additionalServiceOption:
										item.additionalServiceOption?.map(
											(opt) => opt
										),
								})),
							},
						},
					},
					select: {
						id: true,
					},
				});
				return create.id;
			}
			const create = await ctx.prisma.order.create({
				data: {
					total,
					addressId: id,
					comment,
					orderItem: {
						createMany: {
							data: cart.map((item) => ({
								productId: item.id,
								size: item.size,
								quantity: item.quantity,
								additionalServiceOption:
									item.additionalServiceOption?.map(
										(opt) => opt
									),
							})),
						},
					},
				},
				select: {
					id: true,
				},
			});
			return create.id;
		}),
});
