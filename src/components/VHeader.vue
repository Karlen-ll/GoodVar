<script setup lang="ts">
import VMenu from '../components/VMenu.vue'
import VLogo from '../components/VLogo.vue'
import { routeNames } from '../router/routes'

const MENU_ITEMS = [{ title: 'Generator', path: { name: routeNames.GENERATOR } }]
</script>

<template>
  <div class="header">
    <v-logo />

    <v-menu class="header__menu" :list="MENU_ITEMS" />
  </div>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  color: $color--font-85;
  justify-content: space-between;
  transition: border-color 0.5s, color 0.5s;
  border-bottom: 1px solid $color--border;
  padding: 0.74em 2em;

  &__menu {
    height: 100%;
  }
}
</style>
