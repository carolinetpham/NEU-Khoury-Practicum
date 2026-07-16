import 'server-only'

import {sanityFetch} from '@/sanity/lib/live'
import {HOME_PAGE_QUERY} from '@/sanity/lib/queries'
import type {HomePageData} from './types'

const fallbackHome: Required<HomePageData> = {
  title: 'Khoury Software Practicum',
  subtitle: 'Develop for industry partners',
  callsToAction: [
    {label: 'For students', href: '/students', audience: 'students'},
    {label: 'For clients', href: '/clients', audience: 'clients'},
  ],
}

export async function getHomePage() {
  const {data} = await sanityFetch({query: HOME_PAGE_QUERY})
  const page = data as HomePageData | null

  return {
    title: page?.title?.trim() || fallbackHome.title,
    subtitle: page?.subtitle?.trim() || fallbackHome.subtitle,
    callsToAction: page?.callsToAction?.length
      ? page.callsToAction
      : fallbackHome.callsToAction,
  }
}
