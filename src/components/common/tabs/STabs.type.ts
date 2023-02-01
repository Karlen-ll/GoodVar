export type STabValue = string | number

export type STabItem = {
  title: string
  value?: STabValue
  badge?: string | number
  showBadge?: boolean
  disabled?: boolean
}

export type STabsType = (string | STabItem)[]
