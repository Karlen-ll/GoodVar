<script setup lang="ts">
import { reactive, ref } from 'vue'
import VPopover from '../components/common/popover/VPopover'
// import SBadge from '../components/SBadge'

const data = reactive({
  hint: null,
})
</script>

<template>
  <div class="container container--center page">
    <v-popover>
        xxx
      <template #content> Контент </template>
    </v-popover>
  </div>
</template>

<style scoped lang="scss">
.page {
  //font-size: 3em;
}
</style>
