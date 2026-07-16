import {
  BulbOutlineIcon,
  CheckmarkCircleIcon,
  DocumentIcon,
  ImageIcon,
  LaunchIcon,
  RocketIcon,
  TimelineIcon,
} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

const defaultStudentsPage = {
  seoTitle: 'For Students | Industry Practicum',
  seoDescription:
    'Explore CS 4535 Industry Practicum, a client-facing software engineering course, and apply to join a future cohort.',
  heroLabel: 'For students',
  heroTitle: 'Build software that matters beyond the classroom.',
  heroIntroduction:
    'CS 4535 Industry Practicum places you on a small full-stack team working directly with an industry partner. You will turn an open-ended client need into a tested solution, a professional handoff, and a story you can take into your career.',
  heroCtaLabel: 'Apply for the practicum',
  heroCtaUrl: 'https://example.com',
  factsLabel: 'Course snapshot',
  factsTitle: 'Know what you are signing up for.',
  facts: [
    {
      _key: 'course',
      _type: 'studentFact',
      label: 'Course',
      value: 'CS 4535',
      body: 'Industry Practicum: Software Engineering for Consultants',
    },
    {
      _key: 'format',
      _type: 'studentFact',
      label: 'Format',
      value: 'Small full-stack teams',
      body: 'Collaborate with classmates, faculty, and an experiential partner.',
    },
    {
      _key: 'commitment',
      _type: 'studentFact',
      label: 'Weekly commitment',
      value: '12–15 hours',
      body: 'Expected work outside class, including team and client collaboration.',
    },
    {
      _key: 'final-deliverable',
      _type: 'studentFact',
      label: 'Final deliverable',
      value: 'MVP + handoff',
      body: 'A working product, supporting documentation, and a client presentation.',
    },
  ],
  journeyLabel: 'The semester journey',
  journeyTitle: 'From first client conversation to final delivery.',
  journeyIntroduction:
    'The practicum follows the rhythm of a professional engagement. Each phase builds the technical, product, and communication skills needed for the next.',
  journeyStages: [
    {
      _key: 'discover',
      _type: 'journeyStage',
      title: 'Discover',
      body: 'Meet the client, investigate the problem, and translate needs into clear requirements and user stories.',
    },
    {
      _key: 'design',
      _type: 'journeyStage',
      title: 'Design',
      body: 'Explore solutions, prototype key workflows, estimate effort, and test decisions with client feedback.',
    },
    {
      _key: 'deliver',
      _type: 'journeyStage',
      title: 'Build & iterate',
      body: 'Develop integrated frontend and backend functionality using agile practices, testing, demos, and reviews.',
    },
    {
      _key: 'handoff',
      _type: 'journeyStage',
      title: 'Present & hand off',
      body: 'Complete the MVP or proof of concept, document the work, present it, and deliver it to the client.',
    },
  ],
  expectationsLabel: 'What the course asks of you',
  expectationsTitle: 'Bring ownership, curiosity, and professionalism.',
  expectationsIntroduction:
    'Client-facing work comes with real responsibility. You do not need to arrive knowing every answer, but you do need to be ready to show up, communicate clearly, and contribute consistently.',
  expectations: [
    {
      _key: 'engagement',
      _type: 'expectationItem',
      title: 'Be present and engaged',
      body: 'Attendance is required, along with active participation in class sessions, team work, and client meetings.',
    },
    {
      _key: 'professionalism',
      _type: 'expectationItem',
      title: 'Work professionally',
      body: 'Communicate with maturity, meet client-facing commitments, and represent your team and Northeastern well.',
    },
    {
      _key: 'full-stack',
      _type: 'expectationItem',
      title: 'Contribute across the product',
      body: 'Teams deliver integrated frontend and backend components that are functional and thoughtfully developed.',
    },
    {
      _key: 'collaboration',
      _type: 'expectationItem',
      title: 'Make the team better',
      body: 'Manage the semester-long project together and help create a positive experience for teammates and the client.',
    },
  ],
  assessmentLabel: 'How the work is assessed',
  assessmentTitle: 'One shared product. Individual accountability.',
  assessmentIntroduction:
    'Most of the course centers on the team deliverable, while individual communication, collaboration, technical contribution, and attendance remain visible.',
  groupAssessmentTitle: 'Group work',
  groupAssessmentPercentage: '70%',
  groupAssessmentBody:
    'End product and process, technical communication, requirements engineering, collaboration, and client feedback.',
  individualAssessmentTitle: 'Individual work',
  individualAssessmentPercentage: '30%',
  individualAssessmentBody:
    'Technical communication, collaboration, technical contribution, and attendance.',
  closingLabel: 'Ready to do the work?',
  closingTitle: 'Turn a semester into real experience.',
  closingBody:
    'Apply to join a future practicum cohort and build alongside students, faculty mentors, and an industry partner.',
  closingCtaLabel: 'Start your application',
  closingCtaUrl: 'https://example.com',
}

const requiredImageAltField = () =>
  defineField({
    name: 'alt',
    title: 'Alt Text',
    type: 'string',
    validation: (rule) =>
      rule.custom((value, context) => {
        const parent = context.parent as {asset?: unknown}
        return parent?.asset && !value
          ? 'Alt text is required when an image is set.'
          : true
      }),
  })

