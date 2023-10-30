<script setup lang="ts">
import { toRef } from 'vue'
import VInput from '@atom/input/VInput.vue'
import VSwitcher from '@atom/switcher/VSwitcher.vue'
import InputGroup from '@atom/input/InputGroup.vue'
import SwitcherGroup from '@atom/switcher/SwitcherGroup.vue'
import { SwitchGroupItem } from '@atom/switcher/switcher.type'
import { SerpData } from '@serp/searchEngine.type'

const props = defineProps<{
  modelValue: SerpData
  companies: SwitchGroupItem[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: SerpData): void
}>()

const form = toRef(props, 'modelValue')

const handleUpdate = () => {
  emit('update:modelValue', form.value)
}
</script>

<template>
  <section class="form">
    <header class="mb-xl">
      <h1> SERPs Snippet Generator </h1>
      <p class="form__description">
        Enter your <mark>title</mark>, <mark>description</mark> and <mark>web address</mark> to see your website's
        Search Engine Results Pages (SERPs) snippet preview.
      </p>
    </header>

    <div class="grid">
      <div role="none">
        <v-input
          id="title"
          v-model.trim="form.title"
          tag="textarea"
          :limit="70"
          placeholder="Title"
          rows="1"
          @update:model-value="handleUpdate"
        />
        <v-input
          id="description"
          v-model.trim="form.desc"
          tag="textarea"
          placeholder="Description"
          :limit="180"
          rows="3"
          @update:model-value="handleUpdate"
        />
        <p class="form__input-description" style="line-height: 1.4">
          You can add special characters and emoticons from
          <a href="https://unicode-table.com/sets/" target="_blank">unicode&nbsp;table</a>.
        </p>
        <v-input
          id="webAddress"
          v-model.trim="form.url"
          placeholder="Web address (primary mirror)"
          @update:model-value="handleUpdate"
        />
      </div>
      <div role="none">
        <input-group
          v-model="form.breadcrumbs"
          legend="JSON-LD Breadcrumbs"
          placeholder="Breadcrumb"
          @update:model-value="handleUpdate"
        />
      </div>
    </div>

    <div class="button-group mt-lg">
      <switcher-group
        v-model="form.company"
        :items="companies"
        label="Select search engine"
        type="radio"
        border
        @update:model-value="handleUpdate"
      />
      <v-switcher
        v-model="form.mode"
        mode="big"
        label="Mobile version"
        checked-value="mobile"
        @update:model-value="handleUpdate"
      />
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
