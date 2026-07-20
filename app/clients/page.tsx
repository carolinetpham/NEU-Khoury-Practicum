import type {Metadata} from 'next'
import Image from 'next/image'
import type {SanityImageSource} from '@sanity/image-url'
import {
  BriefcaseBusiness,
  Check,
  Clock3,
  Handshake,
  Lightbulb,
  MessageSquareText,
  Route,
  Sparkles,
  Users,
} from 'lucide-react'

import {urlFor} from '@/sanity/lib/image'
import CopyEmailButton from './CopyEmailButton'
import {getClientsPage} from './data'
import type {ClientsEditableImageProps} from './types'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getClientsPage()
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
}: ClientsEditableImageProps) {
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

export default async function ClientsPage() {
  const page = await getClientsPage()
  const valueIcons = [Sparkles, Handshake, Users]
  const factIcons = [Clock3, Users, BriefcaseBusiness]
  const processIcons = [MessageSquareText, Lightbulb, Route, Check]

  return (
    <main className="page-enter -mt-16 min-h-screen bg-brand-white">
      <section className="bg-linear-to-b from-brand-red-wash via-brand-red-wash to-brand-white pt-28 sm:pt-32">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 pb-14 sm:px-6 sm:pb-18 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-14">
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
              <CopyEmailButton email={page.heroCtaEmail} label={page.heroCtaLabel} />
            </div>
          </div>
          <div className="rise-in rise-in-delay-2 lg:pl-4">
            <div className="overflow-hidden rounded-[1.75rem] bg-brand-white">
              <EditableImage
                image={page.heroImage}
                fallbackSrc="/images/guardconnect-group-photo.jpg"
                fallbackAlt="Practicum students and partners presenting the GuardConnect project"
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

      <section aria-labelledby="value-heading" className="bg-brand-white">
        <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-6 sm:py-16">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-red">{page.valueLabel}</p>
            <h2 id="value-heading" className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.03em] text-brand-black sm:text-4xl">
              {page.valueTitle}
            </h2>
          </div>
          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {page.valuePropositions.map((item, index) => {
              const Icon = valueIcons[index] || Sparkles
              return (
                <article key={item._key || item.title} className="rounded-2xl border border-brand-black/10 bg-brand-white p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-red text-brand-white">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="mt-7 text-xl font-semibold text-brand-black">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-brand-black/60">{item.body}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section aria-labelledby="model-heading" className="bg-brand-black text-brand-white">
        <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-6 sm:py-18">
          <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-end lg:gap-16">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-red-light">{page.modelLabel}</p>
              <h2 id="model-heading" className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-4xl">{page.modelTitle}</h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-brand-white/64">{page.modelIntroduction}</p>
          </div>
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-brand-white/12 md:grid-cols-3">
            {page.modelFacts.map((fact, index) => {
              const Icon = factIcons[index] || BriefcaseBusiness
              return (
                <article key={fact._key || fact.label} className="bg-brand-black-soft p-6">
                  <Icon className="h-5 w-5 text-brand-red-light" aria-hidden />
                  <p className="mt-7 text-xs font-semibold uppercase tracking-wide text-brand-white/45">{fact.label}</p>
                  <h3 className="mt-2 text-3xl font-semibold tracking-tight">{fact.value}</h3>
                  <p className="mt-3 text-sm leading-6 text-brand-white/58">{fact.body}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section aria-labelledby="process-heading" className="bg-brand-white">
        <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-6 sm:py-16">
          <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-red">{page.processLabel}</p>
              <h2 id="process-heading" className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.03em] text-brand-black sm:text-4xl">{page.processTitle}</h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-brand-black/62">{page.processIntroduction}</p>
          </div>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {page.processStages.map((stage, index) => {
              const Icon = processIcons[index] || Route
              return (
                <li key={stage._key || stage.title} className="rounded-2xl bg-brand-red-wash p-6">
                  <div className="flex items-center justify-between">
                    <Icon className="h-5 w-5 text-brand-red" aria-hidden />
                    <span className="text-sm font-semibold text-brand-black/30">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="mt-10 text-xl font-semibold text-brand-black">{stage.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-brand-black/60">{stage.body}</p>
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      <section aria-labelledby="fit-heading" className="bg-brand-red-wash">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 sm:px-6 sm:py-16 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-16">
          <div className="overflow-hidden rounded-[1.75rem] bg-brand-white">
            <EditableImage
              image={page.fitImage}
              fallbackSrc="/images/students-collaborating.jpg"
              fallbackAlt="Practicum students collaborating around a table"
              width={900}
              height={760}
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="h-auto min-h-80 w-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-red">{page.fitLabel}</p>
            <h2 id="fit-heading" className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.03em] text-brand-black sm:text-4xl">{page.fitTitle}</h2>
            <p className="mt-5 text-base leading-7 text-brand-black/62">{page.fitIntroduction}</p>
            <ul className="mt-7">
              {page.projectQualities.map((quality) => (
                <li key={quality} className="grid grid-cols-[auto_1fr] gap-3 border-t border-brand-black/10 py-4 text-sm leading-6 text-brand-black/72">
                  <Check className="mt-0.5 h-5 w-5 text-brand-red" aria-hidden />
                  {quality}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="partners-heading" className="bg-brand-white">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 sm:px-6 sm:py-16 lg:grid-cols-[0.86fr_1.14fr] lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-red">{page.partnersLabel}</p>
            <h2 id="partners-heading" className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.03em] text-brand-black sm:text-4xl">{page.partnersTitle}</h2>
            <p className="mt-5 text-base leading-7 text-brand-black/62">{page.partnersIntroduction}</p>
          </div>
          <ul className="border-t border-brand-black/12">
            {page.partners.map((partner, index) => (
              <li key={partner} className="flex items-center gap-5 border-b border-brand-black/12 py-5">
                <span className="text-sm font-semibold text-brand-red">{String(index + 1).padStart(2, '0')}</span>
                <span className="text-lg font-semibold text-brand-black">{partner}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="benefits-heading" className="bg-brand-black text-brand-white">
        <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-6 sm:py-18">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-red-light">{page.benefitsLabel}</p>
            <h2 id="benefits-heading" className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-4xl">{page.benefitsTitle}</h2>
          </div>
          <div className="mt-9 grid gap-4 md:grid-cols-2">
            {page.benefits.map((benefit, index) => (
              <article key={benefit._key || benefit.title} className="rounded-2xl border border-brand-white/12 bg-brand-white/5 p-6 sm:p-7">
                {index === 0 ? <BriefcaseBusiness className="h-5 w-5 text-brand-red-light" aria-hidden /> : <Users className="h-5 w-5 text-brand-red-light" aria-hidden />}
                <h3 className="mt-8 text-xl font-semibold">{benefit.title}</h3>
                <p className="mt-3 text-sm leading-6 text-brand-white/62">{benefit.body}</p>
              </article>
            ))}
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
            <CopyEmailButton
              email={page.closingCtaEmail}
              label={page.closingCtaLabel}
              inverted
            />
          </div>
        </div>
      </section>
    </main>
  )
}
