<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import SwitcherGroup from '@atom/switcher/SwitcherGroup.vue'
import GeneratorForm from '@serp/GeneratorForm.vue'
import SearchEngine from '@serp/SearchEngine.vue'
import VButton from '@atom/button/VButton.vue'
import CodeFrame from '@atom/codeFrame/CodeFrame.vue'
import VModal from '@atom/VModal.vue'
import { SerpData } from '@serp/searchEngine.type'
import { SwitchGroupItem } from '@atom/switcher/switcher.type'
import TemplateRenderer from '@atom/TemplateRenderer'
import { META_CODE_TEMPLATE } from '@atom/codeFrame/template'

const isModalShown = ref<boolean>(false)
const modalTab = ref<string>('meta')
const data = reactive<SerpData>({
  title: 'Bernard Mannes Baruch - financier, stock speculator',
  desc:
    'Best quote: “A speculator is a man who observes the future, and acts before it occurs„' +
    '& “Millions saw the apple fall but Newton was the one who asked why„',
  url: 'sample.com',
  breadcrumbs: ['Bernard Baruch'],
  company: 'google',
  mode: 'mobile',
})

const COMPANIES = [
  { label: 'Google', checkedValue: 'google' },
  { label: 'Microsoft Bing', checkedValue: 'microsoft' },
  { label: 'Yandex', checkedValue: 'yandex' },
]

const TABS: SwitchGroupItem[] = [
  { label: 'META', checkedValue: 'meta' },
  { label: 'JSON-LD', checkedValue: 'json', state: 'disabled' },
  { label: 'RDFa', checkedValue: 'rdfa', state: 'disabled' },
]

const variables = computed(() => {
  return { title: data.title, description: data.desc }
})
</script>

<template>
  <div class="container">
    <generator-form v-model="data" :companies="COMPANIES" />
    <div class="search-engine-wrapper"><search-engine :data="data" /></div>
    <v-button mode="secondary" @click="isModalShown = true"> Get code </v-button>
  </div>

  <v-modal v-model="isModalShown">
    <template #header><h1 class="mb-0"> Resulting code </h1></template>
    <p class="mt-0">
      <code>&lt;meta&gt;</code>
      tags go inside the
      <code>&lt;head&gt;</code>
      element.
    </p>

    <div class="code-box">
      <switcher-group v-model="modalTab" class="code-box__switcher" :items="TABS" type="tab" />
      <code-frame class="code-box__frame">
        <template-renderer :template="META_CODE_TEMPLATE" :variables="variables" />
      </code-frame>
    </div>
    <template #footer>
      <div class="button-group">
        <v-button @click="isModalShown = false"> Ok </v-button>
      </div>
    </template>
  </v-modal>
</template>

<style scoped lang="scss">
@use 'sass:math';

.search-engine-wrapper {
  background-color: $color--accent-bg;
  padding: $offset-xxl-rem $offset-xl-rem;
  margin: $offset-xl-rem -#{$offset-lg-rem};
}

.code-box {
  border: 1px solid $color--border;
  border-radius: 0.28rem;
  position: relative;

  &__switcher {
    padding: 0 18px;
    border-bottom: 1px solid $color--border;
    border-radius: 0;
  }

  &__frame {
    background-color: $color--accent-bg;
  }
}
</style>
