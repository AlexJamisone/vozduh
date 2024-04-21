import { auth } from '@clerk/nextjs';
import { createUploadthing, type FileRouter } from 'uploadthing/next-legacy';
import { UploadThingError, UTApi } from 'uploadthing/server';
import { prisma } from './db';

const f = createUploadthing();

export const ourFileRouter = {
	categoryImage: f({ image: { maxFileSize: '16MB', maxFileCount: 1 } })
		.middleware(async () => {
			const { userId } = auth();
			if (!userId) throw new UploadThingError('Unauthorized');
			const usr = await prisma.user.findUnique({
				where: {
					id: userId,
				},
				select: {
					role: true,
				},
			});
			if (!usr) throw new UploadThingError('Not found user');
			if (usr.role !== 'ADMIN') throw new UploadThingError('Not allowed');
			return { userId };
		})
		.onUploadComplete(async ({ metadata, file }) => {
			console.log('Upload complete for userId:', metadata.userId);

			console.log('file url', file.url);
			return { uploadedBy: metadata.userId };
		}),
	createProduct: f({
		image: { maxFileSize: '16MB', maxFileCount: 5 },
	})
		.middleware(async () => {
			const { userId } = auth();
			if (!userId) throw new UploadThingError('Unauthorized');
			const usr = await prisma.user.findUnique({
				where: {
					id: userId,
				},
				select: {
					role: true,
				},
			});
			if (!usr) throw new UploadThingError('Not found user');
			if (usr.role !== 'ADMIN') throw new UploadThingError('Not allowed');
			return { userId };
		})
		.onUploadComplete(async ({ metadata, file }) => {
			console.log('Upload complete for userId:', metadata.userId);

			console.log('file url', file.url);
			return { uploadedBy: metadata.userId };
		}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
export const utapi = new UTApi();
