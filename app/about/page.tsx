import Image from 'next/image'
import Link from 'next/link'
import type {Metadata} from 'next'
import {
  ArrowRight,
  Check,
  Handshake,
  Lightbulb,
  Presentation,
  Users,
} from 'lucide-react'

import {sanityFetch} from '@/sanity/lib/live'
import {ABOUT_PAGE_QUERY} from '@/sanity/lib/queries'

type AboutImage = {
  asset?: {
    url?: string
    metadata?: {
      lqip?: string
      dimensions?: {
        width?: number
        height?: number
      }
    }
  }
  alt?: string
}

type AboutPageData = {
  eyebrow?: string
  introduction?: string
  heroImage?: AboutImage
  partners?: string[]
  benefits?: string[]
  testimonial?: string
}

const fallbackAbout: Required<Omit<AboutPageData, 'heroImage'>> = {
  eyebrow: 'Professional Practicum at Khoury College',
  introduction:
    'Professional Practicum blends rigorous coursework with faculty and client mentorship so students can solve real-world problems in a professional setting.',
  partners: [
    'Massachusetts National Guard',
    "Boston Children's Hospital",
    'Oakridge Labs',
    'Society for the Study of Affect',
    'Northeastern University',
    'Pawtograder',
    'KidzHack',
  ],
  benefits: [
    'Solve real problems sourced directly from industry partners',
    'Develop technical and professional communication skills in tandem',
    'Work directly with faculty mentors and build client relationships throughout the project',
    'Collaborate within a small team of approximately five to six students',
    'Build your resume with a credit-bearing experience that goes beyond the classroom',
    'Satisfy NUpath Capstone Experience, Integration Experience, and Writing Intensive requirements (Boston only)',
  ],
  testimonial:
    'This class gave me an incredibly valuable preview of industry work after graduation. It felt less like a traditional computer science course and more like working at a client-facing business agency.',
}

const logistics = [
  {
    label: 'Team format',
    value: 'Cohorts of 5-6',
    body: 'Students work in small teams with enough ownership to practice real collaboration.',
  },
  {
    label: 'Project source',
    value: 'Client-sourced',
    body: 'Each project starts from an open-ended need brought by a partner or community organization.',
  },
  {
    label: 'Mentorship',
    value: 'Faculty + client guidance',
    body: 'Students receive course mentorship while also learning how to respond to client feedback.',
  },
  {
    label: 'Final outcome',
    value: 'Presentation and handoff',
    body: 'The semester ends with formal presentations, documentation, and next steps for partners.',
  },
]

export const metadata: Metadata = {
  title: 'About the Professional Practicum',
  description:
    'Learn how Khoury College students work in small teams with faculty and industry partners to solve real-world problems.',
}

function HeroPhoto({image}: {image?: AboutImage}) {
  const imageUrl = image?.asset?.url
  const width = image?.asset?.metadata?.dimensions?.width
  const height = image?.asset?.metadata?.dimensions?.height

  if (imageUrl) {
    return (
      <div
        role="img"
        aria-label={image?.alt || 'Students presenting practicum project work'}
        className="w-full bg-contain bg-center bg-no-repeat"
        style={{
          aspectRatio: width && height ? `${width} / ${height}` : '16 / 9',
          backgroundImage: `url(${imageUrl})`,
        }}
      />
    )
  }

  return (
    <div className="w-full overflow-hidden bg-brand-white-soft">
      <Image
        src="/images/inventory-system-group-photo.JPG"
        alt="Professional Practicum students presenting together"
        width={4592}
        height={1658}
        priority
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="h-auto w-full"
      />
    </div>
  )
}

