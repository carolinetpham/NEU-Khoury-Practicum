import {at, defineMigration, setIfMissing} from 'sanity/migrate'

export default defineMigration({
  title: 'Populate editable About page sections',
  documentTypes: ['aboutPage'],
  migrate: {
    document() {
      return [
        at('heroLabel', setIfMissing('About')),
        at('heroCtaLabel', setIfMissing('Explore projects')),
        at('essentialsLabel', setIfMissing('Practicum')),
        at('essentialsTitle', setIfMissing('At a glance')),
        at(
          'essentialsItems',
          setIfMissing([
            {
              _key: 'team-format',
              _type: 'essentialItem',
              label: 'Team format',
              value: 'Cohorts of 5-6',
              body: 'Students work in small teams with enough ownership to practice real collaboration.',
            },
            {
              _key: 'project-source',
              _type: 'essentialItem',
              label: 'Project source',
              value: 'Client-sourced',
              body: 'Each project starts from an open-ended need brought by a partner or community organization.',
            },
            {
              _key: 'mentorship',
              _type: 'essentialItem',
              label: 'Mentorship',
              value: 'Faculty + client guidance',
              body: 'Students receive course mentorship while also learning how to respond to client feedback.',
            },
            {
              _key: 'final-outcome',
              _type: 'essentialItem',
              label: 'Final outcome',
              value: 'Presentation and handoff',
              body: 'The semester ends with formal presentations, documentation, and next steps for partners.',
            },
          ]),
        ),
        at('modelLabel', setIfMissing('The practicum model')),
        at(
          'modelTitle',
          setIfMissing('Course structure. Real-world stakes.'),
        ),
        at(
          'modelBody',
          setIfMissing(
            'The practicum sits between a traditional course and a professional engagement. Faculty provide the structure to learn; students take ownership of the decisions, communication, and delivery.',
          ),
        ),
        at(
          'availabilityLabel',
          setIfMissing('Available to Khoury students'),
        ),
        at(
          'availabilityText',
          setIfMissing('Boston, Oakland, and Miami campuses'),
        ),
        at('galleryLabel', setIfMissing('Practicum in action')),
        at(
          'galleryTitle',
          setIfMissing('Real teams. Real presentations.'),
        ),
        at('experienceLabel', setIfMissing('What students gain')),
        at(
          'experienceTitle',
          setIfMissing('Technical growth meets professional experience.'),
        ),
        at('partnersLabel', setIfMissing('Industry connection')),
        at('partnersTitle', setIfMissing('Built with real partners.')),
        at(
          'partnersIntroduction',
          setIfMissing(
            'Students learn to listen, communicate, and deliver alongside organizations with real needs.',
          ),
        ),
        at(
          'testimonialAttribution',
          setIfMissing('Practicum student'),
        ),
      ]
    },
  },
})
