<script setup lang="ts">
import { reactive } from 'vue'

const data = reactive({
  hint: null,
})
</script>

<template>
  <div class="container container--center page">
    <div class="tooltip" data-tooltip="xxx"> Контент </div>
  </div>
</template>

<style scoped lang="scss">
.page {
  //font-size: 3em;
}
</style>
