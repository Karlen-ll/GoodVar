<script setup lang="ts">
import { useMeta } from 'vue-meta'
import { useTheme } from '@/composable/useTheme'

useMeta({ title: 'GoodVar - Describe your site!' })
useTheme()
</script>

<template>
  <metainfo />
  <router-view />
</template>
