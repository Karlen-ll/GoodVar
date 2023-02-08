<script setup lang="ts">
import { computed } from 'vue'
import VSwitcher from '@atom/switcher/VSwitcher.vue'
import { SerpMenuItem } from '@serp/searchEngine.type'
import { SwitchType, SwitchValue, SwitchGroupItem } from '@atom/switcher/switcher.type'

type NormalSwitchGroupItem = Omit<SerpMenuItem, 'checkedValue'> & { checkedValue: SwitchValue }

const props = withDefaults(
  defineProps<{
    modelValue: SwitchValue
    items: SwitchGroupItem[]
    label?: string
    type?: SwitchType
    mode?: 'big'
    border?: boolean
    multiple?: boolean
    hideLabel?: boolean
    presentation?: boolean
  }>(),
  {
    type: 'radio',
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: SwitchValue): void
}>()

const normalizedItems = computed<NormalSwitchGroupItem[]>(() => {
  return props.items?.map((item, index) => {
    if (!item.checkedValue) {
      item.checkedValue = index
    }

    return item as NormalSwitchGroupItem
  })
})

const handleUpdate = (value: SwitchValue) => {
  emit('update:modelValue', value)
}
</script>

<template>
  <fieldset :class="['switcher-group', { 'switcher-group--with-border': border }]">
    <legend v-if="label" :class="['switcher-group__label', { 'visually-hidden': hideLabel }]">
      {{ label }}
    </legend>
    <v-switcher
      v-for="item in normalizedItems"
      :key="item.checkedValue"
      v-bind="item"
      class="switcher-group__item"
      :model-value="modelValue"
      :type="type"
      :mode="mode"
      :multiple="multiple"
      :presentation="presentation"
      @update:modelValue="handleUpdate"
    />
  </fieldset>
</template>

<style scoped lang="scss">
.switcher-group {
  $self: &;

  position: relative;
  border-radius: $border-radius-sm;

  &:not(&--with-border) {
    border: none;
    padding: 0;
    margin: 0;
  }

  &--with-border {
    border: 1px solid $color--border;
    padding: 0.25em 1em 0.6em 0.75em;
    margin-top: -0.75em;
  }

  &__item + &__item {
    margin-left: $offset-lg;

    &.switcher--tab {
      margin-left: $offset-sm;
    }
  }
}
</style>
