import {DocumentIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

const defaultHomePage = {
  title: 'Khoury Software Practicum',
  subtitle: 'Develop for industry partners',
  callsToAction: [
    {
      label: 'For students',
      href: '/students',
      audience: 'students',
    },
    {
      label: 'For clients',
      href: '/clients',
      audience: 'clients',
    },
  ],
}

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: DocumentIcon,
  initialValue: defaultHomePage,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Primary homepage heading.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description:
        'Short line that appears below the title. Current site default: "Develop for industry partners".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'callsToAction',
      title: 'Calls to Action',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'callToAction',
          title: 'Call to Action',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'href',
              title: 'Link',
              type: 'string',
              description: 'Use an internal path such as /students or /clients.',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'audience',
              title: 'Audience',
              type: 'string',
              options: {
                list: [
                  {title: 'Students', value: 'students'},
                  {title: 'Clients', value: 'clients'},
                  {title: 'General', value: 'general'},
                ],
                layout: 'radio',
              },
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'href',
            },
          },
        }),
      ],
      validation: (rule) => rule.min(1).max(2),
    }),
    defineField({
      name: 'futureMedia',
      title: 'Future Media',
      description:
        'Optional image or video slots for future homepage media.',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'imageMedia',
          title: 'Image',
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
        }),
        defineArrayMember({
          name: 'videoMedia',
          title: 'Video',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'Video URL',
              type: 'url',
              validation: (rule) =>
                rule.uri({scheme: ['http', 'https']}).required(),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'url',
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
  },
})
