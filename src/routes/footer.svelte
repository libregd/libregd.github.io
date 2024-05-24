<script>
	import { tooltip } from '$lib/action/bootstrap'
	import { t } from '$lib/translations'
</script>

<footer>
	<div class="container text-center text-secondary py-4 my-2">
		<div class="my-2">
			{$t('common.footer_meme')}
		</div>
		<div class="row row-cols-auto g-2 justify-content-center">
			<div class="col">
				<a
					href="https://github.com/libregd"
					target="github"
					class="btn btn-sm"
					use:tooltip
					title="Github"
				>
					<i class="bi bi-github"></i>
				</a>
			</div>
			<div class="col">
				<a
					href="https://x.com/libregd60294"
					target="twitter"
					class="btn btn-sm"
					use:tooltip
					title="Twitter"
				>
					<i class="bi bi-twitter-x"></i>
				</a>
			</div>
		</div>
	</div>
</footer>
