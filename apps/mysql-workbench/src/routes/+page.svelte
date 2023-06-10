<script lang="ts">
  import { onMount } from 'svelte'
  import { EditorView } from '@codemirror/view'
  import { state } from '$lib/codemirror'

  let parent: HTMLElement

  let editorView: EditorView

  onMount(() => {
    editorView = new EditorView({ state, parent })

    return {
      destroy() {
        editorView.destroy()
      },
    }
  })
</script>

<div class="flex">
  <div class="w-1/2">
    <div bind:this={parent} />
  </div>
  <div class="w-1/2">
    <div>Mermaid.JS Chart</div>
  </div>
</div>
