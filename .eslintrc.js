module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },

  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],

  parserOptions: {
    ecmaVersion: 2021,
  },

  plugins: [],

  rules: {
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    'no-useless-constructor': 'off',
    'linebreak-style': ['error', 'unix'],
    'object-curly-spacing': ['error', 'always', { objectsInObjects: true }],
    'no-irregular-whitespace': 'off',

    'vue/no-v-html': 'off',
    'vue/require-default-prop': 'off',
    'vue/no-side-effects-in-computed-properties': 'off',
    'vue/object-curly-spacing': ['error', 'always', { objectsInObjects: true }],
    'vue/component-name-in-template-casing': ['error', 'kebab-case', { ignores: [] }],
    'vue/v-on-event-hyphenation': ['error', 'always', { ignore: ['update:modelValue'] }],
    'vue/no-parsing-error': ['error', { 'x-invalid-namespace': false }],

    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'any',
          normal: 'always',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],

    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
  },
}
