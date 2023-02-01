<template>
  <section class="s-tabs">
    <ul ref="listElement" class="s-tabs__list" role="tablist">
      <li
        v-for="(tab, index) in normalizedTabs"
        :key="index"
        class="s-tabs__item bold"
        role="tab"
        :aria-selected="modelValue === tab.value"
        :aria-setsize="normalizedTabs.length"
        :aria-posinset="index + 1"
        tabindex="0"
        :class="{
          's-tabs__item--active': modelValue === tab.value,
          's-tabs__item--disabled': tab.disabled,
        }"
        @click="handleTabChangeByIndex(index)"
        @keyup.enter.space="handleTabChangeByIndex(index)"
      >
        {{ tab.title }}
        <s-badge v-if="tab.showBadge" class="s-tabs__badge" :content="tab.badge" />
      </li>
    </ul>
    <div v-if="tabs.length" ref="sliderElement" class="s-tabs__slider" aria-hidden="true" />
    <slot name="content-prepend" />
    <div v-if="passedTabs.length" v-loading="loading" class="s-tabs__content" role="none">
      <template v-for="tab in passedTabs" :key="tab.value">
        <template v-if="lazy">
          <article v-if="modelValue === tab.value" class="s-tabs__panel" role="tabpanel">
            <!-- @slot tab's content -->
            <slot :name="`tab-${tab.value}`" />
          </article>
        </template>
        <template v-else>
          <article v-show="modelValue === tab.value" class="s-tabs__panel" role="tabpanel">
            <!-- @slot tab's content -->
            <slot :name="`tab-${tab.value}`" />
          </article>
        </template>
      </template>
    </div>
    <slot name="content-append" />
  </section>
</template>

<script lang="ts">
import { defineComponent, computed, PropType, ref, onMounted, nextTick, useSlots, onUnmounted, watch } from 'vue'
import { STabItem, STabValue, STabsType } from '@/components/STabs/STabs.type'
import SBadge from '@/components/SBadge/SBadge'

export default defineComponent({
  name: 'STabs',
  components: { SBadge },
  props: {
    /** @model */
    modelValue: [String, Number] as PropType<STabValue>,

    /** Tab list */
    tabs: {
      type: Array as PropType<STabsType>,
      default: () => [],
    },

    /** Passed tabs */
    onlyPassed: {
      type: Boolean as PropType<boolean>,
      default: true,
    },

    /** lazy load content */
    lazy: Boolean as PropType<boolean>,

    /** Loading on content */
    loading: Boolean as PropType<boolean>,
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const slots = useSlots()
    const sliderElement = ref<HTMLDivElement>()
    const listElement = ref<HTMLUListElement>()

    const normalizedTabs = computed<STabItem[]>((): STabItem[] => {
      if (props.tabs?.length) {
        return props.tabs.map((tab: STabItem | string, index: number) => {
          const isObject = typeof tab === 'object'
          const newIndex = index + 1

          const result: STabItem = {
            title: isObject ? tab.title : String(tab),
            value: isObject ? tab.value ?? newIndex : newIndex,
          }

          if (!isObject) return result

          if (tab.badge) {
            result.badge = tab.badge
            result.showBadge = tab.showBadge ?? !!tab.badge
          }

          if (tab.disabled) result.disabled = tab.disabled

          return result
        })
      }

      return []
    })

    const activeIndex = computed<number>((): number => {
      return normalizedTabs.value.findIndex((item) => item.value === props.modelValue)
    })

    const passedTabs = computed(() => {
      if (!props.onlyPassed) {
        return normalizedTabs.value
      }

      const tabsSlots = Object.keys(slots).filter((key) => key.includes('tab-'))

      return normalizedTabs.value.filter(
        (normalizedTab) => normalizedTab.value && tabsSlots.includes(`tab-${normalizedTab.value}`)
      )
    })

    watch(
      () => normalizedTabs.value,
      () => {
        nextTick(() => setSliderStyles())
      }
    )

    watch(
      () => props.modelValue,
      () => {
        nextTick(() => setSliderStyles())
      }
    )

    const handleTabChangeByIndex = (index: number) => {
      emit('update:modelValue', normalizedTabs.value[index].value)
    }

    const getCurrentElement = (children: NodeListOf<ChildNode> | undefined) => {
      if (!children) return null

      const currentIndex = activeIndex.value + 1

      for (let i = 0; i < children.length; ++i) {
        const el = children[i]

        if (el instanceof HTMLLIElement && +(el.ariaPosInSet as string) === currentIndex) return el
      }
      return null
    }

    const setSliderStyles = () => {
      if (!sliderElement.value) return

      const currentElement = getCurrentElement(listElement.value?.childNodes)
      if (!currentElement) return

      const top = listElement.value?.clientHeight ?? 0

      if (top) sliderElement.value.style.top = `${top}px`

      sliderElement.value.style.minWidth = `${currentElement.clientWidth}px`
      sliderElement.value.style.transform = `translateX(${currentElement.offsetLeft}px)`
    }

    onMounted(() => {
      setSliderStyles()
      window.addEventListener('load', setSliderStyles, true)
      window.addEventListener('resize', setSliderStyles, true)
    })

    onUnmounted(() => {
      window.removeEventListener('load', setSliderStyles, true)
      window.removeEventListener('resize', setSliderStyles, true)
    })

    return {
      passedTabs,
      listElement,
      sliderElement,
      normalizedTabs,
      handleTabChangeByIndex,
    }
  },
})
</script>
