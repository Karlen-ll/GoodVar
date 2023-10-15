<script setup lang="ts">
import { ref } from 'vue'

const data = ref('Test page')
</script>

<template>
  <div class="container container--center page">{{ data }}</div>
</template>

<style scoped lang="scss">
//.page {}
</style>
