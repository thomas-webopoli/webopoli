import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Paramètres du site',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Nom du site',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'siteDescription',
      title: 'Description du site (SEO)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'contactEmail',
      title: 'Email de contact',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Localisation',
      type: 'string',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Paramètres du site',
      }
    },
  },
})
