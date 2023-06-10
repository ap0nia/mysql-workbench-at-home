<script lang="ts">
  import { AppRail, AppRailAnchor } from '@skeletonlabs/skeleton'
  import { page } from '$app/stores'

  const contents = [
    { title: 'Visual Explain Plan', href: '/' },
    { title: 'Documentation', href: '/docs' },
  ]
</script>

<AppRail width="w-24">
  {#each contents as { href, title }}
    <AppRailAnchor selected={$page.url.pathname === href} {title} name={title} {href}>
      <span>{title}</span>
    </AppRailAnchor>
  {/each}
</AppRail>
