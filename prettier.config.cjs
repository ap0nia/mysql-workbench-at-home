/**
 * `cjs` format is required for plugins to work in VSCode.
 * @see {@link https://github.com/tailwindlabs/prettier-plugin-tailwindcss/issues/113}
 */

/** @type {import('prettier').Config} */
module.exports = {
  semi: false,
  singleQuote: true,
  printWidth: 100,
  htmlWhitespaceSensitivity: 'ignore',
  plugins: ['prettier-plugin-svelte', 'prettier-plugin-tailwindcss'],
  pluginSearchDirs: false,
  overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }]
};
