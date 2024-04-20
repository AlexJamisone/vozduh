import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import {
	adminProcedure,
	createTRPCRouter,
	publicProcedure,
} from '~/server/api/trpc';

export const aboutRouter = createTRPCRouter({
	get: publicProcedure.query(async ({ ctx }) => {
		return await ctx.prisma.about.findFirst();
	}),
	createOrUpdate: adminProcedure
		.input(
			z.object({
				id: z.string().optional(),
				title: z.string().nonempty({ message: 'Придумайте Заголовок' }),
				content: z.string().min(1, { message: 'Заполните контент' }),
			})
		)
		.mutation(async ({ ctx, input }) => {
			if (!input.id) {
				const create = await ctx.prisma.about.create({
					data: {
						title: input.title,
						content: input.content,
					},
				});
				if (!create) {
					throw new TRPCError({
						code: 'BAD_REQUEST',
						cause: {
							error: create,
							message: `Проблемы с созданием`,
						},
					});
				}
				return {
					message: `Секция "${input.title}" успешно создана!`,
					success: true,
				};
			} else {
				const update = await ctx.prisma.about.update({
					where: {
						id: input.id,
					},
					data: {
						title: input.title,
						content: input.content,
					},
				});
				if (!update) {
					throw new TRPCError({
						code: 'BAD_REQUEST',
						cause: {
							error: update,
							message: `Проблемы с обновлением`,
						},
					});
				}
				return {
					message: `Секция о нас успешно обновленна!`,
					success: true,
				};
			}
		}),
});
