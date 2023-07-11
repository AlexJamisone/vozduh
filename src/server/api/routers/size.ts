import { adminProcedure, createTRPCRouter } from '~/server/api/trpc';

export const sizeRouter = createTRPCRouter({
	get: adminProcedure.query(async ({ ctx }) => {
		return await ctx.prisma.size.findMany();
	}),
});
