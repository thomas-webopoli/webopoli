'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Globe } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { locale, setLocale, t } = useLanguage()

  const navItems = [
    { href: '#philosophie', label: t.nav.philosophy },
    { href: '#services', label: t.nav.services },
    { href: '#ecosystem', label: t.nav.ecosystem },
    { href: '#processus', label: t.nav.process },
    { href: '#realisations', label: t.nav.portfolio },
    { href: '#contact', label: t.nav.contact },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleLanguage = () => {
    setLocale(locale === 'fr' ? 'en' : 'fr')
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all ${
        isScrolled
          ? 'bg-sand-50/90 backdrop-blur-md shadow-sm py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative z-10">
          <span className="font-serif text-2xl md:text-3xl text-clay-800">
            web<span className="text-sage-600">opoli</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Navigation principale">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-clay-600 hover:text-sage-600 transition-colors text-sm tracking-wide"
            >
              {item.label}
            </a>
          ))}
          
          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 text-clay-600 hover:text-sage-600 transition-colors text-sm tracking-wide"
            aria-label={`Changer la langue en ${locale === 'fr' ? 'anglais' : 'français'}`}
          >
            <Globe className="w-4 h-4" aria-hidden="true" />
            <span className="uppercase font-medium">{locale === 'fr' ? 'EN' : 'FR'}</span>
          </button>

          <a
            href="#contact"
            className="bg-sage-600 text-white px-6 py-2.5 rounded-full text-sm hover:bg-sage-700 transition-all hover:shadow-lg hover:shadow-sage-600/20"
          >
            {locale === 'fr' ? 'Discutons' : "Let's talk"}
          </a>
        </nav>

        {/* Mobile: Language + Menu Button */}
        <div className="md:hidden flex items-center gap-3 relative z-10">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 text-clay-600 hover:text-sage-600 transition-colors p-2"
            aria-label={`Changer la langue en ${locale === 'fr' ? 'anglais' : 'français'}`}
          >
            <Globe className="w-5 h-5" aria-hidden="true" />
            <span className="uppercase text-sm font-medium">{locale === 'fr' ? 'EN' : 'FR'}</span>
          </button>
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2"
            aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-clay-800" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6 text-clay-800" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-sand-50 md:hidden">
            <nav className="flex flex-col items-center justify-center h-full gap-8" aria-label="Navigation mobile">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-serif text-3xl text-clay-800 hover:text-sage-600 transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-4 bg-sage-600 text-white px-8 py-3 rounded-full text-lg hover:bg-sage-700 transition-colors"
              >
                {locale === 'fr' ? 'Discutons' : "Let's talk"}
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
