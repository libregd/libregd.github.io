import { resolveRoute } from '$app/paths'

export async function load({ parent, route, params }) {
	const { subnavs } = await parent()
	return {
		subnavs: [...subnavs, { name: 'common.nav_about', link: resolveRoute(route.id, params) }],
	}
}
