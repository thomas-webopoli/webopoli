// Script pour pré-remplir Sanity avec les données par défaut du site
// Exécuter avec: npx tsx scripts/seed-sanity.ts

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'w77bkas0',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN, // Nécessite un token avec droits d'écriture
  useCdn: false,
})

// Données du Hero
const heroData = {
  _id: 'hero',
  _type: 'hero',
  subtitle: 'Digital engagé & accessible',
  titleLine1: 'Votre présence digitale,',
  titleLine2: 'naturellement belle',
  description: 'Sites web accessibles et esthétiques pour entrepreneurs du vivant, artistes, thérapeutes et acteurs du changement positif.',
  primaryButtonText: 'Parlons de votre projet',
  secondaryButtonText: 'Découvrir les offres',
}

// Données de la Philosophie
const philosophieData = {
  _id: 'philosophie',
  _type: 'philosophie',
  sectionTitle: 'Philosophie',
  mainTitle: 'Le digital au service du vivant',
  introduction: 'Je crois qu\'un site web professionnel ne devrait pas coûter des mois de collecte de fonds. Votre mission mérite une vitrine à sa hauteur.',
  values: [
    {
      _key: 'value1',
      icon: 'Sparkles',
      title: 'Accessible',
      description: 'Des prix solidaires pour que le digital ne soit plus un frein à votre rayonnement.',
    },
    {
      _key: 'value2',
      icon: 'Users',
      title: 'Humain',
      description: 'Un accompagnement personnalisé, à l\'écoute de vos besoins et de votre univers.',
    },
    {
      _key: 'value3',
      icon: 'Zap',
      title: 'Efficace',
      description: 'Des sites performants, livrés rapidement, pour vous concentrer sur l\'essentiel.',
    },
  ],
}

// Données des paramètres du site
const siteSettingsData = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  siteName: 'Webopoli',
  siteDescription: 'Création de sites web accessibles et esthétiques pour entrepreneurs du vivant, artistes, thérapeutes et acteurs du changement positif.',
  contactEmail: 'thomas@webopoli.com',
  location: 'Autun, Bourgogne-Franche-Comté, France',
}

// Données des services
const servicesData = [
  {
    _id: 'service-essentielle',
    _type: 'service',
    name: 'Présence Essentielle',
    slug: { _type: 'slug', current: 'presence-essentielle' },
    price: 300,
    description: 'L\'essentiel pour exister en ligne avec élégance',
    features: [
      'Site vitrine 5 pages',
      'Design responsive moderne',
      'Formulaire de contact',
      'Optimisation SEO de base',
      'Hébergement inclus 1ère année',
      '1h de formation',
    ],
    deliveryTime: '5-7 jours',
    isPopular: false,
    order: 0,
  },
  {
    _id: 'service-communaute',
    _type: 'service',
    name: 'Pack Communauté',
    slug: { _type: 'slug', current: 'pack-communaute' },
    price: 550,
    description: 'Pour animer et fédérer votre communauté',
    features: [
      'Tout de Présence Essentielle',
      'Agenda événementiel',
      'Intégration Newsletter',
      'Connexion réseaux sociaux',
      'Espace actualités',
      '2h de formation',
    ],
    deliveryTime: '7-10 jours',
    isPopular: true,
    order: 1,
  },
  {
    _id: 'service-createur',
    _type: 'service',
    name: 'Pack Créateur',
    slug: { _type: 'slug', current: 'pack-createur' },
    price: 750,
    description: 'Pour vendre vos créations et services',
    features: [
      'Tout de Présence Essentielle',
      'Blog intégré',
      'E-shop (20 produits)',
      'Paiement en ligne',
      'Gestion des commandes',
      '2h de formation',
    ],
    deliveryTime: '10-14 jours',
    isPopular: false,
    order: 2,
  },
]

