'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Send, Mail, MapPin, CheckCircle, Loader2, AlertCircle } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    message: '',
  })
  const { t } = useLanguage()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de l\'envoi')
      }

      setFormState('success')
      setFormData({ name: '', email: '', project: '', message: '' })
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error)
      setFormState('error')
      setErrorMessage(t.contact.form.error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-sand-100 via-sand-50 to-sage-50/50" />
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -bottom-32 -right-32 w-96 h-96 bg-sage-200/30 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-6" ref={ref}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            {/* Left Column - Info */}
            <div>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="inline-block text-sage-600 text-sm tracking-widest uppercase mb-4"
              >
                {t.contact.label}
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-serif text-3xl md:text-5xl text-clay-900 mb-6"
              >
                {t.contact.title} <span className="text-sage-600">{t.contact.titleHighlight}</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-clay-600 text-lg leading-relaxed mb-8"
              >
                {t.contact.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-4 text-clay-600">
                  <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-sage-600" />
                  </div>
                  <div>
                    <div className="text-sm text-clay-500">{t.contact.info.email}</div>
                    <a href="mailto:thomas@webopoli.com" className="text-clay-800 hover:text-sage-600 transition-colors">
                      thomas@webopoli.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-clay-600">
                  <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-sage-600" />
                  </div>
                  <div>
                    <div className="text-sm text-clay-500">{t.contact.info.location}</div>
                    <span className="text-clay-800">{t.contact.info.locationValue}</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {formState === 'success' ? (
                <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-sage-100/50 border border-sage-100 text-center">
                  <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-sage-600" />
                  </div>
                  <h3 className="font-serif text-2xl text-clay-800 mb-3">
                    ✓
                  </h3>
                  <p className="text-clay-600">
                    {t.contact.form.success}
                  </p>
                  <button
                    onClick={() => setFormState('idle')}
                    className="mt-6 text-sage-600 hover:text-sage-700 transition-colors"
                  >
                    ↩
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-sage-100/50 border border-sage-100"
                >
                  <div className="space-y-6">
                    {/* Error Message */}
                    {formState === 'error' && (
                      <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p className="text-sm">{errorMessage}</p>
                      </div>
                    )}

                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm text-clay-700 mb-2">
                        {t.contact.form.name}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-sand-200 focus:border-sage-400 focus:ring-2 focus:ring-sage-100 outline-none transition-all bg-sand-50/50"
                        placeholder={t.contact.form.namePlaceholder}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm text-clay-700 mb-2">
                        {t.contact.form.email}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-sand-200 focus:border-sage-400 focus:ring-2 focus:ring-sage-100 outline-none transition-all bg-sand-50/50"
                        placeholder={t.contact.form.emailPlaceholder}
                      />
                    </div>

                    {/* Project Type */}
                    <div>
                      <label htmlFor="project" className="block text-sm text-clay-700 mb-2">
                        {t.contact.form.project}
                      </label>
                      <select
                        id="project"
                        name="project"
                        value={formData.project}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-sand-200 focus:border-sage-400 focus:ring-2 focus:ring-sage-100 outline-none transition-all bg-sand-50/50"
                      >
                        <option value="">{t.contact.form.projectPlaceholder}</option>
                        <option value="vitrine">{t.contact.form.projectOptions.vitrine}</option>
                        <option value="ecommerce">{t.contact.form.projectOptions.ecommerce}</option>
                        <option value="refonte">{t.contact.form.projectOptions.refonte}</option>
                        <option value="autre">{t.contact.form.projectOptions.other}</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm text-clay-700 mb-2">
                        {t.contact.form.message}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border border-sand-200 focus:border-sage-400 focus:ring-2 focus:ring-sage-100 outline-none transition-all bg-sand-50/50 resize-none"
                        placeholder={t.contact.form.messagePlaceholder}
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={formState === 'loading'}
                      className="w-full bg-sage-600 text-white py-4 rounded-xl hover:bg-sage-700 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {formState === 'loading' ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          {t.contact.form.sending}
                        </>
                      ) : (
                        <>
                          {t.contact.form.submit}
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
