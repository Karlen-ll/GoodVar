<script setup lang="ts">
import VButton from '../components/common/button/VButton.vue'
import { routeNames } from '../router/routes'
</script>

<template>
  <div class="container container--center page">
    <h1 class="page__header"> Describe your site </h1>
    <span class="page__description">
      The title and description of your website sets you apart from your competitors in search results.
    </span>
    <v-button tag="routerLink" :to="routeNames.GENERATOR" mode="primary" :icon="{ name: 'right', modes: 'moves' }">
      Get started
    </v-button>
  </div>
</template>

<style scoped lang="scss">
.page {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;

  &__header {
    background: -webkit-linear-gradient(315deg, $color--primary 15%, $color--primary-accent);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 76px;
    line-height: 1.25;
    font-weight: 900;
    letter-spacing: -1.5px;
    margin: 0;
  }

  &__description {
    color: $color--font-85;
    transition: color 0.5s;
    font-size: 22px;
    margin: $margin-md 0 $margin-lg;
  }
}
</style>
