import { utapi } from 'uploadthing/server';
import { z } from 'zod';
import { adminProcedure, createTRPCRouter } from '~/server/api/trpc';

export const productRouter = createTRPCRouter({
	getForAdmin: adminProcedure.query(async ({ ctx }) => {
		return await ctx.prisma.product.findMany({
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
		});
	}),
	deletSinglImg: adminProcedure
		.input(
			z.object({
				src: z.string(),
			})
		)
		.mutation(async ({ input }) => {
			return await utapi.deleteFiles(input.src);
		}),
	create: adminProcedure
		.input(
			z.object({
				name: z.string().nonempty({
					message: 'Пожалуйста, укажите название товара.',
				}),
				description: z.string().nonempty({
					message: 'Обязательно заполните описание товара',
				}),
				price: z
					.string()
					.nonempty({ message: 'Пожалуйста, укажите цену товара.' }),
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
							title: z.string().nonempty({
								message: 'Укажи название доп операции',
							}),
							additionalOptions: z
								.array(
									z.object({
										name: z.string().nonempty({
											message: 'Придумай имя доп опции',
										}),
										price: z.string().nonempty({
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
			const sizeId = input.size.map((id) => ({ id }));
			return await ctx.prisma.product.create({
				data: {
					name: input.name,
					description: input.description,
					image: input.image,
					priceHistory: {
						create: {
							price: Number(input.price),
						},
					},
					category: {
						connect: {
							title: input.category,
						},
					},
					size: {
						connect: sizeId,
					},
					additionalServices: {
						create: input.service?.map((service) => ({
							additionalServicesOption: {
								createMany: {
									data: service.additionalOptions.map(
										(option) => ({
											name: option.name,
											price: option.price,
										})
									),
								},
							},
							title: service.title,
						})),
					},
				},
			});
		}),
	update: adminProcedure
		.input(
			z.object({
				producId: z.string(),
				name: z.string().nonempty({
					message: 'Пожалуйста, укажите название товара.',
				}),
				description: z.string().nonempty({
					message: 'Обязательно заполните описание товара',
				}),
				price: z
					.string()
					.nonempty({ message: 'Пожалуйста, укажите цену товара.' }),
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
							id: z.string().optional(),
							title: z.string().nonempty({
								message: 'Укажи название доп операции',
							}),
							price: z.string().nonempty({
								message:
									'Укажи цену за доп услугу, либо поставь 0',
							}),
						})
					)
					.optional(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const sizeId = input.size.map((id) => ({ id }));
			const existingServiceIds = input.service
				?.filter((service) => service.id !== '')
				.map((service) => service.id);
			console.log(sizeId);
			const prevPrice = await ctx.prisma.product.findUnique({
				where: {
					id: input.producId,
				},
				include: {
					priceHistory: {
						orderBy: {
							effectiveFrom: 'desc',
						},
					},
				},
			});
			if (prevPrice?.priceHistory[0]?.price === Number(input.price)) {
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
						size: {
							connect: sizeId,
						},
						additionalServices: {
							deleteMany: {
								id: {
									notIn: existingServiceIds as string[],
								},
							},
							upsert: input.service?.map((service) => ({
								where: { id: service.id },
								create: {
									title: service.title,
									price: service.price,
								},
								update: {
									title: service.title,
									price: service.price,
								},
							})),
						},
					},
				});
			} else {
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
						size: {
							connect: sizeId,
						},
						priceHistory: {
							create: {
								price: Number(input.price),
							},
						},
						additionalServices: {
							upsert: input.service?.map((service) => ({
								where: { id: service.id },
								create: {
									title: service.title,
									price: service.price,
								},
								update: {
									title: service.title,
									price: service.price,
								},
							})),
						},
					},
				});
			}
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
