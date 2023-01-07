<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, useAttrs, defineEmits } from 'vue'
import { createPopper, Modifier, flip, preventOverflow } from '@popperjs/core'
import { SPopoverPlacement, SPopoverTrigger } from './SPopover.type'

const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    trigger?: SPopoverTrigger
    placement?: SPopoverPlacement
    modifiers?: Partial<Modifier<any, any>>[]
    offset?: [number, number]
    zIndex?: string | number
    teleportTo?: string
    wrapperClass?: string
    popoverTitle?: string
    popoverDesc?: string
    appendToBody?: boolean
    consolidate?: boolean
    manualClose?: boolean
    disabled?: boolean
  }>(),
  {
    modelValue: undefined,
    trigger: 'click',
    placement: 'bottom-end',
    offset: () => [0, 4],
    modifiers: () => [],
    teleportTo: '#teleported',
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const attrs = useAttrs()
const wrapperReference = ref()
const popoverReference = ref()
const popperInstance = ref()
const isVisible = ref(false)
const popoverClass = ref<string>((attrs.class as string | undefined) ?? '')

const isPopoverVisible = computed({
  get() {
    if (typeof props.modelValue !== 'undefined') {
      return props.modelValue
    }

    return isVisible.value
  },

  set(value: boolean) {
    if (typeof props.modelValue !== 'undefined') {
      emit('update:modelValue', value)
    } else {
      isVisible.value = value
    }
  },
})

const wrapperAttrs = computed(() => {
  const result = { ...attrs }
  delete result.class
  return result
})

const handleKeydown = (event: KeyboardEvent): void => {
  if (event.key === 'Escape' || event.key === 'Tab') {
    emit('update:modelValue', false)
  }
}

watch(
  () => props.modifiers,
  (value) => {
    popperInstance.value?.setOptions({ modifiers: getModifiers(value) })
  }
)

watch(
  () => props.placement,
  (value) => {
    popperInstance.value?.setOptions({ placement: value })
  }
)

watch(
  () => props.manualClose,
  () => {
    /* TODO: remove this watcher ! */
    if (!props.manualClose) {
      document.addEventListener('click', onClickHandler, true)
    } else {
      document.removeEventListener('click', onClickHandler, true)
    }
  },
  { deep: true }
)

onMounted(() => {
  init()

  if (!props.manualClose) {
    document.addEventListener('click', onClickHandler, true)
    window.addEventListener('keydown', handleKeydown, true)
  }
})

onUnmounted(() => {
  if (!props.manualClose) {
    document.removeEventListener('click', onClickHandler, true)
    window.removeEventListener('keydown', handleKeydown, true)
  }

  if (popperInstance.value) {
    popperInstance.value.destroy()
  }
})

const onClickHandler = (e: MouseEvent) => {
  if (!isPopoverVisible.value) {
    return
  }

  const target = e.target as HTMLElement

  if (wrapperReference.value?.contains(target)) {
    return
  }

  if (!popoverReference.value?.contains(target)) {
    isPopoverVisible.value = false
  }
}

const getModifiers = (modifiers: Partial<Modifier<any, any>>[]) => {
  return [{ name: 'offset', options: { offset: props.offset } }, preventOverflow, flip, ...modifiers]
}

const init = () => {
  if (wrapperReference.value && popoverReference.value) {
    popperInstance.value = createPopper(wrapperReference.value, popoverReference.value, {
      placement: props.placement,
      strategy: 'absolute',
      modifiers: getModifiers(props.modifiers),
    })
  }
}

const handleClick = () => {
  if (props.trigger !== 'click' || props.disabled || (props.consolidate && isPopoverVisible.value)) {
    return
  }

  isPopoverVisible.value = !isPopoverVisible.value
}

// TODO: Add v-show case
const handleMouseenter = () => {
  if (props.trigger !== 'hover' || props.disabled) {
    return
  }

  isPopoverVisible.value = true
}

const handleMouseleave = () => {
  if (props.trigger !== 'hover' || props.disabled || (props.consolidate && isPopoverVisible.value)) {
    return
  }

  isPopoverVisible.value = false
}

const handleBeforeEnter = () => {
  popperInstance.value.update()
}
</script>

<template>
  <div class="popover">
    <div
      ref="wrapperReference"
      v-bind="wrapperAttrs"
      :class="['as-fs', wrapperClass]"
      role="none"
      @click.stop="handleClick"
      @mouseenter="handleMouseenter"
      @mouseleave="handleMouseleave"
    >
      <!-- The default slot to trigger the popper  -->
      <slot />
    </div>
    <teleport :to="teleportTo" :disabled="!appendToBody">
      <div
        ref="popoverReference"
        :class="['popover__wrapper', popoverClass]"
        :aria-labelledby="popoverTitle"
        :aria-describedby="popoverDesc"
        role="dialog"
      >
        <transition name="fade" @before-enter="handleBeforeEnter">
          <div
            v-if="isPopoverVisible && !disabled"
            role="none"
            @mouseenter="handleMouseenter"
            @mouseleave="handleMouseleave"
          >
            <!-- The default slot to trigger the popper  -->
            <slot name="content" />
          </div>
        </transition>
      </div>
    </teleport>
  </div>
</template>

<style scoped lang="scss">
@use 'sass:map';

$popover-arrow-size: 6px;

.popover {
  &__wrapper {
    z-index: v-bind(zindex);
  }

  &__arrow {
    position: absolute;
    pointer-events: none;
    visibility: hidden;

    &::before {
      content: '';
      width: 0;
      height: 0;
      position: absolute;
      border: $popover-arrow-size solid transparent;
      visibility: visible;
    }
  }

  @each $placement in (top, bottom, left, right) {
    &[data-popper-placement^='#{$placement}'] &__arrow {
      $inverse-placement: map.get(
        (
          top: bottom,
          bottom: top,
          left: right,
          right: left,
        ),
        $placement
      );

      #{$inverse-placement}: 0;

      &::before {
        @if $placement == top or $placement == bottom {
          left: -$popover-arrow-size;
        } @else {
          top: -$popover-arrow-size;
        }

        #{$inverse-placement}: -#{$popover-arrow-size * 2};
        border-#{$placement}: $popover-arrow-size solid currentcolor;
      }
    }
  }
}
</style>