// Données des projets
const projetsData = [
  {
    _id: 'projet-benoit-segui',
    _type: 'projet',
    title: 'Benoît Segui',
    slug: { _type: 'slug', current: 'benoit-segui' },
    categories: ['art'],
    categoryLabel: 'Art & Culture',
    description: 'Portfolio de guitariste contemporain et chercheur en musicologie. Design minimaliste avec identité visuelle personnalisée et vecteurs sur mesure.',
    tags: ['Portfolio', 'Musique', 'Identité visuelle'],
    url: null,
    year: '2020',
    color: 'terracotta',
    order: 1,
  },
  {
    _id: 'projet-bastien-pouilles',
    _type: 'projet',
    title: 'Bastien Pouilles',
    slug: { _type: 'slug', current: 'bastien-pouilles' },
    categories: ['art'],
    categoryLabel: 'Art & Culture',
    description: 'Portfolio d\'accordéoniste contemporain. Travail graphique personnalisé, édition photo et mise en page minimaliste.',
    tags: ['Portfolio', 'Musique', 'Photo editing'],
    url: 'https://bastienpouilles.com',
    year: '2020',
    color: 'terracotta',
    order: 2,
  },
  {
    _id: 'projet-pikasilla',
    _type: 'projet',
    title: 'Pikasilla Puhkemaja',
    slug: { _type: 'slug', current: 'pikasilla-puhkemaja' },
    categories: ['nature'],
    categoryLabel: 'Nature & Bien-être',
    description: 'Maison de vacances et de formation en Estonie du Sud. Un lieu authentique pour ateliers, conférences et événements.',
    tags: ['Nature', 'Bien-être', 'Hébergement'],
    url: 'https://pikasillapuhkemaja.ee',
    year: '2023',
    color: 'sage',
    order: 3,
  },
  {
    _id: 'projet-silus',
    _type: 'projet',
    title: 'Silus Community',
    slug: { _type: 'slug', current: 'silus-community' },
    categories: ['community'],
    categoryLabel: 'Communauté',
    description: 'Plateforme communautaire avec systèmes personnalisés. Développement web avancé en partenariat avec un designer professionnel.',
    tags: ['Plateforme', 'Communauté', 'Développement'],
    url: 'https://silus.community',
    year: '2023',
    color: 'sage',
    order: 4,
  },
  {
    _id: 'projet-orion-naval',
    _type: 'projet',
    title: 'Orion Naval Engineering',
    slug: { _type: 'slug', current: 'orion-naval' },
    categories: ['business'],
    categoryLabel: 'Entreprise',
    description: 'Refonte complète du site pour cette entreprise d\'ingénierie navale établie depuis 13 ans. Design moderne, sécurité et SEO local.',
    tags: ['B2B', 'Refonte', 'SEO'],
    url: 'https://orionnaval.com',
    year: '2024',
    color: 'clay',
    order: 5,
  },
  {
    _id: 'projet-better-organix',
    _type: 'projet',
    title: 'Better Organix',
    slug: { _type: 'slug', current: 'better-organix' },
    categories: ['nature'],
    categoryLabel: 'Nature & Écologie',
    description: 'Refonte WordPress en gardant le design original avec des améliorations ciblées. Site propre et maintenable par l\'équipe.',
    tags: ['Bio', 'WordPress', 'Refonte'],
    url: 'https://betterorganix.com',
    year: '2023',
    color: 'sage',
    order: 6,
  },
  {
    _id: 'projet-joelahtme-aed',
    _type: 'projet',
    title: 'Jõelähtme Aed',
    slug: { _type: 'slug', current: 'joelahtme-aed' },
    categories: ['nature'],
    categoryLabel: 'Maraîchage Bio',
    description: 'Site vitrine pour un maraîchage local près de Tallinn, Estonie. Mise en valeur des produits locaux et de la philosophie du lieu.',
    tags: ['Maraîchage', 'Local', 'Estonie'],
    url: 'https://aed.betterorganix.com',
    year: '2025',
    color: 'sage',
    order: 7,
  },
  {
    _id: 'projet-safariland',
    _type: 'projet',
    title: 'Safariland',
    slug: { _type: 'slug', current: 'safariland' },
    categories: ['business'],
    categoryLabel: 'Entreprise',
    description: 'Site web pour une aire de jeux couverte pour enfants à Torcy, France. Design ludique et informations pratiques.',
    tags: ['Loisirs', 'Enfants', 'Local'],
    url: 'https://safariland.fr',
    year: '2024',
    color: 'terracotta',
    order: 8,
  },
  {
    _id: 'projet-hote-ideal',
    _type: 'projet',
    title: 'L\'Hôte Idéal',
    slug: { _type: 'slug', current: 'hote-ideal' },
    categories: ['business', 'art'],
    categoryLabel: 'Boutique',
    description: 'Site vitrine pour une boutique de seconde main. Mise en valeur des produits et de la démarche éco-responsable.',
    tags: ['Seconde main', 'E-commerce', 'Écologie'],
    url: 'https://lhoteideal.fr/',
    year: '2024',
    color: 'terracotta',
    order: 9,
  },
  {
    _id: 'projet-vahtrame',
    _type: 'projet',
    title: 'Vahtrame',
    slug: { _type: 'slug', current: 'vahtrame' },
    categories: ['art', 'business'],
    categoryLabel: 'Artisanat',
    description: 'Site pour un artisan menuisier et constructeur de maisons en bois en Estonie. Présentation des réalisations et du savoir-faire.',
    tags: ['Artisanat', 'Construction', 'Bois'],
    url: 'https://vahtrame.ee/',
    year: '2022',
    color: 'clay',
    order: 10,
  },
  {
    _id: 'projet-e-compost',
    _type: 'projet',
    title: 'E-Compost',
    slug: { _type: 'slug', current: 'e-compost' },
    categories: ['nature'],
    categoryLabel: 'Nature & Écologie',
    description: 'Site pour un service de collecte de déchets organiques. Présentation des services et sensibilisation au compostage.',
    tags: ['Compost', 'Écologie', 'Services'],
    url: 'https://e-compost.ee/',
    year: '2022',
    color: 'sage',
    order: 11,
  },
  {
    _id: 'projet-fairgrow',
    _type: 'projet',
    title: 'Fairgrow',
    slug: { _type: 'slug', current: 'fairgrow' },
    categories: ['nature'],
    categoryLabel: 'Éducation à la Nature',
    description: 'Plateforme éducative sur l\'agroécologie. Formation et ressources pour une agriculture durable et régénérative.',
    tags: ['Agroécologie', 'Éducation', 'Formation'],
    url: 'https://fairgrow.ee',
    year: '2021',
    color: 'sage',
    order: 12,
  },
  {
    _id: 'projet-fairgreen',
    _type: 'projet',
    title: 'Fairgreen',
    slug: { _type: 'slug', current: 'fairgreen' },
    categories: ['nature'],
    categoryLabel: 'Maraîchage Bio',
    description: 'Site vitrine pour un maraîchage biologique. Vente directe de légumes de saison et philosophie du circuit court.',
    tags: ['Maraîchage', 'Bio', 'Circuit court'],
    url: 'https://fairgreen.ee',
    year: '2021',
    color: 'sage',
    order: 13,
  },
  {
    _id: 'projet-helenes-delicacies',
    _type: 'projet',
    title: 'Hélène\'s Delicacies',
    slug: { _type: 'slug', current: 'helenes-delicacies' },
    categories: ['nature', 'art', 'business'],
    categoryLabel: 'Alimentation végétale',
    description: 'E-commerce pour une artisane de fromages végétaux à Tallinn. Boutique en ligne avec commande, présentation des produits et services traiteur.',
    tags: ['E-commerce', 'Vegan', 'Artisanat'],
    url: 'https://helenesdelicacies.com',
    year: '2024',
    color: 'terracotta',
    order: 14,
  },
  {
    _id: 'projet-cours-vivantes',
    _type: 'projet',
    title: 'Cours Vivantes',
    slug: { _type: 'slug', current: 'cours-vivantes' },
    categories: ['community', 'nature'],
    categoryLabel: 'Écologie Sociale',
    description: 'Association bourguignonne de 8 professionnels dédiée au réenchantement des espaces de jeu. Végétalisation des cours d\'école, facilitation en intelligence collective et décloisonnement de la vie locale.',
    tags: ['Association', 'Végétalisation', 'Intelligence collective'],
    url: 'https://coursvivantes.fr',
    year: '2025',
    color: 'sage',
    order: 15,
  },
]

