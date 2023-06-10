<script lang="ts">
  import { onMount } from 'svelte'
  import { browser } from '$app/environment'
  import { EditorView } from '@codemirror/view'
  import { modeCurrent } from '@skeletonlabs/skeleton'
  import { createState, extensions, value } from '$lib/codemirror'
  import { vscodeDark } from '$lib/themes/vscode'
  import { tokyoNightDay } from '$lib/themes/tokyo-night'
  import { getAndParseContent } from '$lib/sql/visualizer'

  let editorView: EditorView

  let parent: HTMLElement

  let html = ''

  $: {
    if (parent && browser) {
      if ($modeCurrent) {
        editorView?.destroy()
        const state = createState([...extensions, tokyoNightDay])
        editorView = new EditorView({ state, parent })
      } else {
        editorView?.destroy()
        const state = createState([...extensions, vscodeDark])
        editorView = new EditorView({ state, parent })
      }
    }
  }

  onMount(() => {
    const state = createState()
    editorView = new EditorView({ state, parent })
    return {
      destroy() {
        editorView.destroy()
      },
    }
  })

  $: {
    getAndParseContent($value).then((content) => {
      html = content
    })
  }
</script>

<div class="border-primary-200 flex border-2 p-1">
  <div class="w-1/2">
    <div bind:this={parent} />
  </div>

  <div class="divider-vertical" />

  <div class="h-full w-1/2">
    {@html html}
  </div>
</div>
