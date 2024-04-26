<script>
	export let data
	import Post from './Post.svelte'
	import NotFound from '$routes/not-found.svelte'
</script>

{#if !data.posts.length}
	<NotFound></NotFound>
{:else}
	<div class="container my-5">
		{#each data.posts as post}
			<div class="my-4">
				<Post {post}></Post>
			</div>
		{/each}
	</div>
{/if}

<style>
	.container {
		max-width:960px;
		min-width:450px;
	}

</style>
