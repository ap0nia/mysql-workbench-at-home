<script lang="ts">
  import { onMount } from 'svelte'
  import { EditorView } from '@codemirror/view'
  import { state, value } from '$lib/codemirror'
  import { getAndParseContent } from '$lib/sql/visualizer'

  let editorView: EditorView

  let parent: HTMLElement

  let html = ''

  onMount(() => {
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

<div class="flex p-1 border-2 border-primary-200">
  <div class="w-1/2">
    <div bind:this={parent} />
  </div>

  <div class="divider-vertical" />

  <div class="h-full w-1/2">
    {@html html}
  </div>
</div>
