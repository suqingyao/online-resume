import antfu from '@antfu/eslint-config';

export default antfu({
  ignores: [
    'node_modules',
    'dist',
    'public',
    '**/*.lock',
  ],
  react: true,
  typescript: true,
  formatters: true,
  stylistic: {
    indent: 2,
    semi: true,
    quotes: 'single',
  },
  yaml: true,
  markdown: true,
  jsonc: false,
  rules: {
    // 自定义规则
    'no-console': 'warn',
    'react/prop-types': 'off',
    'unused-imports/no-unused-vars': 'off',
    // 禁用导致栈溢出的缩进规则
    //  'style/indent': 'off',
    //  '@stylistic/indent': 'off',
    //  禁用嵌套组件
    'react/no-nested-components': 'off',
  },
});
