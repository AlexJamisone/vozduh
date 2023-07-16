import type { typeToFlattenedError } from 'zod';

export default function productErrorFilter(
	pattern: string,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	productError?: typeToFlattenedError<any, string> | null
): string | undefined {
	if (productError?.fieldErrors.service) {
		return productError.fieldErrors.service.filter((err) =>
			err.includes(pattern)
		)[0];
	} else return undefined;
}
