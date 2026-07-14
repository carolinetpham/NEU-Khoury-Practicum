export type ProjectImage = {
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

export type ProjectDetailSection = {
  _key?: string
  heading?: string
  body?: string
}

export type ProjectItem = {
  _id: string
  title: string
  slug?: string
  client: string
  summary: string
  status?: string
  featuredImage?: ProjectImage
  techStack?: string[]
  highlights?: string[]
  repositoryUrl?: string
  deploymentUrl?: string
  overview?: string
  problem?: string
  solution?: string
  outcome?: string
  detailSections?: ProjectDetailSection[]
}
