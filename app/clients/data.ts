import 'server-only'

import {sanityFetch} from '@/sanity/lib/live'
import {CLIENTS_PAGE_QUERY} from '@/sanity/lib/queries'
import type {ClientsPageData} from './types'

const fallbackClients = {
  seoTitle: 'For Clients | Industry Practicum',
  seoDescription:
    'Partner with Northeastern students on a faculty-scoped software, data, or AI project and receive a high-quality MVP or proof of concept.',
  heroLabel: 'For industry partners',
  heroTitle: 'Bring a real challenge.',
  heroIntroduction:
    'Partner with Northeastern University on a faculty-scoped software, data, or AI project. A select student team will spend a full semester discovering, designing, and developing a high-quality MVP or proof of concept for your organization.',
  heroCtaLabel: 'Email us!',
  heroCtaEmail: 'industrypracticum@northeastern.edu',
  valueLabel: 'Why partner with us',
  valueTitle: 'A meaningful collaboration with value on both sides.',
  valuePropositions: [
    {
      _key: 'solution',
      title: 'A bespoke computing solution',
      body: 'From software to data and AI, students design and develop a solution around your organization’s problem—not a classroom prompt.',
    },
    {
      _key: 'collaboration',
      title: 'A meaningful collaboration',
      body: 'Work with talented Northeastern students while helping emerging professionals gain practical skills and industry insight.',
    },
    {
      _key: 'talent',
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
      label: 'Duration',
      value: '16 weeks',
      body: 'A full-semester engagement with a steady project cadence.',
    },
    {
      _key: 'team',
      label: 'Student team',
      value: '5–6 students',
      body: 'A small, select team collaborates directly with your organization.',
    },
    {
      _key: 'outcome',
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
      title: 'Discovery',
      body: 'Students learn your context, users, constraints, and definition of success.',
    },
    {
      _key: 'design',
      title: 'Design',
      body: 'The team explores approaches, prioritizes requirements, and validates a feasible direction.',
    },
    {
      _key: 'development',
      title: 'Development',
      body: 'Students build and iterate on the solution through regular feedback and demonstrations.',
    },
    {
      _key: 'implementation',
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
      title: 'For industry partners',
      body: 'Gain an innovative solution, a fresh perspective on your challenge, and access to a developing talent pool.',
    },
    {
      _key: 'student-benefit',
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

const clean = (value: string | undefined, fallback: string) =>
  value?.trim() || fallback

export async function getClientsPage() {
  const {data} = await sanityFetch({query: CLIENTS_PAGE_QUERY})
  const page = data as ClientsPageData | null

  return {
    seoTitle: clean(page?.seoTitle, fallbackClients.seoTitle),
    seoDescription: clean(page?.seoDescription, fallbackClients.seoDescription),
    heroLabel: clean(page?.heroLabel, fallbackClients.heroLabel),
    heroTitle: clean(page?.heroTitle, fallbackClients.heroTitle),
    heroIntroduction: clean(page?.heroIntroduction, fallbackClients.heroIntroduction),
    heroCtaLabel: clean(page?.heroCtaLabel, fallbackClients.heroCtaLabel),
    heroCtaEmail: clean(page?.heroCtaEmail, fallbackClients.heroCtaEmail),
    heroImage: page?.heroImage,
    valueLabel: clean(page?.valueLabel, fallbackClients.valueLabel),
    valueTitle: clean(page?.valueTitle, fallbackClients.valueTitle),
    valuePropositions: page?.valuePropositions?.length
      ? page.valuePropositions
      : fallbackClients.valuePropositions,
    modelLabel: clean(page?.modelLabel, fallbackClients.modelLabel),
    modelTitle: clean(page?.modelTitle, fallbackClients.modelTitle),
    modelIntroduction: clean(page?.modelIntroduction, fallbackClients.modelIntroduction),
    modelFacts: page?.modelFacts?.length ? page.modelFacts : fallbackClients.modelFacts,
    processLabel: clean(page?.processLabel, fallbackClients.processLabel),
    processTitle: clean(page?.processTitle, fallbackClients.processTitle),
    processIntroduction: clean(page?.processIntroduction, fallbackClients.processIntroduction),
    processStages: page?.processStages?.length
      ? page.processStages
      : fallbackClients.processStages,
    fitLabel: clean(page?.fitLabel, fallbackClients.fitLabel),
    fitTitle: clean(page?.fitTitle, fallbackClients.fitTitle),
    fitIntroduction: clean(page?.fitIntroduction, fallbackClients.fitIntroduction),
    projectQualities: page?.projectQualities?.length
      ? page.projectQualities
      : fallbackClients.projectQualities,
    fitImage: page?.fitImage,
    partnersLabel: clean(page?.partnersLabel, fallbackClients.partnersLabel),
    partnersTitle: clean(page?.partnersTitle, fallbackClients.partnersTitle),
    partnersIntroduction: clean(
      page?.partnersIntroduction,
      fallbackClients.partnersIntroduction,
    ),
    partners: page?.partners?.length ? page.partners : fallbackClients.partners,
    benefitsLabel: clean(page?.benefitsLabel, fallbackClients.benefitsLabel),
    benefitsTitle: clean(page?.benefitsTitle, fallbackClients.benefitsTitle),
    benefits: page?.benefits?.length ? page.benefits : fallbackClients.benefits,
    closingLabel: clean(page?.closingLabel, fallbackClients.closingLabel),
    closingTitle: clean(page?.closingTitle, fallbackClients.closingTitle),
    closingBody: clean(page?.closingBody, fallbackClients.closingBody),
    closingCtaLabel: clean(page?.closingCtaLabel, fallbackClients.closingCtaLabel),
    closingCtaEmail: clean(
      page?.closingCtaEmail,
      fallbackClients.closingCtaEmail,
    ),
  }
}
