/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  experimental: {
    images: {
      layoutRaw: true,
    },
  },
  images: {
    domains: [
      "https://www.soundofheaven.nodesign.no",
      "soundofheaven.nodesign",
      "www.soundofheaven.nodesign.no",
    ],
    formats: ["image/avif", "image/webp"],
  },

  // Rest of the config
};
