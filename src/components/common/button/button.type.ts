import { ComponentOptions } from '../../../utils/componentOptions'

export type ButtonMode = 'default' | 'primary' | 'secondary' | 'icon' | 'circle'

export type ButtonIconMode = 'prepend' | 'moves'

export type ButtonIcons = {
  name: string
  size?: string | number
  modes?: ButtonIconMode | ButtonIconMode[]
}

export type ButtonOptions = ComponentOptions & { icon?: Omit<ButtonIcons, 'modes'> & { classes?: string[] } }
