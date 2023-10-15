import { h, defineComponent, onErrorCaptured, PropType } from 'vue'
// @ts-ignore
import { compile } from 'vue/dist/vue.esm-browser'

export default defineComponent({
  props: {
    template: String as PropType<string | null>,
    variables: Object as PropType<Record<string, string | undefined | null>>,
  },

  setup(props) {
    onErrorCaptured((error) => {
      console.error(`Template renderer: ${error}`)

      return false
    })

    return () => {
      return h(compile(props.template ?? ''), props.variables)
    }
  },
})
