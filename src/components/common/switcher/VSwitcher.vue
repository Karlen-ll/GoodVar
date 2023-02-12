<script setup lang="ts">
import { ref, computed } from 'vue'
import { toggleArrayElement } from '@/utils'
import { ICON_MAP, TYPE_MAP } from '@atom/switcher/switcher.const'
import { getComponentOptions, ComponentOptions, ComponentState } from '@/utils/componentOptions'
import { SwitchType, SwitchValue } from '@atom/switcher/switcher.type'
import { SpriteName } from '@atom/icon/icon.type'
import VIcon from '@atom/icon/VIcon.vue'

const props = withDefaults(
  defineProps<{
    modelValue?: SwitchValue
    checkedValue?: number | string | true
    type?: SwitchType
    label?: string
    state?: ComponentState
    mode?: 'big'
    icons?: [SpriteName, SpriteName]
    checked?: boolean
    multiple?: boolean
    presentation?: boolean
  }>(),
  {
    modelValue: undefined,
    checkedValue: true,
    type: 'toggle',
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value?: SwitchValue): void
}>()

const _value = ref<SwitchValue | undefined>()

const localValue = computed<SwitchValue | undefined>({
  get() {
    return typeof props.modelValue == 'undefined' ? _value.value : props.modelValue
  },

  set(value?: SwitchValue) {
    emit('update:modelValue', value)

    if (typeof props.modelValue === 'undefined') {
      _value.value = value
    }
  },
})

const isChecked = computed<boolean>(() => {
  if (props.multiple && props.checkedValue !== true) {
    return props.checked || (Array.isArray(localValue.value) && localValue.value.includes(props.checkedValue))
  }

  return props.checked || localValue.value === props.checkedValue
})

const correctIcon = computed<SpriteName | null>(() => {
  const icons = props.icons?.length === 2 ? props.icons : ICON_MAP[props.type]

  return icons?.length ? icons[isChecked.value ? 1 : 0] : null
})

const options = computed<ComponentOptions>(() => {
  return getComponentOptions('switcher', {
    state: props.state,
    modes: props.mode,
  })
})

const handleValueChange = (event: InputEvent): void => {
  if (props.multiple && props.checkedValue !== true) {
    const value = Array.isArray(localValue.value) ? [...localValue.value] : []

    localValue.value = toggleArrayElement(value, props.checkedValue)
    return
  }

  localValue.value = (event.target as HTMLInputElement)?.checked ? props.checkedValue : undefined
}
</script>

<template>
  <label :class="['switcher', `switcher--${type}`, { 'switcher--checked': isChecked }, options.classes]">
    <input
      :value="checkedValue"
      class="switcher__input visually-hidden"
      :type="TYPE_MAP[type]"
      :checked="isChecked"
      :tabindex="presentation ? -1 : undefined"
      :disabled="options.isDisabled"
      :readonly="options.isReadonly"
      @change="handleValueChange"
    />
    <span class="switcher__wrapper">
      <span class="switcher__inner">
        <v-icon v-if="correctIcon" :name="correctIcon" class="switcher__icon" />
      </span>
    </span>
    <span v-if="$slots.default || label" class="switcher__text">
      <slot :checked="isChecked">{{ label }}</slot>
    </span>
  </label>
</template>

<style scoped lang="scss">
.switcher {
  $self: &;

  position: relative;
  display: inline-flex;
  align-items: flex-start;
  line-height: 1;
  user-select: none;
  cursor: pointer;
  margin: 0.25em 0;

  &__wrapper {
    width: 1em;
    height: 1em;
    font-size: 1.2em;
    border-radius: 0.25em;
    border: 1px solid transparent;
    transition: background-color 0.25s ease-in;
    margin: -0.1em 0;
  }

  &__inner {
    width: 1em;
    height: 1em;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: inherit;
    text-align: center;
    transition: transform $timeout-md, background-color $timeout-md, color $timeout-md;
  }

  &__icon {
    width: 0.9em;
    height: 0.9em;
    transition: opacity $timeout-sm;
  }

  &__input {
    @at-root #{$self}--disabled,
      &[disabled] {
      cursor: not-allowed;

      ~ #{$self}__wrapper {
        #{$self}__inner {
          cursor: not-allowed;
          opacity: 0.5;
        }
      }
    }
  }

  &__text {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: $offset-sm;
  }

  &--big {
    align-items: center;

    #{$self}__wrapper {
      font-size: 1.5em;
    }
  }

  &--radio,
  &--toggle {
    #{$self} {
      &__wrapper {
        border-radius: 1em;
      }
    }
  }

  &--radio,
  &--checkbox {
    #{$self} {
      &__input {
        @include hover-and-not-disabled(#{$self}--disabled) {
          ~ #{$self}__wrapper {
            border: 1px solid $color--brand-accent;
          }
        }
      }
    }
  }

  &--radio {
    #{$self} {
      &__wrapper {
        margin-top: -0.15em;
      }

      &__text {
        margin-left: $offset-xs;
      }
    }
  }

  &--toggle {
    margin: 0.3em 0;

    #{$self} {
      &__wrapper {
        width: 1.8em;
        border: 1px solid $color--border;
        background-color: $color--obscure-bg;
        padding: 1px;
        margin-top: -0.15em;
      }

      &__inner {
        width: 1em;
        height: inherit;
        color: $color--black;
        background-color: $color--white;
        transition: transform $timeout-md, background-color $timeout-md, color $timeout-md;

        > #{$self}__icon {
          width: 0.6em;
          height: 0.6em;
        }
      }

      &__input {
        &:checked {
          ~ #{$self}__wrapper {
            background-color: $color--brand;

            #{$self}__inner {
              transform: translateX(0.8em);
            }
          }
        }

        @include hover-and-not-disabled(#{$self}--disabled) {
          ~ #{$self}__wrapper {
            border: 1px solid $color--brand-accent;
          }
        }
      }

      &__text {
        margin-left: $offset-sm + 0.1em;
      }
    }

    &#{$self}--big {
      #{$self}__inner {
        width: 0.8em;
        height: 0.8em;
        margin: 0.1em 0.1em 0;
      }
    }
  }

  &--tab {
    margin: 0;

    #{$self} {
      &__wrapper {
        top: 100%;
        width: 100%;
        height: auto;
        border-bottom: 2px solid transparent;
        transition: border-color $timeout-md;
        position: absolute;
      }

      &__inner {
        display: none;
      }

      &__input {
        &:checked {
          ~ #{$self} {
            &__wrapper {
              border-bottom-color: $color--brand;
            }

            &__text {
              color: $color--brand;
            }
          }
        }

        @include hover-and-not-disabled(#{$self}--disabled) {
          ~ #{$self}__wrapper {
            border-bottom-color: $color--brand-accent;
          }
        }
      }

      &__text {
        margin: 0;
        padding: $offset-sm #{$offset-sm * 0.5};
      }
    }
  }
}
</style>
