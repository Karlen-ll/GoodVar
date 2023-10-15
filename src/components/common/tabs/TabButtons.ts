import { h, TransitionGroup, withModifiers, defineComponent, PropType } from 'vue'
import { TabItem } from '@atom/tabs/TabsType'
import VButton from '@atom/button/VButton.vue'

export default defineComponent({
  props: {
    modelValue: [String, Number, null] as PropType<string | number | null>,

    /** Tab list */
    items: {
      type: Array as PropType<TabItem[]>,
      default: () => [],
    },
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const handleClick = (index: number) => {
      emit('update:modelValue', props.items[index].value)
    }

    return h(
      TransitionGroup,
      { tag: 'div', name: 'list', role: 'tablist' },
      props.items.map(({ value: checkedValue, content, badge, state }, index) =>
        h(
          VButton,
          {
            key: `${checkedValue}#${index}`,
            class: 'tab-list__item',
            modelValue: props.modelValue,
            checkedValue,
            state,
            badge,
            'aria-setsize': props.items.length,
            'aria-posinset': index + 1,
            role: 'tab',
            onClick: withModifiers(() => handleClick(index), ['stop']),
            // onKeydown: withKeys(handleIsVisibleToggle, ['b'])
          },
          content
        )
      )
    )
  },
})
