<script setup lang="ts">
import { computed } from 'vue'
import VLoader from './VLoader.vue'
import VIcon from './VIcon/VIcon.vue'
import { RouterLink } from 'vue-router'
import { getComponentOptions, ComponentState, ComponentOptions } from '../../utils/componentOptions'

type ButtonIconMode = 'prepend' | 'moves'
type ButtonIcons = {
  name: string
  size?: string | number
  modes?: ButtonIconMode | ButtonIconMode[]
}

type ButtonOptions = ComponentOptions & { icon?: Omit<ButtonIcons, 'modes'> & { classes?: string[] } }

const props = withDefaults(
  defineProps<{
    tag?: 'button' | 'div' | 'a' | 'routerLink'
    type?: 'button' | 'submit' | 'reset'
    mode?: 'default' | 'primary' | 'secondary' | 'icon'
    state?: ComponentState
    icon?: string | ButtonIcons
  }>(),
  {
    tag: 'button',
    type: 'button',
    mode: 'primary',
  }
)

const options = computed<ButtonOptions>(() => {
  const result: ButtonOptions = getComponentOptions('button', {
    state: props.state,
    modes: props.mode,
  })

  if (props.icon) {
    const isString = typeof props.icon === 'string'
    result.icon = isString ? { name: props.icon } : (result.icon = props.icon)

    if (!isString && props.icon.modes) {
      result.icon.classes = (typeof props.icon.modes !== 'string' ? props.icon.modes : [props.icon.modes]).map(
        (mode) => `button__icon--${mode}`
      )
    }
  }

  return result
})
</script>

<template>
  <component
    :is="tag === 'routerLink' ? RouterLink : tag"
    :type="type"
    :class="['button', options.classes]"
    :disabled="options.isDisabled || options.isLoading"
  >
    <v-loader v-if="options.isLoading" class="button__loader" />
    <slot />
    <v-icon
      v-if="options.icon"
      :name="options.icon.name"
      :size="options.icon.size"
      :class="['button__icon', options.icon.classes]"
    />
  </component>
</template>

<style scoped lang="scss">
.button {
  $self: &;

  min-height: 38px;
  position: relative;
  font-size: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  text-decoration: none;
  background-color: transparent;
  border: 1px solid transparent;
  transition-property: background-color, color, border;
  transition-duration: $animate--time;
  border-radius: 24px;
  cursor: pointer;
  user-select: none;

  &:active {
    transform: translateY(1px);
  }

  &__loader {
    top: 50%;
    left: 50%;
    color: $color--font-85;
    position: absolute;
    margin: -16px 0 0 -16px;
  }

  &__icon {
    width: 1em;
    height: 1em;
    transition-property: color, transform;
    transition-duration: $animate--time;

    &:not(&--prepend) {
      @at-root #{$self}:not(#{$self}--icon) & {
        margin-left: 0.75em;
      }
    }

    &--prepend {
      @at-root #{$self}:not(#{$self}--icon) & {
        margin-right: 0.75em;
        order: -1;
      }
    }

    &--moves:not(&--prepend) {
      @at-root #{$self}:not(#{$self}--icon):-moz-focusring & {
        transform: translate(2px);
      }

      @at-root #{$self}:not(#{$self}--icon):hover &,
      #{$self}:active &,
      #{$self}:focus-visible & {
        transform: translate(2px);
      }
    }
  }

  &--loading {
    color: transparent !important; // stylelint-disable-line declaration-no-important
  }

  &:disabled,
  &--disabled {
    color: $color--font-35;
    cursor: default;
  }

  &:not(&--icon, &--link, &--circle) {
    padding: 0 20px;
  }

  &--primary {
    border: 1px solid $color--primary;
    color: $color--white;
    background-color: $color--primary;

    @include hover-and-not-disabled(#{$self}--disabled) {
      border: 1px solid $color--primary-accent;
      background-color: $color--primary-accent;
    }
  }

  &--secondary {
    border: 1px solid $color--secondary;
    color: $color--font-85;

    @include hover-and-not-disabled(#{$self}--disabled) {
      color: $color--primary-accent;
      border: 1px solid $color--primary-accent;
    }
  }

  &--icon {
    min-width: 36px;
    min-height: 36px;
    font-size: 14px;
  }

  &--link {
    border: none;
    background-color: transparent;
  }

  &--icon,
  &--link {
    color: $color--primary;

    @include hover-and-not-disabled(#{$self}--disabled) {
      color: $color--primary-accent;
    }
  }
}
</style>
