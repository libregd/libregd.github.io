<script lang="ts">
	import { page } from '$app/stores'
	import type { Nav } from './+layout'
	import { sitename } from '$lib/config'
	$: subnavs = $page.data.subnavs as Nav[]
	$: subtitle = (subnavs.length === 1 ? subnavs : subnavs.slice(1))
		.map((t) => t.name)
		.reverse()
		.join(' - ')
	import { t } from '$lib/translations'
</script>

<svelte:head>
	<title>{$t(subtitle)} - {sitename}</title>
</svelte:head>
