import {at, defineMigration, unset} from 'sanity/migrate'

export default defineMigration({
  title: 'Remove retired About page fields',
  documentTypes: ['aboutPage'],
  filter:
    'defined(title) || defined(overview) || defined(campusModels) || defined(flyerHighlights)',
  migrate: {
    document() {
      return [
        at('title', unset()),
        at('overview', unset()),
        at('campusModels', unset()),
        at('flyerHighlights', unset()),
      ]
    },
  },
})
