import { type Post, GET } from '$routes/data/posts.json/+server.js'
import { error } from '@sveltejs/kit'
import { md } from './md'
import { resolveRoute } from '$app/paths'

export async function load({ fetch, params, parent, route, url }) {
	const posts: Post[] = await fetch('/data/posts.json').then((r) => r.json())
	const path = resolveRoute(route.id, params)
	for (let post of posts) {
		if (post.path === path) {
			const content = md.render('[[_toc_]]\n' + post.body, { path: post.path, id: post.id })
			// @ts-ignore
			const { subnavs = [] } = await parent()
			return {
				post: { ...post, content: content },
				subnavs: [
					...subnavs,
					{
						name: `${post.attributes.title}`,
						link: resolveRoute(route.id, params),
					},
				],
			}
		}
	}
	error(404)
}
