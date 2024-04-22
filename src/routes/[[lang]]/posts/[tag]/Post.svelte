<script lang="ts">
	import 'highlight.js/styles/default.min.css'
	import type { Post } from '$routes/data/posts.json/+server'

	import { t } from '$lib/translations'
	import Placeholder from './placeholder.png'
	import { onMount } from 'svelte'
	export let post: Post & { content: string }
	$: tags = post.attributes.tags.filter((t) => !t.startsWith('c_'))
	let show = false
	let btn: HTMLElement
	onMount(() => {
		// console.log(btn)
		btn.addEventListener('show.bs.collapse', () => {
			show = true
		})
		btn.addEventListener('hide.bs.collapse', () => {
			show = false
		})
	})
	$: banner = post.attributes?.banner ?? Placeholder
</script>

<div class="card rounded-4">
	<a href={post.path} class="d-none">{post.attributes.title}</a>
	<img src={banner} width="960" height="204" alt="" class="card-img-top" />
	<div class="card-body">
		<h4 class="card-title">
			{post.attributes.title}
		</h4>
		{#if tags.length}
			<div class="row row-cols-auto g-2">
				{#each tags as tag}
					<div class="col">
						<button class="btn rounded-5 btn-light" disabled>{tag}</button>
					</div>
				{/each}
			</div>
		{/if}
		{#if post.attributes.desc}
			<p class="card-text">
				{post.attributes.desc}
			</p>
		{/if}
	</div>
	<div class="collapse" id="post-{post.path}" bind:this={btn}>
		<div class="card-body border-top">
			{@html post.content}
		</div>
	</div>
	<a
		class="card-footer text-center"
		class:active={show}
		data-bs-toggle="collapse"
		href="#post-{post.path}"
	>
		<small>
			{show ? $t('common.collapse_artcile') : $t('common.expand_artcile')}
		</small>
	</a>
</div>

<style>
	a.card-footer {
		text-decoration: none;
		color: #6b7280;
		transition: all 0.3s;
	}
	a.card-footer:hover,
	a.card-footer:active,
	a.card-footer.active {
		color: #000;
		background: #f3f4f6;
		box-shadow: inset 0px 1px 0px #0000001a;
	}
	.card {
		overflow: hidden;
	}
	.card-body :global(img) {
		max-width: 100%;
	}
</style>
