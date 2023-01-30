import { ref, computed, onMounted, onUnmounted, watch, defineComponent, h, Transition, withDirectives, withModifiers, vShow, PropType } from 'vue'
import { createPopper, flip, preventOverflow, Instance, Modifier } from '@popperjs/core'
import { PopoverModifier, PopoverPlacement, PopoverTrigger } from './popover.type'

export default defineComponent({
  props: {
    /** @model Show */
    modelValue: {
      type: Boolean as PropType<boolean | undefined>,
      default: undefined,
    },

    /** How the popover is triggered
     * @values 'click', 'hover'
     * @desc NOT reactive */
    trigger: {
      type: String as PropType<PopoverTrigger>,
      default: 'click',
    },

    /** Describes the placement */
    placement: {
      type: String as PropType<PopoverPlacement>,
      default: 'bottom-end',
    },

    /** Offset of the popover relative to its target
     * @desc NOT reactive */
    offset: {
      type: Array,
      default: () => [0, 4],
      required: false,
    },

    /** Set modifiers
     * {@link https://popper.js.org/docs/v2/modifiers/ Modifiers} */
    modifiers: {
      type: Array as PropType<Partial<Modifier<any, any>>[]>,
      default: () => [],
      required: false,
    },

    /** Teleport destination */
    teleportTo: {
      type: String,
      default: '#teleported',
    },

    /** Z-index popover */
    zIndex: [String, Number],

    /** Popover class */
    wrapperClass: String,

    /** Popover class */
    contentClass: String,

    /** Popover title
     * @desc aria-labelledby */
    popoverTitle: String,

    /** Popover description
     * @desc aria-labelledby */
    popoverDesc: String,

    /** Teleport to the body */
    appendToBody: Boolean,

    /** Don't close on click/mouseleave on content */
    consolidate: Boolean,

    /** Only manual close popover */
    manualClose: Boolean,

    /** Disable popover */
    disabled: Boolean,
  },
  emits: ['update:modelValue'],
  setup(props, { emit, attrs, slots }) {
    const wrapperReference = ref<HTMLDivElement | null>(null)
    const contentReference = ref<HTMLDivElement | null>(null)
    const popperInstance = ref<Instance | null>(null)
    const localValue = ref(false)
    // const popoverClass = ref<string>((attrs.class as string | undefined) ?? '')

    const isVisible = computed<boolean>({
      get() {
        return typeof props.modelValue === 'undefined' ? localValue.value : props.modelValue
      },

      set(value: boolean) {
        emit('update:modelValue', value)

        if (typeof props.modelValue === 'undefined') {
          localValue.value = value
        }
      },
    })

    // const wrapperAttrs = computed(() => {
    //   const result = { ...attrs }
    //   delete result.class
    //   return result
    // })

    const handleKeydown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape' || event.key === 'Tab') {
        isVisible.value = false
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
      if (!isVisible.value) {
        return
      }

      const target = e.target as HTMLElement

      if (wrapperReference.value?.contains(target)) {
        return
      }

      if (!contentReference.value?.contains(target)) {
        isVisible.value = false
      }
    }

    const getModifiers = (modifiers: PopoverModifier[]) => {
      return [{ name: 'offset', options: { offset: props.offset } }, preventOverflow, flip, ...modifiers]
    }

    const init = () => {
      if (wrapperReference.value && contentReference.value) {
        popperInstance.value = createPopper(wrapperReference.value, contentReference.value, {
          placement: props.placement,
          strategy: 'absolute',
          modifiers: getModifiers(props.modifiers),
        })
      }
    }

    const handleClick = () => {
      console.log('handleClick')
      if (props.disabled || (props.consolidate && isVisible.value)) {
        return
      }

      isVisible.value = !isVisible.value
    }

    const handleMouseenter = () => {
      console.log('handleMouseenter')
      if (props.disabled) {
        return
      }

      isVisible.value = true
    }

    const handleMouseleave = () => {
      console.log('handleMouseleave')
      if (props.disabled || (props.consolidate && isVisible.value)) {
        return
      }

      isVisible.value = false
    }

    const handleBeforeEnter = () => {
      popperInstance.value?.update()
    }

    const componentAttrs = computed(() => {
      const result: Record<string, any> = {
        ...attrs,
        class: ['popover__wrapper', props.wrapperClass],
        ref: 'wrapperReference',
      }

      if (props.trigger === 'click') {
        result.onClick = withModifiers(handleClick, ['stop'])
      } else {
        result.onMouseenter = handleMouseenter
        result.onMouseleave = handleMouseleave
      }

      return result
    })

    const content = computed(() => {
      const isContentVisible = isVisible.value && !props.disabled
      const wrapperProps: Record<string, any> = {
        class: ['popover__content', props.contentClass],
        ref: 'contentReference',
      }

      if (props.trigger === 'click') {
        return isContentVisible ? h('span', wrapperProps, { default: slots.content}) : undefined
      }

      return withDirectives(h('div', wrapperProps), [[vShow, isContentVisible]])
    })

    return () => {
      return h('div', { class: 'popover' }, [
        h('span', componentAttrs.value, { default: slots.default }),
        h(Transition, { name: 'popover-fade', onBeforeEnter: handleBeforeEnter }, () => content.value)
      ])
    }
  },
})
