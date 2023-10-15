<script setup lang="ts">
import { computed } from 'vue'
import VLoader from '@atom/icon/VLoader.vue'
import VIcon from '@atom/icon/VIcon.vue'
import { RouterLink } from 'vue-router'
import { getComponentDetail, ComponentDetailResult } from '@/utils/componentOptions'
import { ButtonState, ButtonMode, ButtonType, ButtonTag, ButtonIcon } from '@atom/button/button.type'

const props = withDefaults(
  defineProps<{
    tag?: ButtonTag
    type?: ButtonType
    mode?: ButtonMode
    state?: ButtonState
    icon?: string | ButtonIcon
    circle?: boolean
  }>(),
  {
    tag: 'button',
    type: 'button',
    mode: 'primary',
  }
)

const detail = computed(() => {
  return getComponentDetail('button', { state: props.state, mode: props.mode })
})

const iconDetail = computed<(Omit<ButtonIcon, 'modes'> & Partial<ComponentDetailResult>) | undefined>(() => {
  if (!props.icon) {
    return
  }

  if (typeof props.icon === 'string') {
    return { name: props.icon }
  }

  let result: Omit<ButtonIcon, 'modes'> = { name: props.icon.name }

  if (props.icon.size) {
    result.size = props.icon.size
  }

  if (props.icon.mode) {
    result = {
      ...result,
      ...getComponentDetail('button__icon', {
        mode: props.icon.mode,
      }),
    }
  }

  return result
})
</script>

<template>
  <component
    :is="tag === 'routerLink' ? RouterLink : tag"
    :type="type"
    :class="['button', { 'button--circle': circle }, detail.classes]"
    :disabled="detail.disabled || detail.loading"
  >
    <v-loader v-if="detail.loading" class="button__loader" />
    <slot />
    <v-icon
      v-if="iconDetail"
      :name="iconDetail.name"
      :size="iconDetail.size"
      :class="['button__icon', iconDetail.classes]"
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
  color: $color--font-65;
  background-color: transparent;
  border: 1px solid transparent;
  transition-property: color, background-color, border-color;
  transition-duration: $timeout-md;
  border-radius: $border-radius-lg;
  cursor: pointer;
  user-select: none;
  padding: 0;

  @include hover-and-not-disabled(#{$self}--disabled) {
    color: $color--font;
  }

  &:active {
    transform: translateY(1px);
  }

  &__loader {
    top: 50%;
    left: 50%;
    color: $color--font-85;
    position: absolute;
    margin: -#{$offset-md} 0 0 -#{$offset-md};
  }

  &__icon {
    width: 1em;
    height: 1em;
    transition-property: transform;
    transition-duration: $timeout-sm;

    &:not(&--prepend) {
      @at-root #{$self}:not(#{$self}--icon):not(#{$self}--circle) & {
        margin-left: $offset-sm;
      }
    }

    &--prepend {
      @at-root #{$self}:not(#{$self}--icon):not(#{$self}--circle) & {
        margin-right: $offset-sm;
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
    padding: 0 $offset-lg;
  }

  &--primary {
    border: 1px solid $color--brand;
    color: $color--white;
    background-color: $color--brand;

    @include hover-and-not-disabled(#{$self}--disabled) {
      border: 1px solid $color--brand-accent;
      color: $color--white;
      background-color: $color--brand-accent;
    }
  }

  &--secondary {
    border: 1px solid $color--border;
    color: $color--font-85;

    @include hover-and-not-disabled(#{$self}--disabled) {
      color: $color--brand-accent;
      border: 1px solid $color--brand-accent;
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

  &--default {
    color: inherit;
  }

  &--icon,
  &--link {
    color: $color--brand;

    @include hover-and-not-disabled(#{$self}--disabled) {
      color: $color--brand-accent;
    }
  }
}
</style>
