<script setup lang="ts">
import { computed } from 'vue'
import { IconName, IconNames, RichIconType, SpriteName } from '@atom/icon/icon.type'

const props = withDefaults(
  defineProps<{
    name: IconNames
    size?: number | string
    width?: number | string
    height?: number | string
    ariaHidden?: boolean | string
    sprite?: string
    postfix?: string
  }>(),
  {
    width: 24,
    height: 24,
    ariaHidden: true,
    sprite: 'sprite',
    postfix: 'svg',
  }
)

const getIconHref = (name: SpriteName): string => `/icon/${props.sprite}.svg#${name}-${props.postfix}`

const normalizeName = (data: IconName): RichIconType => {
  if (typeof data === 'string') {
    return { name: data, href: getIconHref(data) }
  }

  return { ...data, href: getIconHref(data.name) }
}

const icons = computed<RichIconType[]>(() => {
  const result = Array.isArray(props.name) ? props.name.map(normalizeName) : [normalizeName(props.name)]

  return result.filter((icon) => !icon.isHide)
})
</script>

<template>
  <transition-group
    tag="svg"
    name="icon"
    xmlns="http://www.w3.org/2000/svg"
    class="icon"
    :width="size ?? width"
    :height="size ?? height"
    :aria-hidden="!ariaHidden || ariaHidden === 'false' ? undefined : true"
  >
    <use
      v-for="(item, index) in icons"
      :key="`${item.href}#${index}`"
      :href="item.href"
      :class="`icon__${item.class ?? item.name}`"
    />
  </transition-group>
</template>

<style scoped lang="scss">
.icon {
  &-enter-active,
  &-leave-active {
    transition: opacity $timeout-md ease;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
  }
}
</style>
