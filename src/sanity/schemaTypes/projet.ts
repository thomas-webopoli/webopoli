import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'projet',
  title: 'Projets / Réalisations',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nom du projet',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Identifiant unique',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image du projet',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'categories',
      title: 'Catégories',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Art & Culture', value: 'art' },
          { title: 'Nature & Écologie', value: 'nature' },
          { title: 'Entreprises', value: 'business' },
          { title: 'Communautés', value: 'community' },
        ],
      },
    }),
    defineField({
      name: 'categoryLabel',
      title: 'Label de catégorie affiché',
      type: 'string',
      description: 'Ex: "Art & Culture", "Nature & Bien-être"',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Mots-clés affichés sur la carte',
    }),
    defineField({
      name: 'url',
      title: 'URL du site',
      type: 'url',
      description: 'Laisser vide si le site n\'est plus en ligne',
    }),
    defineField({
      name: 'year',
      title: 'Année de réalisation',
      type: 'string',
    }),
    defineField({
      name: 'color',
      title: 'Couleur du thème',
      type: 'string',
      options: {
        list: [
          { title: '🌿 Sage (vert)', value: 'sage' },
          { title: '🧱 Terracotta (orange)', value: 'terracotta' },
          { title: '🪨 Clay (gris-brun)', value: 'clay' },
        ],
      },
      initialValue: 'sage',
    }),
    defineField({
      name: 'order',
      title: 'Ordre d\'affichage',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Année (récent)',
      name: 'yearDesc',
      by: [{ field: 'year', direction: 'desc' }],
    },
    {
      title: 'Ordre personnalisé',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      year: 'year',
      media: 'image',
    },
    prepare({ title, year, media }) {
      return {
        title,
        subtitle: year,
        media,
      }
    },
  },
})
