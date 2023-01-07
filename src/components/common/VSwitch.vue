<script setup lang="ts">
import VIcon from './VIcon/VIcon.vue'
import { computed } from 'vue';
import { getComponentOptions, ComponentOptions, ComponentState } from '../../utils/componentOptions';

const props = defineProps<{
  modelValue?: boolean
  label?: string
  checked?: boolean
  state?: ComponentState
  mode?: 'secondary' | 'green'
  icons?: [string, string]
  big?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const options = computed<ComponentOptions>(() => {
  return getComponentOptions('switch', {
    state: props.state,
    modes: props.mode,
  })
})

const handleValueChange = (event: InputEvent) => {
  const target = event.target as HTMLInputElement

  if (!!target.value !== props.modelValue) {
    emit('update:modelValue', !!target.value)
  }
}
</script>

<template>
  <label :class="['switch', options.classes, {'switch--big': big}]">
    <input
      :value="modelValue"
      class="switch__input visually-hidden"
      type="checkbox"
      :checked="checked"
      :disabled="options.isDisabled"
      :readonly="options.isReadonly"
      @change="handleValueChange"
    />
    <span class="switch__wrapper">
      <span class="switch__dot">
        <template v-if="icons">
          <v-icon :name="icons[0]" class="switch__icon" />
          <v-icon :name="icons[1]" class="switch__icon" />
        </template>
      </span>
    </span>
    <span v-if="$slots.default" class="switch__text"><slot /></span>
  </label>
</template>

<style scoped lang="scss">
.switch {
  $self: &;

  display: inline-flex;
  line-height: 1;
  user-select: none;
  cursor: pointer;

  &__wrapper {
    width: 1.80em;
    height: 1em;
    line-height: 1;
    font-size: 1.2em;
    position: relative;
    display: inline-block;
    float: left;
    border-radius: 1em;
    border: 1px solid $color--secondary;
    background-color: transparent;
    transition: background-color 0.25s ease-in, color 0.25s ease-in;
    padding: 1px;
  }

  &__dot {
    width: 1em;
    height: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: inherit;
    text-align: center;
    color: #000;
    background-color: #fff;
    transition: transform $animate--time, background-color $animate--time;

    > #{$self}__icon {
      width: 0.8em;
      height: 0.8em;

      &:first-child {
        opacity: 0;
        transform: translateX(0.25em);
      }

      &:last-child {
        transform: translateX(-0.25em);
      }
    }
  }

  &__icon {
    transition: opacity $animate--time;
  }

  &--big {
    #{$self}__wrapper {
      font-size: 2em;
    }
  }

  &__input {
    &:checked {
      ~ #{$self}__wrapper {
        background-color: $color--primary;

        #{$self}__dot {
          transform: translateX(0.8em);

          > #{$self}__icon {
            &:first-child {
              opacity: 1;

            }

            &:last-child {
              opacity: 0;
            }
          }
        }
      }
    }

    @include hover-and-not-disabled(#{$self}--disabled) {
      ~ #{$self}__wrapper {
        border: 1px solid $color--primary-accent;
      }
    }

    @at-root #{$self}--disabled,
    &[disabled] {
      cursor: not-allowed;

      ~ #{$self}__wrapper {
        #{$self}__dot {
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
    margin-left: 0.65em;
  }

  &--green {
    #{$self}__input:checked ~ #{$self}__dot {
      background-color: $color--success;
    }
  }

  &--secondary {
    #{$self}__dot {
      background-color: #1a1a1a;
      color: #fff;
    }

    #{$self}__input:checked {
      ~ #{$self}__wrapper {
        background-color: #242424;
      }
    }
  }
}
</style>
