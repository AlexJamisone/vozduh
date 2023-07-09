import { z } from 'zod';
import { createTRPCRouter, privetProcedure } from '~/server/api/trpc';

export const addressRouter = createTRPCRouter({
	get: privetProcedure.query(async ({ ctx }) => {
		return await ctx.prisma.address.findMany({
			where: {
				userId: ctx.userId,
				NOT: {
					archived: true,
				},
			},
			include: {
				point: true,
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
});
