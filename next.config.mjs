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
          ],
      },
};

export default nextConfig;
