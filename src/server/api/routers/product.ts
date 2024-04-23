import { z } from 'zod';
import {
	adminProcedure,
	createTRPCRouter,
	publicProcedure,
} from '~/server/api/trpc';
import { utapi } from '~/server/uploadthing';

export const productRouter = createTRPCRouter({
	getProductByCategory: publicProcedure
		.input(
			z.object({
				path: z.string(),
			})
		)
		.query(async ({ ctx, input }) => {
			return await ctx.prisma.product.findMany({
				where: {
					category: {
						path: input.path,
					},
					NOT: {
						archived: true,
					},
				},
				include: {
					size: true,
					additionalServices: {
						include: {
							additionalServicesOption: true,
						},
					},
				},
			});
		}),
	getSinglProduct: publicProcedure
		.input(
			z.object({
				id: z.string(),
			})
		)
		.query(async ({ ctx, input }) => {
			return await ctx.prisma.product.findUnique({
				where: {
					id: input.id,
				},
				include: {
					size: true,
					additionalServices: {
						include: {
							additionalServicesOption: true,
						},
					},
				},
			});
		}),
	getForAdmin: adminProcedure.query(async ({ ctx }) => {
		return await ctx.prisma.product.findMany({
			include: {
				size: true,
				additionalServices: {
					include: {
						additionalServicesOption: true,
					},
				},
			},
		});
	}),
	deletSinglImg: adminProcedure
		.input(z.string())
		.mutation(async ({ input: key }) => {
			await utapi.deleteFiles(key);
			return key;
		}),
	create: adminProcedure
		.input(
			z.object({
				name: z.string().nonempty({
					message: 'Пожалуйста, укажите название товара.',
				}),
				description: z.string().min(1, {
					message: 'Обязательно заполните описание товара',
				}),
				price: z
					.number()
					.positive({ message: 'Пожалуйста, укажите цену товара.' }),
				image: z
					.array(
						z
							.string()
							.nonempty({ message: 'Пожалуйста загрузи фото' })
					)
					.min(1, { message: 'Загрузи хотя бы 1 фото' }),
				category: z.string().nonempty('Выбери категорию.'),
				size: z
					.array(z.string().nonempty({ message: 'Выбери размеры' }))
					.min(1, { message: 'Выбери хотя бы 1 размер' }),
				service: z
					.array(
						z.object({
							id: z.string(),
							title: z.string().nonempty({
								message: 'Укажи заголовок доп операции',
							}),
							additionalOptions: z
								.array(
									z.object({
										id: z.string(),
										name: z.string().nonempty({
											message: 'Придумай имя доп опции',
										}),
										price: z.number().positive({
											message: 'Установи цену доп опции',
										}),
									})
								)
								.min(1, { message: 'Создай опции!' }),
						})
					)
					.optional(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const product = await ctx.prisma.product.create({
				data: {
					name: input.name,
					description: input.description,
					image: input.image,
					price: input.price,
					category: {
						connect: {
							title: input.category,
						},
					},
					size: {
						connect: input.size.map((value) => ({ value })),
					},
					additionalServices: {
						create: input.service?.map((service) => ({
							additionalServicesOption: {
								createMany: {
									data: service.additionalOptions.map(
										(option) => ({
											name: option.name,
											price: option.price,
											id: option.id,
										})
									),
								},
							},
							title: service.title,
							id: service.id,
						})),
					},
				},
			});
			return product.name;
		}),
	update: adminProcedure
		.input(
			z.object({
				producId: z.string(),
				name: z.string().nonempty({
					message: 'Пожалуйста, укажите название товара.',
				}),
				description: z.string().min(1, {
					message: 'Обязательно заполните описание товара',
				}),
				price: z
					.number()
					.positive({ message: 'Пожалуйста, укажите цену товара.' }),
				image: z
					.array(
						z
							.string()
							.nonempty({ message: 'Пожалуйста загрузи фото' })
					)
					.min(1, { message: 'Загрузи хотя бы 1 фото' }),
				category: z.string().nonempty('Выбери категорию.'),
				size: z
					.array(z.string().nonempty({ message: 'Выбери размеры' }))
					.min(1, { message: 'Выбери хотя бы 1 размер' }),
				service: z
					.array(
						z.object({
							id: z.string(),
							title: z.string().nonempty({
								message: 'Укажи название доп операции',
							}),
							additionalOptions: z
								.array(
									z.object({
										id: z.string(),
										name: z.string().nonempty({
											message: 'Придумай имя доп опции',
										}),
										price: z.number().positive({
											message: 'Установи цену доп опции',
										}),
									})
								)
								.min(1, { message: 'Создай опции!' }),
						})
					)
					.optional(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const existingServiceIds = input.service
				?.filter((service) => service.id !== '')
				.map((service) => service.id);
			return await ctx.prisma.product.update({
				where: {
					id: input.producId,
				},
				data: {
					name: input.name,
					description: input.description,
					image: input.image,
					category: {
						connect: {
							title: input.category,
						},
					},
					price: input.price,
					size: {
						set: input.size.map((value) => ({ value })),
					},
					additionalServices: {
						deleteMany: {
							id: {
								notIn: existingServiceIds as string[],
							},
						},
						upsert: input.service?.map((service) => ({
							where: {
								id: service.id,
							},
							update: {
								title: service.title,
								additionalServicesOption: {
									upsert: service.additionalOptions.map(
										(option) => ({
											where: {
												id: option.id,
											},
											update: {
												name: option.name,
												price: option.price,
											},
											create: {
												id: option.id,
												name: option.name,
												price: option.price,
											},
										})
									),
									deleteMany: {
										id: {
											notIn: service.additionalOptions
												.filter(
													(option) => option.id !== ''
												)
												.map((option) => option.id),
										},
									},
								},
							},
							create: {
								additionalServicesOption: {
									create: service.additionalOptions.map(
										(option) => ({
											id: option.id,
											name: option.name,
											price: option.price,
										})
									),
								},
								title: service.title,
								id: service.id,
							},
						})),
					},
				},
			});
		}),
	archive: adminProcedure
		.input(
			z.object({
				archive: z.boolean(),
				id: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			return await ctx.prisma.product.update({
				where: {
					id: input.id,
				},
				data: {
					archived: input.archive,
				},
			});
		}),
});
