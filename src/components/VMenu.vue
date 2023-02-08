<script setup lang="ts">
import { ref } from 'vue'
import { RouteLocationRaw } from 'vue-router'
import { useTheme } from '@/composable/useTheme'
import VIcon from '@atom/icon/VIcon.vue'
import VSwitch from '@atom/switcher/VSwitcher.vue'

const { isDark, toggleTheme } = useTheme()

defineProps<{
  list?: { title: string; path: RouteLocationRaw }[]
}>()

const switchValue = ref(isDark.value)

const handleChangeTheme = () => {
  toggleTheme()
}
</script>

<template>
  <div class="menu">
    <ul v-if="list?.length" class="menu__list list">
      <li v-for="listItem in list" :key="listItem.title" class="menu__item list__item">
        <router-link :to="listItem.path" class="menu__link">{{ listItem.title }}</router-link>
      </li>
    </ul>

    <hr class="vertical" />

    <v-switch v-model="switchValue" class="menu__switch menu__switch--theme" mode="secondary" :icons="['sun', 'moon']" @change="handleChangeTheme" />

    <a href="#" class="menu__link menu__link--circle ml-lg" aria-label="GitHub">
      <v-icon name="github" />
    </a>
  </div>
</template>

<style scoped lang="scss">
.menu {
  display: flex;
  align-items: center;
  white-space: nowrap;

  &__list {
    list-style: none;
    display: flex;
    padding: 0;
    margin: 0;
  }

  &__item {
    &:not(&:last-child) {
      margin-right: 1.25em;
    }
  }

  &__link {
    min-width: $input-height;
    min-height: $input-height;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: $color--font-85;
    box-sizing: border-box;
    padding: 0.25rem 0.5rem;

    @include hover {
      color: $color--font;
    }

    &--circle {
      border-radius: 50%;
      padding: 0.25rem;
    }
  }
}
</style>
