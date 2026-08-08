import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Productos + Servicios were merged into a single "Uniformes
      // Empresariales" page — preserve the SEO equity of the already
      // indexed old URLs instead of letting them 404.
      {
        source: "/:locale(es|en)/productos",
        destination: "/:locale/uniformes#confeccion",
        permanent: true,
      },
      {
        source: "/:locale(es|en)/servicios",
        destination: "/:locale/uniformes",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
