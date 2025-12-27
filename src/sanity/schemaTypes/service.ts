import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'service',
  title: 'Services / Offres',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom de l\'offre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Identifiant unique',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Prix (€)',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'description',
      title: 'Description courte',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'features',
      title: 'Fonctionnalités incluses',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'deliveryTime',
      title: 'Délai de livraison',
      type: 'string',
      description: 'Ex: 5-7 jours',
    }),
    defineField({
      name: 'isPopular',
      title: 'Offre populaire ?',
      type: 'boolean',
      description: 'Affiche un badge "Populaire"',
      initialValue: false,
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
      title: 'Ordre d\'affichage',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      price: 'price',
    },
    prepare({ title, price }) {
      return {
        title,
        subtitle: `${price}€`,
      }
    },
  },
})
