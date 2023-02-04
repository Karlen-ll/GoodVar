<script setup lang="ts">
import VInput from '../common/input/VInput.vue'
import VSwitcher from '../common/switcher/VSwitcher.vue'
import InputGroup from '../common/input/InputGroup.vue'
import SwitcherGroup from '../common/switcher/SwitcherGroup.vue'
import { SwitchGroupItem } from '../common/switcher/switcher.type'
import { SerpData } from './searchEngine.type'

defineProps<{
  modelValue: SerpData
  companies: SwitchGroupItem[]
}>()
</script>

<template>
  <section class="form">
    <header class="mb-xl">
      <h1>SERPs Snippet Generator</h1>
      <p class="form__description">
        Enter your <mark>title</mark>, <mark>description</mark> and <mark>web address</mark> to see your website's Search
        Engine Results Pages (SERPs) snippet preview.
      </p>
    </header>

    <div class="grid">
      <div role="none">
        <v-input id="title" v-model="modelValue.title" tag="textarea" :limit="70" placeholder="Title" rows="1" />
        <v-input id="description" v-model="modelValue.desc" tag="textarea" placeholder="Description" :limit="180" rows="3" />
        <p class="form__input-description" style="line-height: 1.4">
          You can add special characters and emoticons from
          <a href="https://unicode-table.com/sets/" target="_blank">unicode&nbsp;table</a>.
        </p>
        <v-input id="webAddress" v-model="modelValue.url" placeholder="Web address (primary mirror)" />
      </div>
      <div role="none">
        <input-group v-model="modelValue.breadcrumbs" legend="JSON-LD Breadcrumbs" placeholder="Breadcrumb" />
      </div>
    </div>

    <div class="button-group mt-lg">
      <switcher-group
        v-model="modelValue.company"
        :items="companies"
        label="Select search engine"
        type="radio"
        border
      />
      <v-switcher v-model="modelValue.mode" mode="big" label="Mobile version" checked-value="mobile" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.form {
  &__description {
    color: $color--font-85;
    margin: $offset-xs 0 $offset-sm;
  }

  &__input-description {
    line-height: 1.4;
    margin-top: 0;
  }
}
</style>
