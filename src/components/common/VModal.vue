<script setup lang="ts">
import { computed, onMounted, onUnmounted, watch, useSlots } from 'vue'
import { getStyleSizeByProps } from '../../utils/size'
import VIcon from './icon/VIcon.vue'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    width: number | string
    maxWidth: number | string
    closable: boolean
    closeOnEsc: boolean
    closeOnBackdrop: boolean
  }>(),
  {
    maxWidth: 400,
    closable: true,
    closeOnEsc: true,
    closeOnBackdrop: true,
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const slots = useSlots()

const modalInnerStyle = computed(() => getStyleSizeByProps(props, ['width', 'maxWidth']))

const modalClasses = computed(() => ({
  'modal--without-header': !slots.header,
  'modal--without-body': !slots.default,
  'modal--without-footer': !slots.footer,
  'modal--closable': props.closable,
}))

watch(
  () => props.modelValue,
  (isOpen) => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto'
  }
)

onMounted(() => {
  if (props.closeOnEsc) {
    document.addEventListener('keydown', closeByEscape)
  }
})

onUnmounted(() => {
  if (props.closeOnEsc) {
    document.removeEventListener('keydown', closeByEscape)
  }
})

const handleCloseModal = () => {
  emit('update:modelValue', false)
}

const closeByBackdrop = () => {
  if (props.closeOnBackdrop) {
    handleCloseModal()
  }
}

const closeByEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.modelValue) {
    handleCloseModal()
  }
}
</script>

<template>
  <transition name="modal">
    <section v-if="modelValue" :class="['modal', modalClasses]" role="dialog">
      <div class="modal__inner" :style="modalInnerStyle" role="none">
        <div
          v-if="closable"
          class="modal__close"
          aria-label="Close"
          role="button"
          tabindex="0"
          @click="handleCloseModal"
          @keyup.enter.space="handleCloseModal"
        >
          <v-icon class="modal__close-icon" size="24" name="close" :tabindex="0" role="none" />
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
      <div class="modal__backdrop" :aria-hidden="true" @click="closeByBackdrop" />
    </section>
  </transition>
</template>

<style scoped lang="scss">
@use 'sass:map';

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

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
  padding-top: 64px;

  &__inner {
    z-index: 1;

    width: 100%;
    max-height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    border-radius: 24px;
    box-shadow: $shadow;
    background: $color--white;
    overflow: hidden;

    //@include responsive(xs) {
    //  border-radius: 24px 24px 0 0;
    //}
  }

  &__header {
    padding-top: 32px;
    padding-right: 32px;
    padding-left: 32px;
    margin-bottom: 16px;
  }

  &__body {
    width: 100%;
    height: 100%;
    max-height: 100vh;
    position: relative;
    padding-right: 32px;
    padding-left: 32px;
    overflow-y: auto;
  }

  &__footer {
    display: unset;
    padding-right: 32px;
    padding-bottom: 32px;
    padding-left: 32px;
    margin-top: 16px;

    //@include responsive(xs) {
    //  padding-bottom: 28px;
    //}
  }

  &__close {
    $close-button-size: 24px;

    top: 22px;
    right: 22px;
    width: $close-button-size;
    height: $close-button-size;
    position: absolute;
    color: $color--primary-65;
    transition: color $timeout-md;
    z-index: 1;

    &-icon {
      cursor: pointer;
    }

    @include hover {
      color: $color--primary;
    }
  }

  &__backdrop {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    background: $color--font-35;
  }

  &--without-header {
    .modal__body {
      padding-top: 32px;
    }
  }

  &--without-footer {
    .modal__body {
      padding-bottom: 32px;

      //@include responsive(xs) {
      //  padding-bottom: 28px;
      //}
    }
  }

  &--closable {
    .modal__header {
      margin-top: 12px;
    }

    &.modal--without-header {
      .modal__body {
        margin-top: 12px;
      }
    }
  }

  //@include responsive(xs) {
  //  width: 100% !important; // stylelint-disable-line declaration-no-important
  //  max-width: 100% !important; // stylelint-disable-line declaration-no-important
  //  align-items: flex-end;
  //  padding-top: 12px;
  //}
}
</style>
