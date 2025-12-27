import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'philosophie',
  title: 'Section Philosophie',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Titre de la section',
      type: 'string',
      initialValue: 'Philosophie',
    }),
    defineField({
      name: 'mainTitle',
      title: 'Titre principal',
      type: 'string',
      initialValue: 'Le digital au service de l\'humain',
    }),
    defineField({
      name: 'introduction',
      title: 'Texte d\'introduction',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'values',
      title: 'Valeurs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icône',
              type: 'string',
              description: 'Choisissez une icône',
              options: {
                list: [
                  { title: '❤️ Cœur', value: 'Heart' },
                  { title: '🌿 Feuille', value: 'Leaf' },
                  { title: '✨ Étoiles', value: 'Sparkles' },
                  { title: '🎨 Palette', value: 'Palette' },
                  { title: '🌍 Globe', value: 'Globe' },
                  { title: '💡 Ampoule', value: 'Lightbulb' },
                  { title: '⚡ Éclair', value: 'Zap' },
                  { title: '👥 Personnes', value: 'Users' },
                  { title: '🌱 Pousse', value: 'Sprout' },
                  { title: '👋 Main & Cœur', value: 'HeartHandshake' },
                  { title: '🎯 Cible', value: 'Target' },
                  { title: '🛡️ Bouclier', value: 'Shield' },
                  { title: '🚀 Fusée', value: 'Rocket' },
                  { title: '💬 Message', value: 'MessageCircle' },
                  { title: '☕ Café', value: 'Coffee' },
                  { title: '🏠 Maison', value: 'Home' },
                ],
              },
            }),
            defineField({
              name: 'title',
              title: 'Titre',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(3),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Section Philosophie',
      }
    },
  },
})
