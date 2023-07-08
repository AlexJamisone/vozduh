import { clerkClient } from '@clerk/nextjs';
import { TRPCError } from '@trpc/server';
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
	getRole: publicProcedure.query(async ({ ctx }) => {
		if (!ctx.userId) return null;
		const user = await ctx.prisma.user.findUnique({
			where: {
				id: ctx.userId,
			},
		});
		if (!user)
			return new TRPCError({
				code: 'UNAUTHORIZED',
				message: 'Пользователь не найден',
			});
		return user.role;
	}),
});
