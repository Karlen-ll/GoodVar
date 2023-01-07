<script setup lang="ts">
import { useMeta } from 'vue-meta'
import { routeNames } from '../router/routes'

useMeta({ title: 'GoodVar - 404: Page not Found!' })
</script>

<template>
  <div class="container container--center page">
    <h1 class="page__header"> Page not found </h1>
    <div class="page__description">
      The page you were looking for could not be found.<br>
      It might have been removed, renamed, or did not exist in the first place.
    </div>

    <router-link class="error-page__link" :to="{ name: routeNames.HOME }"> Вернуться на главную </router-link>
  </div>
</template>

<style scoped lang="scss">
.page {
  height: 100%;
  text-align: center;
  position: relative;

  &__header {
    margin: 0;
  }

  &__description {
    color: $color--font-85;
    margin: 24px 0 40px;
  }
}
</style>
