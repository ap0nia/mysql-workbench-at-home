<script lang="ts">
  import '@skeletonlabs/skeleton/themes/theme-skeleton.css'
  import '@skeletonlabs/skeleton/styles/skeleton.css'

  import { AppShell, autoModeWatcher } from '@skeletonlabs/skeleton'
  import Header from '$lib/components/Header.svelte'
  import SideBar from '$lib/components/SideBar.svelte'
</script>

<svelte:head>
  {@html `<script>${autoModeWatcher.toString()} autoModeWatcher();</script>`}
</svelte:head>

<AppShell>
  <svelte:fragment slot="header">
    <Header />
  </svelte:fragment>

  <svelte:fragment slot="sidebarLeft">
    <SideBar />
  </svelte:fragment>

  <slot />
</AppShell>
