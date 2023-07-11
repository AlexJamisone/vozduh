import { createUploadthing, type FileRouter } from 'uploadthing/next-legacy';

const f = createUploadthing();

export const ourFileRouter = {
	imageUploader: f({
		image: { maxFileSize: '16MB', maxFileCount: 5 },
	}).onUploadComplete(({ file }) => {
		console.log('file url', file.url);
	}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
