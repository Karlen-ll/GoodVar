<script setup lang="ts">
import { ref, computed, useAttrs, useSlots } from 'vue'
import { ComponentOptions, ComponentState, getComponentOptions } from '../../../utils/componentOptions'
import VButton from '../button/VButton.vue'

const DEFAULT_LINE_HEIGHT = 24
const DEFAULT_ROWS = 3

const props = withDefaults(
  defineProps<{
    modelValue: string | number | undefined
    id?: string
    rows?: string | number | 'auto'
    minRows?: string | number
    tag?: 'input' | 'textarea'
    type?: string
    limit?: number
    placeholder?: string
    inputClass?: string
    state?: ComponentState
    nativePlaceholder?: boolean
    hideSeparator?: boolean
    clearable?: boolean
    blocked?: boolean
  }>(),
  {
    tag: 'input',
    minRows: 1,
    clearable: true,
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number, isClear?: boolean): void
  (e: 'clickOnShell', event: Event): void
}>()

const fieldReference = ref<HTMLInputElement | null>(null)
const fieldFocus = ref(false)
const attrs = useAttrs()
const slots = useSlots()

const isInputField = computed<boolean>(() => props.tag === 'input')
const hasSeparator = computed<boolean>(() => props.clearable && !!slots.append && !props.hideSeparator)
const isClearable = computed<boolean>(() => props.clearable && !options.value.isDisabled && !options.value.isReadonly)
const wrapperClass = computed<string>(() => (attrs.class as string | undefined) ?? '')
const options = computed<ComponentOptions>(() =>
  getComponentOptions('input', { state: props.state, modes: isInputField.value && 'textarea' })
)

const isRaisedPlaceholder = computed(() => {
  return (
    props.placeholder &&
    !props.nativePlaceholder &&
    (!!props.modelValue ||
      (fieldFocus.value && !options.value.isDisabled && !options.value.isReadonly && !props.blocked))
  )
})

const fontHeight = computed<number>(() => {
  if (!fieldReference.value || props.tag === 'input') {
    return DEFAULT_LINE_HEIGHT
  }

  const lineHeight = window.getComputedStyle(fieldReference.value, null).getPropertyValue('line-height')

  return (lineHeight.match(/\d+/)?.[0] as number | undefined) ?? DEFAULT_LINE_HEIGHT
})

const rowsValue = computed<number | string>(() => {
  if (props.rows !== 'auto' || props.tag === 'input') {
    return props.rows ?? DEFAULT_ROWS
  }

  if (!props.modelValue) {
    return props.minRows > 0 ? props.minRows : 1
  }

  const scrollHeight = fieldReference.value?.scrollHeight ?? 0
  const offsetHeight = fieldReference.value?.offsetHeight ?? 0

  return offsetHeight / fontHeight.value + (scrollHeight - offsetHeight) / fontHeight.value
})

const fieldAttrs = computed(() => {
  const result: Record<string, any> = { ...attrs }
  delete result.class

  if (!isInputField.value) {
    result.rows = rowsValue.value
  }

  return result
})

const handleValueChange = (event: InputEvent) => {
  const target = event.target as HTMLInputElement

  if (target && target.value !== props.modelValue) {
    emit('update:modelValue', target.value)
  }
}

const handleInputClear = () => emit('update:modelValue', '', true)
const handleClickOnShell = (event: Event) => emit('clickOnShell', event)
</script>

