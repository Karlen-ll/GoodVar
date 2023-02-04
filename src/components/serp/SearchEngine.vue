<script setup lang="ts">
import SerpResult from './common/SerpResult.vue'
import SerpHeader from './common/SerpHeader.vue'
import { SerpData } from './searchEngine.type'
import { SERP_MAP } from './searchEngine.const'
import { computed } from 'vue'

defineProps<{
  data: SerpData
}>()
</script>

<template>
  <section :class="['serp', `serp--${data.company}`, { [`serp--${data.mode}`]: data.mode }]">
    <serp-header class="serp__header" :options="SERP_MAP[data.company]" />

    <div class="serp__list" role="none">
      <p class="serp__description" role="presentation">Sample of {{ SERP_MAP[data.company].name }} search engine result</p>

      <serp-result
        v-bind="data"
        class="serp__item"
        :aria-label="`Result of ${SERP_MAP[data.company].name} search engine`"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
@use 'sass:math';

.serp {
  $self: &;

  overflow: auto;

  &__header {
    min-width: 745px;
    max-width: 820px;

    #{$self}--mobile & {
      max-width: 327px;
    }
  }

  &__description {
    color: $color--font-35;
    line-height: 30px;
    font-size: 0.85rem;
  }
}
</style>
