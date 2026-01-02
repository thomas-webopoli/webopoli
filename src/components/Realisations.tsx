'use client'

import { useRef, useState } from 'react'
import { ExternalLink, X, Leaf, ChevronDown } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import Image from 'next/image'

const projectsData = [
  { id: 'fairgreen', category: 'nature', image: '/images/projets/fairgreen.webp', color: 'sage', url: 'https://fairgreen.ee', year: '2021' },
  { id: 'e-compost', category: 'nature', image: '/images/projets/e-compost.webp', color: 'sage', url: 'https://e-compost.ee/', year: '2022' },
  { id: 'safariland', category: 'business', image: '/images/projets/safariland.webp', color: 'terracotta', url: 'https://safariland.fr', year: '2024' },
  { id: 'hote-ideal', category: ['business', 'art'], image: '/images/projets/hote-ideal.webp', color: 'terracotta', url: 'https://lhoteideal.fr/', year: '2024' },
  { id: 'helenes-delicacies', category: ['nature', 'art', 'business'], image: '/images/projets/helenes-delicacies.webp', color: 'terracotta', url: 'https://helenesdelicacies.com', year: '2024' },
  { id: 'cours-vivantes', category: ['community', 'nature'], image: '/images/projets/cours-vivantes.webp', color: 'sage', url: 'https://coursvivantes.fr', year: '2025' },
  { id: 'benoit-segui', category: 'art', image: '/images/projets/benoit-segui.webp', color: 'terracotta', url: null, year: '2020' },
  { id: 'bastien-pouilles', category: 'art', image: '/images/projets/bastien-pouilles.webp', color: 'terracotta', url: 'https://bastienpouilles.com', year: '2020' },
  { id: 'pikasilla', category: 'nature', image: '/images/projets/pikasilla.webp', color: 'sage', url: 'https://pikasillapuhkemaja.ee', year: '2023' },
  { id: 'silus', category: 'community', image: '/images/projets/silus.webp', color: 'sage', url: 'https://silus.community', year: '2023' },
  { id: 'orion-naval', category: 'business', image: '/images/projets/orion-naval.webp', color: 'clay', url: 'https://orionnaval.com', year: '2024' },
  { id: 'better-organix', category: 'nature', image: '/images/projets/better-organix.webp', color: 'sage', url: 'https://betterorganix.com', year: '2023' },
  { id: 'joelahtme-aed', category: 'nature', image: '/images/projets/joelahtme-aed.webp', color: 'sage', url: 'https://aed.betterorganix.com', year: '2025' },
  { id: 'vahtrame', category: ['art', 'business'], image: '/images/projets/vahtrame.webp', color: 'clay', url: 'https://vahtrame.ee/', year: '2022' },
  { id: 'fairgrow', category: 'nature', image: '/images/projets/fairgrow.webp', color: 'sage', url: 'https://fairgrow.ee', year: '2021' },
  
]

// Nombre de projets affichés initialement (réduction du DOM)
const INITIAL_DISPLAY = 6

