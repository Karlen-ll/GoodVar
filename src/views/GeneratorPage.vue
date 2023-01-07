<script setup lang="ts">
import VButton from '../components/common/VButton.vue'
import VInput from '../components/common/VInput.vue'
import VSwitch from '../components/common/VSwitch.vue'
import { ref } from 'vue';
// import { routeNames } from '../router/routes'

const model = ref('')
</script>

<template>
  <div class="container page">
    <h1 class="page__header"> SERPs Snippet Generator </h1>
    <span class="page__description">
      Enter your <mark>title</mark>, <mark>description</mark> and <mark>web address</mark> to see your website's Search Engine Results Pages (SERPs) snippet preview.
    </span>
    <v-input v-model="model" id="title" tag="textarea" :limit="70" placeholder="Title" rows="1" clearable />
    <v-input v-model="model" id="description" tag="textarea" placeholder="Description" :limit="180" rows="3" clearable />
    <p class="mt-0">
      You can add special characters and emoticons from <a href="https://unicode-table.com/sets/" target="_blank">unicode&nbsp;table</a>.
    </p>
    <v-input v-model="model" id="address" placeholder="Web address (primary mirror)" clearable />

    <hr />

    <h2> Breadcrumb navigation </h2>

    <div class="input-group">
      <v-input v-model="model" id="breadcrumb1" placeholder="Section 1" />
      <v-input v-model="model" id="breadcrumb2" placeholder="Section 1" />
      <v-input v-model="model" id="breadcrumb3" placeholder="Section 1" />
      <v-input v-model="model" id="breadcrumb4" placeholder="Section 1" />
    </div>

    <div class="flex-container">
      <div class="flex-container column">
        <h4>Select tooltip unit:</h4>
        <label class="radio"><input class="radio_btns" name="tooltip_unit" type="radio" value="word">Words<span></span></label>
        <label class="radio"><input class="radio_btns" name="tooltip_unit" type="radio" value="char" checked="">Characters<span></span></label>
      </div>
      <div class="with_left_border">
        <v-switch> Mobile results </v-switch>
        <p class="text-muted" role="status">Change to mobile search engine results</p>
      </div>
    </div>

    <div class="button-group">
      <v-button> Generate </v-button>
      <v-button mode="secondary"> Get code </v-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page {
  padding: 2em;

  &__header {
    margin: 0;
  }

  &__description {
    color: $color--font-85;
    margin: 20px 0 0;
  }
}

.button-group {
  margin-top: 20px;
}
</style>
