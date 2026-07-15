import { type SchemaTypeDefinition } from 'sanity'

import {aboutPage} from './aboutPage'
import {homePage} from './homePage'
import {project} from './project'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homePage, aboutPage, project],
}
