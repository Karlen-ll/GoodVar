import { State } from '@atom/tabs/state'

export type TabItem = {
  content: string
  value: string | number
  state?: State
  badge?: string | number
}

export type RawTabItem = Omit<TabItem, 'value'> & { value?: string | number }

export type TabsType = (string | RawTabItem)[]
