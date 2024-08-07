export default [
  {
    root: true,
    env: {
      node: true
    },
    extends: [
      'plugin:vue/vue3-essential',
      'eslint:recommended',
      '@vue/eslint-config-typescript',
      'prettier'
    ],
    plugins: ['prettier'],
    rules: {
      'vue/multi-word-component-names': 'off',
      'prettier/prettier': 'error'
    }
  }
];
