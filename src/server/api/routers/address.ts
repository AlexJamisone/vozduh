import { clerkClient } from '@clerk/nextjs';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import {
	createTRPCRouter,
	privetProcedure,
	publicProcedure,
} from '~/server/api/trpc';

export const addressRouter = createTRPCRouter({
	get: publicProcedure.query(async ({ ctx }) => {
		if (!ctx.userId) return null;
		return await ctx.prisma.address.findMany({
			where: {
				userId: ctx.userId,
				NOT: {
					archived: true,
				},
			},
			orderBy: {
				createdAt: 'desc',
			},
		});
	}),
	archive: privetProcedure
		.input(
			z.object({
				id: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			return await ctx.prisma.address.update({
				where: {
					id: input.id,
				},
				data: {
					archived: true,
				},
			});
		}),
	create: privetProcedure
		.input(
			z.object({
				firstName: z.string().nonempty({ message: 'Введите имя' }),
				lastName: z.string().nonempty({ message: 'Введите фамилию' }),
				contactPhone: z
					.string()
					.min(16, { message: 'Проверьте правильность номера' }),
				point: z.string().min(1, {message: "Потверди ПВЗ"}),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const updateClerk = clerkClient.users.updateUser(ctx.userId, {
				firstName: input.firstName,
				lastName: input.lastName,
			});
			const updateUser = ctx.prisma.user.update({
				where: {
					id: ctx.userId,
				},
				data: {
					firstName: input.firstName,
					lastName: input.lastName,
				},
			});
			const createAddress = ctx.prisma.address.create({
				data: {
					contactPhone: input.contactPhone,
					firstName: input.firstName,
					lastName: input.lastName,
					userId: ctx.userId,
					point: input.point,
				},
			});
			const call = await Promise.all([
				updateClerk,
				updateUser,
				createAddress,
			]);
			if (!call) {
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: 'Ошибка в создание адреса',
				});
			} else {
				return {
					message: 'Адрес успешно создан!',
				};
			}
		}),
});
