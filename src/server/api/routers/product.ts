import { utapi } from 'uploadthing/server';
import { z } from 'zod';
import type { Product } from '~/reducer/productReducer';
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
				product: z.custom<Product>(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const sizeId = input.product.size.map((id) => ({ id }));
			const services = input.product.serviceAvailability.map(
				({ price, title }) => ({ price, title })
			);
			return await ctx.prisma.product.create({
				data: {
					name: input.product.name,
					description: input.product.description,
					image: input.product.image,
					priceHistory: {
						create: {
							price: Number(input.product.price),
						},
					},
					category: {
						connect: {
							title: input.product.category,
						},
					},
					size: {
						connect: sizeId,
					},
					additionalServices: {
						createMany: {
							data: services,
						},
					},
				},
			});
		}),
});
