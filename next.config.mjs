/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // 🚫 TypeScript errors ko ignore karega (BUILD ke waqt)
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
