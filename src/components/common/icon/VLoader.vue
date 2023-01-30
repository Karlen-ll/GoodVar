<script setup lang="ts">
withDefaults(
  defineProps<{
    color?: string
    size?: number | string
    width?: number | string
    height?: number | string
  }>(),
  {
    color: 'currentColor',
    width: 32,
    height: 32,
  }
)
</script>

<template>
  <svg class="loader" fill="none" :stroke="color" :width="size ?? width" :height="size ?? height" viewBox="25 25 50 50">
    <title>Loading...</title>
    <circle class="loader__circle" cx="50" cy="50" r="20" />
  </svg>
</template>

<style scoped lang="scss">
.loader {
  transform-origin: center;
  animation: rotate 2s linear infinite;

  &__circle {
    stroke-dasharray: 150, 200;
    stroke-dashoffset: -10;
    stroke-width: 4px;
    animation: stroke-move 1.5s ease-in-out infinite;
  }
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes stroke-move {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35;
  }

  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124;
  }
}
</style>
