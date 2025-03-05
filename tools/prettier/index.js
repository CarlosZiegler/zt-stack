/** @typedef {import("prettier").Config} PrettierConfig */

/** @type { PrettierConfig } */
const config = {
  plugins: [],
  singleQuote: true,
  trailingComma: 'es5',
  semi: true,
  tabWidth: 2,
  jsxSingleQuote: true,
  importOrder: [
    '^next/(.*)$',
    '^@/server/(.*)$',
    '^@/trpc/(.*)$',
    '^@/components/(.*)$',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

export default config;
