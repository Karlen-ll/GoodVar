<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  title?: string
  desc?: string
  url?: string
  breadcrumbs?: string[]
  protocol?: 'http' | 'https'
}>()

const webUrl = computed(() => {
  return props.protocol ? `${props.protocol}://${props.url}` : props.url
})

const tooltip = computed(() => {
  const unit = 'characters'

  return {
    url: `${
      (props.breadcrumbs?.reduce((a, b) => a + b.length, 0) ?? 0) +
      (webUrl.value?.length ?? 0) +
      (props.breadcrumbs?.length ?? 0)
    } ${unit}`,
    title: `${props.title?.length ?? 0} ${unit}`,
    desc: `${props.desc?.length ?? 0} ${unit}`,
  }
})
</script>

<template>
  <article class="web-card" aria-label="result of google">
    <!-- @slot Slot for `prepend` elements -->
    <slot name="prepend" />
    <cite v-if="url" class="web-card__breadcrumbs breadcrumbs tooltip" :data-tooltip="tooltip.url" tabindex="0">
      <a class="breadcrumbs__url">{{ webUrl }}</a>
      <template v-for="breadcrumb in breadcrumbs" :key="breadcrumb">
        <span class="breadcrumbs__separator">›</span>
        <a class="breadcrumbs__link">{{ breadcrumb }}</a>
      </template>
    </cite>
    <!-- @slot Slot for `title` & `description` elements -->
    <slot>
      <h3 class="web-card__title tooltip" :data-tooltip="tooltip.title" tabindex="0">
        <a tabindex="-1" aria-hidden="true">{{ title }}</a>
      </h3>
      <span class="web-card__desc tooltip" :data-tooltip="tooltip.desc" tabindex="0">
        {{ desc }}
      </span>
    </slot>
  </article>
</template>

<style scoped lang="scss">
.web-card {
  &__breadcrumbs {
    position: relative;
  }

  &__title {
    font-weight: normal;
    white-space: nowrap;
    padding: 4px 0 0 0;
    margin: 0 0 4px 0;
  }

  &__desc {
    line-height: 1.3;
    word-wrap: break-word;
    color: #3e3e3e;

    > em {
      color: #565656;
      font-weight: bold;
      font-style: normal;
    }
  }
}

.breadcrumbs {
  display: block;
  font-size: 14px;
  font-weight: 300;
  line-height: 1.3;
  font-style: normal;
  white-space: nowrap;
  padding: 0;

  &__separator {
    margin: 0 0.25em;
  }

  &__url,
  &__link {
    text-decoration: none;
  }
}

.tooltip {
  position: relative;

  &:before,
  &:after {
    top: auto;
    left: 0;
    right: auto;
    font-size: 0.85rem;
    font-weight: 400;
    line-height: 1;
    text-transform: none;
    user-select: none;
    pointer-events: none;
    transform: translateY(-0.5em);
    position: absolute;
    display: none;
    opacity: 0;
  }

  &:before {
    content: '';
    bottom: 100%;
    border: 5px solid transparent;
    border-bottom-width: 0;
    border-top-color: #fff;
    z-index: 1001;
  }

  &:after {
    content: attr(data-tooltip);
    bottom: calc(100% + 5px);
    font-family: monospace, monospace;
    text-align: center;
    min-width: 3em;
    max-width: 21em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 1.75ch 1.5ch 1.5ch;
    border-radius: 0.7ch 0.7ch 0.7ch 0;
    box-shadow: $shadow;
    background: #fff;
    color: #222;
    z-index: 1000;
  }

  &:hover,
  &:focus {
    &::before,
    &::after {
      display: block;
      animation: tooltip-anim 300ms ease-out forwards !important;
      opacity: 1;
    }
  }
}

@keyframes tooltip-anim {
  to {
    opacity: 1;
    transform: translate(0, 0);
  }
}
</style>
