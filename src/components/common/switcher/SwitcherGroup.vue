<script setup lang="ts">
import { SwitchType, SwitchValue, SwitchGroupItem } from './switcher.type'
import VSwitcher from './VSwitcher.vue'

const props = withDefaults(
  defineProps<{
    modelValue: SwitchValue
    items: SwitchGroupItem[]
    label?: string
    type?: SwitchType
    mode?: 'big'
    multiple?: boolean
  }>(),
  {
    type: 'radio',
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: SwitchValue): void
}>()

const handleUpdate = (value: SwitchValue) => {
  emit('update:modelValue', value)
}
</script>

<template>
  <fieldset class="switcher-group">
    <legend class="switcher-group__label">{{ label }}</legend>

    <v-switcher
      v-for="item in items"
      :key="item.checkedValue"
      v-bind="item"
      class="switcher-group__item"
      :model-value="modelValue"
      :type="type"
      :mode="mode"
      :multiple="multiple"
      @update:modelValue="handleUpdate"
    />
  </fieldset>
</template>

<style scoped lang="scss">
.switcher-group {
  $self: &;

  position: relative;
  border-radius: 6px;
  padding: 0.25em 1em 0.6em 0.75em;
  margin-top: -0.75em;

  &__item + &__item {
    margin-left: 1.5em;
  }
}
</style>
