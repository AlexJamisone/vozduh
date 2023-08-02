import type { OrderStatus, Point } from '@prisma/client';
import { z } from 'zod';
import {
	adminProcedure,
	createTRPCRouter,
	privetProcedure,
	publicProcedure,
} from '~/server/api/trpc';

const cartItems = z.array(
	z.object({
		productId: z.string(),
		quantity: z.number(),
		sizeValue: z.string(),
		additionalServiceOption: z.array(z.string()).or(z.undefined()),
	})
);

const addressObject = z.object({
	firstName: z
		.string()
		.nonempty({ message: 'Пожалуйста, укажите своё имя.' }),
	lastName: z.string().nonempty({ message: 'Не забудьте указать фамилию.' }),
	contactPhone: z
		.string()
		.min(16, { message: 'Проверьте телефон, в нём есть ошибка' })
		.nonempty({
			message:
				'Укажите ваш номер телефона, чтобы мы могли с вами связаться.',
		}),
	point: z.custom<Point>(),
});

const userWithAddressId = z.object({
	addressId: z.string(),
	cart: cartItems,
	totalSum: z.number(),
});

const withNoAddress = z.object({
	address: addressObject,
	cart: cartItems,
	totalSum: z.number(),
});

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
	createIsAuthHaveAddress: privetProcedure
		.input(userWithAddressId)
		.mutation(async ({ ctx, input }) => {
			return await ctx.prisma.order.create({
				data: {
					addressId: input.addressId,
					totalSum: input.totalSum,
					userId: ctx.userId,
					orderItem: {
						createMany: {
							data: input.cart.map(
								({
									productId,
									quantity,
									sizeValue,
									additionalServiceOption,
								}) => ({
									productId,
									quantity,
									additionalServiceOption:
										additionalServiceOption?.map(
											(opt) => opt
										),
									size: sizeValue,
								})
							),
						},
					},
				},
			});
		}),
	createNoAddreess: publicProcedure
		.input(withNoAddress)
		.mutation(async ({ ctx, input }) => {
			if (!ctx.userId) {
				return await ctx.prisma.order.create({
					data: {
						address: {
							create: {
								firstName: input.address.firstName,
								lastName: input.address.lastName,
								contactPhone: input.address.contactPhone,
								point: {
									create: input.address.point,
								},
							},
						},
						totalSum: input.totalSum,
						orderItem: {
							createMany: {
								data: input.cart.map(
									({
										productId,
										quantity,
										sizeValue,
										additionalServiceOption,
									}) => ({
										productId,
										quantity,
										additionalServiceOption:
											additionalServiceOption?.map(
												(opt) => opt
											),
										size: sizeValue,
									})
								),
							},
						},
					},
				});
			} else {
				const newOrder = await ctx.prisma.order.create({
					data: {
						address: {
							create: {
								firstName: input.address.firstName,
								lastName: input.address.lastName,
								contactPhone: input.address.contactPhone,
								point: {
									create: input.address.point,
								},
								userId: ctx.userId,
							},
						},
						totalSum: input.totalSum,
						orderItem: {
							createMany: {
								data: input.cart.map(
									({
										productId,
										quantity,
										sizeValue,
										additionalServiceOption,
									}) => ({
										productId,
										quantity,
										additionalServiceOption:
											additionalServiceOption?.map(
												(opt) => opt
											),
										size: sizeValue,
									})
								),
							},
						},
					},
				});
				await ctx.prisma.user.update({
					where: {
						id: ctx.userId,
					},
					data: {
						orders: {
							connect: { id: newOrder.id },
						},
					},
				});
				return newOrder;
			}
		}),
});
