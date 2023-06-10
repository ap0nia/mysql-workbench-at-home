/**
 * `cjs` format is required for plugins to work in VSCode.
 * @see {@link https://github.com/tailwindlabs/prettier-plugin-tailwindcss/issues/113}
 */

/** @type {import('prettier').Config} */
module.exports = {
  plugins: ['prettier-plugin-svelte', 'prettier-plugin-tailwindcss'],
  overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }]
};
