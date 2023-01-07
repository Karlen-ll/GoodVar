<script setup lang="ts">
import { computed } from 'vue'
import { IconName, IconType } from './VIcon.type'

const FILE_NAME = '/icon/sprite.svg'
const POSTFIX = 'svg'

const props = withDefaults(
  defineProps<{
    name: IconName
    size?: number | string
    width?: number | string
    height?: number | string
    ariaHidden?: boolean | string
  }>(),
  {
    width: 24,
    height: 24,
    ariaHidden: true,
  }
)

const normalizeName = (name: IconName): IconType => {
  return { name, href: `${FILE_NAME}#${name}-${POSTFIX}` }
}

const icons = computed<IconType[]>(() => {
  return Array.isArray(props.name) ? props.name.map(normalizeName) : [normalizeName(props.name)]
})
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="icon"
    :width="size ?? width"
    :height="size ?? height"
    :aria-hidden="!ariaHidden || ariaHidden === 'false' ? undefined : true"
  >
    <use v-for="(item, index) in icons" :key="item.href + index" :href="item.href" :class="`icon__${item.name}`" />
  </svg>
</template>
