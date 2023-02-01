import { mount } from '@vue/test-utils'
import STabs from '@/components/STabs/STabs.vue'
import { STabsType } from '@/components/STabs/STabs.type'
import { Loading } from '@/reusability/directives'

describe('General tests for STabs', () => {
  const global = { directives: { loading: Loading } }

  test('Is Vue snapshot', () => {
    const wrapper = mount(
      {
        template: `
        <s-tabs v-model="activeTab" :tabs="tabs">
          <template #tab-1>
            <span class="mt-40">111</span>
          </template>
          <template #tab-2>
              <span>222</span>
          </template>
          <template #tab-3>
              <span>333</span>
          </template>
        </s-tabs>`,
        components: { STabs },
        data: () => ({
          activeTab: 'Пункт 1',
          tabs: ['Пункт 1', 'Пункт 2', 'Пункт 3'],
        }),
      },
      { global }
    )
    expect(wrapper.element).toMatchSnapshot()
  })

  test('Is emitted by emit', async () => {
    const wrapper = mount(STabs, {
      props: {
        modelValue: 'Пункт 1',
        tabs: ['Пункт 1', 'Пункт 2', 'Пункт 3'],
      },
      global,
    })

    const nextTab = wrapper.findAll('.s-tabs__item')[0]
    await nextTab.trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  test('Test with empty props', () => {
    const wrapper: any = mount(STabs, {
      props: {
        modelValue: 'Пункт 1',
      },
      global,
    })

    expect(wrapper.vm.$props?.tabs?.length).toBe(0)
  })

  test('Show badge', () => {
    const BADGE_VALUE = '11'

    const wrapper: any = mount(STabs, {
      props: {
        modelValue: 'Пункт 1',
        tabs: [
          'Пункт 1',
          'Пункт 2',
          {
            title: 'Пункт 3',
            value: 4,
            badge: BADGE_VALUE,
          },
        ] as STabsType,
      },
      global,
    })

    const badge = wrapper.find('.s-tabs__badge')

    expect(badge.exists()).toBeTruthy()
    expect(badge.text()).toBe(BADGE_VALUE)
  })

  test('Do not block element when badge is 0 and disabled is false', async () => {
    const BADGE_VALUE = '0'

    const wrapper: any = mount(STabs, {
      props: {
        modelValue: 'Пункт 1',
        tabs: [
          'Пункт 1',
          'Пункт 2',
          {
            title: 'Пункт 3',
            value: 4,
            badge: BADGE_VALUE,
            disabled: false,
          },
        ] as STabsType,
      },
      global,
    })

    const nextTab = wrapper.findAll('.s-tabs__item')[2]
    await nextTab.trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  test('Do not show badge when showBadge is false', () => {
    const BADGE_VALUE = '0'

    const wrapper = mount(STabs, {
      props: {
        modelValue: 'Пункт 1',
        tabs: [
          'Пункт 1',
          'Пункт 2',
          {
            title: 'Пункт 3',
            value: 4,
            badge: BADGE_VALUE,
            showBadge: false,
          },
        ] as STabsType,
      },
      global,
    })

    const badge = wrapper.find('.s-tabs__badge')

    expect(badge.exists()).toBeFalsy()
  })
})
