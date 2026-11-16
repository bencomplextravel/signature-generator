import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Builds a self-contained server folder, which the Docker image in Step 17 uses.
  output: "standalone",
};

export default nextConfig;