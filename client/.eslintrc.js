module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['import', '@typescript-eslint'],
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', 'tsx'] }],
    'react/jsx-uses-vars': 'error',
    'react/require-default-props': 'off',
    'import/no-unresolved': 'off',
    'import/no-duplicates': 'error',
    'import/no-named-as-default': 'error',
    'import/no-named-as-default-member': 'error',
    'import/no-extraneous-dependencies': 'error',
    'import/extensions': 'off',
    'no-use-before-define': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'no-console': 'warn',
    'react/prop-types': 'off',
    'react/no-array-index-key': 'off',
    'react/jsx-props-no-spreading': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/no-noninteractive-tabindex': 'off',
    'jsx-a11y/control-has-associated-label': 'off',
    'linebreak-style': 'off',

    quotes: ['error', 'single'],
    indent: ['error', 2],
  },
  env: {
    browser: true,
    es2020: true,
  },
};
