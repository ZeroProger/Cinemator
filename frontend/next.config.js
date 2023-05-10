/** @type {import('next').NextConfig} */
//#TODO: возможно выключить strictMode
const nextConfig = {
	reactStrictMode: true,
	poweredByHeader: false,
	optimizeFonts: false,
	env: {
		APP_URL: process.env.REACT_APP_URL,
		APP_ENV: process.env.REACT_APP_ENV,
		APP_SERVER_URL: process.env.REACT_APP_SERVER_URL,
	},
	images: {
		domains: ['kinopoiskapiunofficial.tech', 'avatars.mds.yandex.net'],
		unoptimized: true,
	},
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: `${process.env.APP_SERVER_URL || process.env.REACT_APP_SERVER_URL}/api/:path*`,
			},
			{
				source: '/uploads/:path*',
				destination: `${
					process.env.APP_SERVER_URL || process.env.REACT_APP_SERVER_URL
				}/uploads/:path*`,
			},
		]
	},
}

module.exports = nextConfig
