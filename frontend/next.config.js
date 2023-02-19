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
				destination: 'http://localhost:5500/api/:path*',
			},
			{
				source: '/uploads/:path*',
				destination: 'http://localhost:5500/uploads/:path*',
			},
		]
	},
}

module.exports = nextConfig
