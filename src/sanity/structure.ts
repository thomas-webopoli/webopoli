import type { StructureResolver } from 'sanity/structure'
import { CogIcon, HomeIcon, StackIcon, CaseIcon, DocumentsIcon } from '@sanity/icons'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Webopoli - Contenu')
    .items([
      // Singleton: Paramètres du site
      S.listItem()
        .title('⚙️ Paramètres du site')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),

      // Singleton: Hero
      S.listItem()
        .title('🏠 Section Hero')
        .icon(HomeIcon)
        .child(
          S.document()
            .schemaType('hero')
            .documentId('hero')
        ),

      // Singleton: Philosophie
      S.listItem()
        .title('💡 Section Philosophie')
        .icon(StackIcon)
        .child(
          S.document()
            .schemaType('philosophie')
            .documentId('philosophie')
        ),

      S.divider(),

      // Liste: Services
      S.listItem()
        .title('💼 Services / Offres')
        .icon(CaseIcon)
        .schemaType('service')
        .child(
          S.documentTypeList('service')
            .title('Services')
        ),

      // Liste: Projets
      S.listItem()
        .title('📁 Projets / Réalisations')
        .icon(DocumentsIcon)
        .schemaType('projet')
        .child(
          S.documentTypeList('projet')
            .title('Projets')
        ),
    ])
