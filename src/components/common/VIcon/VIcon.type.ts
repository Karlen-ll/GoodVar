const ICON_NAMES = ['info', 'github', 'sun', 'moon', 'right', 'down', 'search', 'input', 'copy', 'close', 'resize'] as const

export type SpriteName = typeof ICON_NAMES[number]

export type IconName = SpriteName | SpriteName[]

export type IconType = {
  name: IconName
  href: string
}
