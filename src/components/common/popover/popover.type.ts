import { POPOVER_TRIGGERS, POPOVER_PLACEMENTS } from './popover.const'
import { Modifier } from '@popperjs/core'

export type PopoverTrigger = typeof POPOVER_TRIGGERS[number]

export type PopoverPlacement = typeof POPOVER_PLACEMENTS[number]

export type PopoverModifier = Partial<Modifier<string, any>>
