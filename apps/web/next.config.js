/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ['@repo/ui'],
  async rewrites() {
    return [
      {
        source: '/api/login',
        destination: 'http://localhost:3021/auth/login',
      },
      {
        source: '/api/validate',
        destination: 'http://localhost:3021/auth/validate',
      },
      {
        source: '/api/:path',
        destination: 'http://localhost:3022/:path',
      },
    ];
  },
};
