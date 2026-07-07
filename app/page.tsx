import Link from 'next/link'
import {ArrowRight, BriefcaseBusiness, GraduationCap} from 'lucide-react'

import {sanityFetch} from '@/sanity/lib/live'
import {HOME_PAGE_QUERY} from '@/sanity/lib/queries'

type HomeCallToAction = {
  _key?: string
  label?: string
  href?: string
  audience?: 'students' | 'clients' | 'general'
}

type HomePageData = {
  title?: string
  subtitle?: string
  callsToAction?: HomeCallToAction[]
}

const fallbackHome: Required<HomePageData> = {
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

const getCtaIcon = (audience?: HomeCallToAction['audience']) => {
  if (audience === 'clients') {
    return <BriefcaseBusiness className="h-4.5 w-4.5" aria-hidden />
  }

  return <GraduationCap className="h-4.5 w-4.5" aria-hidden />
}

export default async function Home() {
  const {data} = await sanityFetch({query: HOME_PAGE_QUERY})
  const home = {...fallbackHome, ...(data as HomePageData | null)}
  const callsToAction = home.callsToAction?.length
    ? home.callsToAction
    : fallbackHome.callsToAction

  return (
    <main
      id="home-page"
      className="-mt-16 flex flex-1 flex-col overflow-hidden page-enter"
    >
      <section className="relative isolate flex min-h-screen w-full items-center bg-[--brand-white] pb-20 pt-36 sm:pb-24 sm:pt-40">
        <div
          aria-hidden
          className="gradient-enter absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_8%,rgba(200,16,46,0.16),transparent_34%),radial-gradient(circle_at_88%_22%,rgba(219,234,254,0.62),transparent_30%),linear-gradient(135deg,rgba(255,255,255,1)_0%,rgba(255,247,248,1)_46%,rgba(248,250,252,1)_100%)]"
        />
        <div
          aria-hidden
          className="ambient-motion absolute -inset-x-16 inset-y-0 -z-10"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 -z-10 h-44 bg-linear-to-t from-[--brand-red-light] to-transparent"
        />

        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h1 className="rise-in mt-7 max-w-4xl text-4xl font-semibold leading-[0.98] text-brand-red sm:text-6xl lg:text-7xl">
              {home.title}
            </h1>
            <h2 className="rise-in rise-in-delay-1 mt-5 max-w-2xl text-2xl font-semibold leading-tight text-brand-black sm:text-3xl">
              {home.subtitle}
            </h2>

            <div className="rise-in rise-in-delay-2 mt-8 flex flex-col gap-3 sm:flex-row">
              {callsToAction.map((cta, index) => {
                const isPrimary = index === 0

                return (
                  <Link
                    key={cta._key || cta.href || cta.label || index}
                    href={cta.href || '/'}
                    className={
                      isPrimary
                        ? 'inline-flex h-12 items-center justify-center gap-2 rounded-md border border-[#c8102e] bg-[#c8102e] px-5 text-sm font-semibold text-white transition hover:border-[#8f0c22] hover:bg-[#8f0c22] focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#c8102e]'
                        : 'inline-flex h-12 items-center justify-center gap-2 rounded-md border border-black/20 bg-white/80 px-5 text-sm font-semibold text-[#000000] transition hover:border-[#c8102e]/40 hover:bg-[#fbe6e9] focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#c8102e]'
                    }
                  >
                    {getCtaIcon(cta.audience)}
                    {cta.label}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="hidden min-h-105 lg:block" aria-hidden />
        </div>
      </section>
    </main>
  )
}
