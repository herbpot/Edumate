/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    webpack5: true,
    webpack: (config) => {
      config.resolve.fallback = { fs: false };
  
      return config;
    },
    externals: {
        sqlite3: 'commonjs sqlite3',
    },
};
module.exports = nextConfig
