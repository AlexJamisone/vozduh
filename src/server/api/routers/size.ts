import { z } from 'zod';
import { adminProcedure, createTRPCRouter } from '~/server/api/trpc';

export const sizeRouter = createTRPCRouter({
	get: adminProcedure.query(async ({ ctx }) => {
		const findedSize = await ctx.prisma.size.findMany();
		return findedSize.sort((a, b) =>
			a.value.localeCompare(b.value, undefined, { numeric: true })
		);
	}),
	create: adminProcedure
		.input(
			z.object({
				value: z.string().nonempty({ message: 'Нужно заполнить поле' }),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const existing = await ctx.prisma.size.findFirst({
				where: {
					value: input.value,
				},
			});
			if (!existing) {
				await ctx.prisma.size.create({
					data: {
						value: input.value,
					},
				});
				return {
					message: `Размер "${input.value}" успешно создан!`,
					success: true,
				};
			} else {
				return {
					message: `Размер ${input.value} уже существует!`,
					success: false,
				};
			}
		}),
	update: adminProcedure
		.input(
			z.object({
				id: z.string(),
				value: z.string().nonempty({ message: 'Нужно заполнить поле' }),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const existing = await ctx.prisma.size.findUnique({
				where: {
					id: input.id,
					value: input.value,
				},
			});
			if (!existing) {
				await ctx.prisma.size.update({
					data: {
						value: input.value,
					},
					where: {
						id: input.id,
					},
				});
				return {
					message: 'Размер успешно обновлен',
					success: true,
				};
			} else {
				return {
					message: `Размер ${input.value} уже существует!`,
					success: false,
				};
			}
		}),
	delete: adminProcedure
		.input(
			z.object({
				id: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			return await ctx.prisma.size.delete({
				where: {
					id: input.id,
				},
			});
		}),
});
