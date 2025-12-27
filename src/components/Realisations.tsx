'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ExternalLink, X, Leaf } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

const projectsData = [
  { id: 'benoit-segui', category: 'art', image: '/images/projets/benoit-segui.webp', color: 'terracotta', url: null, year: '2020', tags: ['Portfolio', 'Musique', 'Identité visuelle'] },
  { id: 'bastien-pouilles', category: 'art', image: '/images/projets/bastien-pouilles.webp', color: 'terracotta', url: 'https://bastienpouilles.com', year: '2020', tags: ['Portfolio', 'Musique', 'Photo editing'] },
  { id: 'pikasilla', category: 'nature', image: '/images/projets/pikasilla.webp', color: 'sage', url: 'https://pikasillapuhkemaja.ee', year: '2023', tags: ['Nature', 'Bien-être', 'Hébergement'] },
  { id: 'silus', category: 'community', image: '/images/projets/silus.webp', color: 'sage', url: 'https://silus.community', year: '2023', tags: ['Plateforme', 'Communauté', 'Développement'] },
  { id: 'orion-naval', category: 'business', image: '/images/projets/orion-naval.webp', color: 'clay', url: 'https://orionnaval.com', year: '2024', tags: ['B2B', 'Refonte', 'SEO'] },
  { id: 'better-organix', category: 'nature', image: '/images/projets/better-organix.webp', color: 'sage', url: 'https://betterorganix.com', year: '2023', tags: ['Bio', 'WordPress', 'Refonte'] },
  { id: 'joelahtme-aed', category: 'nature', image: '/images/projets/joelahtme-aed.webp', color: 'sage', url: 'https://aed.betterorganix.com', year: '2025', tags: ['Maraîchage', 'Local', 'Estonie'] },
  { id: 'safariland', category: 'business', image: '/images/projets/safariland.webp', color: 'terracotta', url: 'https://safariland.fr', year: '2024', tags: ['Loisirs', 'Enfants', 'Local'] },
  { id: 'hote-ideal', category: ['business', 'art'], image: '/images/projets/hote-ideal.webp', color: 'terracotta', url: 'https://lhoteideal.fr/', year: '2024', tags: ['Seconde main', 'E-commerce', 'Écologie'] },
  { id: 'vahtrame', category: ['art', 'business'], image: '/images/projets/vahtrame.webp', color: 'clay', url: 'https://vahtrame.ee/', year: '2022', tags: ['Artisanat', 'Construction', 'Bois'] },
  { id: 'e-compost', category: 'nature', image: '/images/projets/e-compost.webp', color: 'sage', url: 'https://e-compost.ee/', year: '2022', tags: ['Compost', 'Écologie', 'Services'] },
  { id: 'fairgrow', category: 'nature', image: '/images/projets/fairgrow.webp', color: 'sage', url: 'https://fairgrow.ee', year: '2021', tags: ['Agroécologie', 'Éducation', 'Formation'] },
  { id: 'fairgreen', category: 'nature', image: '/images/projets/fairgreen.webp', color: 'sage', url: 'https://fairgreen.ee', year: '2021', tags: ['Maraîchage', 'Bio', 'Circuit court'] },
  { id: 'helenes-delicacies', category: ['nature', 'art', 'business'], image: '/images/projets/helenes-delicacies.webp', color: 'terracotta', url: 'https://helenesdelicacies.com', year: '2024', tags: ['E-commerce', 'Vegan', 'Artisanat'] },
  { id: 'cours-vivantes', category: ['community', 'nature'], image: '/images/projets/cours-vivantes.webp', color: 'sage', url: 'https://coursvivantes.fr', year: '2025', tags: ['Association', 'Végétalisation', 'Intelligence collective'] },
]

