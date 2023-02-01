export type SerpMenu = {
  label: string
  hideOnMobile?: boolean
}

export type SerpCompany = 'google' | 'microsoft' | 'yandex'

export type SerpMenus = (string | SerpMenu)[]

export type SerpLogo = {
  name: string
  width: number
  height: number
}

export type SerpData = {
  title?: string
  desc?: string
  url?: string
  breadcrumbs?: string[]
  protocol?: 'http' | 'https'
}

export type SearchEngineValue = { site: SerpData, isMobile: boolean, company: SerpCompany }
