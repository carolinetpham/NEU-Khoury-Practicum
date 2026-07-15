import {DocumentIcon} from '@sanity/icons'
import type {StructureResolver} from 'sanity/structure'

const singletonTypes = ['homePage', 'aboutPage']

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Home Page')
        .icon(DocumentIcon)
        .child(
          S.document()
            .schemaType('homePage')
            .documentId('homePage')
            .title('Home Page'),
        ),
      S.listItem()
        .title('About Page')
        .icon(DocumentIcon)
        .child(
          S.document()
            .schemaType('aboutPage')
            .documentId('aboutPage')
            .title('About Page'),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !singletonTypes.includes(listItem.getId() as string),
      ),
    ])
