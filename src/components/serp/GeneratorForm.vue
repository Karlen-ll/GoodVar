<script setup lang="ts">
import VInput from '../common/input/VInput.vue'
import VSwitcher from '../common/switcher/VSwitcher.vue'
import InputGroup from '../common/input/InputGroup.vue'
import SwitcherGroup from '../common/switcher/SwitcherGroup.vue'
import { SwitchGroupItem } from '../common/switcher/switcher.type'
import { SearchEngineValue } from './searchEngine.type'

defineProps<{
  modelValue: SearchEngineValue
  companies: SwitchGroupItem[]
}>()
</script>

<template>
  <section class="form">
    <header>
      <h1>SERPs Snippet Generator</h1>
      <p class="form__description">
        Enter your <mark>title</mark>, <mark>description</mark> and <mark>web address</mark> to see your website's Search
        Engine Results Pages (SERPs) snippet preview.
      </p>
    </header>

    <div class="grid">
      <div role="none">
        <v-input id="title" v-model="modelValue.site.title" tag="textarea" :limit="70" placeholder="Title" rows="1" />
        <v-input id="description" v-model="modelValue.site.desc" tag="textarea" placeholder="Description" :limit="180" rows="3" />
        <p class="form__input-desc" style="line-height: 1.4">
          You can add special characters and emoticons from
          <a href="https://unicode-table.com/sets/" target="_blank">unicode&nbsp;table</a>.
        </p>
        <v-input id="webAddress" v-model="modelValue.site.url" placeholder="Web address (primary mirror)" />
      </div>
      <div role="none">
        <input-group v-model="modelValue.site.breadcrumbs" legend="JSON-LD Breadcrumbs" placeholder="Breadcrumb" />
      </div>
    </div>

    <div class="button-group mt-16">
      <switcher-group
        v-model="modelValue.company"
        :items="companies"
        type="radio"
        label="Select search engine"
        checked-value="google"
      />

      <v-switcher v-model="modelValue.isMobile" mode="big" label="Mobile version" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.form {
  &__description {
    color: $color--font-85;
    margin: $margin-xs 0 $margin-sm;
  }

  &__input-desc {
    line-height: 1.4;
  }
}
</style>
