import {
	generateUploadButton,
	generateUploadDropzone,
} from '@uploadthing/react';
import { OurFileRouter } from '~/server/uploadthing';

export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();
