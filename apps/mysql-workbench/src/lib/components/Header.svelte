<script lang="ts">
  import { AppBar, LightSwitch } from '@skeletonlabs/skeleton'
</script>

<AppBar>
  <svelte:fragment slot="lead">
    <div>
      <img src="/mysql-logo.svg" alt="MySQL Logo" width="48" height="48" />
    </div>
  </svelte:fragment>

  <div>
    <h1 class="h1 text-center">MySQL Workbench</h1>
  </div>

  <svelte:fragment slot="trail">
    <LightSwitch />
  </svelte:fragment>
</AppBar>
