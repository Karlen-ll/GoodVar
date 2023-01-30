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
</script>

<template>
  <div class="web-card" aria-label="result of google">
    <!-- @slot Slot for `prepend` elements -->
    <slot name="prepend" />
    <cite v-if="url" class="web-card__breadcrumbs breadcrumbs" tabindex="0">
      <a class="breadcrumbs__url">{{ webUrl }}</a>
      <template v-for="breadcrumb in breadcrumbs" :key="breadcrumb">
        <span class="breadcrumbs__separator">›</span>
        <a class="breadcrumbs__link">{{ breadcrumb }}</a>
      </template>
    </cite>
    <!-- @slot Slot for `title` & `description` elements -->
    <slot>
      <h3 class="web-card__title" tabindex="0" tooltip="49 characters">
        <a tabindex="-1">{{ title }}</a>
      </h3>
      <span class="web-card__desc" tabindex="0" tooltip="155 characters">
        {{ desc }}
      </span>
    </slot>
  </div>
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
</style>
