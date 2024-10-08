/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import('./src/env.mjs');

/** @type {import("next").NextConfig} */
const config = {
	reactStrictMode: true,

	/**
	 * If you have `experimental: { appDir: true }` set, then you must comment the below `i18n` config
	 * out.
	 *
	 * @see https://github.com/vercel/next.js/issues/41980
	 */
	i18n: {
		locales: ['ru'],
		defaultLocale: 'ru',
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	images: {
		domains: ['placehold.co', 'utfs.io'],
	},
	experimental: {
		esmExternals: false,
	},
	transpilePackages: ['three', 'framer-motion-3d'],
};

export default config;
