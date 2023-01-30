<script setup lang="ts">
import { reactive } from 'vue'
import GeneratorForm from '../components/Serp/GeneratorForm.vue'
import SearchEngine from '../components/Serp/SearchEngine.vue'

const data = reactive({
  title: 'Bernard Mannes Baruch - financier, stock speculator',
  desc:
    'Best quote: “A speculator is a man who observes the future, and acts before it occurs„' +
    '& “Millions saw the apple fall but Newton was the one who asked why„',
  url: 'sample.com',
  breadcrumbs: ['Bernard Baruch'],
})
</script>

<template>
  <div class="container">
    <generator-form :data="data" />

    <br />
    <search-engine company="google" :data="data" />
  </div>
</template>
