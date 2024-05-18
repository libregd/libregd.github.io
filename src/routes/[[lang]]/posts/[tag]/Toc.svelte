<script lang="ts" context="module">
	export interface Item {
		name: string
		link: string
		sub?: Item[]
		open?: boolean
	}
</script>

<script lang="ts">
	import { tooltip } from '$lib/action/bootstrap'
	import { onMount } from 'svelte'

	export let items: Item[]
	import { slide } from 'svelte/transition'
	let self: HTMLElement
	let target: string
	import { page } from '$app/stores'
	let isPosts = $page.route.id === '/[[lang]]/posts/[tag]'
	onMount(() => {
		const table = self.parentNode as HTMLElement
		if (!table.classList.contains('table-of-contents')) {
			return
		}
		table.classList.add('d-xxl-block')
		const card = table.parentNode!.parentNode!.parentNode as HTMLElement
		if (isPosts) {
			target = (card.querySelector('a.card-footer') as HTMLLinkElement).href
		}
		table.style.marginRight = `${card.clientWidth / 2}px`
	})
	export let lv = 0
	import { t } from '$lib/translations'
</script>

<ol class="ol p-0 m-1 pt-1 mt-0" bind:this={self} class:root={lv === 0} class:posts={isPosts}>
	{#each items as item}
		<li>
			{#if !item.sub}
				<div class="row g-0 flex-nowrap">
					<div class="col col-auto">
						<button type="button" class="btn btn-sm border-0" disabled>
							<i class="bi bi-caret-right"></i>
						</button>
					</div>
					<div class="col link">
						<a href={item.link} title={item.name} use:tooltip>{item.name}</a>
					</div>
				</div>
			{:else}
				{@const open = !!item.open}
				<div class="row g-0 flex-nowrap">
					<div class="col col-auto">
						<button
							type="button"
							class="btn btn-sm border-0"
							on:click={() => (item.open = !item.open)}
						>
							<i class="bi" class:bi-caret-right-fill={!open} class:bi-caret-down-fill={open}></i>
						</button>
					</div>
					<div class="col link">
						<a href={item.link} title={item.name} use:tooltip>{item.name}</a>
					</div>
				</div>
				{#if open}
					<div transition:slide class="sub">
						<svelte:self items={item.sub} lv={lv + 1}></svelte:self>
					</div>
				{/if}
			{/if}
		</li>
	{/each}
</ol>
{#if lv === 0 && isPosts}
	<a class="d-block text-center border-top py-2" href={target} data-bs-toggle="collapse">
		{$t('common.collapse_artcile')}
	</a>
{/if}

<style>
	.ol {
		list-style: none !important;
		margin-bottom: 0;
	}
	.link {
		text-wrap: nowrap;
		max-width: 100%;
	}
	.link a {
		display: inline-block;
		max-width: 90%;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	ol.root {
		overflow-y: auto;
		overflow-x: hidden;
		max-height: calc(100vh - 6rem - 2rem);
	}
	ol.root.posts {
		max-height: calc(100vh - 6rem - 2rem - 40px);
	}
</style>
