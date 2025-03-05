/** @typedef {import("prettier").Config} PrettierConfig */

/** @type { PrettierConfig } */
const config = {
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  singleQuote: true,
  trailingComma: 'es5',
  semi: true,
  tabWidth: 2,
  jsxSingleQuote: true,
  importOrder: [
    '^.+\\.(css|sass|scss|less)$',
    'react-scan',
    '^react$',
    '^react-dom(.*)$',
    // Other third-party packages
    '^@(?!(repo|/))[^/]+/[^/]+$',
    '^[^@\\.]+$',

    // Monorepo packages
    '^@repo/(.*)$',

    // Local imports
    '^@/(.*)$',
    '^#/(.*)$',

    // Relative paths
    '^\\.\\./',
    '^\\./',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

export default config;
