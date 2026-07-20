import { type SchemaTypeDefinition } from 'sanity'

import {aboutPage} from './aboutPage'
import {clientsPage} from './clientsPage'
import {homePage} from './homePage'
import {project} from './project'
import {studentsPage} from './studentsPage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homePage, aboutPage, studentsPage, clientsPage, project],
}
