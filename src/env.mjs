import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
	/**
	 * Specify your server-side environment variables schema here. This way you can ensure the app
	 * isn't built with invalid env vars.
	 */
	server: {
		DATABASE_URL: z.string().url(),
		NODE_ENV: z.enum(['development', 'test', 'production']),
		CDEK_ID: z.string().min(1),
		CDEK_SECRET: z.string().min(1),
		BOT_HOSTER: z.string().min(1),
		BOT_DOMAIN: z.string().url(),
	},

	/**
	 * Specify your client-side environment variables schema here. This way you can ensure the app
	 * isn't built with invalid env vars. To expose them to the client, prefix them with
	 * `NEXT_PUBLIC_`.
	 */
	client: {
		NEXT_PUBLIC_YANDEX_API: z.string().min(1),
		NEXT_PUBLIC_DADATA_API_KEY: z.string().min(1),
		NEXT_PUBLIC_ANALISTIC_URL: z.string().min(1),
	},

	/**
	 * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
	 * middlewares) or client-side so we need to destruct manually.
	 */
	runtimeEnv: {
		DATABASE_URL: process.env.DATABASE_URL,
		NODE_ENV: process.env.NODE_ENV,
		NEXT_PUBLIC_DADATA_API_KEY: process.env.NEXT_PUBLIC_DADATA_API_KEY,
		NEXT_PUBLIC_YANDEX_API: process.env.NEXT_PUBLIC_YANDEX_API,
		CDEK_ID: process.env.CDEK_ID,
		CDEK_SECRET: process.env.CDEK_SECRET,
		NEXT_PUBLIC_ANALISTIC_URL: process.env.NEXT_PUBLIC_ANALISTIC_URL,
		BOT_HOSTER: process.env.BOT_HOSTER,
		BOT_DOMAIN: process.env.BOT_DOMAIN,
	},
	/**
	 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
	 * This is especially useful for Docker builds.
	 */
	skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
