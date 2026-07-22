import 'server-only'

import {sanityFetch} from '@/sanity/lib/live'
import {ABOUT_PAGE_QUERY} from '@/sanity/lib/queries'
import type {AboutPageData} from './types'

const fallbackAbout = {
  heroLabel: 'About',
  eyebrow: 'The Practicum',
  introduction:
    'Professional Practicum blends rigorous coursework with faculty and client mentorship so students can solve real-world problems in a professional setting.',
  heroCtaLabel: 'Explore projects',
  essentialsLabel: 'Practicum',
  essentialsTitle: 'At a glance',
  essentialsItems: [
    {
      _key: 'team-format',
      label: 'Team format',
      value: 'Cohorts of 5-6',
      body: 'Students work in small teams with enough ownership to practice real collaboration.',
    },
    {
      _key: 'project-source',
      label: 'Project source',
      value: 'Client-sourced',
      body: 'Each project starts from an open-ended need brought by a partner or community organization.',
    },
    {
      _key: 'mentorship',
      label: 'Mentorship',
      value: 'Faculty + client guidance',
      body: 'Students receive course mentorship while also learning how to respond to client feedback.',
    },
    {
      _key: 'final-outcome',
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

export async function getAboutPage() {
  const {data} = await sanityFetch({query: ABOUT_PAGE_QUERY})
  const page = data as AboutPageData | null

  return {
    heroLabel: page?.heroLabel?.trim() || fallbackAbout.heroLabel,
    eyebrow: page?.eyebrow?.trim() || fallbackAbout.eyebrow,
    introduction: page?.introduction?.trim() || fallbackAbout.introduction,
    heroCtaLabel: page?.heroCtaLabel?.trim() || fallbackAbout.heroCtaLabel,
    heroImage: page?.heroImage,
    essentialsLabel:
      page?.essentialsLabel?.trim() || fallbackAbout.essentialsLabel,
    essentialsTitle:
      page?.essentialsTitle?.trim() || fallbackAbout.essentialsTitle,
    essentialsItems: page?.essentialsItems?.length
      ? page.essentialsItems
      : fallbackAbout.essentialsItems,
    modelLabel: page?.modelLabel?.trim() || fallbackAbout.modelLabel,
    modelTitle: page?.modelTitle?.trim() || fallbackAbout.modelTitle,
    modelBody: page?.modelBody?.trim() || fallbackAbout.modelBody,
    availabilityLabel:
      page?.availabilityLabel?.trim() || fallbackAbout.availabilityLabel,
    availabilityText:
      page?.availabilityText?.trim() || fallbackAbout.availabilityText,
    galleryLabel: page?.galleryLabel?.trim() || fallbackAbout.galleryLabel,
    galleryTitle: page?.galleryTitle?.trim() || fallbackAbout.galleryTitle,
    galleryImages: page?.galleryImages,
    experienceImage: page?.experienceImage,
    experienceLabel:
      page?.experienceLabel?.trim() || fallbackAbout.experienceLabel,
    experienceTitle:
      page?.experienceTitle?.trim() || fallbackAbout.experienceTitle,
    benefits: page?.benefits?.length ? page.benefits : fallbackAbout.benefits,
    partnersLabel: page?.partnersLabel?.trim() || fallbackAbout.partnersLabel,
    partnersTitle: page?.partnersTitle?.trim() || fallbackAbout.partnersTitle,
    partnersIntroduction:
      page?.partnersIntroduction?.trim() || fallbackAbout.partnersIntroduction,
    partners: page?.partners?.length ? page.partners : fallbackAbout.partners,
    testimonial: page?.testimonial?.trim() || fallbackAbout.testimonial,
    testimonialAttribution:
      page?.testimonialAttribution?.trim() ||
      fallbackAbout.testimonialAttribution,
  }
}
