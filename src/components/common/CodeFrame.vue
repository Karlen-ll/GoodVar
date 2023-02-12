<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    value: (string | [string, string])[][]
    lang?: number | string
  }>(),
  {
    lang: 'html',
  }
)
</script>

<template>
  <pre class="code-frame">
    <code class="code-frame__code" :data-lang="lang">
      <span class="code-frame__list" role="list">
        <span v-for="line in value" :key="line.toString()" class="code-frame__item" role="listitem">
          <template v-if="Array.isArray(line)">
            {{ line }}
          </template>
          <template v-else>{{ line }}</template>
        </span>
      </span>
    </code>
  </pre>
</template>

<style scoped lang="scss">
.code-frame {
  height: 100%;
  margin: 0 3px 0 0;
  box-sizing: border-box;

  &,
  &__code {
    line-height: 1.5;
    background-color: transparent;
    text-align: left;
    white-space: pre-wrap;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    tab-size: 2;
    hyphens: none;
  }

  &__code {
    color: #131313;
    font-size: 14px;
    border-radius: 0;
    display: inline-block;
    padding: 0 1.5em 0.3em 3em;
  }

  &__list {
    counter-reset: line;
    padding: 0;
  }

  &__item {
    list-style: none;

    &::before {
      left: 0;
      width: 1.8rem;
      line-height: 1.5;
      display: inline-block;
      counter-increment: line;
      content: counter(line);
      background-color: transparent;
      color: #909090;
      text-align: right;
      margin: 0 1em 0 -2.8em;
    }
  }
}
</style>
