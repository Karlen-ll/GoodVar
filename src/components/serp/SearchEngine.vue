<script setup lang="ts">
import { computed } from 'vue'
import SerpResult from '@serp/common/SerpResult.vue'
import SerpHeader from '@serp/common/SerpHeader.vue'
import { SerpData, SerpOptions } from '@serp/searchEngine.type'
import { SERP_MAP } from '@serp/searchEngine.const'

const props = defineProps<{
  data: SerpData
}>()

const options = computed<SerpOptions>(() => {
  return SERP_MAP[props.data.company]
})
</script>

<template>
  <section :class="['serp', `serp--${data.company}`, { [`serp--${data.mode}`]: data.mode }]">
    <serp-header class="serp__header" :company="data.company" />

    <div class="serp__list" :style="`max-width: ${options.width}px`" role="none">
      <p class="serp__description" role="presentation"> Sample of {{ options.name }} search engine result </p>

      <serp-result v-bind="data" class="serp__item" :aria-label="`Result of ${options.name} search engine`" />
    </div>
  </section>
</template>

<style scoped lang="scss">
@use 'sass:math';

.serp {
  $self: &;

  &__header {
    #{$self}--mobile & {
      //max-width: 327px;
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
