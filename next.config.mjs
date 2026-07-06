// GitHub Pages serves static files under https://<user>.github.io/<repo>/,
// so we export a fully static site and prefix everything with the repo path.
// The deploy workflow sets PAGES_BASE_PATH automatically to "/<repo-name>".
const basePath = process.env.PAGES_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