export default function Realisations() {
  const ref = useRef(null)
  const [activeCategory, setActiveCategory] = useState('all')
  const [showAll, setShowAll] = useState(false)
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

  // Limiter le nombre de projets affichés pour réduire le DOM
  const displayedRealisations = showAll 
    ? filteredRealisations 
    : filteredRealisations.slice(0, INITIAL_DISPLAY)

  const hasMore = filteredRealisations.length > INITIAL_DISPLAY

  return (
    <section id="realisations" className="py-24 md:py-32 bg-gradient-to-b from-sage-50/30 to-sand-50">
      <div className="container mx-auto px-6" ref={ref}>
        <div className="max-w-6xl mx-auto">
          {/* Section Header - Simplifié */}
          <header className="text-center mb-12">
            <span className="inline-block text-sage-600 text-sm tracking-widest uppercase mb-4">
              {t.portfolio.label}
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-clay-900 mb-6">
              {t.portfolio.title} <span className="text-sage-600">{t.portfolio.titleHighlight}</span>
            </h2>
            <p className="text-clay-600 max-w-2xl mx-auto text-lg">
              {t.portfolio.description}
            </p>
          </header>

          {/* Category Filter - Simplifié */}
          <nav className="flex flex-wrap justify-center gap-3 mb-12" aria-label="Filtrer par catégorie">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id)
                  setShowAll(false)
                }}
                className={`px-5 py-2 rounded-full text-sm transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-sage-600 text-white'
                    : 'bg-white text-clay-600 hover:bg-sage-50 border border-sand-200'
                }`}
                aria-pressed={activeCategory === cat.id}
              >
                {cat.label}
              </button>
            ))}
          </nav>

          {/* Projects Grid - Optimisé avec moins de divs */}
          <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 list-none p-0">
            {displayedRealisations.map((projet) => (
              <li key={projet.id} className="group">
                <article>
                  {/* Image Container - Utilise next/image pour optimisation */}
                  <div className="relative aspect-[4/3] mb-5 rounded-2xl overflow-hidden bg-sand-200">
                    <Image 
                      src={projet.image} 
                      alt={projet.title}
                      fill
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 380px"
                      className="object-cover"
                      loading="lazy"
                      quality={65}
                    />
                    
                    {/* Year Badge */}
                    <span className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-xs text-clay-600">
                      {projet.year}
                    </span>
                    
                    {/* Hover Overlay */}
                    {projet.url ? (
                      <a 
                        href={projet.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 bg-clay-900/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                        aria-label={`Voir le site ${projet.title}`}
                      >
                        <span className="text-white flex items-center gap-2 bg-sage-600 px-5 py-2 rounded-full">
                          {t.portfolio.viewSite} <ExternalLink className="w-4 h-4" aria-hidden="true" />
                        </span>
                      </a>
                    ) : (
                      <div className="absolute inset-0 bg-clay-900/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white flex items-center gap-2 bg-clay-600 px-5 py-2 rounded-full">
                          <X className="w-4 h-4" aria-hidden="true" />
                          {t.portfolio.unavailable}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content - Simplifié, sans tags */}
                  <span className={`text-xs uppercase tracking-wider ${
                    projet.color === 'sage' ? 'text-sage-600' :
                    projet.color === 'terracotta' ? 'text-terracotta-600' :
                    'text-clay-600'
                  }`}>
                    {projet.categoryLabel}
                  </span>
                  <h3 className="font-serif text-xl text-clay-800 mb-2 group-hover:text-sage-600 transition-colors">
                    {projet.title}
                  </h3>
                  <p className="text-clay-600 text-sm leading-relaxed">
                    {projet.description}
                  </p>
                </article>
              </li>
            ))}
          </ul>

          {/* Bouton "Voir plus" pour charger le reste */}
          {hasMore && !showAll && (
            <div className="text-center mt-12">
              <button
                onClick={() => setShowAll(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-sage-300 text-sage-700 rounded-full hover:bg-sage-50 transition-colors"
              >
                Voir tous les projets ({filteredRealisations.length})
                <ChevronDown className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          )}

          {/* Stats - Simplifié */}
          <div className="mt-20 grid grid-cols-3 gap-8 text-center">
            <div>
              <strong className="font-serif text-4xl text-sage-600 block">15+</strong>
              <span className="text-clay-600 text-sm">{t.portfolio.stats.projects}</span>
            </div>
            <div>
              <strong className="font-serif text-4xl text-sage-600 block">100%</strong>
              <span className="text-clay-600 text-sm">{t.portfolio.stats.satisfaction}</span>
            </div>
            <div>
              <strong className="font-serif text-4xl text-sage-600 block">5+</strong>
              <span className="text-clay-600 text-sm">{t.portfolio.stats.experience}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