<template>
  <div
    :class="['input', { 'input--with-placeholder': !nativePlaceholder && placeholder }, wrapperClass, options.classes]"
    role="none"
    @click="handleClickOnShell"
  >
    <div v-if="$slots.prepend" class="input__prepend" role="none">
      <!-- @slot Slot for `prepend` elements -->
      <slot name="prepend" />
    </div>
    <label
      v-if="!nativePlaceholder && placeholder"
      :for="id"
      :class="['input__placeholder', { 'input__placeholder--raised': isRaisedPlaceholder }]"
    >
      <slot name="placeholder">
        {{ placeholder }}
      </slot>
    </label>
    <component
      :is="tag"
      :id="id"
      ref="fieldReference"
      v-bind="fieldAttrs"
      :disabled="options.isDisabled"
      :readonly="options.isReadonly || blocked"
      :value="modelValue"
      :type="type"
      :class="['input__field', { 'input__field--hide-placeholder': !nativePlaceholder }, inputClass]"
      :placeholder="placeholder"
      @input="handleValueChange"
      @focus="fieldFocus = true"
      @focusout="fieldFocus = false"
    />
    <div
      v-if="$slots.badge || limit"
      :class="['input__limit', { 'input__limit--exceeded': modelValue?.length > limit }]"
    >
      <slot name="badge">
        <span class="input__length">{{ modelValue?.length ?? 0 }}</span> / {{ limit }}
      </slot>
    </div>
    <div
      v-if="$slots.append || isClearable"
      :class="['input__append', { 'input__append--empty': !$slots.append && !modelValue }]"
      role="none"
    >
      <template v-if="isClearable">
        <transition name="fade">
          <v-button v-show="modelValue" mode="icon" icon="close" aria-label="Close" @click.stop="handleInputClear" />
        </transition>
      </template>
      <!-- @slot Slot for `append` elements -->
      <div
        v-if="$slots.append"
        :class="['input__append-wrapper', { 'input__append-wrapper--has-separator': hasSeparator }]"
      >
        <slot name="append" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use 'sass:math';

$_offset: $offset * 4;

.input {
  $self: &;

  width: 100%;
  position: relative;
  display: inline-flex;
  color: $color--font;
  line-height: $input-line-height;
  transition-property: color, border-color, background-color;
  transition-duration: $timeout-sm;
  border: 1px solid $color--border;
  border-radius: $border-radius-sm;
  box-sizing: border-box;
  padding: $input-padding-y #{$input-padding-x * 0.5} $input-padding-y $input-padding-x;
  letter-spacing: 0;

  &--with-placeholder {
    margin: #{$offset-lg} 0 #{$offset-sm};
  }

  &__placeholder {
    top: #{$input-padding-y};
    left: #{$input-padding-x};
    height: $input-field-height;
    position: absolute;
    white-space: nowrap;
    transition-property: color, border-color, background-color, transform;
    transition-duration: $timeout-sm;
    transition-timing-function: linear;
    pointer-events: none;
    user-select: none;
    z-index: 1;

    &--raised {
      $_offset: #{$input-padding-y + $_offset};
      transform: translateY(calc((-100% - #{$input-padding-y})));
    }
  }

  &__field {
    min-height: #{$input-line-height + em};
    width: 100%;
    border: none;
    color: inherit;
    font-size: inherit;
    font-family: inherit;
    letter-spacing: inherit;
    line-height: inherit;
    background-color: transparent;
    resize: vertical;
    padding: 0;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: $color--font-35;
    }

    &::-webkit-search-cancel-button {
      -webkit-appearance: none;
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      -webkit-box-shadow: 0 0 0 10px $color--shadow inset;
    }

    &[type='number']::-webkit-outer-spin-button,
    &[type='number']::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &[type='number'] {
      -moz-appearance: textfield;
    }

    &--hide-placeholder {
      &::placeholder {
        color: transparent !important; // stylelint-disable-line declaration-no-important
      }
    }

    &::-ms-clear,
    &::-ms-reveal {
      display: none;
    }
  }

  &__limit {
    font-size: 0.74em;
    bottom: 100%;
    right: 0;
    color: $color--font-65;
    position: absolute;

    &--exceeded {
      #{$self}__length {
        font-size: 1.2em;
        color: $color--danger;
      }
    }
  }

  &__append-wrapper {
    &--has-separator {
      border-left: 1px solid $color--border;
      padding-left: 10px;
      margin-left: 10px;
    }
  }

  &__prepend {
    margin-right: $offset-xs;
  }

  &__append {
    &:not(&--empty) {
      margin-left: $offset-xs;
    }
  }

  &__prepend,
  &__append,
  &__append-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  &:not(&--readonly):not(&--disabled):not(&--error) {
    &:focus-within {
      border-color: $color--brand;
    }
  }

  &--readonly,
  &--disabled {
    color: $color--font-35;
    cursor: default;
  }

  &--error {
    border: 1px solid $color--danger;

    #{$self}__placeholder {
      color: $color--danger;
    }
  }
}
</style>
