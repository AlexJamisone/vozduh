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
	setAbout: adminProcedure
		.input(
			z.object({
				id: z.string().optional(),
				value: z.string().min(1, { message: 'Заполни поле' }),
				type: z.enum(['title', 'content']),
			})
		)
		.mutation(async ({ input, ctx }) => {
			const { type, id, value } = input;
			if (!id) {
				if (type === 'title') {
					await ctx.prisma.about.create({
						data: {
							title: value,
							content: '',
						},
					});
					return `Титул успешно создан`;
				}
				if (type === 'content') {
					await ctx.prisma.about.create({
						data: {
							title: '',
							content: value,
						},
					});
					return `Контет успешно создан`;
				}
			} else {
				if (type === 'title') {
					await ctx.prisma.about.update({
						where: {
							id,
						},
						data: {
							title: value,
						},
					});
					return `Титул успешно обновлён`;
				}
				if (type === 'content') {
					await ctx.prisma.about.update({
						where: {
							id,
						},
						data: {
							content: value,
						},
					});
					return `Контент успешно обновлён`;
				}
			}
		}),
});
