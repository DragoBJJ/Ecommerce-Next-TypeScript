/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "naszsklep-api.vercel.app",
      "media.graphcms.com",
      "media.graphassets.com",
      "source.unsplash.com"
    ],
    formats: ["image/avif", "image/webp"]
  }
};

module.exports = nextConfig;
