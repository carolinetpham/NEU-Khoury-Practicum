import {
  BulbOutlineIcon,
  CheckmarkCircleIcon,
  DocumentIcon,
  ImageIcon,
  LaunchIcon,
  TimelineIcon,
} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

const defaultClientsPage = {
  seoTitle: 'For Clients | Industry Practicum',
  seoDescription:
    'Partner with Northeastern students on a faculty-scoped software, data, or AI project and receive a high-quality MVP or proof of concept.',
  heroLabel: 'For industry partners',
  heroTitle: 'Bring us a real problem. Build toward a practical solution.',
  heroIntroduction:
    'Partner with Northeastern University on a faculty-scoped software, data, or AI project. A select student team will spend a full semester discovering, designing, and developing a high-quality MVP or proof of concept for your organization.',
  heroCtaLabel: 'Email us!',
  heroCtaEmail: 'industrypracticum@northeastern.edu',
  valueLabel: 'Why partner with us',
  valueTitle: 'A meaningful collaboration with value on both sides.',
  valuePropositions: [
    {
      _key: 'solution',
      _type: 'clientValueProposition',
      title: 'A bespoke computing solution',
      body: 'From software to data and AI, students design and develop a solution around your organization’s problem—not a classroom prompt.',
    },
    {
      _key: 'collaboration',
      _type: 'clientValueProposition',
      title: 'A meaningful collaboration',
      body: 'Work with talented Northeastern students while helping emerging professionals gain practical skills and industry insight.',
    },
    {
      _key: 'talent',
      _type: 'clientValueProposition',
      title: 'Access to a talent pool',
      body: 'Meet a team of motivated junior and senior students and see how they approach ambiguity, communication, and delivery.',
    },
  ],
  modelLabel: 'The engagement',
  modelTitle: 'A semester-long practicum grounded in your real-world challenge.',
  modelIntroduction:
    'Northeastern’s Industry Practicum is an experiential learning course for junior and senior students. Select teams are allocated an industry partner project, while faculty guide the work and help scope an achievable semester outcome.',
  modelFacts: [
    {
      _key: 'duration',
      _type: 'clientModelFact',
      label: 'Duration',
      value: '16 weeks',
      body: 'A full-semester engagement with a steady project cadence.',
    },
    {
      _key: 'team',
      _type: 'clientModelFact',
      label: 'Student team',
      value: '5–6 students',
      body: 'A small, select team collaborates directly with your organization.',
    },
    {
      _key: 'outcome',
      _type: 'clientModelFact',
      label: 'Target outcome',
      value: 'MVP or proof of concept',
      body: 'A focused solution designed to create value and support next steps.',
    },
  ],
  processLabel: 'How it works',
  processTitle: 'From open question to working direction.',
  processIntroduction:
    'Faculty lead students through a structured product and engineering process, with partner input keeping the work useful, grounded, and aligned.',
  processStages: [
    {
      _key: 'discovery',
      _type: 'clientProcessStage',
      title: 'Discovery',
      body: 'Students learn your context, users, constraints, and definition of success.',
    },
    {
      _key: 'design',
      _type: 'clientProcessStage',
      title: 'Design',
      body: 'The team explores approaches, prioritizes requirements, and validates a feasible direction.',
    },
    {
      _key: 'development',
      _type: 'clientProcessStage',
      title: 'Development',
      body: 'Students build and iterate on the solution through regular feedback and demonstrations.',
    },
    {
      _key: 'implementation',
      _type: 'clientProcessStage',
      title: 'Implementation',
      body: 'The engagement concludes with a working outcome, presentation, and practical handoff.',
    },
  ],
  fitLabel: 'A strong project fit',
  fitTitle: 'The best briefs are important, focused, and open to discovery.',
  fitIntroduction:
    'You do not need a fully specified product plan. Faculty will help shape the opportunity into a responsible semester scope before students begin.',
  projectQualities: [
    'Addresses a real need within your organization or community',
    'Can benefit from a software, data, or AI solution',
    'Has an engaged point of contact available for regular feedback',
    'Can be scoped to a valuable MVP or proof of concept in one semester',
  ],
  partnersLabel: 'Recent partners',
  partnersTitle: 'Organizations already bringing real work into the classroom.',
  partnersIntroduction:
    'Projects span healthcare, public service, research, and consulting—giving each team a distinct problem space and partner perspective.',
  partners: [
    'Boston Children’s Hospital',
    'Massachusetts National Guard',
    'Society for the Study of Affect',
    'NExT Co-op Consulting',
  ],
  benefitsLabel: 'Shared benefits',
  benefitsTitle: 'A useful solution and a learning experience that lasts.',
  benefits: [
    {
      _key: 'partner-benefit',
      _type: 'clientBenefit',
      title: 'For industry partners',
      body: 'Gain an innovative solution, a fresh perspective on your challenge, and access to a developing talent pool.',
    },
    {
      _key: 'student-benefit',
      _type: 'clientBenefit',
      title: 'For students',
      body: 'Gain practical skills, meaningful industry insight, and experience delivering for a real client.',
    },
  ],
  closingLabel: 'Have a project in mind?',
  closingTitle: 'Let’s explore what a practicum team could build with you.',
  closingBody:
    'Share the problem you are trying to solve. We would be happy to discuss the possibilities, answer questions, and help determine whether it is a strong fit for the practicum.',
  closingCtaLabel: 'Email us!',
  closingCtaEmail: 'industrypracticum@northeastern.edu',
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

const titleBodyMember = (name: string, title: string, icon = BulbOutlineIcon) =>
  defineArrayMember({
    name,
    title,
    type: 'object',
    icon,
    fields: [
      defineField({
        name: 'title',
        title: 'Title',
        type: 'string',
        validation: (rule) => rule.required(),
      }),
      defineField({
        name: 'body',
        title: 'Description',
        type: 'text',
        rows: 3,
        validation: (rule) => rule.required(),
      }),
    ],
    preview: {select: {title: 'title', subtitle: 'body'}},
  })

export const clientsPage = defineType({
  name: 'clientsPage',
  title: 'Clients Page',
  type: 'document',
  icon: DocumentIcon,
  initialValue: defaultClientsPage,
  fieldsets: [
    {name: 'seo', title: 'Search & Sharing', options: {collapsible: true, collapsed: true}},
    {name: 'hero', title: '1. Hero & Contact CTA', options: {collapsible: true}},
    {name: 'value', title: '2. Partner Value', options: {collapsible: true}},
    {name: 'model', title: '3. Engagement Model', options: {collapsible: true}},
    {name: 'process', title: '4. Project Process', options: {collapsible: true}},
    {name: 'fit', title: '5. Strong Project Fit', options: {collapsible: true}},
    {name: 'partners', title: '6. Recent Partners', options: {collapsible: true}},
    {name: 'benefits', title: '7. Shared Benefits', options: {collapsible: true}},
    {name: 'closing', title: '8. Closing Contact CTA', options: {collapsible: true}},
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
      ['heroCtaLabel', 'Copy Button Label', 'string'],
    ].map(([name, title, type]) =>
      defineField({name, title, type, fieldset: 'hero', validation: (rule) => rule.required()}),
    ),
    defineField({
      name: 'heroCtaEmail',
      title: 'Email to Copy',
      description: 'The button copies this address to the visitor’s clipboard.',
      type: 'email',
      icon: LaunchIcon,
      fieldset: 'hero',
      validation: (rule) => rule.required(),
    }),
    ...[
      ['valueLabel', 'Section Label'],
      ['valueTitle', 'Section Title'],
    ].map(([name, title]) =>
      defineField({name, title, type: 'string', fieldset: 'value', validation: (rule) => rule.required()}),
    ),
    defineField({
      name: 'valuePropositions',
      title: 'Value Propositions',
      type: 'array',
      fieldset: 'value',
      of: [titleBodyMember('clientValueProposition', 'Value Proposition')],
      validation: (rule) => rule.min(1).max(6),
    }),
    ...[
      ['modelLabel', 'Section Label', 'string'],
      ['modelTitle', 'Section Title', 'string'],
      ['modelIntroduction', 'Introduction', 'text'],
    ].map(([name, title, type]) =>
      defineField({name, title, type, fieldset: 'model', validation: (rule) => rule.required()}),
    ),
    defineField({
      name: 'modelFacts',
      title: 'Engagement Facts',
      type: 'array',
      fieldset: 'model',
      of: [
        defineArrayMember({
          name: 'clientModelFact',
          title: 'Engagement Fact',
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
      ['processLabel', 'Section Label', 'string'],
      ['processTitle', 'Section Title', 'string'],
      ['processIntroduction', 'Introduction', 'text'],
    ].map(([name, title, type]) =>
      defineField({name, title, type, fieldset: 'process', validation: (rule) => rule.required()}),
    ),
    defineField({
      name: 'processStages',
      title: 'Process Stages',
      type: 'array',
      fieldset: 'process',
      of: [titleBodyMember('clientProcessStage', 'Process Stage', TimelineIcon)],
      validation: (rule) => rule.min(1).max(6),
    }),
    defineField({
      name: 'fitImage',
      title: 'Project Fit Image',
      type: 'image',
      icon: ImageIcon,
      fieldset: 'fit',
      options: {hotspot: true},
      fields: [requiredImageAltField()],
    }),
    ...[
      ['fitLabel', 'Section Label', 'string'],
      ['fitTitle', 'Section Title', 'string'],
      ['fitIntroduction', 'Introduction', 'text'],
    ].map(([name, title, type]) =>
      defineField({name, title, type, fieldset: 'fit', validation: (rule) => rule.required()}),
    ),
    defineField({
      name: 'projectQualities',
      title: 'Project Qualities',
      type: 'array',
      fieldset: 'fit',
      of: [defineArrayMember({type: 'string'})],
      validation: (rule) => rule.min(1).max(8),
    }),
    ...[
      ['partnersLabel', 'Section Label', 'string'],
      ['partnersTitle', 'Section Title', 'string'],
      ['partnersIntroduction', 'Introduction', 'text'],
    ].map(([name, title, type]) =>
      defineField({name, title, type, fieldset: 'partners', validation: (rule) => rule.required()}),
    ),
    defineField({
      name: 'partners',
      title: 'Partner Names',
      type: 'array',
      fieldset: 'partners',
      of: [defineArrayMember({type: 'string'})],
      validation: (rule) => rule.min(1),
    }),
    ...[
      ['benefitsLabel', 'Section Label'],
      ['benefitsTitle', 'Section Title'],
    ].map(([name, title]) =>
      defineField({name, title, type: 'string', fieldset: 'benefits', validation: (rule) => rule.required()}),
    ),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      fieldset: 'benefits',
      of: [titleBodyMember('clientBenefit', 'Benefit', CheckmarkCircleIcon)],
      validation: (rule) => rule.min(1).max(4),
    }),
    ...[
      ['closingLabel', 'Section Label', 'string'],
      ['closingTitle', 'Section Title', 'string'],
      ['closingBody', 'Description', 'text'],
      ['closingCtaLabel', 'Copy Button Label', 'string'],
    ].map(([name, title, type]) =>
      defineField({name, title, type, fieldset: 'closing', validation: (rule) => rule.required()}),
    ),
    defineField({
      name: 'closingCtaEmail',
      title: 'Email to Copy',
      description: 'The button copies this address to the visitor’s clipboard.',
      type: 'email',
      icon: LaunchIcon,
      fieldset: 'closing',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {select: {title: 'heroTitle', subtitle: 'heroIntroduction', media: 'heroImage'}},
})
