//@ts-check

const path = require('node:path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@sass-project/auth', '@sass-project/contracts', '@sass-project/database'],
  turbopack: {
    root: path.resolve(__dirname, '../..'),
  },
};

module.exports = nextConfig;
