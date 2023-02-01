import { ComponentState } from '../../../utils/componentOptions'
import { SpriteName } from '../icon/icon.type'

export type SwitchType = 'checkbox' | 'radio' | 'toggle'

export type SwitchArray = (number | string)[]

export type SwitchValue = number | string | boolean | SwitchArray

export type SwitchGroupItem = {
  label: string
  checkedValue: SwitchValue
  checked?: boolean
  state?: ComponentState
  icons?: [SpriteName, SpriteName]
}
