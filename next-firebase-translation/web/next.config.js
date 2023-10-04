/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // 警告 : これにより、プロジェクトにESLintのエラーがあっても、本番のビルドが正常に完了するようになります。
    // プロジェクトにESLintのエラーがあっても、本番のビルドが正常に完了します。
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        // pathname: '/account123/**',
      },
    ],
  },
}

module.exports = nextConfig
