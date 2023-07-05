import { clerkClient } from '@clerk/nextjs';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { filterUserForClient } from '~/server/helpers/filterUserForClient';

export const userRouter = createTRPCRouter({
	get: publicProcedure.query(async ({ ctx }) => {
		if (!ctx.userId) return null;
		const userClerk = await clerkClient.users.getUser(ctx.userId);
		const userDb = await ctx.prisma.user.findUnique({
			where: {
				id: ctx.userId,
			},
		});
		if (!userDb) {
			const createUserDb = await ctx.prisma.user.create({
				data: {
					id: ctx.userId,
					email: userClerk.emailAddresses[0]?.emailAddress,
					firstName: userClerk.firstName ?? '',
					lastName: userClerk.lastName ?? '',
				},
			});
			return {
				...filterUserForClient(userClerk),
				...createUserDb,
			};
		} else {
			return {
				...filterUserForClient(userClerk),
				...userDb,
			};
		}
	}),
});
