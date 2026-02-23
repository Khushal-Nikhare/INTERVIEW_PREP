import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    PYTHON_API_URL: process.env.PYTHON_API_URL || "http://127.0.0.1:8000",
  },
};

export default nextConfig;
