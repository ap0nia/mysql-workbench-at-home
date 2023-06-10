<script lang="ts">
  import mermaid from "mermaid";
  import { onMount } from "svelte";
  import { getAndParseContent } from "$lib/explain_sql_visualization";

  let value = JSON.stringify(
    {
      query_block: {
        select_id: 1,
        r_loops: 1,
        r_total_time_ms: 0.183283374,
        table: {
          table_name: "Item",
          access_type: "ALL",
          r_loops: 1,
          rows: 719,
          r_rows: 719,
          r_table_time_ms: 0.136826829,
          r_other_time_ms: 0.036546113,
          filtered: 100,
          r_filtered: 100,
        },
      },
    },
    null,
    2
  );

  let html = "";

  onMount(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: "default",
      securityLevel: "loose",
      themeVariables: {
        fontSize: "13px",
      },
      flowchart: {
        curve: "linear",
        diagramPadding: 0,
      },
    });
  });

  function isJsonString(str: string) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  $: {
    if (isJsonString(value)) {
      getAndParseContent(value).then((content) => {
        html = content;
      });
      // value = JSON.stringify(JSON.parse(value), null, 2);
    } else {
    }
  }
</script>

<div class="prose max-w-full my-4">
  <h1 class="text-center">We have MySQL Workbench at Home</h1>
</div>

<div class="flex p-4">
  <div class="w-1/3 prose">
    <label for="">
      <h2>MySQL "EXPLAIN" JSON Output</h2>
      <textarea rows="30" cols="50" bind:value />
    </label>
  </div>

  <div class="w-2/3 max-w-full prose">
    <h2>Visual Explain</h2>
    <div class="h-full border border-pink-400">
      {@html html}
    </div>
  </div>
</div>
