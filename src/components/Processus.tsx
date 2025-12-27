'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { MessageSquare, FileText, Code, Rocket } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function Processus() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t } = useLanguage()

  const steps = [
    {
      number: '01',
      icon: MessageSquare,
      title: t.process.steps.discovery.title,
      description: t.process.steps.discovery.description,
      duration: t.process.steps.discovery.duration,
    },
    {
      number: '02',
      icon: FileText,
      title: t.process.steps.proposal.title,
      description: t.process.steps.proposal.description,
      duration: t.process.steps.proposal.duration,
    },
    {
      number: '03',
      icon: Code,
      title: t.process.steps.creation.title,
      description: t.process.steps.creation.description,
      duration: t.process.steps.creation.duration,
    },
    {
      number: '04',
      icon: Rocket,
      title: t.process.steps.launch.title,
      description: t.process.steps.launch.description,
      duration: t.process.steps.launch.duration,
    },
  ]

  return (
    <section id="processus" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute left-1/2 top-32 bottom-32 w-px bg-gradient-to-b from-transparent via-sage-200 to-transparent hidden md:block" />

      <div className="container mx-auto px-6" ref={ref}>
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 md:mb-24">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-block text-sage-600 text-sm tracking-widest uppercase mb-4"
            >
              {t.process.label}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-3xl md:text-5xl text-clay-900 mb-6"
            >
              {t.process.title} <span className="text-sage-600">{t.process.titleHighlight}</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-clay-600 max-w-2xl mx-auto text-lg"
            >
              {t.process.description}
            </motion.p>
          </div>

          {/* Steps */}
          <div className="space-y-12 md:space-y-0">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
                className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 1 ? 'md:text-right' : ''}`}>
                  <span className="inline-block text-sage-300 font-serif text-6xl md:text-7xl mb-4">
                    {step.number}
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl text-clay-800 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-clay-600 leading-relaxed mb-2">
                    {step.description}
                  </p>
                  <span className="text-sm text-sage-600 font-medium">
                    {step.duration}
                  </span>
                </div>

                {/* Icon */}
                <div className="relative">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-full shadow-lg shadow-sage-100 flex items-center justify-center border border-sage-100 relative z-10">
                    <step.icon className="w-8 h-8 md:w-10 md:h-10 text-sage-600" />
                  </div>
                  {/* Connector dot for desktop */}
                  <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-sage-400 rounded-full z-20" />
                </div>

                {/* Spacer for alignment */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="text-center mt-16"
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-sage-600 text-white px-8 py-4 rounded-full text-lg hover:bg-sage-700 transition-all duration-300 hover:shadow-xl hover:shadow-sage-600/20"
            >
              {t.process.cta}
              <span>→</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
