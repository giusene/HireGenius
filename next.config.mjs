/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,

	sassOptions: {
		includePaths: ["src/styles"],
		prependData: `@import "./src/styles/default/";`,
	},
};

export default nextConfig;
