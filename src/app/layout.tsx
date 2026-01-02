import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { LanguageProvider } from '@/context/LanguageContext'

export const metadata: Metadata = {
  title: 'Webopoli | Sites web pour l\'art, la nature et le bien-être',
  description: 'Création de sites web accessibles et esthétiques pour les acteurs du changement positif : artistes, thérapeutes, associations et acteurs de la nature.',
  keywords: ['création site web', 'développeur web', 'site vitrine', 'artistes', 'thérapeutes', 'associations', 'nature', 'bien-être'],
  authors: [{ name: 'Webopoli' }],
  openGraph: {
    title: 'Webopoli | Sites web pour l\'art, la nature et le bien-être',
    description: 'Création de sites web accessibles et esthétiques pour les acteurs du changement positif.',
    url: 'https://webopoli.com',
    siteName: 'Webopoli',
    locale: 'fr_FR',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        {/* Print CSS pour éco-conception */}
        <link rel="stylesheet" href="/print.css" media="print" />
      </head>
      <body className="min-h-screen flex flex-col">
        <LanguageProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}
