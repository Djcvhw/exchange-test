/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ['@repo/ui'],
  async rewrites() {
    return [
      {
        source: '/api/login',
        destination: 'https://exchange-test-auth.vercel.app/auth/login',
      },
      {
        source: '/api/validate',
        destination: 'https://exchange-test-auth.vercel.app/auth/validate',
      },
      {
        source: '/api/:path',
        destination: 'https://exchange-test-api.vercel.app//:path',
      },
    ];
  },
};
