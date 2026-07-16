export type AboutImage = {
  _key?: string
  asset?: {
    _id?: string
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
  crop?: unknown
  hotspot?: unknown
}

export type EssentialItem = {
  _key?: string
  label?: string
  value?: string
  body?: string
}

export type AboutPageData = {
  heroLabel?: string
  eyebrow?: string
  introduction?: string
  heroCtaLabel?: string
  heroImage?: AboutImage
  essentialsLabel?: string
  essentialsTitle?: string
  essentialsItems?: EssentialItem[]
  modelLabel?: string
  modelTitle?: string
  modelBody?: string
  availabilityLabel?: string
  availabilityText?: string
  galleryLabel?: string
  galleryTitle?: string
  galleryImages?: AboutImage[]
  experienceImage?: AboutImage
  experienceLabel?: string
  experienceTitle?: string
  benefits?: string[]
  partnersLabel?: string
  partnersTitle?: string
  partnersIntroduction?: string
  partners?: string[]
  testimonial?: string
  testimonialAttribution?: string
}

export type AboutEditableImageProps = {
  image?: AboutImage
  fallbackSrc: string
  fallbackAlt: string
  width: number
  height: number
  sizes: string
  className: string
  priority?: boolean
}
