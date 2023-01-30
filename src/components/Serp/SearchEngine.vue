<script setup lang="ts">
import SearchResult from './common/SearchResult.vue'
import SearchMenu from './common/SearchMenu.vue'
import SearchBar from './common/SearchBar.vue'
import { SerpData } from './searchEngine.type'
import { SERP_MAP } from './searchEngine.const'

defineProps<{
  data: SerpData
  company: 'google' | 'microsoft' | 'yandex'
  mobile?: boolean
}>()
</script>

<template>
  <section :class="['serp', `serp--${company}`, { 'serp--mobile': mobile }]">
    <header class="serp__header">
      <search-bar class="serp__search-bar" :logo="SERP_MAP[company].logo" />
      <search-menu class="serp__menu" :items="SERP_MAP[company].menu" />
    </header>
    <div class="serp__list" role="none">
      <p class="serp__description" role="presentation">Sample of {{ SERP_MAP[company].name }} search engine result</p>

      <search-result
        v-bind="data"
        class="serp__item"
        :aria-label="`Result of ${SERP_MAP[company].name} search engine`"
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
    display: flex;
    flex-direction: column;
    min-width: 745px;
    max-width: 820px;

    #{$self}--mobile & {
      max-width: 327px;
    }
  }

  &__description {
    color: #b5b5c3;
    line-height: 30px;
    font-size: 0.85rem;
  }
}
</style>
