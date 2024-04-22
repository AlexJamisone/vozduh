import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import {
	adminProcedure,
	createTRPCRouter,
	publicProcedure,
} from '~/server/api/trpc';
import { utapi } from '~/server/uploadthing';

export const shopRouter = createTRPCRouter({
	get: publicProcedure.query(async ({ ctx }) => {
		return await ctx.prisma.offlineShop.findMany({
			orderBy: {
				createdAt: 'desc',
			},
		});
	}),
	create: adminProcedure
		.input(
			z.object({
				name: z
					.string()
					.nonempty({ message: 'Введите название магазина' }),
				fullAddress: z
					.string()
					.nonempty({ message: 'Введите полный адрес' }),
				phone: z.string().nonempty({ message: 'Введите телефон' }),
				image: z.string().nonempty({ message: 'Загрузите картинку' }),
				work_time: z.string().optional(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const { fullAddress, image, name, phone, work_time } = input;
			const create = await ctx.prisma.offlineShop.create({
				data: {
					fullAddress,
					image,
					name,
					phone,
					work_time,
				},
			});
			if (!create)
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'Что не так при создании магазина',
				});
			return {
				message: `Оффлайе магазин ${name} успешно создан!`,
			};
		}),
	update: adminProcedure
		.input(
			z.object({
				id: z.string(),
				name: z
					.string()
					.nonempty({ message: 'Введите название магазина' }),
				fullAddress: z
					.string()
					.nonempty({ message: 'Введите полный адрес' }),
				phone: z.string().nonempty({ message: 'Введите телефон' }),
				image: z.string().nonempty({ message: 'Загрузите картинку' }),
				work_time: z.string().optional(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const { fullAddress, image, name, phone, work_time, id } = input;
			const update = await ctx.prisma.offlineShop.update({
				where: {
					id,
				},
				data: {
					fullAddress,
					image,
					name,
					phone,
					work_time,
				},
			});
			if (!update)
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'Что то не так с обновлением магазина',
				});
			return {
				message: `Оффлайн магазин успешно обновлен`,
			};
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
			return await ctx.prisma.offlineShop.delete({
				where: {
					id: input.id,
				},
			});
		}),
});
