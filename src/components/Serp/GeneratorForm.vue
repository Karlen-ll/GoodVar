<script setup lang="ts">
import VInput from '../common/input/VInput.vue'
import VButton from '../common/button/VButton.vue'
import InputGroup from '../common/input/InputGroup.vue'
import { SerpData } from './searchEngine.type'

defineProps<{
  data: SerpData
}>()
</script>

<template>
  <section class="form">
    <h1>SERPs Snippet Generator</h1>
    <p class="form__description">
      Enter your <mark>title</mark>, <mark>description</mark> and <mark>web address</mark> to see your website's Search
      Engine Results Pages (SERPs) snippet preview.
    </p>

    <div class="grid">
      <div>
        <v-input id="title" v-model="data.title" tag="textarea" :limit="70" placeholder="Title" rows="1" />
        <v-input id="description" v-model="data.desc" tag="textarea" placeholder="Description" :limit="180" rows="3" />
        <p class="form__input-desc" style="line-height: 1.4">
          You can add special characters and emoticons from
          <a href="https://unicode-table.com/sets/" target="_blank">unicode&nbsp;table</a>.
        </p>
        <v-input id="webAddress" v-model="data.url" placeholder="Web address (primary mirror)" />
      </div>
      <div>
        <input-group v-model="data.breadcrumbs" legend="JSON-LD Breadcrumbs" placeholder="Breadcrumb" />
      </div>
    </div>

    <div class="button-group mt-16">
      <v-button> Generate</v-button>
      <v-button mode="secondary"> Get code</v-button>
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
