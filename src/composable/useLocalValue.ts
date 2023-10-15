import { ref, computed } from 'vue'

export function useLocalValue<T>(
  props: Record<string, any>,
  {
    keyOfProp = 'modelValue',
    onUpdateProp,
  }: { keyOfProp?: string; onUpdateProp?: (newValue?: T, oldValue?: T) => void } = {}
) {
  const localValue = ref<T | undefined>()

  return computed<T | undefined>({
    get() {
      return typeof props[keyOfProp] == 'undefined' ? localValue.value : props[keyOfProp]
    },

    set(value?: T) {
      const isLocalValue = typeof props[keyOfProp] == 'undefined'

      onUpdateProp?.(value, isLocalValue ? localValue.value : props[keyOfProp])

      if (isLocalValue) {
        localValue.value = value
      }
    },
  })
}
