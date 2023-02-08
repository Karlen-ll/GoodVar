<script setup lang="ts">
import { computed, ref } from 'vue'
import { SerpMenuItem, SerpMenu } from '@serp/searchEngine.type'
import SwitcherGroup from '@atom/switcher/SwitcherGroup.vue'

const props = withDefaults(
  defineProps<{
    title?: string
    items?: SerpMenu
  }>(),
  {
    title: 'SERPs menu',
  }
)

const activeIndex = ref<number>(0)

const normalizedMenu = computed<SerpMenuItem[]>(() => {
  return props.items?.map((item) => (typeof item === 'string' ? { label: item } : item)) ?? []
})
</script>

<template>
  <div class="menu" role="presentation">
    <switcher-group
      v-model="activeIndex"
      :items="normalizedMenu"
      :label="title"
      type="tab"
      hide-label
    />
  </div>
</template>

<style scoped lang="scss">
.menu {
  $self: &;

  border-bottom: 1px solid #ecf0f3;
  user-select: none;

  &__list {
    padding: 0;
    margin: 0;

    &--hidden {
      display: none;
    }
  }

  &__item {
    display: inline-block;
    opacity: 0.8;
    padding: 5px 0;
    border-bottom: 3px solid transparent;
    transition: border-color $timeout-md;

    &:hover {
      opacity: 1;
    }

    &--active {
      border-bottom-color: currentColor;
    }
  }

  &__link {
    text-decoration: none;
    cursor: pointer;
    opacity: 0.75;

    @at-root #{$self}__item--active & {
      opacity: 0.9;
    }
  }
}
</style>
