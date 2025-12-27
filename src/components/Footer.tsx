'use client'

import Link from 'next/link'
import { Heart, Leaf } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { t, locale } = useLanguage()

  const footerLinks = {
    navigation: [
      { label: locale === 'fr' ? 'Accueil' : 'Home', href: '#' },
      { label: t.nav.services, href: '#services' },
      { label: t.nav.portfolio, href: '#realisations' },
      { label: t.nav.contact, href: '#contact' },
    ],
    legal: [
      { label: t.footer.legalMentions, href: '/mentions-legales' },
      { label: t.footer.privacy, href: '/confidentialite' },
      { label: 'CGV', href: '/cgv' },
    ],
  }

  return (
    <footer className="bg-clay-900 text-sand-200 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Top Section */}
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <Link href="/" className="inline-block mb-4">
                <span className="font-serif text-3xl text-sand-100">
                  web<span className="text-sage-400">opoli</span>
                </span>
              </Link>
              <p className="text-sand-400 leading-relaxed max-w-md mb-6">
                {t.footer.tagline}
              </p>
              <div className="flex items-center gap-2 text-sage-400 text-sm">
                <Leaf className="w-4 h-4" />
                <span>{t.hero.badge}</span>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="font-serif text-lg text-sand-100 mb-4">{t.footer.navigation}</h4>
              <ul className="space-y-2">
                {footerLinks.navigation.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sand-400 hover:text-sage-400 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-serif text-lg text-sand-100 mb-4">{t.footer.legal}</h4>
              <ul className="space-y-2">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sand-400 hover:text-sage-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-clay-800 mb-8" />

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-sand-500">
            <p>
              © {currentYear} Webopoli. {t.footer.rights}
            </p>
            <p className="flex items-center gap-1">
              {locale === 'fr' ? 'Fait avec' : 'Made with'} <Heart className="w-4 h-4 text-terracotta-500" /> {locale === 'fr' ? 'en Bourgogne-Franche-Comté' : 'in Burgundy, France'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
