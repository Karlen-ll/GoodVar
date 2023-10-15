import { DefaultOrEmptyValue, DisabledState, ReadonlyState, ColorState } from '@/type/state'

export type InputState = DefaultOrEmptyValue | DisabledState | ReadonlyState | ColorState
export type InputTag = 'input' | 'textarea'
