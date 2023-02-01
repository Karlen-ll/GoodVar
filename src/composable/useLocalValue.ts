import { ref, computed, Ref } from 'vue'

export function useLocalValue<T extends unknown>(modelValue: Ref<T>, updateValue: (value?: T) => void) {
  const _value = ref<T>()

  const localValue = computed<T | undefined>({
    get() {
      return typeof modelValue.value == 'undefined' ? _value.value : modelValue.value
    },

    set(value?: T) {
      updateValue(value)

      if (typeof modelValue.value === 'undefined') {
        _value.value = value
      }
    },
  })

  return {
    localValue,
  }
}
