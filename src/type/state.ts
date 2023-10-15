export type DefaultValue = 'default'
export type DefaultOrEmptyValue = '' | DefaultValue

/** States */

export type ColorState = 'accent' | 'warning' | 'danger' | 'success'

export type DisabledState = 'disabled'
export type ReadonlyState = 'readonly'

export type LoadingState = 'loading'
export type ErrorState = 'error'

export type State = ColorState | DisabledState | ReadonlyState | LoadingState | ErrorState

/** Sizes */

export type Small = 'small'
export type Large = 'large'

export type Size = Small | DefaultValue | Large
