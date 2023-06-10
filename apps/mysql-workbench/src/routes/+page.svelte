<script lang="ts">
  import mermaid from 'mermaid'
  import { onMount } from 'svelte'
  import { EditorView } from '@codemirror/view'
  import { getAndParseContent } from '$lib/sql/visualizer'
  import { state, value } from '$lib/codemirror'

  let parent: HTMLElement

  let editorView: EditorView

  let html = ''

  onMount(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'loose',
      themeVariables: {
        fontSize: '13px',
      },
      flowchart: {
        curve: 'linear',
        diagramPadding: 0,
      },
    })

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
  <div class="w-1/2 h-full">
    {@html html}
  </div>
</div>
