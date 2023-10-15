import { DefaultOrEmptyValue, DisabledState, ReadonlyState } from '@/type/state'

export type ButtonMode = DefaultOrEmptyValue | 'primary' | 'secondary' | 'icon'
export type ButtonState = DefaultOrEmptyValue | DisabledState | ReadonlyState

export type ButtonIconMode = 'prepend' | 'moves'

export type ButtonType = 'button' | 'submit' | 'reset'

export type ButtonTag = 'button' | 'div' | 'a' | 'routerLink'

export type ButtonIcon = {
  name: string
  size?: string | number
  mode?: ButtonIconMode | ButtonIconMode[]
}
