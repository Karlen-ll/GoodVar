<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ divider?: 'header' | 'footer' | 'both' | true }>()

const hasHeaderDivider = computed(() => props.divider && props.divider !== 'footer')
const hasFooterDivider = computed(() => props.divider && props.divider !== 'header')
</script>

<template>
  <div class="card">
    <header v-if="$slots.header" :class="['card__header', { 'card__header--with-divider': hasHeaderDivider }]">
      <slot name="header" />
    </header>
    <div v-if="$slots.body" :class="['card__body']">
      <slot />
    </div>
    <footer v-if="$slots.footer" :class="['card__footer', { 'card__footer--with-divider': hasFooterDivider }]">
      <slot name="footer" />
    </footer>
  </div>
</template>

<style scoped lang="scss">
@use 'sass:math';

.card {
  $offset: 16px;

  border-radius: 24px;
  box-shadow: $shadow;
  background: $color--white;

  &__header {
    padding: #{$offset * 2} $offset math.div($offset, 2);

    &--with-divider {
      position: relative;

      &::after {
        bottom: 0;
      }
    }
  }

  &__footer {
    padding: $offset math.div($offset, 2) $offset $offset;

    &--with-divider {
      position: relative;

      &::before {
        top: 0;
      }
    }
  }

  &__header--with-divider::after,
  &__footer--with-divider::before {
    content: '';
    left: $offset;
    right: $offset;
    height: 1px;
    position: absolute;
    background: $color--border;
  }
}
</style>
