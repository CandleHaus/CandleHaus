/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.printify.com" },
      { protocol: "https", hostname: "images-api.printify.com" },
      { protocol: "https", hostname: "storage.googleapis.com" },
    ]
  }
};

export default nextConfig;
