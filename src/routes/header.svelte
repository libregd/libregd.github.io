<script lang="ts" context="module">
	import { derived } from 'svelte/store'
	const navs = [
		{
			title: 'nav_proj',
			path: '/',
		},
		{
			title: 'nav_learn',
			path: '/posts/c_LearnLog',
		},
		{
			title: 'nav_article',
			path: '/posts/c_ReLog',
		},
		{
			title: 'nav_about',
			path: '/about',
		},
	]
	const activeIndex = derived([page], ([page]) => {
		const pathname = resolveRoute(page.route.id || '', {
			...page.params,
			lang: '',
		})
		const data = navs
		let matched: [number, number][] = []
		for (let i = 0; i < data.length; i++) {
			const v = data[i]
			if (!pathname.startsWith(v.path)) {
				continue
			}
			matched.push([i, v.path.length])
		}
		let x = matched.sort((a, b) => a[1] - b[1]).slice(-1)[0]
		return x?.[0] ?? -1
	})
	import { resolveRoute } from '$app/paths'
</script>

<script>
	import { t } from '$lib/translations'
	import { page } from '$app/stores'
	import { tooltip } from '$lib/action/bootstrap'

	$: lang = $page.data.langPathPrefix
</script>

<header class="bg-white">
	<div class="container">
		<div class="row align-items-center g-0 g-md-2">
			<div class="col col-auto fs-0">
				<a href="{lang}/">
					<img src="/logo.svg" alt="logo" width="50" height="44" />
				</a>
			</div>
			<div class="col">
				<ul
					class="nav nav-underline pt-2 fs-md-5 flex-nowrap justify-content-between justify-content-md-start"
				>
					{#each navs as nav, i}
						<li class="nav-item">
							<a
								class:active={$activeIndex === i}
								class="nav-link px-1 mx-1 px-md-2 mx-md-3"
								href="{lang}{nav.path}"
							>
								{$t(`common.${nav.title}`)}
							</a>
						</li>
					{/each}
				</ul>
			</div>
			<div class="col col-auto">
				<div class="row row-cols-auto g-0 align-items-center">
					<div class="col" class:d-none={lang === '/'}>
						<label for="lang-switch" class:d-none={lang === ''}>
							<a
								href={resolveRoute($page.route.id || '', { ...$page.params, lang: '' })}
								data-sveltekit-preload-data={false}
								use:tooltip
								title="前往中文版"
							>
								中文
							</a>
						</label>
						<label for="lang-switch" class:d-none={lang === '/en'}>
							<a
								href={resolveRoute($page.route.id || '', { ...$page.params, lang: 'en' })}
								data-sveltekit-preload-data={false}
								use:tooltip
								title="Go to English site"
							>
								EN
							</a>
						</label>
					</div>
					<!-- <div class="col">
						<div class="form-check form-switch">
							<input
								type="checkbox"
								class="form-check-input"
								role="switch"
								id="lang-switch"
								checked={lang === '/en'}
								disabled
							/>
						</div>
					</div> -->
				</div>
			</div>
		</div>
	</div>
</header>

<style>
	header {
		position: sticky;
		top: 0;
		z-index: 1;
		box-shadow: 0px 2px 8px #0000001a;
	}
	:global(html) {
		scroll-padding-top: 7rem;
	}
	.nav {
		gap: 0;
	}
	.nav li {
		/* background-color: red; */
	}
</style>
