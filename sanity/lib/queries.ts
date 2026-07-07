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
