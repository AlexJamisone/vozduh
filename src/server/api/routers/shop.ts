import { z } from 'zod';
import {
	adminProcedure,
	createTRPCRouter,
	publicProcedure,
} from '~/server/api/trpc';

const shopInputs = z.object({
	name: z.string(),
	fullAddress: z.string(),
	phone: z.string(),
	image: z.string(),
	work_time: z.string().optional(),
});

export const shopRouter = createTRPCRouter({
	get: publicProcedure.query(async ({ ctx }) => {
		return await ctx.prisma.offlineShop.findMany();
	}),
	create: adminProcedure
		.input(shopInputs)
		.mutation(async ({ ctx, input }) => {
			const { fullAddress, image, name, phone, work_time } = input;
			return await ctx.prisma.offlineShop.create({
				data: {
					fullAddress,
					image,
					name,
					phone,
					work_time,
				},
			});
		}),
	update: adminProcedure
		.input(
			z.object({
				id: z.string(),
				inputs: shopInputs,
			})
		)
		.mutation(async ({ ctx, input }) => {
			const { fullAddress, image, name, phone, work_time } = input.inputs;
			return await ctx.prisma.offlineShop.update({
				where: {
					id: input.id,
				},
				data: {
					fullAddress,
					image,
					name,
					phone,
					work_time,
				},
			});
		}),
	delete: adminProcedure
		.input(
			z.object({
				id: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			return await ctx.prisma.offlineShop.delete({
				where: {
					id: input.id,
				},
			});
		}),
});
