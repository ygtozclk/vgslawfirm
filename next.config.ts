import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* 301 redirects from old Wix URL paths to preserve any existing rankings */
  redirects: async () => [
    // Wix team page
    { source: '/team-1', destination: '/tr/ekibimiz', permanent: true },
    // Wix practice area paths
    { source: '/ozelhukuk', destination: '/tr/calisma-alanlari/ozel-hukuk', permanent: true },
    { source: '/cezahukuku', destination: '/tr/calisma-alanlari/ceza-hukuku', permanent: true },
    { source: '/kamuhukuku', destination: '/tr/calisma-alanlari/kamu-hukuku', permanent: true },
    { source: '/social-rights', destination: '/tr/calisma-alanlari', permanent: true },
    // Wix blog/publications
    { source: '/yayinlarimiz', destination: '/tr/yayinlar', permanent: true },
    { source: '/blog', destination: '/tr/yayinlar', permanent: true },
    // Wix contact
    { source: '/iletisim', destination: '/tr/iletisim', permanent: true },
    // Root → Turkish (locale redirect also handled by proxy.ts)
    { source: '/', destination: '/tr', permanent: false },
  ],
}

export default nextConfig
