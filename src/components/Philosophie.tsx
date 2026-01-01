'use client'

import { Sparkles, Users, Zap } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function Philosophie() {
  const { t } = useLanguage()

  const values = [
    {
      icon: Sparkles,
      title: t.philosophy.values.accessible.title,
      description: t.philosophy.values.accessible.description,
    },
    {
      icon: Users,
      title: t.philosophy.values.human.title,
      description: t.philosophy.values.human.description,
    },
    {
      icon: Zap,
      title: t.philosophy.values.efficient.title,
      description: t.philosophy.values.efficient.description,
    },
  ]

  return (
    <section id="philosophie" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-clay-200 to-transparent" aria-hidden="true" />

      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <header className="text-center mb-16 md:mb-24">
            <span className="inline-block text-sage-600 text-sm tracking-widest uppercase mb-4">
              {t.philosophy.label}
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-clay-900 mb-6">
              {t.philosophy.title}{' '}
              <span className="text-sage-600">{t.philosophy.titleHighlight}</span>
            </h2>
            <p className="text-clay-600 max-w-2xl mx-auto text-lg leading-relaxed">
              {t.philosophy.description}
            </p>
          </header>

          {/* Values Grid */}
          <ul className="grid md:grid-cols-3 gap-8 md:gap-12 list-none p-0">
            {values.map((value) => (
              <li key={value.title} className="group">
                <article className="relative p-8 md:p-10 bg-white/50 rounded-3xl border border-sand-200 hover:border-sage-300 transition-all hover:shadow-xl hover:shadow-sage-100/50">
                  {/* Icon */}
                  <div className="mb-6 inline-flex items-center justify-center w-14 h-14 bg-sage-100 rounded-2xl text-sage-600 group-hover:bg-sage-600 group-hover:text-white transition-all">
                    <value.icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="font-serif text-2xl text-clay-800 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-clay-600 leading-relaxed">
                    {value.description}
                  </p>
                </article>
              </li>
            ))}
          </ul>

          {/* Quote */}
          <blockquote className="mt-20 text-center relative">
            <span className="absolute -top-4 -left-2 text-6xl text-sage-200 font-serif" aria-hidden="true">"</span>
            <p className="font-serif text-xl md:text-2xl text-clay-700 italic max-w-3xl mx-auto leading-relaxed">
              {t.philosophy.quote}
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
