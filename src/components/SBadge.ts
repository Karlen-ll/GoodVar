import { h, defineComponent, PropType } from 'vue'
import './xxx.scss'

export default defineComponent({
  props: {
    value: [String, Number] as PropType<string | number>,
  },

  setup(props, { attrs, slots }) {
    return () => h('div', { ...attrs, class: 'badge' }, slots.default ?? props.value)
  }
})
