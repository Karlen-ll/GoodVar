import { SpriteName } from '@atom/icon/icon.type'
import { DefaultOrEmptyValue, DisabledState, LoadingState } from '@/type/state'

export type SwitchState = DefaultOrEmptyValue | DisabledState | LoadingState

export type SwitchMode = DefaultOrEmptyValue | 'big'

export type SwitchType = 'checkbox' | 'radio' | 'toggle' | 'tab'

export type SwitchArray = (number | string)[]

export type SwitchValue = number | string | boolean | SwitchArray

export type SwitchGroupItem =
  | {
      label: string
      checkedValue?: SwitchValue
      checked?: boolean
      state?: SwitchState
      icons?: [SpriteName, SpriteName]
    }
  | string

export type NormalSwitchGroupItem = {
  label: string
  checkedValue: SwitchValue
  checked?: boolean
  state?: SwitchState
  icons?: [SpriteName, SpriteName]
}
