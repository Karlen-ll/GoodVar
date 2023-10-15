const ICON_NAMES = [
  'info',
  'github',
  'sun',
  'moon',
  'right',
  'down',
  'search',
  'input',
  'copy',
  'close',
  'plus',
  'resize',
  'circle',
  'circle-x',
  'square',
  'square-x',
] as const

export type SpriteName = typeof ICON_NAMES[number]

export type IconType = {
  name: SpriteName
  class?: string
  isHide?: boolean
}

export type RichIconType = IconType & { href: string }

export type IconName = SpriteName | IconType

export type IconNames = IconName | IconName[]
