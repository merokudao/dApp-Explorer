/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	eslint: {
		// Warning: This allows production builds to successfully complete even if
		// your project has ESLint errors.
		// ignoreDuringBuilds: true,
	},
	i18n: {
		locales: ["en"],
		defaultLocale: "en",
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
			},
			{
				protocol: "http",
				hostname: "**",
			},
		],
	},
	reactStrictMode: false,

	async redirects() {
		return [
			{
				source: "/app/:id",
				destination: "/dapp?id=:id",
				permanent: true,
			},
		];
	},

	webpack: (config) => {
		config.resolve.fallback = { fs: false, net: false, tls: false };
		return config;
	},
};

module.exports = nextConfig;
