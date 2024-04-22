export const prerender = true

export const trailingSlash = 'always'

import { loadTranslations } from '$lib/translations'

export interface Nav {
	name: string
	link: string
}

export async function load({ params, url }) {
	const initLocale = params.lang ?? 'zh' // get from cookie, user session, ...

	await loadTranslations(initLocale, url.pathname) // keep this just before the `return`

	return {
		subnavs: [
			// { name: '首页', link: '/' }
		] as Nav[],
		lang: initLocale,
		langPathPrefix: initLocale === 'zh' ? '' : '/' + initLocale,
	}
}
