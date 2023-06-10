import UnoCSS from '@unocss/svelte-scoped/vite'
import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    UnoCSS(),
    sveltekit(),
  ]
})
