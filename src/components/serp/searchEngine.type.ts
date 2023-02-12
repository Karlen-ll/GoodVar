import { IconName } from '@atom/icon/icon.type'

export type SerpCompany = 'google' | 'microsoft' | 'yandex'

export type SerpMode = 'desktop' | 'mobile'

export type SerpLogo = {
  name: string
  width?: number
  height?: number
}

export type SerpMenuItem = {
  label: string
  hideOnMobile?: boolean
}

export type SerpMenu = (string | SerpMenuItem)[]

export type SerpOptions = {
  width: number
  name: string
  logo: SerpLogo
  menu: SerpMenu
  search?: {
    icon?: IconName
    text?: string
    props?: { hideSeparator?: boolean; clearable?: boolean; appendStretch?: boolean }
  }
}

export type SerpData = {
  company: SerpCompany
  title?: string
  desc?: string
  url?: string
  breadcrumbs?: string[]
  protocol?: 'http' | 'https'
  mode?: SerpMode
}
