export type ComponentState = 'disabled' | 'readonly' | 'default' | 'loading' | 'error' | 'success'
export type ComponentOptions = {
  classes?: string | string[]
  isDisabled?: boolean
  isReadonly?: boolean
  isLoading?: boolean
  isSuccess?: boolean
  isError?: boolean
}

export const stateMap = {
  disabled: 'isDisabled',
  readonly: 'isReadonly',
  loading: 'isLoading',
  success: 'isSuccess',
  error: 'isError',
} as const

export const getClassNames = (prefix: string, modes: string | string[], extraClass?: string) => {
  if (Array.isArray(modes)) {
    const classNames = modes.map((mode) => `${prefix}--${mode}`)

    if (extraClass) {
      classNames.unshift(extraClass)
    }

    return classNames
  }

  return extraClass ? [extraClass, `${prefix}--${modes}`] : `${prefix}--${modes}`
}

export const getComponentOptions = (
  className: string,
  options?: { state?: ComponentState; modes?: false | string | string[] }
): ComponentOptions => {
  if (!options) {
    return {}
  }

  const result: ComponentOptions = {}

  if (options.state && options.state !== 'default') {
    result[stateMap[options.state]] = true
    result.classes = `${className}--${options.state}`
  }

  if (options.modes) {
    result.classes = getClassNames(className, options.modes, result.classes as string)
  }

  return result
}