async function seedSanity() {
  console.log('🌱 Début du remplissage de Sanity...\n')

  try {
    // Créer ou mettre à jour le Hero
    console.log('📝 Hero...')
    await client.createOrReplace(heroData)
    console.log('   ✅ Hero créé')

    // Créer ou mettre à jour la Philosophie
    console.log('📝 Philosophie...')
    await client.createOrReplace(philosophieData)
    console.log('   ✅ Philosophie créée')

    // Créer ou mettre à jour les paramètres du site
    console.log('📝 Paramètres du site...')
    await client.createOrReplace(siteSettingsData)
    console.log('   ✅ Paramètres créés')

    // Créer ou mettre à jour les services
    console.log('📝 Services...')
    for (const service of servicesData) {
      await client.createOrReplace(service)
      console.log(`   ✅ ${service.name}`)
    }

    // Créer ou mettre à jour les projets
    console.log('📝 Projets...')
    for (const projet of projetsData) {
      await client.createOrReplace(projet)
      console.log(`   ✅ ${projet.title}`)
    }

    console.log('\n🎉 Sanity pré-rempli avec succès !')
    console.log('   Ouvre http://localhost:3000/studio pour voir le contenu')

  } catch (error) {
    console.error('❌ Erreur:', error)
    process.exit(1)
  }
}

seedSanity()
