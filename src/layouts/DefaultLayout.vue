<script setup lang="ts">
import VHeader from '../components/VHeader.vue'
import VFooter from '../components/VFooter.vue'
</script>

<template>
  <div class="layout">
    <v-header class="layout__header" />
    <div class="layout__body"><router-view /></div>
    <v-footer class="layout__footer" />
  </div>
</template>

<style scoped lang="scss">
.layout {
  height: 100%;
  display: flex;
  flex-direction: column;

  &__header,
  &__footer {
    flex: 0;
  }

  &__body {
    flex-grow: 1;
  }
}
</style>
