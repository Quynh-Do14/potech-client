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
        hostname: 'potechvietnam.vn',
        pathname: '/api/uploads/**'
      },
      {
        protocol: 'http',
        hostname: 'potechvietnam.vn',
        pathname: '/api/uploads/**'
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
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
        hostname: 'api.potechvietnam.vn',
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