export const studentsPage = defineType({
  name: 'studentsPage',
  title: 'Students Page',
  type: 'document',
  icon: DocumentIcon,
  initialValue: defaultStudentsPage,
  fieldsets: [
    {name: 'seo', title: 'Search & Sharing', options: {collapsible: true, collapsed: true}},
    {name: 'hero', title: '1. Hero & Application CTA', options: {collapsible: true}},
    {name: 'facts', title: '2. Course Snapshot', options: {collapsible: true}},
    {name: 'journey', title: '3. Semester Journey', options: {collapsible: true}},
    {name: 'expectations', title: '4. Course Expectations', options: {collapsible: true}},
    {name: 'assessment', title: '5. Assessment', options: {collapsible: true}},
    {name: 'closing', title: '6. Closing Application CTA', options: {collapsible: true}},
  ],
  fields: [
    defineField({
      name: 'seoTitle',
      title: 'Page Title',
      type: 'string',
      fieldset: 'seo',
      validation: (rule) => rule.required().max(70),
    }),
    defineField({
      name: 'seoDescription',
      title: 'Page Description',
      type: 'text',
      rows: 3,
      fieldset: 'seo',
      validation: (rule) => rule.required().max(170),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      icon: ImageIcon,
      fieldset: 'hero',
      options: {hotspot: true},
      fields: [requiredImageAltField()],
    }),
    ...[
      ['heroLabel', 'Section Label', 'string'],
      ['heroTitle', 'Hero Title', 'string'],
      ['heroIntroduction', 'Introduction', 'text'],
      ['heroCtaLabel', 'Application Button Label', 'string'],
    ].map(([name, title, type]) =>
      defineField({
        name,
        title,
        type,
        fieldset: 'hero',
        validation: (rule) => rule.required(),
      }),
    ),
    defineField({
      name: 'heroCtaUrl',
      title: 'Application URL',
      type: 'url',
      icon: LaunchIcon,
      fieldset: 'hero',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}).required(),
    }),
    ...[
      ['factsLabel', 'Section Label'],
      ['factsTitle', 'Section Title'],
    ].map(([name, title]) =>
      defineField({name, title, type: 'string', fieldset: 'facts', validation: (rule) => rule.required()}),
    ),
    defineField({
      name: 'facts',
      title: 'Course Facts',
      type: 'array',
      fieldset: 'facts',
      of: [
        defineArrayMember({
          name: 'studentFact',
          title: 'Course Fact',
          type: 'object',
          icon: BulbOutlineIcon,
          fields: [
            defineField({name: 'label', title: 'Label', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'value', title: 'Value', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'body', title: 'Description', type: 'text', rows: 3, validation: (rule) => rule.required()}),
          ],
          preview: {select: {title: 'value', subtitle: 'label'}},
        }),
      ],
      validation: (rule) => rule.min(1).max(6),
    }),
    ...[
      ['journeyLabel', 'Section Label', 'string'],
      ['journeyTitle', 'Section Title', 'string'],
      ['journeyIntroduction', 'Introduction', 'text'],
    ].map(([name, title, type]) =>
      defineField({name, title, type, fieldset: 'journey', validation: (rule) => rule.required()}),
    ),
    defineField({
      name: 'journeyStages',
      title: 'Journey Stages',
      type: 'array',
      fieldset: 'journey',
      of: [
        defineArrayMember({
          name: 'journeyStage',
          title: 'Journey Stage',
          type: 'object',
          icon: TimelineIcon,
          fields: [
            defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'body', title: 'Description', type: 'text', rows: 3, validation: (rule) => rule.required()}),
          ],
          preview: {select: {title: 'title', subtitle: 'body'}},
        }),
      ],
      validation: (rule) => rule.min(1).max(6),
    }),
    ...[
      ['expectationsLabel', 'Section Label', 'string'],
      ['expectationsTitle', 'Section Title', 'string'],
      ['expectationsIntroduction', 'Introduction', 'text'],
    ].map(([name, title, type]) =>
      defineField({name, title, type, fieldset: 'expectations', validation: (rule) => rule.required()}),
    ),
    defineField({
      name: 'expectations',
      title: 'Expectations',
      type: 'array',
      fieldset: 'expectations',
      of: [
        defineArrayMember({
          name: 'expectationItem',
          title: 'Expectation',
          type: 'object',
          icon: CheckmarkCircleIcon,
          fields: [
            defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'body', title: 'Description', type: 'text', rows: 3, validation: (rule) => rule.required()}),
          ],
          preview: {select: {title: 'title', subtitle: 'body'}},
        }),
      ],
      validation: (rule) => rule.min(1).max(6),
    }),
    ...[
      ['assessmentLabel', 'Section Label', 'string'],
      ['assessmentTitle', 'Section Title', 'string'],
      ['assessmentIntroduction', 'Introduction', 'text'],
      ['groupAssessmentTitle', 'Group Assessment Title', 'string'],
      ['groupAssessmentPercentage', 'Group Percentage', 'string'],
      ['groupAssessmentBody', 'Group Assessment Description', 'text'],
      ['individualAssessmentTitle', 'Individual Assessment Title', 'string'],
      ['individualAssessmentPercentage', 'Individual Percentage', 'string'],
      ['individualAssessmentBody', 'Individual Assessment Description', 'text'],
    ].map(([name, title, type]) =>
      defineField({name, title, type, fieldset: 'assessment', validation: (rule) => rule.required()}),
    ),
    ...[
      ['closingLabel', 'Section Label', 'string'],
      ['closingTitle', 'Section Title', 'string'],
      ['closingBody', 'Description', 'text'],
      ['closingCtaLabel', 'Application Button Label', 'string'],
    ].map(([name, title, type]) =>
      defineField({name, title, type, fieldset: 'closing', validation: (rule) => rule.required()}),
    ),
    defineField({
      name: 'closingCtaUrl',
      title: 'Application URL',
      type: 'url',
      icon: RocketIcon,
      fieldset: 'closing',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}).required(),
    }),
  ],
  preview: {select: {title: 'heroTitle', subtitle: 'heroIntroduction', media: 'heroImage'}},
})
