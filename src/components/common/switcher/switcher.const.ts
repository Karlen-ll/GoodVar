import { SpriteName } from '../icon/icon.type'
import { SwitchType } from './switcher.type'

export const TYPE_MAP: Record<SwitchType, 'checkbox' | 'radio'> = {
  checkbox: 'checkbox',
  toggle: 'checkbox',
  radio: 'radio',
}

export const ICON_MAP: Record<SwitchType, [SpriteName, SpriteName] | null> = {
  checkbox: ['square', 'square-x'],
  radio: ['circle', 'circle-x'],
  toggle: null,
}
