'use client'

import { useState } from 'react'
import { Check, ArrowRight, Sparkles } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

const addonPrices = {
  newsletter: '80',
  social: '60',
  blog: '100',
  calendar: '120',
  chat: '150',
  members: '200',
}

export default function Services() {
  const [showAddons, setShowAddons] = useState(false)
  const { t } = useLanguage()

  const services = [
    {
      id: 'essential',
      name: t.services.plans.essential.name,
      price: '300',
      description: t.services.plans.essential.description,
      features: t.services.plans.essential.features,
      delay: t.services.plans.essential.delay,
      highlight: false,
    },
    {
      id: 'community',
      name: t.services.plans.community.name,
      price: '550',
      description: t.services.plans.community.description,
      features: t.services.plans.community.features,
      delay: t.services.plans.community.delay,
      highlight: true,
      badge: t.services.popular,
    },
    {
      id: 'creator',
      name: t.services.plans.creator.name,
      price: '750',
      description: t.services.plans.creator.description,
      features: t.services.plans.creator.features,
      delay: t.services.plans.creator.delay,
      highlight: false,
    },
  ]

  const addons = [
    { name: t.services.addons.newsletter, price: addonPrices.newsletter },
    { name: t.services.addons.social, price: addonPrices.social },
    { name: t.services.addons.blog, price: addonPrices.blog },
    { name: t.services.addons.calendar, price: addonPrices.calendar },
    { name: t.services.addons.chat, price: addonPrices.chat },
    { name: t.services.addons.members, price: addonPrices.members },
  ]

  return (
    <section id="services" className="py-24 md:py-32 bg-gradient-to-b from-sand-50 to-sage-50/30">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <header className="text-center mb-16">
            <span className="inline-block text-sage-600 text-sm tracking-widest uppercase mb-4">
              {t.services.label}
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-clay-900 mb-6">
              {t.services.title} <span className="text-sage-600">{t.services.titleHighlight}</span>
            </h2>
            <p className="text-clay-600 max-w-2xl mx-auto text-lg">
              {t.services.description}
            </p>
          </header>

          {/* Pricing Cards */}
          <ul className="grid md:grid-cols-3 gap-6 md:gap-8 mb-16 list-none p-0">
            {services.map((service) => (
              <li
                key={service.id}
                className={`relative rounded-3xl p-8 transition-all ${
                  service.highlight
                    ? 'bg-sage-600 text-white shadow-2xl shadow-sage-600/20 md:scale-105'
                    : 'bg-white border border-sand-200 hover:border-sage-300 hover:shadow-xl'
                }`}
              >
                {service.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-terracotta-600 text-white text-xs px-4 py-1 rounded-full flex items-center gap-1 font-medium">
                    <Sparkles className="w-3 h-3" aria-hidden="true" />
                    {service.badge}
                  </span>
                )}

                <div className="mb-6">
                  <h3 className={`font-serif text-2xl mb-2 ${service.highlight ? 'text-white' : 'text-clay-800'}`}>
                    {service.name}
                  </h3>
                  <p className={`text-sm ${service.highlight ? 'text-white/90' : 'text-clay-600'}`}>
                    {service.description}
                  </p>
                </div>

                <p className="mb-6">
                  <strong className={`font-serif text-5xl ${service.highlight ? 'text-white' : 'text-clay-900'}`}>
                    {service.price}€
                  </strong>
                  <span className={`text-sm ml-1 ${service.highlight ? 'text-white/80' : 'text-clay-600'}`}>
                    {t.services.perProject}
                  </span>
                </p>

                <ul className={`space-y-3 mb-8 list-none p-0 ${service.highlight ? 'text-white' : 'text-clay-600'}`}>
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${service.highlight ? 'text-white/70' : 'text-sage-500'}`} aria-hidden="true" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <p className={`text-xs mb-6 ${service.highlight ? 'text-white/80' : 'text-clay-600'}`}>
                  {t.services.delay} : {service.delay}
                </p>

                <a
                  href="#contact"
                  className={`block text-center py-3 px-6 rounded-full transition-all ${
                    service.highlight
                      ? 'bg-white text-sage-600 hover:bg-sage-50'
                      : 'bg-sage-600 text-white hover:bg-sage-700'
                  }`}
                >
                  {t.services.choose}
                </a>
              </li>
            ))}
          </ul>

          {/* Addons */}
          <div className="text-center">
            <button
              onClick={() => setShowAddons(!showAddons)}
              className="inline-flex items-center gap-2 text-sage-600 hover:text-sage-700 transition-colors"
              aria-expanded={showAddons}
            >
              <span>{t.services.showAddons}</span>
              <ArrowRight className={`w-4 h-4 transition-transform ${showAddons ? 'rotate-90' : ''}`} aria-hidden="true" />
            </button>

            {showAddons && (
              <ul className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto list-none p-0">
                {addons.map((addon) => (
                  <li
                    key={addon.name}
                    className="bg-white/50 border border-sand-200 rounded-xl p-4 text-left"
                  >
                    <span className="text-sm text-clay-800 block">{addon.name}</span>
                    <strong className="font-serif text-lg text-sage-600">+{addon.price}€</strong>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
