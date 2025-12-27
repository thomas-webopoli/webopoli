import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Section Hero (Accueil)',
  type: 'document',
  fields: [
    defineField({
      name: 'subtitle',
      title: 'Sur-titre',
      type: 'string',
      description: 'Le petit texte au-dessus du titre principal',
      initialValue: 'Création web pour',
    }),
    defineField({
      name: 'titleLine1',
      title: 'Titre - Ligne 1',
      type: 'string',
      initialValue: "l'art, la nature",
    }),
    defineField({
      name: 'titleLine2',
      title: 'Titre - Ligne 2',
      type: 'string',
      initialValue: '& le bien-être',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Le paragraphe sous le titre',
    }),
    defineField({
      name: 'primaryButtonText',
      title: 'Texte du bouton principal',
      type: 'string',
      initialValue: 'Découvrir les offres',
    }),
    defineField({
      name: 'secondaryButtonText',
      title: 'Texte du bouton secondaire',
      type: 'string',
      initialValue: 'Voir les réalisations',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Section Hero',
        subtitle: 'Page d\'accueil',
      }
    },
  },
})
