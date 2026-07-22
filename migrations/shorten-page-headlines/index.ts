import {at, defineMigration, set} from 'sanity/migrate'

export default defineMigration({
  title: 'Shorten page headlines',
  documentTypes: ['homePage', 'aboutPage', 'studentsPage', 'clientsPage'],
  filter:
    'title == "Khoury Software Practicum" || eyebrow == "Professional Practicum at Khoury College" || heroTitle == "Build software that matters beyond the classroom." || heroTitle == "Bring us a real problem. Build toward a practical solution."',
  migrate: {
    document(document) {
      const patches = []

      if (document.title === 'Khoury Software Practicum') {
        patches.push(at('title', set('Software Practicum')))
      }

      if (document.eyebrow === 'Professional Practicum at Khoury College') {
        patches.push(at('eyebrow', set('The Practicum')))
      }

      if (document.heroTitle === 'Build software that matters beyond the classroom.') {
        patches.push(at('heroTitle', set('Build beyond the classroom.')))
      }

      if (
        document.heroTitle ===
        'Bring us a real problem. Build toward a practical solution.'
      ) {
        patches.push(at('heroTitle', set('Bring a real challenge.')))
      }

      return patches
    },
  },
})
