/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "naszsklep-api.vercel.app",
      "media.graphcms.com",
      "media.graphassets.com"
    ],
    formats: ["image/avif", "image/webp"]
  },
  env: {
    API: process.env.GRAPHCMS_ENDPOINT,
    TOKEN: process.env.GRAPHCMS_MUTATION_TOKEN,
    DOMAIN: process.env.LOCAL_DOMAIN
  }
};

module.exports = nextConfig;
