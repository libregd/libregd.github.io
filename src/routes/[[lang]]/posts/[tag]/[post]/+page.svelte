<script lang="ts">
	import 'highlight.js/styles/default.min.css'
	export let data
	$: post = data.post
	$: tags = post.attributes.tags.filter((t) => !t.startsWith('c_'))
	import Post from '../Post.svelte'
</script>

<div class="container my-5">
	<Post {post} show article></Post>
</div>

<style>
	.container {
		max-width: 960px;
		min-width: 450px;
	}
</style>
