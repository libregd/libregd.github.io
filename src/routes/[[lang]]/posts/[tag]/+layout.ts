import { resolveRoute } from '$app/paths'

export async function load({ parent, route, params }) {
	const { subnavs } = await parent()
	let name = 'common.nav_article'
	switch (params.tag) {
		case 'c_LearnLog':
			name = 'common.nav_learn'
			break
		case 'c_Project':
			name = 'common.nav_proj'
			break
	}
	return {
		subnavs: [...subnavs, { name: name, link: resolveRoute(route.id, params) }],
	}
}
