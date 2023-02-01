<script setup lang="ts">
import { RouteLocationRaw } from 'vue-router'
import VIcon from './common/icon/VIcon.vue'
import VSwitch from './common/switcher/VSwitcher.vue'
import { useTheme } from '../composable/useTheme'

const { toggleTheme } = useTheme()

defineProps<{
  list?: { title: string; path: RouteLocationRaw }[]
}>()

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

    <v-switch mode="secondary" :icons="['sun', 'moon']" @change="handleChangeTheme" />

    <a href="#" class="menu__link menu__link--circle ml-20" aria-label="GitHub">
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
    color: $color--font-65;
    box-sizing: border-box;
    padding: 4px 8px;

    @include hover {
      color: $color--font;
    }

    &--circle {
      border-radius: 50%;
      padding: 4px;
    }
  }
}
</style>
