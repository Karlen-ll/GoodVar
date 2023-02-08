<script setup lang="ts">
import { ref } from 'vue'
import VSwitcher from '@atom/switcher/VSwitcher.vue'

const model = ref()
</script>

<template>
  <div class="container container--center page">
    <v-switcher v-model="model" type="tab" checked-value="1" label="META" />
    <v-switcher v-model="model" type="tab" checked-value="2" label="JSON-LD" />
  </div>
</template>

<style scoped lang="scss">
.page {
  //font-size: 3em;
}
</style>
