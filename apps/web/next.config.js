/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ['@repo/ui'],
  async rewrites() {
    return [
      {
        source: '/api/login',
        destination: 'http://localhost:3001/auth/login',
      },
      {
        source: '/api/validate',
        destination: 'http://localhost:3001/auth/validate',
      },
      {
        source: '/api/:path',
        destination: 'http://localhost:3002/:path',
      },
    ];
  },
};
