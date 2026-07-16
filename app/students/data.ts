import 'server-only'

import {sanityFetch} from '@/sanity/lib/live'
import {STUDENTS_PAGE_QUERY} from '@/sanity/lib/queries'
import type {StudentsPageData} from './types'

const fallbackStudents = {
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
      label: 'Course',
      value: 'CS 4535',
      body: 'Industry Practicum: Software Engineering for Consultants',
    },
    {
      _key: 'format',
      label: 'Format',
      value: 'Small full-stack teams',
      body: 'Collaborate with classmates, faculty, and an experiential partner.',
    },
    {
      _key: 'commitment',
      label: 'Weekly commitment',
      value: '12–15 hours',
      body: 'Expected work outside class, including team and client collaboration.',
    },
    {
      _key: 'deliverable',
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
      title: 'Discover',
      body: 'Meet the client, investigate the problem, and translate needs into clear requirements and user stories.',
    },
    {
      _key: 'design',
      title: 'Design',
      body: 'Explore solutions, prototype key workflows, estimate effort, and test decisions with client feedback.',
    },
    {
      _key: 'build',
      title: 'Build & iterate',
      body: 'Develop integrated frontend and backend functionality using agile practices, testing, demos, and reviews.',
    },
    {
      _key: 'handoff',
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
      title: 'Be present and engaged',
      body: 'Attendance is required, along with active participation in class sessions, team work, and client meetings.',
    },
    {
      _key: 'professionalism',
      title: 'Work professionally',
      body: 'Communicate with maturity, meet client-facing commitments, and represent your team and Northeastern well.',
    },
    {
      _key: 'full-stack',
      title: 'Contribute across the product',
      body: 'Teams deliver integrated frontend and backend components that are functional and thoughtfully developed.',
    },
    {
      _key: 'collaboration',
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

const clean = (value: string | undefined, fallback: string) =>
  value?.trim() || fallback

export async function getStudentsPage() {
  const {data} = await sanityFetch({query: STUDENTS_PAGE_QUERY})
  const page = data as StudentsPageData | null

  return {
    seoTitle: clean(page?.seoTitle, fallbackStudents.seoTitle),
    seoDescription: clean(page?.seoDescription, fallbackStudents.seoDescription),
    heroLabel: clean(page?.heroLabel, fallbackStudents.heroLabel),
    heroTitle: clean(page?.heroTitle, fallbackStudents.heroTitle),
    heroIntroduction: clean(
      page?.heroIntroduction,
      fallbackStudents.heroIntroduction,
    ),
    heroCtaLabel: clean(page?.heroCtaLabel, fallbackStudents.heroCtaLabel),
    heroCtaUrl: clean(page?.heroCtaUrl, fallbackStudents.heroCtaUrl),
    heroImage: page?.heroImage,
    factsLabel: clean(page?.factsLabel, fallbackStudents.factsLabel),
    factsTitle: clean(page?.factsTitle, fallbackStudents.factsTitle),
    facts: page?.facts?.length ? page.facts : fallbackStudents.facts,
    journeyLabel: clean(page?.journeyLabel, fallbackStudents.journeyLabel),
    journeyTitle: clean(page?.journeyTitle, fallbackStudents.journeyTitle),
    journeyIntroduction: clean(
      page?.journeyIntroduction,
      fallbackStudents.journeyIntroduction,
    ),
    journeyStages: page?.journeyStages?.length
      ? page.journeyStages
      : fallbackStudents.journeyStages,
    expectationsLabel: clean(
      page?.expectationsLabel,
      fallbackStudents.expectationsLabel,
    ),
    expectationsTitle: clean(
      page?.expectationsTitle,
      fallbackStudents.expectationsTitle,
    ),
    expectationsIntroduction: clean(
      page?.expectationsIntroduction,
      fallbackStudents.expectationsIntroduction,
    ),
    expectations: page?.expectations?.length
      ? page.expectations
      : fallbackStudents.expectations,
    assessmentLabel: clean(
      page?.assessmentLabel,
      fallbackStudents.assessmentLabel,
    ),
    assessmentTitle: clean(
      page?.assessmentTitle,
      fallbackStudents.assessmentTitle,
    ),
    assessmentIntroduction: clean(
      page?.assessmentIntroduction,
      fallbackStudents.assessmentIntroduction,
    ),
    groupAssessmentTitle: clean(
      page?.groupAssessmentTitle,
      fallbackStudents.groupAssessmentTitle,
    ),
    groupAssessmentPercentage: clean(
      page?.groupAssessmentPercentage,
      fallbackStudents.groupAssessmentPercentage,
    ),
    groupAssessmentBody: clean(
      page?.groupAssessmentBody,
      fallbackStudents.groupAssessmentBody,
    ),
    individualAssessmentTitle: clean(
      page?.individualAssessmentTitle,
      fallbackStudents.individualAssessmentTitle,
    ),
    individualAssessmentPercentage: clean(
      page?.individualAssessmentPercentage,
      fallbackStudents.individualAssessmentPercentage,
    ),
    individualAssessmentBody: clean(
      page?.individualAssessmentBody,
      fallbackStudents.individualAssessmentBody,
    ),
    closingLabel: clean(page?.closingLabel, fallbackStudents.closingLabel),
    closingTitle: clean(page?.closingTitle, fallbackStudents.closingTitle),
    closingBody: clean(page?.closingBody, fallbackStudents.closingBody),
    closingCtaLabel: clean(
      page?.closingCtaLabel,
      fallbackStudents.closingCtaLabel,
    ),
    closingCtaUrl: clean(
      page?.closingCtaUrl,
      fallbackStudents.closingCtaUrl,
    ),
  }
}
