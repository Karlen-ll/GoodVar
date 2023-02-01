import { Meta, Story } from '@storybook/vue3'
import { ref } from 'vue'

import { getDecorators, getStoryParams } from '@/storybook/utils/config'
import STabs from '@/components/STabs/STabs.vue'

export default {
  title: 'DESIGN SYSTEM/Atom/Tabs',
  component: STabs,
  decorators: getDecorators(),
  parameters: getStoryParams('84%3A1958'),
  argTypes: {
    tabs: { control: 'array' },
    lazy: { control: 'boolean' },
  },
} as Meta

export const Tabs: Story = (args) => ({
  components: { STabs },
  setup: () => {
    const model = ref(3)
    const getSlotNameByIndex = (index: string) => `tab-${index}`
    return {
      args,
      model,
      getSlotNameByIndex,
    }
  },
  template: `
    <s-tabs v-model="model" v-bind="args">
      <template v-for="item in args.tabs.length" #[getSlotNameByIndex(item)]>
        Контент №{{ item }}
      </template>
    </s-tabs>
  `,
})

Tabs.args = {
  tabs: [
    'Пункт 1',
    {
      title: 'Пункт 2',
      value: 2,
      badge: 30,
    },
    'Пункт 3',
    {
      title: 'Пункт 4',
      value: 4,
      badge: 1,
      disabled: true,
    },
    'Пункт 5',
    'Пункт 6',
    'Пункт 7',
  ],
}
