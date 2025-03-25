/** @type {import('next').NextConfig} */
const nextConfig = {
    // output:"export",
    eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
    // serverExternalPackages: ['@acme/ui'],
    experimental: {
    serverComponentsExternalPackages: ['@acme/ui']
  },
//   webpack: (config) => {
//     config.module.rules.push({
//         test: /\.ttf$/,
//         type: 'asset/resource',
//     });
//     return config;
// },
    
};

export default nextConfig;
