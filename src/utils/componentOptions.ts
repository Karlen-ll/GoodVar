import { State, Size, DefaultValue, DefaultOrEmptyValue } from '@/type/state'

export type ComponentDetailResult = { classes: string[] } & Partial<Record<DefaultValue | State | Size, boolean>>
export type ComponentDetailMode = string | Record<string, boolean>
export type ComponentDetailOptions = {
  state?: DefaultOrEmptyValue | State
  size?: DefaultOrEmptyValue | Size
  mode?: ComponentDetailMode | ComponentDetailMode[]
}
const getClassName = (className: string, modifier: string) => `${className}--${modifier}`

/** Формируем карту свойств & классы для компонента
 * @example Если в `options` передать:
 * { state: 'loading', mode: ['primary', { thin: true }] }
 * @example Метод вернёт:
 * { classes: ['component--loading', 'component--primary', 'component--thin'], loading: true } */
export const getComponentDetail = (className: string, options?: ComponentDetailOptions) => {
  const result: ComponentDetailResult = { classes: [] as string[] }

  if (!options) {
    return result
  }

  ;(['state', 'size'] as const).forEach((key) => {
    if (options[key] && options[key] !== 'default') {
      result[options[key] as State] = true
      result.classes.push(getClassName(className, options[key] as State))
    }
  })

  if (options.mode) {
    const modes = Array.isArray(options.mode) ? options.mode : [options.mode]

    modes.forEach((mode) => {
      if (typeof mode === 'string') {
        result.classes.push(getClassName(className, mode))
        return
      }

      for (const key in mode) {
        if (mode[key]) {
          result.classes.push(getClassName(className, key))
        }
      }
    })
  }

  return result
}
