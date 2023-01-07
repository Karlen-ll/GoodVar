export const popoverPlacements = [
  'auto',
  'auto-end',
  'auto-start',
  'top',
  'top-end',
  'top-start',
  'left',
  'left-end',
  'left-start',
  'right',
  'right-end',
  'right-start',
  'bottom',
  'bottom-end',
  'bottom-start',
] as const

export const popoverTriggers = ['hover', 'click'] as const

export type SPopoverTrigger = typeof popoverTriggers[number]

export type SPopoverPlacement = typeof popoverPlacements[number]
