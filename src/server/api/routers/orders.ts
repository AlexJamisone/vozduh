import type { OrderStatus } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import {
	adminProcedure,
	createTRPCRouter,
	privetProcedure,
	publicProcedure,
} from '~/server/api/trpc';
import { prisma } from '~/server/db';

const cartItems = z.array(
	z.object({
		id: z.string(),
		quantity: z.number(),
		size: z.string(),
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
	point: z.string().min(1, { message: 'Укажи пункт выдачи' }),
});

const userWithAddressId = z.object({
	addressId: z.string(),
	cart: cartItems,
	total: z.number(),
});

const withNoAddress = z.object({
	address: addressObject,
	cart: cartItems,
	totalSum: z.number(),
});

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
	createIsAuthHaveAddress: privetProcedure
		.input(userWithAddressId)
		.mutation(async ({ ctx, input }) => {
			const newOrder = await ctx.prisma.order.create({
				data: {
					addressId: input.addressId,
					total: input.total,
					userId: ctx.userId,
					orderItem: {
						createMany: {
							data: input.cart.map(
								({
									id,
									quantity,
									size,
									additionalServiceOption,
								}) => ({
									productId: id,
									quantity,
									additionalServiceOption:
										additionalServiceOption?.map(
											(opt) => opt
										),
									size,
								})
							),
						},
					},
				},
			});
			const address = await prisma.address.findUnique({
				where: {
					id: input.addressId,
				},
			});
			// here bot req
			return {
				success: `Заказ №${newOrder.orderNumber} успешно создан! В ближайшее время с вами свяжутся по указанным данным!`,
				route: '/profile/main',
			};
		}),
	createNoAddreess: publicProcedure
		.input(withNoAddress)
		.mutation(async ({ ctx, input }) => {
			if (!ctx.userId) {
				const newOrder = await ctx.prisma.order.create({
					data: {
						address: {
							create: {
								firstName: input.address.firstName,
								lastName: input.address.lastName,
								contactPhone: input.address.contactPhone,
								point: input.address.point,
							},
						},
						total: input.totalSum,
						orderItem: {
							createMany: {
								data: input.cart.map(
									({
										id,
										quantity,
										size,
										additionalServiceOption,
									}) => ({
										productId: id,
										quantity,
										additionalServiceOption:
											additionalServiceOption?.map(
												(opt) => opt
											),
										size,
									})
								),
							},
						},
					},
				});
				// TODO why here
				const address = await prisma.address.findUnique({
					where: {
						id: newOrder.addressId,
					},
				});
				// here bot req
				return {
					success: `Заказ №${newOrder.orderNumber} успешно создан! В ближайшее время с вами свяжутся по указанным данным!`,
					route: '/',
				};
			} else {
				const newOrder = await ctx.prisma.order.create({
					data: {
						address: {
							create: {
								firstName: input.address.firstName,
								lastName: input.address.lastName,
								contactPhone: input.address.contactPhone,
								point: input.address.point,
								userId: ctx.userId,
							},
						},
						total: input.totalSum,
						orderItem: {
							createMany: {
								data: input.cart.map(
									({
										id,
										quantity,
										size,
										additionalServiceOption,
									}) => ({
										productId: id,
										quantity,
										additionalServiceOption:
											additionalServiceOption?.map(
												(opt) => opt
											),
										size,
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
				// TODO why here
				const address = await prisma.address.findUnique({
					where: {
						id: newOrder.addressId,
					},
				});
				// here bot req
				return {
					success: `Заказ №${newOrder.orderNumber} успешно создан! В ближайшее время с вами свяжутся по указанным данным!`,
					route: '/profile/main',
				};
			}
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
						orderNumber: true,
						id: true,
					},
				});
				return {
					orderNum: create.orderNumber,
					id: create.id,
				};
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
					orderNumber: true,
				},
			});
			return {
				orderNum: create.orderNumber,
				id: create.id,
			};
		}),
});
