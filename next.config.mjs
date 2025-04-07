/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    domains: ["images.unsplash.com"], // Add the Unsplash domain here
  },
};

export default nextConfig;
