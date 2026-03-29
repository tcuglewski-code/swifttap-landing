import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SwiftTap — Kartenzahlung für den Außendienst',
  description: 'QR-Code oder Kartenterminal — SwiftTap macht Zahlungen zum Standard in deinem Betrieb. Einfach. Günstig. Ohne Risiko.',
  keywords: 'Kartenzahlung, Außendienst, Handwerk, Friseure, GaLaBau, Reinigung, Forst, QR-Code, Zahlungsterminal',
  openGraph: {
    title: 'SwiftTap — Kartenzahlung für den Außendienst',
    description: 'QR-Code oder Kartenterminal — SwiftTap macht Zahlungen zum Standard in deinem Betrieb.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
