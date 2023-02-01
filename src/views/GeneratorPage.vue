<script setup lang="ts">
import { ref, reactive } from 'vue'
import GeneratorForm from '../components/serp/GeneratorForm.vue'
import SearchEngine from '../components/serp/SearchEngine.vue'
import VButton from '../components/common/button/VButton.vue'
import CodeFrame from '../components/common/CodeFrame.vue'
import VModal from '../components/common/VModal.vue'
import { SearchEngineValue } from '../components/serp/searchEngine.type'

const isModalShown = ref<boolean>(false)
const data = reactive<SearchEngineValue>({
  site: {
    title: 'Bernard Mannes Baruch - financier, stock speculator',
    desc:
      'Best quote: “A speculator is a man who observes the future, and acts before it occurs„' +
      '& “Millions saw the apple fall but Newton was the one who asked why„',
    url: 'sample.com',
    breadcrumbs: ['Bernard Baruch'],
  },
  isMobile: false,
  company: 'google'
})

const companies = [
  { label: 'Google', checkedValue: 'google' },
  { label: 'Microsoft Bing', checkedValue: 'microsoft' },
  { label: 'Yandex', checkedValue: 'yandex' },
]

const handleCopy = () => false
</script>

<template>
  <div class="container">
    <generator-form v-model="data" :companies="companies" />

    <div class="search-engine-wrapper">
      <search-engine :data="data" />
    </div>

    <v-button @click="isModalShown = true"> Get code </v-button>
  </div>

  <v-modal v-model="isModalShown">
    <template #header>
      <h1>Resulting code</h1>
      <p class="code-text_wrapper"><code>&lt;meta&gt;</code> tags go inside the <code>&lt;head&gt;</code> element.</p>
    </template>

    <code-frame />

    <template #footer>
      <div class="button-group">
        <v-button @click="isModalShown = false"> Ok </v-button>
        <v-button mode="secondary" @click="handleCopy"> Copy to clipboard </v-button>
      </div>
    </template>
  </v-modal>
</template>

<style scoped lang="scss">
@use 'sass:math';

.search-engine-wrapper {
  margin: 3em 0 2em;
}
</style>
