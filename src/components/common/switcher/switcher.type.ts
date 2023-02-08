import { ComponentState } from '@/utils/componentOptions'
import { SpriteName } from '@atom/icon/icon.type'

export type SwitchType = 'checkbox' | 'radio' | 'toggle' | 'tab'

export type SwitchArray = (number | string)[]

export type SwitchValue = number | string | boolean | SwitchArray

export type SwitchGroupItem = {
  label: string
  checkedValue?: SwitchValue
  checked?: boolean
  state?: ComponentState
  icons?: [SpriteName, SpriteName]
}