export default function Realisations() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeCategory, setActiveCategory] = useState('all')
  const { t } = useLanguage()

  const categories = [
    { id: 'all', label: t.portfolio.categories.all },
    { id: 'art', label: t.portfolio.categories.art },
    { id: 'nature', label: t.portfolio.categories.nature },
    { id: 'business', label: t.portfolio.categories.business },
    { id: 'community', label: t.portfolio.categories.community },
  ]

  const realisations = projectsData.map(project => ({
    ...project,
    title: t.projects[project.id as keyof typeof t.projects]?.title || project.id,
    categoryLabel: t.projects[project.id as keyof typeof t.projects]?.categoryLabel || '',
    description: t.projects[project.id as keyof typeof t.projects]?.description || '',
  }))

  const filteredRealisations = activeCategory === 'all' 
    ? realisations 
    : realisations.filter(r => 
        Array.isArray(r.category) 
          ? r.category.includes(activeCategory)
          : r.category === activeCategory
      )

  return (
    <section id="realisations" className="py-24 md:py-32 bg-gradient-to-b from-sage-50/30 to-sand-50">
      <div className="container mx-auto px-6" ref={ref}>
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-block text-sage-600 text-sm tracking-widest uppercase mb-4"
            >
              {t.portfolio.label}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-3xl md:text-5xl text-clay-900 mb-6"
            >
              {t.portfolio.title} <span className="text-sage-600">{t.portfolio.titleHighlight}</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-clay-600 max-w-2xl mx-auto text-lg"
            >
              {t.portfolio.description}
            </motion.p>
          </div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2 rounded-full text-sm transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-sage-600 text-white shadow-lg shadow-sage-600/20'
                    : 'bg-white text-clay-600 hover:bg-sage-50 border border-sand-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRealisations.map((projet, index) => (
              <motion.article
                key={projet.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                layout
                className="group"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] mb-5 rounded-2xl overflow-hidden bg-sand-200">
                  <img 
                    src={projet.image} 
                    alt={projet.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  {/* Placeholder avec icône (fallback) */}
                  <div className={`hidden absolute inset-0 flex items-center justify-center bg-gradient-to-br ${
                    projet.color === 'sage' ? 'from-sage-100 to-sage-200' :
                    projet.color === 'terracotta' ? 'from-terracotta-100 to-terracotta-200' :
                    'from-clay-100 to-clay-200'
                  }`}>
                    <Leaf className={`w-16 h-16 ${
                      projet.color === 'sage' ? 'text-sage-400' :
                      projet.color === 'terracotta' ? 'text-terracotta-400' :
                      'text-clay-400'
                    }`} />
                  </div>
                  
                  {/* Year Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-clay-600">
                    {projet.year}
                  </div>
                  
                  {/* Hover Overlay - Site disponible */}
                  {projet.url && (
                    <a 
                      href={projet.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 bg-clay-900/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    >
                      <span className="text-white flex items-center gap-2 bg-sage-600 px-5 py-2 rounded-full">
                        {t.portfolio.viewSite} <ExternalLink className="w-4 h-4" />
                      </span>
                    </a>
                  )}

                  {/* Hover Overlay - Site non disponible */}
                  {!projet.url && (
                    <div className="absolute inset-0 bg-clay-900/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white flex items-center gap-2 bg-clay-600 px-5 py-2 rounded-full">
                        <X className="w-4 h-4" />
                        {t.portfolio.unavailable}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs uppercase tracking-wider ${
                      projet.color === 'sage' ? 'text-sage-600' :
                      projet.color === 'terracotta' ? 'text-terracotta-600' :
                      'text-clay-500'
                    }`}>
                      {projet.categoryLabel}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl text-clay-800 mb-2 group-hover:text-sage-600 transition-colors">
                    {projet.title}
                  </h3>
                  <p className="text-clay-600 text-sm mb-4 leading-relaxed">
                    {projet.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {projet.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 bg-sand-100 text-clay-600 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-8 text-center"
          >
            <div>
              <div className="font-serif text-4xl text-sage-600 mb-1">15+</div>
              <div className="text-clay-600 text-sm">{t.portfolio.stats.projects}</div>
            </div>
            <div>
              <div className="font-serif text-4xl text-sage-600 mb-1">100%</div>
              <div className="text-clay-600 text-sm">{t.portfolio.stats.satisfaction}</div>
            </div>
            <div>
              <div className="font-serif text-4xl text-sage-600 mb-1">5+</div>
              <div className="text-clay-600 text-sm">{t.portfolio.stats.experience}</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
