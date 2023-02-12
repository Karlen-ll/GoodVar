<script setup lang="ts">
import { computed } from 'vue'
import SerpResult from '@serp/common/SerpResult.vue'
import SerpHeader from '@serp/common/SerpHeader.vue'
import { SerpData, SerpOptions } from '@serp/searchEngine.type'
import { SERP_MAP } from '@serp/searchEngine.const'

type SearchEngineOptions = Omit<SerpOptions, 'width'> & { listStyle?: string }

const props = defineProps<{
  data: SerpData
}>()

const options = computed<SearchEngineOptions>(() => {
  const result: SearchEngineOptions = {
    ...SERP_MAP[props.data.company]
  }

  if (props.data.mode !== 'mobile') {
    result.listStyle = `max-width: ${SERP_MAP[props.data.company].width}px`
  }

  return result
})
</script>

<template>
  <section :class="['serp', `serp--${data.company}`, { [`serp--${data.mode}`]: data.mode }]">
    <serp-header class="serp__header" :company="data.company" :mode="data.mode" />

    <div class="serp__list" :style="options.listStyle" role="none">
      <p class="serp__description" role="presentation"> Sample of {{ options.name }} search engine result </p>

      <serp-result v-bind="data" class="serp__item" :aria-label="`Result of ${options.name} search engine`" />
    </div>
  </section>
</template>

<style scoped lang="scss">
@use 'sass:math';

.serp {
  $self: &;

  &--mobile {
    @media screen and #{$media-phone} {
      max-width: $breakpoint-xs;
    }

    #{$self}__list {
      margin-left: 0;
    }
  }

  &__list {
    position: relative;
    margin-left: $serp-offset;
  }

  &__description {
    color: $color--font-35;
    line-height: 30px;
    font-size: 0.85rem;
  }
}
</style>
