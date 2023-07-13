import { utapi } from 'uploadthing/server';
import { z } from 'zod';
import { adminProcedure, createTRPCRouter } from '~/server/api/trpc';

export const productRouter = createTRPCRouter({
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
			const services = input.service?.map(({ price, title }) => ({
				price,
				title,
			}));
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
						createMany: {
							data: services ?? [],
						},
					},
				},
			});
		}),
});
