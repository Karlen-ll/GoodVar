<script setup lang="ts">
import { computed, ref } from 'vue'
import { SerpMenu, SerpMenus } from '../searchEngine.type'

const props = withDefaults(
  defineProps<{
    title?: string
    items?: SerpMenus
  }>(),
  {
    title: 'SERPs menu',
  }
)

const activeIndex = ref<number>(0)

const normalizedMenu = computed<SerpMenu[]>(() => {
  return props.items?.map((item) => (typeof item === 'string' ? { label: item } : item)) ?? []
})

const handleClick = (index: number) => {
  activeIndex.value = index
}
</script>

<template>
  <div class="menu" role="presentation">
    <h4 class="menu__header visually-hidden">{{ title }}</h4>
    <!-- @slot Slot for `prepend` elements -->
    <slot name="prepend" />
    <ul class="menu__list">
      <li
        v-for="(item, index) in normalizedMenu"
        :key="item.label + index"
        :class="[
          'menu__item',
          {
            'menu__item--active': index === activeIndex,
            'menu__item--hidden': item.hideOnMobile,
          },
        ]"
      >
        <a class="menu__link" @click="handleClick(index)">{{ item.label }}</a>
      </li>
    </ul>
    <!-- @slot Slot for `prepend` elements -->
    <slot name="append" />
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
