<script setup lang="ts">
import { computed, ref } from 'vue'
import VIcon from '@atom/icon/VIcon.vue'
import VInput from '@atom/input/VInput.vue'
import VButton from '@atom/button/VButton.vue'
import SwitcherGroup from '@atom/switcher/SwitcherGroup.vue'
import { SerpMenuItem, SerpOptions } from '@serp/searchEngine.type'
import { IconName } from '@atom/icon/icon.type'

const props = withDefaults(defineProps<{
    modelValue?: string
    options: SerpOptions
    searchIcon?: IconName
    searchText?: string
  }>(),
  {
    searchIcon: 'search',
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'search', value: string): void
}>()

const inputValue = ref('')
const currentMenu = ref<number>(0)

const normalizedMenu = computed<SerpMenuItem[]>(() => {
  return props.options?.menu?.map((item) => (typeof item === 'string' ? { label: item } : item)) ?? []
})

const handleSearch = () => emit('search', props.modelValue ?? '')
</script>

<template>
  <header class="serp-header" role="presentation">
    <div class="serp-header__search">
      <!-- @slot Slot for `prepend` elements -->
      <slot name="prepend"/>
      <div class="serp-header__logo" :aria-label="options?.name || `Search engine` + ' logo'">
        <v-icon v-bind="options?.logo" sprite="logos" postfix="logo"/>
      </div>
      <div class="serp-header__input input">
        <v-input v-model="inputValue" title="Search" placeholder="Search..." native-placeholder>
          <template #append>
            <v-button mode="icon" :icon="searchIcon" aria-label="Search button" @click="handleSearch"/>
          </template>
        </v-input>
      </div>
    </div>
    <switcher-group
      v-model="currentMenu"
      :items="normalizedMenu"
      class="serp-header__menu"
      presentation
      type="tab"
      hide-label
    />
  </header>
</template>

<style scoped lang="scss">
.serp-header {
  &__search {
    width: 100%;
    display: flex;
  }

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

  &__menu {
    width: 100%;
    display: flex;

    &.switcher-group {
      border-radius: 0;
      border-bottom: 1px solid $color--border;
    }

    :deep(.switcher__text) {
      transition: opacity $timeout-sm;
      opacity: 0.7;
    }

    :deep(.switcher--checked) .switcher__text {
      opacity: 0.9;
    }
  }
}
</style>
