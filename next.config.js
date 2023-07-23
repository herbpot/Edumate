/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    webpack5: true,
    webpack: (config) => {
      config.resolve.fallback = { fs: false };
      config.module.rules.push({
        test: /\.html$/i,
        use: 'html-loader',
      });
      return config;
    },
    externals: {
        sqlite3: 'commonjs sqlite3',
    },
};
module.exports = nextConfig