export default async function AboutPage() {
  const {data} = await sanityFetch({query: ABOUT_PAGE_QUERY})
  const sanityAbout = data as AboutPageData | null
  const about = {
    eyebrow: sanityAbout?.eyebrow?.trim() || fallbackAbout.eyebrow,
    introduction:
      sanityAbout?.introduction?.trim() || fallbackAbout.introduction,
    heroImage: sanityAbout?.heroImage,
    partners: sanityAbout?.partners?.length
      ? sanityAbout.partners
      : fallbackAbout.partners,
    benefits: sanityAbout?.benefits?.length
      ? sanityAbout.benefits
      : fallbackAbout.benefits,
    testimonial:
      sanityAbout?.testimonial?.trim() || fallbackAbout.testimonial,
  }

  const logisticsIcons = [Users, Lightbulb, Handshake, Presentation]

  return (
    <main className="page-enter -mt-16 min-h-screen bg-brand-white">
      <section className="bg-brand-white pt-28 sm:pt-32">
        <div className="mx-auto w-full max-w-6xl px-5 pb-14 sm:px-6 sm:pb-16">
          <div className="rise-in mb-10 overflow-hidden rounded-2xl bg-brand-white-soft sm:mb-12">
            <HeroPhoto image={about.heroImage} />
          </div>

          <div className="grid gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-16">
            <div>
              <p className="rise-in text-sm font-semibold uppercase tracking-wide text-brand-red">
                About
              </p>
              <h1 className="rise-in rise-in-delay-1 mt-4 max-w-2xl text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-brand-black sm:text-5xl lg:text-6xl">
                {about.eyebrow}
              </h1>
            </div>
            <div>
              <p className="rise-in rise-in-delay-2 max-w-xl text-lg leading-8 text-brand-black/70">
                {about.introduction}
              </p>
              <div className="rise-in rise-in-delay-3 mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/projects"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-brand-red bg-brand-red px-5 text-sm font-semibold text-brand-white transition hover:border-brand-red-dark hover:bg-brand-red-dark focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-brand-red"
                >
                  Explore projects
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="essentials-heading" className="bg-brand-red-wash">
        <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-6 sm:py-16">
          <div className="grid gap-4 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-red">
                Practicum
              </p>
              <h2
                id="essentials-heading"
                className="mt-3 text-3xl font-semibold tracking-tight text-brand-black sm:text-4xl"
              >
                At a glance
              </h2>
            </div>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {logistics.map((item, index) => {
              const Icon = logisticsIcons[index]

              return (
                <article key={item.label} className="rounded-xl bg-brand-white p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-red text-brand-white">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-brand-black/45">
                    {item.label}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold leading-snug text-brand-black">
                    {item.value}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-brand-black/60">
                    {item.body}
                  </p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section aria-labelledby="overview-heading" className="bg-brand-white">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-14 sm:px-6 sm:py-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-red">
              The practicum model
            </p>
            <h2
              id="overview-heading"
              className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.03em] text-brand-black sm:text-4xl"
            >
              Course structure. Real-world stakes.
            </h2>
          </div>
          <div>
            <p className="max-w-2xl text-xl font-medium leading-9 tracking-[-0.015em] text-brand-black sm:text-2xl sm:leading-10">
              The practicum sits between a traditional course and a
              professional engagement. Faculty provide the structure to learn;
              students take ownership of the decisions, communication, and
              delivery.
            </p>
            <div className="mt-8 border-t border-brand-black/10 pt-5">
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-black/45">
                Available to Khoury students
              </p>
              <p className="mt-2 text-base leading-7 text-brand-black/65">
                Boston, Oakland, and Miami campuses
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="gallery-heading" className="bg-brand-red-wash">
        <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-red">
              Practicum in action
            </p>
            <h2
              id="gallery-heading"
              className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-brand-black sm:text-4xl"
            >
              Real teams. Real presentations.
            </h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Image
              src="/images/bch-group-photo.jpg"
              alt="Boston Children's Hospital practicum team"
              width={2040}
              height={1530}
              sizes="(min-width: 640px) 50vw, 100vw"
              className="h-auto w-full rounded-2xl"
            />
            <Image
              src="/images/guardconnect-group-photo.jpg"
              alt="GuardConnect practicum team"
              width={2040}
              height={1530}
              sizes="(min-width: 640px) 50vw, 100vw"
              className="h-auto w-full rounded-2xl"
            />
          </div>
        </div>
      </section>
      <section aria-labelledby="experience-heading" className="bg-brand-white">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-14 sm:px-6 sm:py-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-12">
          <div className="overflow-hidden rounded-2xl bg-brand-white">
            <Image
              src="/images/students-working.jpeg"
              alt="Students collaborating during a practicum work session"
              width={768}
              height={1024}
              sizes="(min-width: 1024px) 44vw, 100vw"
              className="mx-auto h-auto max-h-125 w-full object-contain"
            />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-red">
              What students gain
            </p>
            <h2
              id="experience-heading"
              className="mt-3 max-w-xl text-3xl font-semibold leading-tight tracking-[-0.03em] text-brand-black sm:text-4xl"
            >
              Technical growth meets professional experience.
            </h2>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {about.benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex gap-3 text-base leading-7 text-brand-black/70"
                >
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-red-light text-brand-red">
                    <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                  </span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="partners-heading" className="overflow-hidden bg-brand-red-wash">
        <div className="mx-auto w-full max-w-6xl px-5 pt-14 sm:px-6 sm:pt-16">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-red">
            Industry connection
          </p>
          <h2
            id="partners-heading"
            className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.03em] text-brand-black sm:text-4xl"
          >
            Built with real partners.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-brand-black/60">
            Students learn to listen, communicate, and deliver alongside
            organizations with real needs.
          </p>
        </div>

        <div className="partner-marquee-window mt-9">
          <div className="partner-marquee">
            {[false, true].map((isDuplicate) => (
              <ul
                key={String(isDuplicate)}
                className="partner-marquee-group flex shrink-0 items-center gap-6 pr-6"
                aria-label={isDuplicate ? undefined : 'Past practicum partners'}
                aria-hidden={isDuplicate || undefined}
              >
                {about.partners.map((partner) => (
                  <li
                    key={partner}
                    className="flex items-center gap-6 whitespace-nowrap text-sm font-semibold text-brand-black/65"
                  >
                    <span>{partner}</span>
                    <span className="text-brand-red/45" aria-hidden>
                      •
                    </span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        <div className="mx-auto w-full max-w-6xl px-5 pb-14 sm:px-6 sm:pb-16">
          <blockquote className="ml-auto mt-9 max-w-xl border-l-2 border-brand-red/30 pl-5 text-base leading-7 text-brand-black/70 sm:pl-6">
            <p>&ldquo;{about.testimonial}&rdquo;</p>
            <footer className="mt-3 text-xs font-semibold uppercase tracking-wide text-brand-black/45">
              Practicum student
            </footer>
          </blockquote>
        </div>
      </section>
    </main>
  )
}
