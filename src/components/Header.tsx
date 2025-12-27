'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
    { href: '#processus', label: t.nav.process },
    { href: '#realisations', label: t.nav.portfolio },
    { href: '#contact', label: t.nav.contact },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleLanguage = () => {
    setLocale(locale === 'fr' ? 'en' : 'fr')
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-sand-50/90 backdrop-blur-md shadow-sm py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative z-10">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-serif text-2xl md:text-3xl text-clay-800"
          >
            web<span className="text-sage-600">opoli</span>
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => (
            <motion.a
              key={item.href}
              href={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-clay-600 hover:text-sage-600 transition-colors duration-300 text-sm tracking-wide"
            >
              {item.label}
            </motion.a>
          ))}
          
          {/* Language Switcher */}
          <motion.button
            onClick={toggleLanguage}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-1.5 text-clay-600 hover:text-sage-600 transition-colors duration-300 text-sm tracking-wide"
            aria-label="Change language"
          >
            <Globe className="w-4 h-4" />
            <span className="uppercase font-medium">{locale === 'fr' ? 'EN' : 'FR'}</span>
          </motion.button>

          <motion.a
            href="#contact"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-sage-600 text-white px-6 py-2.5 rounded-full text-sm hover:bg-sage-700 transition-all duration-300 hover:shadow-lg hover:shadow-sage-600/20"
          >
            {locale === 'fr' ? 'Discutons' : "Let's talk"}
          </motion.a>
        </nav>

        {/* Mobile: Language + Menu Button */}
        <div className="md:hidden flex items-center gap-3 relative z-10">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 text-clay-600 hover:text-sage-600 transition-colors p-2"
            aria-label="Change language"
          >
            <Globe className="w-5 h-5" />
            <span className="uppercase text-sm font-medium">{locale === 'fr' ? 'EN' : 'FR'}</span>
          </button>
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-clay-800" />
            ) : (
              <Menu className="w-6 h-6 text-clay-800" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-sand-50 md:hidden"
            >
              <nav className="flex flex-col items-center justify-center h-full gap-8">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-serif text-3xl text-clay-800 hover:text-sage-600 transition-colors"
                  >
                    {item.label}
                  </motion.a>
                ))}
                <motion.a
                  href="#contact"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-4 bg-sage-600 text-white px-8 py-3 rounded-full text-lg hover:bg-sage-700 transition-colors"
                >
                  {locale === 'fr' ? 'Discutons' : "Let's talk"}
                </motion.a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
