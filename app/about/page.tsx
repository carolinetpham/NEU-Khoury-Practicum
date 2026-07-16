import Image from 'next/image'
import Link from 'next/link'
import type {Metadata} from 'next'
import type {SanityImageSource} from '@sanity/image-url'
import {
  ArrowRight,
  Check,
  Handshake,
  Lightbulb,
  Presentation,
  Users,
} from 'lucide-react'

import {sanityFetch} from '@/sanity/lib/live'
import {urlFor} from '@/sanity/lib/image'
import {ABOUT_PAGE_QUERY} from '@/sanity/lib/queries'
import type {
  AboutEditableImageProps,
  AboutPageData,
} from './types'

const fallbackAbout = {
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

const fallbackGalleryImages = [
  {
    src: '/images/bch-group-photo.jpg',
    alt: "Boston Children's Hospital practicum team",
  },
  {
    src: '/images/guardconnect-group-photo.jpg',
    alt: 'GuardConnect practicum team',
  },
]

export const metadata: Metadata = {
  title: 'About the Professional Practicum',
  description:
    'Learn how Khoury College students work in small teams with faculty and industry partners to solve real-world problems.',
}

function EditableImage({
  image,
  fallbackSrc,
  fallbackAlt,
  width,
  height,
  sizes,
  className,
  priority = false,
}: AboutEditableImageProps) {
  const hasSanityImage = Boolean(image?.asset?._id)
  const lqip = image?.asset?.metadata?.lqip
  const src = hasSanityImage
    ? urlFor(image as SanityImageSource)
        .width(width)
        .height(height)
        .fit('crop')
        .auto('format')
        .url()
    : fallbackSrc

  return (
    <Image
      src={src}
      alt={hasSanityImage ? image?.alt || fallbackAlt : fallbackAlt}
      width={width}
      height={height}
      priority={priority}
      sizes={sizes}
      placeholder={lqip ? 'blur' : 'empty'}
      blurDataURL={lqip}
      className={className}
    />
  )
}

export default async function AboutPage() {
  const {data} = await sanityFetch({query: ABOUT_PAGE_QUERY})
  const sanityAbout = data as AboutPageData | null
  const about = {
    heroLabel: sanityAbout?.heroLabel?.trim() || fallbackAbout.heroLabel,
    eyebrow: sanityAbout?.eyebrow?.trim() || fallbackAbout.eyebrow,
    introduction:
      sanityAbout?.introduction?.trim() || fallbackAbout.introduction,
    heroCtaLabel:
      sanityAbout?.heroCtaLabel?.trim() || fallbackAbout.heroCtaLabel,
    heroImage: sanityAbout?.heroImage,
    essentialsLabel:
      sanityAbout?.essentialsLabel?.trim() || fallbackAbout.essentialsLabel,
    essentialsTitle:
      sanityAbout?.essentialsTitle?.trim() || fallbackAbout.essentialsTitle,
    essentialsItems: sanityAbout?.essentialsItems?.length
      ? sanityAbout.essentialsItems
      : fallbackAbout.essentialsItems,
    modelLabel: sanityAbout?.modelLabel?.trim() || fallbackAbout.modelLabel,
    modelTitle: sanityAbout?.modelTitle?.trim() || fallbackAbout.modelTitle,
    modelBody: sanityAbout?.modelBody?.trim() || fallbackAbout.modelBody,
    availabilityLabel:
      sanityAbout?.availabilityLabel?.trim() ||
      fallbackAbout.availabilityLabel,
    availabilityText:
      sanityAbout?.availabilityText?.trim() || fallbackAbout.availabilityText,
    galleryLabel:
      sanityAbout?.galleryLabel?.trim() || fallbackAbout.galleryLabel,
    galleryTitle:
      sanityAbout?.galleryTitle?.trim() || fallbackAbout.galleryTitle,
    galleryImages: sanityAbout?.galleryImages,
    experienceImage: sanityAbout?.experienceImage,
    experienceLabel:
      sanityAbout?.experienceLabel?.trim() || fallbackAbout.experienceLabel,
    experienceTitle:
      sanityAbout?.experienceTitle?.trim() || fallbackAbout.experienceTitle,
    partners: sanityAbout?.partners?.length
      ? sanityAbout.partners
      : fallbackAbout.partners,
    benefits: sanityAbout?.benefits?.length
      ? sanityAbout.benefits
      : fallbackAbout.benefits,
    partnersLabel:
      sanityAbout?.partnersLabel?.trim() || fallbackAbout.partnersLabel,
    partnersTitle:
      sanityAbout?.partnersTitle?.trim() || fallbackAbout.partnersTitle,
    partnersIntroduction:
      sanityAbout?.partnersIntroduction?.trim() ||
      fallbackAbout.partnersIntroduction,
    testimonial:
      sanityAbout?.testimonial?.trim() || fallbackAbout.testimonial,
    testimonialAttribution:
      sanityAbout?.testimonialAttribution?.trim() ||
      fallbackAbout.testimonialAttribution,
  }

  const logisticsIcons = [Users, Lightbulb, Handshake, Presentation]
  const galleryItems = about.galleryImages?.length
    ? about.galleryImages.map((image, index) => ({
        key: image._key || `gallery-${index}`,
        image,
        fallbackSrc: fallbackGalleryImages[0].src,
        fallbackAlt: 'Professional Practicum presentation',
      }))
    : fallbackGalleryImages.map((fallback) => ({
        key: fallback.src,
        image: undefined,
        fallbackSrc: fallback.src,
        fallbackAlt: fallback.alt,
      }))

  return (
    <main className="page-enter -mt-16 min-h-screen bg-brand-white">
      <section className="bg-brand-white pt-28 sm:pt-32">
        <div className="mx-auto w-full max-w-6xl px-5 pb-14 sm:px-6 sm:pb-16">
          <div className="rise-in mb-10 overflow-hidden rounded-2xl bg-brand-white-soft sm:mb-12">
            <EditableImage
              image={about.heroImage}
              fallbackSrc="/images/inventory-system-group-photo.JPG"
              fallbackAlt="Professional Practicum students presenting together"
              width={1600}
              height={578}
              priority
              sizes="(min-width: 1152px) 1152px, 100vw"
              className="h-auto w-full"
            />
          </div>

          <div className="grid gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-16">
            <div>
              <p className="rise-in text-sm font-semibold uppercase tracking-wide text-brand-red">
                {about.heroLabel}
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
                  {about.heroCtaLabel}
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
                {about.essentialsLabel}
              </p>
              <h2
                id="essentials-heading"
                className="mt-3 text-3xl font-semibold tracking-tight text-brand-black sm:text-4xl"
              >
                {about.essentialsTitle}
              </h2>
            </div>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {about.essentialsItems.map((item, index) => {
              const Icon = logisticsIcons[index] || Lightbulb

              return (
                <article
                  key={item._key || item.label}
                  className="rounded-xl bg-brand-white p-5"
                >
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
              {about.modelLabel}
            </p>
            <h2
              id="overview-heading"
              className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.03em] text-brand-black sm:text-4xl"
            >
              {about.modelTitle}
            </h2>
          </div>
          <div>
            <p className="max-w-2xl text-xl font-medium leading-9 tracking-[-0.015em] text-brand-black sm:text-2xl sm:leading-10">
              {about.modelBody}
            </p>
            <div className="mt-8 border-t border-brand-black/10 pt-5">
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-black/45">
                {about.availabilityLabel}
              </p>
              <p className="mt-2 text-base leading-7 text-brand-black/65">
                {about.availabilityText}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="gallery-heading" className="bg-brand-red-wash">
        <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-red">
              {about.galleryLabel}
            </p>
            <h2
              id="gallery-heading"
              className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-brand-black sm:text-4xl"
            >
              {about.galleryTitle}
            </h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {galleryItems.map((item) => (
              <EditableImage
                key={item.key}
                image={item.image}
                fallbackSrc={item.fallbackSrc}
                fallbackAlt={item.fallbackAlt}
                width={1200}
                height={900}
                sizes="(min-width: 640px) 50vw, 100vw"
                className="h-auto w-full rounded-2xl object-cover"
              />
            ))}
          </div>
        </div>
      </section>
      <section aria-labelledby="experience-heading" className="bg-brand-white">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-14 sm:px-6 sm:py-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-12">
          <div className="overflow-hidden rounded-2xl bg-brand-white">
            <EditableImage
              image={about.experienceImage}
              fallbackSrc="/images/students-working.jpeg"
              fallbackAlt="Students collaborating during a practicum work session"
              width={768}
              height={1024}
              sizes="(min-width: 1024px) 44vw, 100vw"
              className="mx-auto h-auto max-h-125 w-full object-contain"
            />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-red">
              {about.experienceLabel}
            </p>
            <h2
              id="experience-heading"
              className="mt-3 max-w-xl text-3xl font-semibold leading-tight tracking-[-0.03em] text-brand-black sm:text-4xl"
            >
              {about.experienceTitle}
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
            {about.partnersLabel}
          </p>
          <h2
            id="partners-heading"
            className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.03em] text-brand-black sm:text-4xl"
          >
            {about.partnersTitle}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-brand-black/60">
            {about.partnersIntroduction}
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
              {about.testimonialAttribution}
            </footer>
          </blockquote>
        </div>
      </section>
    </main>
  )
}
