module.exports = {
  root: true,
  env: {
    node: true
  },
  plugins: ["es-beautifier"],
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    "plugin:es-beautifier/standard",
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'linebreak-style': 'off',
    'comma-dangle': 'off',
    'space-before-function-paren': ['error', 'always'],
    'vue/multi-word-component-names': 'off',
    'no-trailing-spaces': ['off', 'always'],
    'es-beautifier/multiline-import-specifiers': ['off', 'always'],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-explicit-any": "off"
    
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
