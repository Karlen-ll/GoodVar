<script setup>
import LogoSvg from '../assets/logo.svg'
import { routeNames } from '../router/routes'
</script>

<template>
  <router-link :to="{ name: routeNames.HOME }" class="logo" aria-label="Go home">
    <logo-svg class="logo__icon" width="48" height="48" aria-hidden="true" />

    <span class="logo__title">Meta builder</span>
  </router-link>
</template>

<style scoped lang="scss">
.logo {
  display: flex;
  user-select: none;

  &__icon {
    margin-top: -7px;
  }

  &__title {
    display: grid;
    align-items: center;
    color: $color--font-85;
    margin-left: 0.75em;
  }
}
</style>
