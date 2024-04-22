<script>
	import { t } from '$lib/translations'
</script>

<div class="container">
	<div class="row flex-column align-items-center justify-content-center">
		<div class="col col-auto text-center text-secondary">
			<img src="/not-found.svg" alt="not-found" width="400.35" height="300" class="img-fluid" />
			<br />
			{$t('common.err_404')}
		</div>
	</div>
</div>

<style>
	.container > .row {
		min-height: 40vh;
	}
</style>
