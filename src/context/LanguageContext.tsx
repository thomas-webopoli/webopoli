'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import fr from '@/locales/fr.json'
import en from '@/locales/en.json'

type Locale = 'fr' | 'en'

type Translations = typeof fr

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Translations
}

const translations = { fr, en }

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('fr')

  useEffect(() => {
    // Récupérer la langue sauvegardée ou détecter la langue du navigateur
    const savedLocale = localStorage.getItem('locale') as Locale
    if (savedLocale && (savedLocale === 'fr' || savedLocale === 'en')) {
      setLocaleState(savedLocale)
    } else {
      // Détecter la langue du navigateur
      const browserLang = navigator.language.split('-')[0]
      if (browserLang === 'en') {
        setLocaleState('en')
      }
    }
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem('locale', newLocale)
  }

  const t = translations[locale] as Translations

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
