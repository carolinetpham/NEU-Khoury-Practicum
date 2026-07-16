export type StudentsImage = {
  asset?: {
    _id?: string
    metadata?: {lqip?: string}
  }
  alt?: string
  crop?: unknown
  hotspot?: unknown
}

export type StudentLabeledItem = {
  _key?: string
  label?: string
  value?: string
  title?: string
  body?: string
}

export type StudentsPageData = {
  seoTitle?: string
  seoDescription?: string
  heroLabel?: string
  heroTitle?: string
  heroIntroduction?: string
  heroCtaLabel?: string
  heroCtaUrl?: string
  heroImage?: StudentsImage
  factsLabel?: string
  factsTitle?: string
  facts?: StudentLabeledItem[]
  journeyLabel?: string
  journeyTitle?: string
  journeyIntroduction?: string
  journeyStages?: StudentLabeledItem[]
  expectationsLabel?: string
  expectationsTitle?: string
  expectationsIntroduction?: string
  expectations?: StudentLabeledItem[]
  assessmentLabel?: string
  assessmentTitle?: string
  assessmentIntroduction?: string
  groupAssessmentTitle?: string
  groupAssessmentPercentage?: string
  groupAssessmentBody?: string
  individualAssessmentTitle?: string
  individualAssessmentPercentage?: string
  individualAssessmentBody?: string
  closingLabel?: string
  closingTitle?: string
  closingBody?: string
  closingCtaLabel?: string
  closingCtaUrl?: string
}

export type StudentsEditableImageProps = {
  image?: StudentsImage
  fallbackSrc: string
  fallbackAlt: string
  width: number
  height: number
  sizes: string
  className: string
  priority?: boolean
}

export type ApplicationLinkProps = {
  href: string
  label: string
  inverted?: boolean
}
