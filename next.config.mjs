/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
        port: '',
        pathname: '/photo/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ichef.bbci.co.uk',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'e0.365dm.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'liveblog.digitalimages.sky',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.espn.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;