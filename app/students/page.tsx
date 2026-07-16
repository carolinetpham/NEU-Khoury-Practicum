import type {Metadata} from 'next'
import Image from 'next/image'
import type {SanityImageSource} from '@sanity/image-url'
import {
  ArrowUpRight,
  ChartNoAxesColumnIncreasing,
  BriefcaseBusiness,
  Check,
  Clock3,
  Code2,
  MessageSquareText,
  Presentation,
  Route,
  Users,
} from 'lucide-react'

import {urlFor} from '@/sanity/lib/image'
import {getStudentsPage} from './data'
import type {
  ApplicationLinkProps,
  StudentsEditableImageProps,
} from './types'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getStudentsPage()
  return {title: page.seoTitle, description: page.seoDescription}
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
}: StudentsEditableImageProps) {
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
      sizes={sizes}
      priority={priority}
      placeholder={lqip ? 'blur' : 'empty'}
      blurDataURL={lqip}
      className={className}
    />
  )
}

function ApplicationLink({href, label, inverted = false}: ApplicationLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={
        inverted
          ? 'inline-flex h-13 items-center justify-center gap-2 rounded-md bg-brand-white px-6 text-sm font-semibold text-brand-red transition hover:bg-brand-red-wash focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-brand-white'
          : 'inline-flex h-13 items-center justify-center gap-2 rounded-md bg-brand-red px-6 text-sm font-semibold text-brand-white transition hover:bg-brand-red-dark focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-brand-red'
      }
    >
      {label}
      <ArrowUpRight className="h-4 w-4" aria-hidden />
    </a>
  )
}

