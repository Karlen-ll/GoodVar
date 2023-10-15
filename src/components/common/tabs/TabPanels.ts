import { h, TransitionGroup, defineComponent, withDirectives, PropType, vShow } from 'vue'
import { TabItem } from '@atom/tabs/TabsType'

export default defineComponent({
  props: {
    modelValue: [String, Number, null] as PropType<string | number | null>,

    /** Tab list */
    items: {
      type: Array as PropType<TabItem[]>,
      default: () => [],
    },

    /** lazy load content */
    lazy: Boolean as PropType<boolean>,
  },

  setup(props, context) {
    const panels = props.lazy ? props.items?.filter((item) => props.modelValue === item.value) : props.items

    return h(
      TransitionGroup,
      { tag: 'div', name: 'tab-panel-animation', class: 'tab-panels', role: 'none' },
      panels.map((item) => {
        const content = h(
          'article',
          {
            key: item.value,
            class: 'tab-panels__item',
            role: 'tabpanel',
          },
          context.slots[`tab-${item.value}`]?.()
        )

        return props.lazy ? content : withDirectives(content, [[vShow, props.modelValue === item.value]])
      })
    )
  },
})
