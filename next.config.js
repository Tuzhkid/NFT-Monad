/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  async headers() {
    return [
        {
            source: "/(.*)", // Apply to all pages
            headers: [
                {
                    key: "WWW-Authenticate",
                    value: 'Basic realm="Secure Area"',
                },
            ],
        },
    ];
},
}

module.exports = nextConfig
