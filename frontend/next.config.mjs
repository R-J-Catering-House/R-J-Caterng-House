/** @type {import('next').NextConfig} */
const backend = process.env.BACKEND_INTERNAL_URL ?? "http://localhost:8000";

const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ["*.trycloudflare.com", "*.ngrok-free.app", "*.ngrok-free.dev", "*.loca.lt"],
  async rewrites() {
    return [{ source: "/api/:path*", destination: `${backend}/api/:path*` }];
  },
};

export default nextConfig;