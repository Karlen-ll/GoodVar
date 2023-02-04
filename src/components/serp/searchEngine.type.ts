export type SerpCompany = 'google' | 'microsoft' | 'yandex'

export type SerpMode = 'desktop' | 'mobile'

export type SerpLogo = {
  name: string
  width: number
  height: number
}

export type SerpMenuItem = {
  label: string
  hideOnMobile?: boolean
}

export type SerpMenu = (string | SerpMenuItem)[]

export type SerpOptions = {
  name: string,
  logo: SerpLogo,
  menu: SerpMenu,
}

export type SerpData = {
  title?: string
  desc?: string
  url?: string
  breadcrumbs?: string[]
  protocol?: 'http' | 'https'
  company?: SerpCompany
  mode?: SerpMode
}
