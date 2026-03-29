import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Zipayo — Moderne Zahlungslösungen',
  description: 'Akzeptieren Sie bargeldlose Zahlungen in Sekunden – ganz ohne teure Hardware. Die smarte Lösung für moderne Unternehmen.',
  keywords: 'Kartenzahlung, QR-Code, Tap to Pay, Zahlungsterminal, bargeldlos',
  openGraph: {
    title: 'Zipayo — Moderne Zahlungslösungen',
    description: 'Akzeptieren Sie bargeldlose Zahlungen in Sekunden – ganz ohne teure Hardware.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className="scroll-smooth light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" rel="stylesheet"/>
      </head>
      <body className="font-body">{children}</body>
    </html>
  )
}
