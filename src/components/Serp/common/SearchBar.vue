<script setup lang="ts">
import { ref } from 'vue'
import VIcon from '../../common/icon/VIcon.vue'
import VInput from '../../common/input/VInput.vue'
import VButton from '../../common/button/VButton.vue'
import { IconName } from '../../common/icon/icon.type'
import { SerpLogo } from '../searchEngine.type'

const props = defineProps<{
  modelValue?: string
  logo: SerpLogo
  searchIcon?: IconName
  searchText?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'search', value: string): void
}>()

const inputValue = ref('')

const handleSearch = () => emit('search', props.modelValue ?? '')
</script>

<template>
  <div class="search-bar">
    <!-- @slot Slot for `prepend` elements -->
    <slot name="prepend" />
    <div class="search-bar__logo" role="presentation" aria-label="Search engine logo">
      <!-- @slot Slot for logo -->
      <slot name="logo">
        <v-icon v-bind="logo" sprite="logos" postfix="logo" />
      </slot>
    </div>
    <div class="search-bar__input input" role="presentation">
      <v-input v-model="inputValue" title="Search" placeholder="Search..." native-placeholder>
        <template #append>
          <v-button mode="icon" :icon="searchIcon ?? 'search'" aria-label="Search button" @click="handleSearch" />
        </template>
      </v-input>
    </div>
  </div>
</template>

<style scoped lang="scss">
.search-bar {
  width: 100%;
  display: flex;

  &__logo {
    flex: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 16px;
  }

  &__input {
    flex: 1;
  }
}
</style>
