// import withBundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  basePath: '',
}

module.exports = withBundleAnalyzer(nextConfig)
