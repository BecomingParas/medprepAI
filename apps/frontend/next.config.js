//@ts-check

const path = require('node:path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@sass-project/auth',
    '@sass-project/contracts',
    '@sass-project/database',
    '@sass-project/shared',
  ],
  turbopack: {
    root: path.resolve(__dirname, '../..'),
  },
};

module.exports = nextConfig;
