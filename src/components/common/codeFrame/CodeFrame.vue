<script setup lang="ts">
withDefaults(
  defineProps<{
    lang?: string
  }>(),
  {
    lang: 'html',
  }
)
</script>

<template>
  <pre class="code-frame">
    <code class="code-frame__code" :data-lang="lang"><slot /></code>
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
    color: #c70909;
    font-size: 14px;
    border-radius: 0;
    display: inline-block;
    padding: 0 1.5em 0.3em;
  }

  :deep(.tag) {
    color: #3b78e7;
  }

  :deep(.attr-name) {
    color: #9c27b0;
  }

  :deep(.attr-str) {
    color: #0d904f;
  }
}
</style>
