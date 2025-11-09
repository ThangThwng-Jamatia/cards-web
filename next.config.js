/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed 'output: export' for optimal Vercel deployment
  // ESLint will now run during builds to catch issues
  images: { unoptimized: true }, // Keep this if not using next/image component
};

module.exports = nextConfig;
