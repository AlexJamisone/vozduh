import { z } from 'zod';
import {
	adminProcedure,
	createTRPCRouter,
	publicProcedure,
} from '~/server/api/trpc';

const shopInputs = z.object({
	name: z.string().nonempty({ message: 'Введите название магазина' }),
	fullAddress: z.string().nonempty({ message: 'Введите полный адрес' }),
	phone: z.string().nonempty({ message: 'Введите телефон' }),
	image: z.string().nonempty({ message: 'Загрузите картинку' }),
	work_time: z.string().optional(),
});

export const shopRouter = createTRPCRouter({
	get: publicProcedure.query(async ({ ctx }) => {
		return await ctx.prisma.offlineShop.findMany();
	}),
	create: adminProcedure
		.input(shopInputs)
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
				return {
					message: 'Проблемы с созданием',
					success: false,
				};
			return {
				message: `Оффлайе магазин ${name} успешно создан!`,
				success: true,
			};
		}),
	update: adminProcedure
		.input(
			z.object({
				id: z.string(),
				inputs: shopInputs,
			})
		)
		.mutation(async ({ ctx, input }) => {
			const { fullAddress, image, name, phone, work_time } = input.inputs;
			const update = await ctx.prisma.offlineShop.update({
				where: {
					id: input.id,
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
				return {
					message: 'Проблемы с обновлением!',
					success: false,
				};
			return {
				message: `Оффлайн магазин успешно обновлен`,
				success: true,
			};
		}),
	delete: adminProcedure
		.input(
			z.object({
				id: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			return await ctx.prisma.offlineShop.delete({
				where: {
					id: input.id,
				},
			});
		}),
});
