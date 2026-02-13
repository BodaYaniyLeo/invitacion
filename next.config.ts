import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: [
            "website.com", "api.website.com",
        ],
    },
    output: "standalone",
};

export default nextConfig;
