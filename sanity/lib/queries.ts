import {defineQuery} from 'next-sanity'

export const HOME_PAGE_QUERY = defineQuery(/* groq */ `
  *[_id == "homePage"][0] {
    title,
    subtitle,
    callsToAction[] {
      _key,
      label,
      href,
      audience
    }
  }
`)

export const ABOUT_PAGE_QUERY = defineQuery(/* groq */ `
  *[_id == "aboutPage"][0] {
    eyebrow,
    introduction,
    heroImage {
      asset-> {
        _id,
        url,
        metadata {
          lqip,
          dimensions
        }
      },
      alt
    },
    partners,
    benefits,
    testimonial
  }
`)

export const PROJECTS_QUERY = defineQuery(/* groq */ `
  *[_type == "project"] | order(displayOrder asc, title asc) {
    _id,
    title,
    "slug": slug.current,
    client,
    summary,
    status,
    displayOrder,
    featuredImage {
      asset-> {
        _id,
        url,
        metadata {
          lqip,
          dimensions
        }
      },
      alt
    },
    techStack,
    highlights,
    overview,
    problem,
    solution,
    outcome,
    detailSections[] {
      _key,
      heading,
      body
    },
    repositoryUrl,
    deploymentUrl
  }
`)

export const PROJECT_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "project" && defined(slug.current)] {
    "slug": slug.current
  }
`)

export const PROJECT_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    client,
    summary,
    status,
    displayOrder,
    featuredImage {
      asset-> {
        _id,
        url,
        metadata {
          lqip,
          dimensions
        }
      },
      alt
    },
    techStack,
    highlights,
    overview,
    problem,
    solution,
    outcome,
    detailSections[] {
      _key,
      heading,
      body
    },
    repositoryUrl,
    deploymentUrl
  }
`)
