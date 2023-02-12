<script setup lang="ts">
import { computed, ref } from 'vue'
import VIcon from '@atom/icon/VIcon.vue'
import VInput from '@atom/input/VInput.vue'
import VButton from '@atom/button/VButton.vue'
import SwitcherGroup from '@atom/switcher/SwitcherGroup.vue'
import { SerpCompany, SerpOptions } from '@serp/searchEngine.type'
import { SERP_MAP } from '@serp/searchEngine.const'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    company: SerpCompany
  }>(),
  {
    company: 'google',
    searchIcon: 'search',
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'search', value: string): void
}>()

const inputValue = ref('')
const currentMenu = ref<number>(0)

const options = computed<SerpOptions>(() => {
  return {
    ...SERP_MAP[props.company],
    menu: SERP_MAP[props.company]?.menu?.map((item) => (typeof item === 'string' ? { label: item } : item)) ?? [],
  }
})

const handleSearch = () => emit('search', props.modelValue ?? '')
</script>

<template>
  <header :class="['serp-header', `serp-header--${props.company}`]" role="presentation">
    <div class="serp-header__search">
      <!-- @slot Slot for `prepend` elements -->
      <slot name="prepend" />
      <div class="serp-header__logo" :aria-label="options?.name || `Search engine` + ' logo'">
        <v-icon v-bind="options?.logo" sprite="logos" postfix="logo" />
      </div>
      <div class="serp-header__input">
        <v-input
          v-model="inputValue"
          v-bind="options?.search?.props"
          title="Search"
          placeholder="Search..."
          native-placeholder
        >
          <template #append>
            <v-button
              :mode="!options?.search?.text ? 'icon' : 'default'"
              :icon="!options?.search?.text ? options?.search?.icon || 'search' : undefined"
              aria-label="Search button"
              @click="handleSearch"
            >
              {{ options?.search?.text }}
            </v-button>
          </template>
        </v-input>
      </div>
    </div>
    <switcher-group
      v-model="currentMenu"
      :items="options.menu"
      class="serp-header__menu"
      presentation
      type="tab"
      hide-label
    />
  </header>
</template>

<style scoped lang="scss">
.serp-header {
  $self: &;

  border-bottom: 1px solid $color--border;

  &__search {
    width: 100%;
    max-width: 770px;
    display: flex;
  }

  &__logo {
    width: $serp-offset;
    height: $input-height;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: #{$serp-offset * 0.13};
    box-sizing: border-box;
    position: relative;

    .icon {
      width: 100%;
      height: 100%;
    }
  }

  &__input {
    flex: 1;
  }

  &__menu {
    width: 100%;
    display: flex;
    margin: 1em 0 0 $serp-offset;

    &.switcher-group {
      border-radius: 0;
    }

    :deep(.switcher) {
      .switcher__text {
        transition: opacity $timeout-sm;
        color: $color--font-65;
      }
    }

    :deep(.switcher--checked) {
      .switcher__input:checked ~ .switcher__text {
        color: $color--font-85;
      }
    }
  }

  &--google,
  &--microsoft {
    #{$self} {
      &__input {
        margin-left: -#{$input-height * 0.1};

        :deep(.input) {
          border-radius: $input-height;
          box-shadow: 0 0 3px 0 $color--shadow;
          padding-left: 0.75em;
          padding-right: 0.75em;

          @include hover-within {
            border-color: $color--border !important;
            box-shadow: 0 0 6px 0 $color--shadow;
          }
        }
      }
    }
  }

  &--google {
    #{$self} {
      &__logo {
      }

      &__input {
      }
    }
  }

  &--microsoft {
    #{$self} {
      &__logo {
        color: #737373;
      }

      &__menu {
        :deep(.switcher) {
          .switcher__text {
            padding: $offset-sm #{$offset-sm * 0.75};
          }
        }
      }
    }
  }

  &--yandex {
    #{$self} {
      &__logo {
        .icon {
          max-width: 100px;
        }

        //color: #d0d0d0;
      }

      &__input {
        :deep(.input) {
          border-color: #fc0;

          @include hover-within {
            border-color: #fc0 !important;
          }

          .input__append {
            .icon {
              color: $color--font-85;
            }

            &-wrapper {
              color: $color--black;
              background-color: #fc0;
              overflow: hidden;
              margin-left: $offset-sm;

              :deep(.icon) {
                color: $color--white;
              }
            }
          }
        }
      }

      &__menu {
        :deep(.switcher) {
          .switcher__text {
            padding-left: 0;
            padding-right: 0;
          }
        }
      }
    }
  }
}
</style>
