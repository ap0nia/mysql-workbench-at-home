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

<div class="border-primary-200 flex border-2 p-1">
  <div class="w-1/2">
    <div bind:this={parent} />
  </div>

  <div class="divider-vertical" />

  <div class="h-full w-1/2">
    {@html html}
  </div>
</div>
