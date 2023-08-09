import { utapi } from 'uploadthing/server';
import { z } from 'zod';
import {
	adminProcedure,
	createTRPCRouter,
	publicProcedure,
} from '~/server/api/trpc';

const categoryInput = z.object({
	id: z.string(),
	title: z
		.string()
		.trim()
		.nonempty({ message: 'Укажите название категории' })
		.refine(
			(val) => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()
		),
	path: z
		.string()
		.trim()
		.nonempty({ message: 'Укажите название пути' })
		.refine((val) => val.toLowerCase())
		.refine((value) => /^[a-zA-Z]+$/.test(value), {
			message: 'Нужно использовать только английский',
		}),
	image: z.string().nonempty({ message: 'Загрузите картинку для категории' }),
});

export const categorysRouter = createTRPCRouter({
	get: publicProcedure.query(async ({ ctx }) => {
		return await ctx.prisma.category.findMany();
	}),
	create: adminProcedure
		.input(categoryInput)
		.mutation(async ({ ctx, input }) => {
			return await ctx.prisma.category.create({
				data: {
					title: input.title,
					image: input.image,
					path: input.path,
				},
			});
		}),
	update: adminProcedure
		.input(categoryInput)
		.mutation(async ({ ctx, input }) => {
			return await ctx.prisma.category.update({
				where: {
					id: input.id,
				},
				data: {
					image: input.image,
					title: input.title,
					path: input.path,
				},
			});
		}),
	delete: adminProcedure
		.input(
			z.object({
				id: z.string(),
				image: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			await utapi.deleteFiles(input.image);
			return await ctx.prisma.category.delete({
				where: {
					id: input.id,
				},
			});
		}),
});
