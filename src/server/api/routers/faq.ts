import { z } from 'zod';
import {
	adminProcedure,
	createTRPCRouter,
	publicProcedure,
} from '~/server/api/trpc';

export const faqRouter = createTRPCRouter({
	get: publicProcedure.query(async ({ ctx }) => {
		return await ctx.prisma.fAQ.findMany({
			orderBy: {
				createdAt: 'desc',
			},
		});
	}),
	create: adminProcedure
		.input(
			z.object({
				title: z.string().nonempty({ message: 'Придумай вопрос' }),
				content: z.string().min(1, { message: 'Не забудь ответ' }),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const { content, title } = input;
			const create = await ctx.prisma.fAQ.create({
				data: {
					title,
					content: content,
				},
			});
			if (!create) {
				return {
					message: `Произошла ошибка создания`,
					success: false,
				};
			} else {
				return {
					message: `Ответ на вопрос "${title}" успешно создан!`,
					success: true,
				};
			}
		}),
	update: adminProcedure
		.input(
			z.object({
				id: z.string(),
				title: z.string().nonempty({ message: 'Придумай вопрос' }),
				content: z.string().min(1, { message: 'Не забудь ответ' }),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const { content, id, title } = input;
			const update = await ctx.prisma.fAQ.update({
				where: {
					id,
				},
				data: {
					title,
					content: content,
				},
			});
			if (!update) {
				return {
					message: `Произошла ошибка обновления`,
					success: false,
				};
			} else {
				return {
					message: `Успешно обновленно!`,
					success: true,
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
			return await ctx.prisma.fAQ.delete({
				where: {
					id: input.id,
				},
			});
		}),
});