export default async function StudentsPage() {
  const page = await getStudentsPage()
  const factIcons = [Code2, Users, Clock3, Presentation]
  const expectationIcons = [Clock3, BriefcaseBusiness, Code2, MessageSquareText]

  return (
    <main className="page-enter -mt-16 min-h-screen bg-brand-white">
      <section className="bg-linear-to-b from-brand-red-wash via-brand-red-wash to-brand-white pt-28 sm:pt-32">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 pb-14 sm:px-6 sm:pb-18 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14">
          <div className="pb-2 lg:py-10">
            <p className="rise-in text-sm font-semibold uppercase tracking-wide text-brand-red">
              {page.heroLabel}
            </p>
            <h1 className="rise-in rise-in-delay-1 mt-4 max-w-xl text-4xl font-semibold leading-[1.04] tracking-[-0.04em] text-brand-black sm:text-5xl lg:text-6xl">
              {page.heroTitle}
            </h1>
            <p className="rise-in rise-in-delay-2 mt-6 max-w-xl text-lg leading-8 text-brand-black/68">
              {page.heroIntroduction}
            </p>
            <div className="rise-in rise-in-delay-3 mt-8">
              <ApplicationLink href={page.heroCtaUrl} label={page.heroCtaLabel} />
            </div>
          </div>
          <div className="rise-in rise-in-delay-2 lg:pl-4">
            <div className="overflow-hidden rounded-[1.75rem] bg-brand-white">
              <EditableImage
                image={page.heroImage}
                fallbackSrc="/images/students-collaborating.jpg"
                fallbackAlt="Practicum students collaborating around a table"
                width={1000}
                height={860}
                sizes="(min-width: 1024px) 52vw, 100vw"
                priority
                className="h-auto min-h-80 w-full object-cover sm:min-h-105"
              />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="facts-heading" className="bg-brand-white">
        <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-6 sm:py-16">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-red">{page.factsLabel}</p>
            <h2 id="facts-heading" className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-brand-black sm:text-4xl">
              {page.factsTitle}
            </h2>
          </div>
          <div className="mt-8 grid overflow-hidden rounded-2xl border border-brand-black/10 sm:grid-cols-2 lg:grid-cols-4">
            {page.facts.map((fact, index) => {
              const Icon = factIcons[index] || Route
              return (
                <article key={fact._key || fact.label} className="border-brand-black/10 p-5 not-last:border-b sm:odd:border-r sm:nth-[3]:border-b-0 sm:nth-[4]:border-b-0 lg:border-b-0 lg:not-last:border-r">
                  <Icon className="h-5 w-5 text-brand-red" aria-hidden />
                  <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-brand-black/45">{fact.label}</p>
                  <h3 className="mt-2 text-xl font-semibold leading-snug text-brand-black">{fact.value}</h3>
                  <p className="mt-3 text-sm leading-6 text-brand-black/60">{fact.body}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section aria-labelledby="journey-heading" className="bg-brand-black text-brand-white">
        <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-6 sm:py-18">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-16">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-red-light">{page.journeyLabel}</p>
              <h2 id="journey-heading" className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-4xl">{page.journeyTitle}</h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-brand-white/62">{page.journeyIntroduction}</p>
          </div>
          <ol className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-brand-white/12 md:grid-cols-2 lg:grid-cols-4">
            {page.journeyStages.map((stage, index) => (
              <li key={stage._key || stage.title} className="bg-brand-black-soft p-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-red text-sm font-semibold text-brand-white">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="mt-8 text-xl font-semibold">{stage.title}</h3>
                <p className="mt-3 text-sm leading-6 text-brand-white/58">{stage.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="expectations-heading" className="bg-brand-white">
        <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-6 sm:py-16">
          <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-red">{page.expectationsLabel}</p>
              <h2 id="expectations-heading" className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.03em] text-brand-black sm:text-4xl">{page.expectationsTitle}</h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-brand-black/62">{page.expectationsIntroduction}</p>
          </div>
          <div className="mt-9 grid sm:grid-cols-2 sm:gap-x-12">
            {page.expectations.map((expectation, index) => {
              const Icon = expectationIcons[index] || Check
              return (
                <article
                  key={expectation._key || expectation.title}
                  className="grid grid-cols-[auto_1fr] gap-4 border-t border-brand-black/12 py-6"
                >
                  <Icon className="mt-1 h-5 w-5 text-brand-red" aria-hidden />
                  <div>
                    <h3 className="text-lg font-semibold text-brand-black">
                      {expectation.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-brand-black/60">
                      {expectation.body}
                    </p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section aria-labelledby="assessment-heading" className="bg-brand-red-wash">
        <div className="mx-auto grid w-full max-w-6xl gap-9 px-5 py-14 sm:px-6 sm:py-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-red">{page.assessmentLabel}</p>
            <h2 id="assessment-heading" className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.03em] text-brand-black sm:text-4xl">{page.assessmentTitle}</h2>
            <p className="mt-5 text-base leading-7 text-brand-black/62">{page.assessmentIntroduction}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <article className="rounded-2xl bg-brand-red p-6 text-brand-white sm:p-7">
              <ChartNoAxesColumnIncreasing className="h-5 w-5 text-brand-red-light" aria-hidden />
              <p className="mt-8 text-5xl font-semibold tracking-tighter">{page.groupAssessmentPercentage}</p>
              <h3 className="mt-3 text-lg font-semibold">{page.groupAssessmentTitle}</h3>
              <p className="mt-3 text-sm leading-6 text-brand-white/72">{page.groupAssessmentBody}</p>
            </article>
            <article className="rounded-2xl border border-brand-black/10 bg-brand-white p-6 sm:p-7">
              <Users className="h-5 w-5 text-brand-red" aria-hidden />
              <p className="mt-8 text-5xl font-semibold tracking-tighter text-brand-black">{page.individualAssessmentPercentage}</p>
              <h3 className="mt-3 text-lg font-semibold text-brand-black">{page.individualAssessmentTitle}</h3>
              <p className="mt-3 text-sm leading-6 text-brand-black/60">{page.individualAssessmentBody}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-brand-white px-5 py-14 sm:px-6 sm:py-18">
        <div className="mx-auto w-full max-w-6xl rounded-[1.75rem] bg-brand-red px-6 py-10 text-brand-white sm:px-10 sm:py-12 lg:px-14">
          <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-14">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-red-light">{page.closingLabel}</p>
              <h2 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-4xl">{page.closingTitle}</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-brand-white/74">{page.closingBody}</p>
            </div>
            <ApplicationLink href={page.closingCtaUrl} label={page.closingCtaLabel} inverted />
          </div>
        </div>
      </section>
    </main>
  )
}
