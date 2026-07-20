export type ClientsImage = {
  asset?: {
    _id?: string
    metadata?: {lqip?: string}
  }
  alt?: string
  crop?: unknown
  hotspot?: unknown
}

export type ClientContentItem = {
  _key?: string
  label?: string
  value?: string
  title?: string
  body?: string
}

export type ClientsPageData = {
  seoTitle?: string
  seoDescription?: string
  heroLabel?: string
  heroTitle?: string
  heroIntroduction?: string
  heroCtaLabel?: string
  heroCtaEmail?: string
  heroImage?: ClientsImage
  valueLabel?: string
  valueTitle?: string
  valuePropositions?: ClientContentItem[]
  modelLabel?: string
  modelTitle?: string
  modelIntroduction?: string
  modelFacts?: ClientContentItem[]
  processLabel?: string
  processTitle?: string
  processIntroduction?: string
  processStages?: ClientContentItem[]
  fitLabel?: string
  fitTitle?: string
  fitIntroduction?: string
  projectQualities?: string[]
  fitImage?: ClientsImage
  partnersLabel?: string
  partnersTitle?: string
  partnersIntroduction?: string
  partners?: string[]
  benefitsLabel?: string
  benefitsTitle?: string
  benefits?: ClientContentItem[]
  closingLabel?: string
  closingTitle?: string
  closingBody?: string
  closingCtaLabel?: string
  closingCtaEmail?: string
}

export type ClientsEditableImageProps = {
  image?: ClientsImage
  fallbackSrc: string
  fallbackAlt: string
  width: number
  height: number
  sizes: string
  className: string
  priority?: boolean
}
