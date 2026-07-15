import {DocumentIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

const defaultAboutPage = {
  eyebrow: 'Professional Practicum at Khoury College',
  introduction:
    'Professional Practicum is an innovative, high-level experiential learning opportunity that blends rigorous coursework with faculty and client mentorship to give students the skills they need to solve real-world problems.',
  benefits: [
    'Solve real problems sourced directly from industry partners',
    'Develop technical and professional communication skills in tandem',
    'Work directly with faculty mentors and build client relationships throughout the project',
    'Collaborate within a small team of approximately five to six students',
    'Build your resume with a credit-bearing experience that goes beyond the classroom',
    'Satisfy NUpath Capstone Experience, Integration Experience, and Writing Intensive requirements (Boston only)',
  ],
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
    "This class gave me an incredibly valuable preview of industry work after graduation. It felt less like a traditional computer science course and more like working at a client-facing business agency, which I'm genuinely grateful for.",
}

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  icon: DocumentIcon,
  initialValue: defaultAboutPage,
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      description:
        'Optional image from a practicum presentation or classroom session.',
      options: {hotspot: true},
      fields: [
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
        }),
      ],
    }),
    defineField({
      name: 'eyebrow',
      title: 'Hero Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'introduction',
      title: 'Hero Introduction',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(420),
    }),
    defineField({
      name: 'benefits',
      title: 'What Students Gain',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: 'partners',
      title: 'Past Practicum Partners',
      type: 'array',
      description: 'Names displayed in the moving partner marquee.',
      of: [defineArrayMember({type: 'string'})],
      validation: (rule) => rule.min(1).unique(),
    }),
    defineField({
      name: 'testimonial',
      title: 'Student Testimonial',
      type: 'text',
      rows: 4,
    }),
  ],
  preview: {
    select: {
      title: 'eyebrow',
      media: 'heroImage',
    },
  },
})
