export type HomeCallToAction = {
  _key?: string
  label?: string
  href?: string
  audience?: 'students' | 'clients' | 'general'
}

export type HomePageData = {
  title?: string
  subtitle?: string
  callsToAction?: HomeCallToAction[]
}
