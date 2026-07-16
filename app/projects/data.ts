import 'server-only'

import {sanityFetch} from '@/sanity/lib/live'
import {
  PROJECT_BY_SLUG_QUERY,
  PROJECT_SLUGS_QUERY,
  PROJECTS_QUERY,
} from '@/sanity/lib/queries'
import type {ProjectItem, ProjectSlug} from './types'

export async function getProjects() {
  const {data} = await sanityFetch({query: PROJECTS_QUERY})
  return (data as ProjectItem[] | null) || []
}

export async function getProjectSlugs() {
  const {data} = await sanityFetch({query: PROJECT_SLUGS_QUERY})
  return (data as ProjectSlug[] | null) || []
}

export async function getProjectBySlug(slug: string) {
  const {data} = await sanityFetch({
    query: PROJECT_BY_SLUG_QUERY,
    params: {slug},
  })

  return data as ProjectItem | null
}
