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
    // İçtihat sayfaları: dava numarası bazlı eski slug'lardan konu bazlı yeni slug'lara 301
    { source: '/tr/ictihat/ygt-10hd-2025-3980', destination: '/tr/ictihat/kanser-ilaci-davasinda-derdestlik', permanent: true },
    { source: '/en/ictihat/ygt-10hd-2025-3980', destination: '/en/ictihat/kanser-ilaci-davasinda-derdestlik', permanent: true },
    { source: '/tr/ictihat/ygt-10hd-2025-10958', destination: '/tr/ictihat/kanser-ilaci-odeme-olcutleri', permanent: true },
    { source: '/en/ictihat/ygt-10hd-2025-10958', destination: '/en/ictihat/kanser-ilaci-odeme-olcutleri', permanent: true },
    { source: '/tr/ictihat/ygt-10hd-2025-11761', destination: '/tr/ictihat/odeme-listesi-disi-ilacta-ihtiyati-tedbir', permanent: true },
    { source: '/en/ictihat/ygt-10hd-2025-11761', destination: '/en/ictihat/odeme-listesi-disi-ilacta-ihtiyati-tedbir', permanent: true },
    { source: '/tr/ictihat/ygt-10hd-2025-8068', destination: '/tr/ictihat/kanser-ilaci-davasinda-feragat-vekalet-ucreti', permanent: true },
    { source: '/en/ictihat/ygt-10hd-2025-8068', destination: '/en/ictihat/kanser-ilaci-davasinda-feragat-vekalet-ucreti', permanent: true },
    { source: '/tr/ictihat/ygt-10hd-2025-3244', destination: '/tr/ictihat/kanser-ilaci-davasinin-acilmamis-sayilmasi', permanent: true },
    { source: '/en/ictihat/ygt-10hd-2025-3244', destination: '/en/ictihat/kanser-ilaci-davasinin-acilmamis-sayilmasi', permanent: true },
    { source: '/tr/ictihat/ygt-10hd-2024-10976', destination: '/tr/ictihat/ihtiyati-tedbirin-kaldirilmasi', permanent: true },
    { source: '/en/ictihat/ygt-10hd-2024-10976', destination: '/en/ictihat/ihtiyati-tedbirin-kaldirilmasi', permanent: true },
    // Root → Turkish (locale redirect also handled by proxy.ts)
    { source: '/', destination: '/tr', permanent: false },
  ],
}

export default nextConfig
