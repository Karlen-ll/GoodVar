<script setup lang="ts">
import { computed } from 'vue'
import VLoader from '../icon/VLoader.vue'
import VIcon from '../icon/VIcon.vue'
import { RouterLink } from 'vue-router'
import { getComponentOptions, ComponentState } from '../../../utils/componentOptions'
import { ButtonMode, ButtonIcons, ButtonOptions } from './button.type'

const props = withDefaults(
  defineProps<{
    tag?: 'button' | 'div' | 'a' | 'routerLink'
    type?: 'button' | 'submit' | 'reset'
    mode?: ButtonMode | ButtonMode[]
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

  min-height: $input-height;
  position: relative;
  font-size: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  text-decoration: none;
  background-color: transparent;
  border: 1px solid transparent;
  transition-property: color, background-color, border-color;
  transition-duration: $timeout-md;
  border-radius: 24px;
  cursor: pointer;
  user-select: none;
  padding: 0;

  &:active {
    transform: translateY(1px);
  }

  &__loader {
    top: 50%;
    left: 50%;
    color: $color--font-85;
    position: absolute;
    margin: -#{$margin-md} 0 0 -#{$margin-md};
  }

  &__icon {
    width: 1em;
    height: 1em;
    transition-property: transform;
    transition-duration: $timeout-sm;

    &:not(&--prepend) {
      @at-root #{$self}:not(#{$self}--icon):not(#{$self}--circle) & {
        margin-left: $margin-sm;
      }
    }

    &--prepend {
      @at-root #{$self}:not(#{$self}--icon):not(#{$self}--circle) & {
        margin-right: $margin-sm;
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
    padding: 0 $margin-lg;
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

  &--circle {
    width: 1.5em;
    height: 1.5em;
    min-width: 0;
    min-height: 0;
    padding: 0.25em;

    #{$self}__icon {
      width: 100%;
      height: 100%;
    }
  }

  &--icon {
    min-width: $input-field-height;
    min-height: $input-field-height;

    .icon {
      font-size: 14px;
    }
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
