import { type SchemaTypeDefinition } from 'sanity'

import {aboutPage} from './aboutPage'
import {homePage} from './homePage'
import {project} from './project'
import {studentsPage} from './studentsPage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homePage, aboutPage, studentsPage, project],
}
