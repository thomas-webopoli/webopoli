'use client'

import { 
  Mail, 
  Calendar, 
  Share2, 
  Zap, 
  BarChart3, 
  MessageSquare,
  ArrowRight,
  Check
} from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function DigitalEcosystem() {
  const { t } = useLanguage()

  const tools = [
    {
      icon: Mail,
      id: 'newsletter',
      color: 'text-terracotta-500',
      bgColor: 'bg-terracotta-50',
    },
    {
      icon: Calendar,
      id: 'calendar',
      color: 'text-sage-600',
      bgColor: 'bg-sage-50',
    },
    {
      icon: Share2,
      id: 'social',
      color: 'text-clay-600',
      bgColor: 'bg-clay-50',
    },
    {
      icon: Zap,
      id: 'automation',
      color: 'text-terracotta-600',
      bgColor: 'bg-terracotta-50',
    },
    {
      icon: BarChart3,
      id: 'analytics',
      color: 'text-sage-500',
      bgColor: 'bg-sage-50',
    },
    {
      icon: MessageSquare,
      id: 'communication',
      color: 'text-clay-500',
      bgColor: 'bg-sand-100',
    },
  ]

  return (
    <section id="ecosystem" className="py-24 md:py-32 bg-gradient-to-b from-sage-50/30 to-sand-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <header className="text-center mb-16">
            <span className="inline-block text-sage-600 text-sm tracking-widest uppercase mb-4">
              {t.ecosystem.label}
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-clay-900 mb-6">
              {t.ecosystem.title} <span className="text-sage-600">{t.ecosystem.titleHighlight}</span>
            </h2>
            <p className="text-clay-600 max-w-2xl mx-auto text-lg">
              {t.ecosystem.description}
            </p>
          </header>

          {/* Intro block */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-sand-200 mb-16">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-clay-700 text-lg leading-relaxed mb-6">
                {t.ecosystem.intro.text}
              </p>
              <p className="text-sage-600 font-medium">
                {t.ecosystem.intro.highlight}
              </p>
            </div>
          </div>

          {/* Tools Grid */}
          <div className="mb-16">
            <h3 className="font-serif text-2xl text-clay-800 text-center mb-8">
              {t.ecosystem.toolsTitle}
            </h3>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 list-none p-0">
              {tools.map((tool) => {
                const Icon = tool.icon
                const toolData = t.ecosystem.tools[tool.id as keyof typeof t.ecosystem.tools]
                return (
                  <li
                    key={tool.id}
                    className="bg-white rounded-2xl p-6 border border-sand-200 hover:border-sage-300 hover:shadow-lg transition-all group"
                  >
                    <div className={`inline-flex p-3 rounded-xl ${tool.bgColor} mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-6 h-6 ${tool.color}`} aria-hidden="true" />
                    </div>
                    <h4 className="font-serif text-lg text-clay-800 mb-2">
                      {toolData.title}
                    </h4>
                    <p className="text-sm text-clay-600">
                      {toolData.description}
                    </p>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Benefits */}
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-sand-200 mb-16">
            <h3 className="font-serif text-2xl text-clay-800 text-center mb-8">
              {t.ecosystem.benefitsTitle}
            </h3>
            <ul className="grid md:grid-cols-2 gap-6 list-none p-0">
              {t.ecosystem.benefits.map((benefit: { title: string; description: string }, index: number) => (
                <li key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-sage-100 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-sage-600" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-medium text-clay-800 mb-1">{benefit.title}</h4>
                    <p className="text-sm text-clay-600">{benefit.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Block */}
          <div className="bg-gradient-to-br from-sage-600 to-sage-700 rounded-3xl p-8 md:p-12 text-center text-white">
            <h3 className="font-serif text-2xl md:text-3xl mb-4">
              {t.ecosystem.ctaTitle}
            </h3>
            <p className="text-white/90 max-w-2xl mx-auto mb-8 text-lg">
              {t.ecosystem.ctaDescription}
            </p>
            <button
              onClick={() => {
                window.history.pushState({}, '', '#contact?offer=ecosystem')
                window.dispatchEvent(new HashChangeEvent('hashchange'))
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="inline-flex items-center gap-2 bg-white text-sage-600 px-8 py-4 rounded-full text-lg hover:bg-sage-50 transition-all hover:shadow-xl group font-medium"
            >
              {t.ecosystem.finalCta}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </button>
            <p className="text-white/70 text-sm mt-4">
              {t.ecosystem.finalCtaNote}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
