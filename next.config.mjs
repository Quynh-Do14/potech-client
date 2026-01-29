/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'giphy.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'media.giphy.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'autofusion.vn',
        pathname: '/api/uploads/**'
      },
      {
        protocol: 'http',
        hostname: 'autofusion.vn',
        pathname: '/api/uploads/**'
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8001',
        pathname: '/api/uploads/**'
      },
      {
        protocol: 'http',
        hostname: '103.130.213.26',
        port: '8001',
        pathname: '/api/uploads/**'
      },
      {
        protocol: 'https',
        hostname: 'api.autofusion.vn',
        pathname: '/api/uploads/**'
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/**'
      }
    ]
  },
  transpilePackages: ['react-slick', 'slick-carousel'],
  reactCompiler: true
}

export default nextConfig
