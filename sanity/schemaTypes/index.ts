import { type SchemaTypeDefinition } from 'sanity'

import {homePage} from './homePage'
import {project} from './project'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homePage, project],
}
