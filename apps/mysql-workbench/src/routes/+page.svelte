<script lang="ts">
  import { onMount } from 'svelte'
  import { EditorView } from '@codemirror/view'
  import { getAndParseContent } from '$lib/explain_sql_visualizer'
  import { state, value } from '$lib/codemirror'

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

<div class="flex">
  <div class="w-1/2">
    <div bind:this={parent} />
  </div>
  <div class="h-full w-1/2">
    {@html html}
  </div>
</div>
