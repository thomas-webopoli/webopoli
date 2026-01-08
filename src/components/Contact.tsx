'use client'

import { useState, useEffect } from 'react'
import { Send, Mail, MapPin, CheckCircle, Loader2, AlertCircle } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function Contact() {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    message: '',
  })
  const { t } = useLanguage()

  // Écouter les changements de hash pour pré-remplir le formulaire
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash.includes('contact')) {
        const params = new URLSearchParams(hash.split('?')[1] || '')
        const offer = params.get('offer')
        if (offer && ['essential', 'community', 'creator', 'ecosystem'].includes(offer)) {
          setFormData(prev => ({ ...prev, project: offer }))
        }
      }
    }

    // Vérifier au chargement initial
    handleHashChange()

    // Écouter les changements de hash
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

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
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-sage-200/30 rounded-full blur-3xl" aria-hidden="true" />
      </div>

      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            {/* Left Column - Info */}
            <div>
              <span className="inline-block text-sage-600 text-sm tracking-widest uppercase mb-4">
                {t.contact.label}
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-clay-900 mb-6">
                {t.contact.title} <span className="text-sage-600">{t.contact.titleHighlight}</span>
              </h2>
              <p className="text-clay-600 text-lg leading-relaxed mb-8">
                {t.contact.description}
              </p>

              <address className="space-y-4 not-italic">
                <div className="flex items-center gap-4 text-clay-600">
                  <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-sage-600" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="text-sm text-clay-600 block">{t.contact.info.email}</span>
                    <a href="mailto:thomas@webopoli.com" className="text-clay-800 hover:text-sage-600 transition-colors">
                      thomas@webopoli.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-clay-600">
                  <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-sage-600" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="text-sm text-clay-600 block">{t.contact.info.location}</span>
                    <span className="text-clay-800">{t.contact.info.locationValue}</span>
                  </div>
                </div>
              </address>
            </div>

            {/* Right Column - Form */}
            <div>
              {formState === 'success' ? (
                <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-sage-100/50 border border-sage-100 text-center">
                  <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-sage-600" aria-hidden="true" />
                  </div>
                  <p className="text-clay-600">
                    {t.contact.form.success}
                  </p>
                  <button
                    onClick={() => setFormState('idle')}
                    className="mt-6 text-sage-600 hover:text-sage-700 transition-colors"
                  >
                    ↩ Retour
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
                      <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700" role="alert">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
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
                        <option value="essential">{t.contact.form.projectOptions.essential}</option>
                        <option value="community">{t.contact.form.projectOptions.community}</option>
                        <option value="creator">{t.contact.form.projectOptions.creator}</option>
                        <option value="ecosystem">{t.contact.form.projectOptions.ecosystem}</option>
                        <option value="other">{t.contact.form.projectOptions.other}</option>
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
                      className="w-full bg-sage-600 text-white py-4 rounded-xl hover:bg-sage-700 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {formState === 'loading' ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                          {t.contact.form.sending}
                        </>
                      ) : (
                        <>
                          {t.contact.form.submit}
                          <Send className="w-5 h-5" aria-hidden="true" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
