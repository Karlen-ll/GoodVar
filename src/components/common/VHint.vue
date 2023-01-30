<script setup lang="ts">
import { ref, computed } from 'vue'
import { POPOVER_ARROW_SIZE } from './popover/popover.const'
import { PopoverModifier, PopoverPlacement, PopoverTrigger } from './popover/popover.type'
import VPopover from './popover/VPopover.vue'
import VIcon from './icon/VIcon.vue'
import { getStyleSizeByProps } from '../../utils/size'

const OFFSET = POPOVER_ARROW_SIZE + 2

const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    content?: string
    trigger?: PopoverTrigger
    placement?: PopoverPlacement
    offset?: [number, number]
    minWidth?: number | string
    maxWidth?: number | string
    icon?: string
    closable?: boolean
    nowrap?: boolean
  }>(),
  {
    modelValue: undefined,
    trigger: 'hover',
    placement: 'auto',
    offset: () => [8, 8],
    modifiers: () => [],
    teleportTo: '#teleported',
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const popoverArrow = ref<HTMLDivElement | null>(null)
const _value = ref(false)

const localValue = computed({
  get() {
    return typeof props.modelValue === 'undefined' ? _value.value : props.modelValue
  },

  set(value: boolean) {
    emit('update:modelValue', value)

    if (typeof props.modelValue === 'undefined') {
      _value.value = value
    }
  },
})

const modifiers = computed<PopoverModifier[]>(() => {
  return [{ name: 'arrow', options: { padding: POPOVER_ARROW_SIZE, element: popoverArrow.value } }]
})

const contentStyle = computed(() => getStyleSizeByProps(props, ['minWidth', 'maxWidth']))

const handleHintClose = () => {
  localValue.value = false
}
</script>

<template>
  <v-popover
    v-model="localValue"
    :offset="offset"
    :trigger="trigger"
    :placement="placement"
    :consolidate="closable"
    :modifiers="modifiers"
    :class="['hint']"
  >
    <!-- @slot Slot for reference component (trigger for hint) -->
    <slot>
      <v-icon name="question" size="16" />
    </slot>
    <template #content>
      <div class="hint__wrapper" :style="contentStyle" role="none">
        <div v-if="icon" class="hint__icon" aria-hidden="true">
          <v-icon :name="icon" size="24" :aria-hidden="false" />
        </div>
        <section>
          <header :class="['hint__header', { 'mb-4': closable || $slots.header }]">
            <!--  @slot Slot for content of hint's header -->
            <slot name="header" />
            <button v-if="closable" class="hint__close" @click="handleHintClose">
              <!-- @slot Slot for closing icon -->
              <slot name="close-icon">
                <v-icon size="16" name="close" />
              </slot>
            </button>
          </header>
          <div :class="['hint__content', { 'hint__content--nowrap': nowrap }]">
            <!--  @slot Slot for content of hint -->
            <slot name="content">
              {{ content }}
            </slot>
          </div>
        </section>
      </div>
      <div ref="popoverArrow" class="s-popover__arrow" aria-hidden="true" />
    </template>
  </v-popover>
</template>

<style scoped lang="scss">
.hint {
  > div {
    box-shadow: 0 4px 40px $shadow;
    background-color: $color--white;
  }

  &__wrapper {
    display: flex;
    padding: 8px 12px;
  }

  &__icon {
    color: $color--primary;
    margin-right: 8px;
  }

  &__content {
    display: inline-block;

    &--nowrap {
      white-space: nowrap;
    }
  }

  &__header {
    display: flex;
  }

  &__close {
    display: flex;
    flex-grow: 1;
    align-self: self-start;
    justify-content: flex-end;
    color: $color--primary;
    background-color: transparent;
    cursor: pointer;
    padding: 4px;
  }

  .popover__arrow {
    // Set `border-color` with `currentcolor` variable
    color: $color--white;
  }

  &--dark {
    // Popover `div` with transition
    > div {
      color: $color--white;
      background-color: $color--font;
    }

    .popover__arrow {
      color: $color--font;
    }

    .hint__icon,
    .hint__close {
      color: $color--white;
    }
  }
}
</style>
