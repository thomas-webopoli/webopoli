'use client'

import { Leaf, Zap } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function EcoPerformance() {
  const { t } = useLanguage()

  return (
    <section id="eco-performance" className="py-16 md:py-24 bg-gradient-to-b from-sand-50 to-sage-50/30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="text-center mb-12">
            <span className="inline-block text-sage-600 text-sm tracking-widest uppercase mb-4">
              {t.ecoPerformance.label}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-clay-900 mb-6">
              {t.ecoPerformance.title}
            </h2>
            <p className="text-clay-600 max-w-2xl mx-auto text-lg leading-relaxed">
              {t.ecoPerformance.description}
            </p>
          </header>

          {/* Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Eco-Index Card */}
            <div className="bg-white rounded-3xl p-8 border border-sage-200 shadow-lg shadow-sage-100/50 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-sage-100 rounded-2xl flex items-center justify-center">
                  <Leaf className="w-7 h-7 text-sage-600" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-clay-800">{t.ecoPerformance.ecoIndex.title}</h3>
                  <p className="text-sm text-clay-500">{t.ecoPerformance.ecoIndex.subtitle}</p>
                </div>
              </div>
              
              {/* Badge EcoIndex */}
              <div className="flex items-center justify-center py-6 mb-6 bg-sage-50 rounded-2xl">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-sage-600 rounded-full mb-3">
                    <span className="text-3xl font-bold text-white">A</span>
                  </div>
                  <p className="text-sage-700 font-medium">EcoIndex</p>
                  <p className="text-xs text-sage-600">{t.ecoPerformance.ecoIndex.label}</p>
                </div>
              </div>

              <p className="text-clay-600 text-sm leading-relaxed">
                {t.ecoPerformance.ecoIndex.description}
              </p>
            </div>

            {/* PageSpeed Card */}
            <div className="bg-white rounded-3xl p-8 border border-terracotta-200 shadow-lg shadow-terracotta-100/50 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-terracotta-100 rounded-2xl flex items-center justify-center">
                  <Zap className="w-7 h-7 text-terracotta-600" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-clay-800">{t.ecoPerformance.pageSpeed.title}</h3>
                  <p className="text-sm text-clay-500">{t.ecoPerformance.pageSpeed.subtitle}</p>
                </div>
              </div>
              
              {/* Badge PageSpeed */}
              <div className="flex items-center justify-center py-6 mb-6 bg-green-50 rounded-2xl">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-3">
                    <span className="text-3xl font-bold text-white">100</span>
                  </div>
                  <p className="text-green-700 font-medium">PageSpeed</p>
                  <p className="text-xs text-green-600">{t.ecoPerformance.pageSpeed.label}</p>
                </div>
              </div>

              <p className="text-clay-600 text-sm leading-relaxed">
                {t.ecoPerformance.pageSpeed.description}
              </p>
            </div>
          </div>

          {/* Bottom message */}
          <p className="text-center mt-10 text-clay-500 text-sm">
            {t.ecoPerformance.footer}
          </p>
        </div>
      </div>
    </section>
  )
}
