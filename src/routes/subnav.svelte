<script lang="ts">
	import { page } from '$app/stores'
	import type { Nav } from '$routes/+layout.server'
	$: subnav = $page.data.subnavs as Nav[]
</script>

<nav aria-label="breadcrumb">
	<ol class="breadcrumb mb-0">
		{#each subnav.slice(0, -1) as nav}
			<li class="breadcrumb-item">
				<a href={nav.link}>{nav.name}</a>
			</li>
		{/each}
		{#each subnav.slice(-1) as nav}
			<li class="breadcrumb-item active" aria-current="page">
				{nav.name}
			</li>
		{/each}
	</ol>
</nav>
