import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://stratum-energy.vercel.app'),
  title: "Stratum Energy — Reliable Power for Facilities That Can't Afford Downtime",
  description: "Stratum Energy builds modular battery storage systems for mid-size manufacturers. Installs in 2 days, scales as you grow. 22% avg. energy cost reduction.",
  openGraph: {
    title: "Stratum Energy — Reliable Power for Facilities That Can't Afford Downtime",
    description: "Stratum Energy builds modular battery storage systems for mid-size manufacturers. Installs in 2 days, scales as you grow. 22% avg. energy cost reduction.",
    images: [{ url: '/Images/hero-bg.png', width: 1200, height: 630 }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Figtree:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <Script src="https://unpkg.com/@phosphor-icons/web" strategy="afterInteractive" />
      </body>
    </html>
  )
}
