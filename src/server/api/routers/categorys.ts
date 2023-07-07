import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

export const categorysRouter = createTRPCRouter({
	get: publicProcedure.query(async ({ ctx }) => {
		return await ctx.prisma.category.findMany();
	}),
});
