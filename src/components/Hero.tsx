'use client'

import { ArrowDown, Leaf, Palette, Heart } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background - CSS pur au lieu d'animations JS */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-sand-100 via-sand-50 to-sage-50" />
        <div className="absolute top-20 right-[10%] w-64 h-64 md:w-96 md:h-96 bg-sage-200/40 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 left-[5%] w-72 h-72 md:w-[400px] md:h-[400px] bg-terracotta-200/30 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 pt-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Tagline */}
          <div className="flex items-center justify-center gap-2 mb-8 animate-fade-in">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-sage-100 text-sage-700 rounded-full text-sm">
              <Leaf className="w-4 h-4" aria-hidden="true" />
              {t.hero.badge}
            </span>
          </div>

          {/* Main Title */}
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-clay-900 leading-tight mb-6 animate-fade-in-up">
            {t.hero.title1}{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-sage-600">{t.hero.titleHighlight}</span>
              <span className="absolute bottom-2 left-0 right-0 h-3 bg-sage-200/60 -z-0" />
            </span>{' '}
            {t.hero.title2}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-clay-600 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up animation-delay-200">
            {t.hero.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up animation-delay-400">
            <a
              href="#contact"
              className="group bg-sage-600 text-white px-8 py-4 rounded-full text-lg hover:bg-sage-700 transition-all hover:shadow-xl hover:shadow-sage-600/20 flex items-center gap-2"
            >
              {t.hero.cta1}
              <span className="group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
            </a>
            <a
              href="#services"
              className="px-8 py-4 rounded-full text-lg text-clay-700 hover:text-sage-600 transition-colors border border-clay-200 hover:border-sage-300"
            >
              {t.hero.cta2}
            </a>
          </div>

          {/* Trust Icons */}
          <div className="flex items-center justify-center gap-8 md:gap-12 text-clay-500 animate-fade-in animation-delay-600">
            <div className="flex items-center gap-2 text-sm">
              <Palette className="w-5 h-5 text-terracotta-500" aria-hidden="true" />
              <span>{t.hero.trust.art}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Leaf className="w-5 h-5 text-sage-500" aria-hidden="true" />
              <span>{t.hero.trust.nature}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Heart className="w-5 h-5 text-terracotta-400" aria-hidden="true" />
              <span>{t.hero.trust.wellbeing}</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <a
          href="#philosophie"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-clay-400 hover:text-sage-600 transition-colors animate-bounce-slow"
          aria-label={t.hero.scroll}
        >
          <span className="text-xs tracking-widest uppercase">{t.hero.scroll}</span>
          <ArrowDown className="w-5 h-5" aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
