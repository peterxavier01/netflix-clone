/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
    domains: ["uhdtv.io", "mango.blender.org", "upload.wikimedia.org"],
  },
};

module.exports = nextConfig;
