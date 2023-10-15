import { SpriteName } from '@atom/icon/icon.type'
import { SwitchType } from '@atom/switcher/switcher.type'

export const TYPE_MAP: Record<SwitchType, 'checkbox' | 'radio'> = {
  checkbox: 'checkbox',
  toggle: 'checkbox',
  radio: 'radio',
  tab: 'radio',
}

export const ICON_MAP: Record<SwitchType, [SpriteName, SpriteName] | null> = {
  checkbox: ['square', 'square-x'],
  radio: ['circle', 'circle-x'],
  toggle: null,
  tab: null,
}
