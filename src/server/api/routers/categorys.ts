import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import {
	adminProcedure,
	createTRPCRouter,
	publicProcedure,
} from '~/server/api/trpc';
import { utapi } from '~/server/uploadthing';

export const categorysRouter = createTRPCRouter({
	get: publicProcedure.query(async ({ ctx }) => {
		return await ctx.prisma.category.findMany();
	}),
	create: adminProcedure
		.input(
			z.object({
				title: z
					.string()
					.trim()
					.min(1, { message: 'Укажите название категории' })
					.transform(
						(val) =>
							val.charAt(0).toUpperCase() +
							val.slice(1).toLowerCase()
					),
				path: z
					.string()
					.trim()
					.min(1, { message: 'Укажите название пути' })
					.refine((value) => /^[a-zA-Z]+$/.test(value), {
						message: 'Нужно использовать только английский',
					})
					.transform((val) => val.toLowerCase()),
				image: z
					.string()
					.min(1, { message: 'Загрузите картинку для категории' }),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const { path, title, image } = input;
			const create = await ctx.prisma.category.create({
				data: {
					title,
					image,
					path,
				},
			});
			if (!create)
				throw new TRPCError({
					code: 'CONFLICT',
					message: 'Упс, похоже такая категория уже существует!',
				});
			return `Категория с названием ${title} успешно создана по пути /${path}`;
		}),
	update: adminProcedure
		.input(
			z.object({
				id: z.string(),
				title: z
					.string()
					.trim()
					.min(1, { message: 'Укажите название категории' })
					.transform(
						(val) =>
							val.charAt(0).toUpperCase() +
							val.slice(1).toLowerCase()
					),
				path: z
					.string()
					.trim()
					.min(1, { message: 'Укажите название пути' })
					.refine((value) => /^[a-zA-Z]+$/.test(value), {
						message: 'Нужно использовать только английский',
					})
					.transform((val) => val.toLowerCase()),
				image: z
					.string()
					.min(1, { message: 'Загрузите картинку для категории' }),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const { id, title, path, image } = input;
			const update = await ctx.prisma.category.update({
				where: {
					id,
				},
				data: {
					title,
					path,
					image,
				},
			});
			if (!update)
				throw new TRPCError({
					code: 'CONFLICT',
					message: 'Упс, похоже категория уже существует',
				});
			return `Категория успешно обновлена`;
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
	deletImg: adminProcedure
		.input(z.string())
		.mutation(async ({ input: key }) => {
			const del = await utapi.deleteFiles(key);
			if (!del.success)
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'Проблема с удалением картинки',
				});
			return 'Картинка успешно удалена';
		}),
});
