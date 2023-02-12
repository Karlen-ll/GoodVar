<script setup lang="ts">
import { watch, onMounted, onUnmounted } from 'vue'
import VIcon from '@atom/icon/VIcon.vue'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    closable?: boolean
  }>(),
  {
    closable: true,
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

watch(
  () => props.modelValue,
  (isOpen) => (document.body.style.overflow = isOpen ? 'hidden' : 'auto')
)

onMounted(() => {
  document.addEventListener('keydown', closeFromKeyboard)
})

onUnmounted(() => {
  document.removeEventListener('keydown', closeFromKeyboard)
})

const closeFromKeyboard = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.modelValue) {
    handleCloseModal()
  }
}

const handleCloseModal = () => {
  emit('update:modelValue', false)
}
</script>

<template>
  <transition name="modal">
    <section v-if="modelValue" class="modal" role="dialog">
      <div v-if="modelValue" class="modal__content" role="none">
        <div
          v-if="closable"
          class="modal__close-button"
          aria-label="Close modal"
          role="button"
          tabindex="0"
          @click="handleCloseModal"
          @keyup.enter.space="handleCloseModal"
        >
          <v-icon class="modal__close-icon" size="24" name="close" />
        </div>
        <header v-if="$slots.header" class="modal__header">
          <slot name="header" />
        </header>
        <div v-if="$slots.default" class="modal__body">
          <slot />
        </div>
        <footer v-if="$slots.footer" class="modal__footer">
          <slot name="footer" />
        </footer>
      </div>
      <div v-if="modelValue" class="modal__backdrop" :aria-hidden="true" @click="handleCloseModal" />
    </section>
  </transition>
</template>

<style scoped lang="scss">
@use 'sass:map';

.modal {
  z-index: 200;

  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  align-items: flex-start;
  justify-content: center;

  &__content {
    z-index: 1;
    top: 50%;
    left: 50%;
    width: 95%;
    max-width: 800px;
    min-height: 246px;
    max-height: 80%;
    position: absolute;
    display: flex;
    flex-direction: column;
    border-radius: $border-radius-md;
    box-shadow: $shadow;
    background: $color--background;
    transform: translate(-50%, -65%);
    overflow: hidden;
  }

  &__header {
    border-bottom: 1px solid $color--border;
    padding: 1.15rem 1.25rem 1rem 1.75rem;
    margin-bottom: 1em;
  }

  &__body {
    flex: 1;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    position: relative;
    padding: 0 1.75rem;
    overflow-y: auto;
  }

  &__footer {
    display: unset;
    border-top: 1px solid $color--border;
    padding: 1.25rem 1.25rem 1.5rem 1.75rem;
    margin-top: 1em;
  }

  &__close-button {
    top: 1.15rem;
    right: 1.25rem;
    position: absolute;
    color: $color--brand-65;
    transition: color $timeout-md;
    cursor: pointer;
    z-index: 1;

    &-icon {
      cursor: pointer;
    }

    @include hover {
      color: $color--brand;
    }
  }

  &__backdrop {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    background: $color--overlay;
    background-size: 21px 21px;
    backdrop-filter: blur(0.1rem);
  }
}

.modal {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.5s ease;

    .modal__content {
      transition: transform 0.35s ease-in-out;
    }
  }

  &-leave-to,
  &-enter-from {
    opacity: 0;

    .modal__content {
      transform: translate(-50%, -60%);
    }
  }
}
</style>
