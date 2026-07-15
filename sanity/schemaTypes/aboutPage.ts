import {
  BulbOutlineIcon,
  DocumentIcon,
  ImageIcon,
} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

const defaultAboutPage = {
  heroLabel: 'About',
  eyebrow: 'Professional Practicum at Khoury College',
  introduction:
    'Professional Practicum blends rigorous coursework with faculty and client mentorship so students can solve real-world problems in a professional setting.',
  heroCtaLabel: 'Explore projects',
  essentialsLabel: 'Practicum',
  essentialsTitle: 'At a glance',
  essentialsItems: [
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
  ],
  modelLabel: 'The practicum model',
  modelTitle: 'Course structure. Real-world stakes.',
  modelBody:
    'The practicum sits between a traditional course and a professional engagement. Faculty provide the structure to learn; students take ownership of the decisions, communication, and delivery.',
  availabilityLabel: 'Available to Khoury students',
  availabilityText: 'Boston, Oakland, and Miami campuses',
  galleryLabel: 'Practicum in action',
  galleryTitle: 'Real teams. Real presentations.',
  experienceLabel: 'What students gain',
  experienceTitle: 'Technical growth meets professional experience.',
  benefits: [
    'Solve real problems sourced directly from industry partners',
    'Develop technical and professional communication skills in tandem',
    'Work directly with faculty mentors and build client relationships throughout the project',
    'Collaborate within a small team of approximately five to six students',
    'Build your resume with a credit-bearing experience that goes beyond the classroom',
    'Satisfy NUpath Capstone Experience, Integration Experience, and Writing Intensive requirements (Boston only)',
  ],
  partnersLabel: 'Industry connection',
  partnersTitle: 'Built with real partners.',
  partnersIntroduction:
    'Students learn to listen, communicate, and deliver alongside organizations with real needs.',
  partners: [
    'Massachusetts National Guard',
    "Boston Children's Hospital",
    'Oakridge Labs',
    'Society for the Study of Affect',
    'Northeastern University',
    'Pawtograder',
    'KidzHack',
  ],
  testimonial:
    'This class gave me an incredibly valuable preview of industry work after graduation. It felt less like a traditional computer science course and more like working at a client-facing business agency.',
  testimonialAttribution: 'Practicum student',
}

const requiredImageAltField = () =>
  defineField({
    name: 'alt',
    title: 'Alt Text',
    type: 'string',
    validation: (rule) =>
      rule.custom((value, context) => {
        const parent = context.parent as {_type?: string; asset?: unknown}

        if (parent?.asset && !value) {
          return 'Alt text is required when an image is set.'
        }

        return true
      }),
  })

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  icon: DocumentIcon,
  initialValue: defaultAboutPage,
  fieldsets: [
    {name: 'hero', title: '1. Hero', options: {collapsible: true}},
    {
      name: 'essentials',
      title: '2. At a Glance',
      options: {collapsible: true},
    },
    {
      name: 'model',
      title: '3. Practicum Model',
      options: {collapsible: true},
    },
    {
      name: 'gallery',
      title: '4. Practicum in Action',
      options: {collapsible: true},
    },
    {
      name: 'experience',
      title: '5. What Students Gain',
      options: {collapsible: true},
    },
    {
      name: 'partners',
      title: '6. Industry Connection',
      options: {collapsible: true},
    },
  ],
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      fieldset: 'hero',
      options: {hotspot: true},
      fields: [requiredImageAltField()],
    }),
    defineField({
      name: 'heroLabel',
      title: 'Section Label',
      type: 'string',
      fieldset: 'hero',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'eyebrow',
      title: 'Hero Title',
      type: 'string',
      fieldset: 'hero',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'introduction',
      title: 'Hero Introduction',
      type: 'text',
      fieldset: 'hero',
      rows: 3,
      validation: (rule) => rule.required().max(420),
    }),
    defineField({
      name: 'heroCtaLabel',
      title: 'Projects Button Label',
      type: 'string',
      fieldset: 'hero',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'essentialsLabel',
      title: 'Section Label',
      type: 'string',
      fieldset: 'essentials',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'essentialsTitle',
      title: 'Section Title',
      type: 'string',
      fieldset: 'essentials',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'essentialsItems',
      title: 'Essential Items',
      type: 'array',
      fieldset: 'essentials',
      of: [
        defineArrayMember({
          name: 'essentialItem',
          title: 'Essential Item',
          type: 'object',
          icon: BulbOutlineIcon,
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'value',
              title: 'Value',
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
          preview: {select: {title: 'value', subtitle: 'label'}},
        }),
      ],
      validation: (rule) => rule.min(1).max(4),
    }),
    defineField({
      name: 'modelLabel',
      title: 'Section Label',
      type: 'string',
      fieldset: 'model',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'modelTitle',
      title: 'Section Title',
      type: 'string',
      fieldset: 'model',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'modelBody',
      title: 'Description',
      type: 'text',
      fieldset: 'model',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'availabilityLabel',
      title: 'Availability Label',
      type: 'string',
      fieldset: 'model',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'availabilityText',
      title: 'Availability Text',
      type: 'string',
      fieldset: 'model',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'galleryLabel',
      title: 'Section Label',
      type: 'string',
      fieldset: 'gallery',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'galleryTitle',
      title: 'Section Title',
      type: 'string',
      fieldset: 'gallery',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'galleryImages',
      title: 'Gallery Images',
      type: 'array',
      fieldset: 'gallery',
      of: [
        defineArrayMember({
          name: 'galleryImage',
          title: 'Gallery Image',
          type: 'image',
          icon: ImageIcon,
          options: {hotspot: true},
          fields: [requiredImageAltField()],
        }),
      ],
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: 'experienceImage',
      title: 'Collaboration Image',
      type: 'image',
      fieldset: 'experience',
      options: {hotspot: true},
      fields: [requiredImageAltField()],
    }),
    defineField({
      name: 'experienceLabel',
      title: 'Section Label',
      type: 'string',
      fieldset: 'experience',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'experienceTitle',
      title: 'Section Title',
      type: 'string',
      fieldset: 'experience',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      fieldset: 'experience',
      of: [defineArrayMember({type: 'string'})],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: 'partnersLabel',
      title: 'Section Label',
      type: 'string',
      fieldset: 'partners',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'partnersTitle',
      title: 'Section Title',
      type: 'string',
      fieldset: 'partners',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'partnersIntroduction',
      title: 'Introduction',
      type: 'text',
      fieldset: 'partners',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'partners',
      title: 'Past Practicum Partners',
      type: 'array',
      fieldset: 'partners',
      description: 'Names displayed in the moving partner marquee.',
      of: [defineArrayMember({type: 'string'})],
      validation: (rule) => rule.min(1).unique(),
    }),
    defineField({
      name: 'testimonial',
      title: 'Student Testimonial',
      type: 'text',
      fieldset: 'partners',
      rows: 4,
    }),
    defineField({
      name: 'testimonialAttribution',
      title: 'Testimonial Attribution',
      type: 'string',
      fieldset: 'partners',
    }),
  ],
  preview: {
    select: {title: 'eyebrow', media: 'heroImage'},
  },
})
