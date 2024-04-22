export const prerender = true

import { type Post } from '$routes/data/posts.json/+server.js'
import { SitemapStream, streamToPromise } from 'sitemap'
import { base } from '$app/paths'
import { dev } from '$app/environment'
import { domain } from '$lib/config.js'

export async function GET({ fetch, url }) {
	const posts: Post[] = await fetch('/data/posts.json').then((r) => r.json())
	const stream = new SitemapStream({
		hostname: dev ? url.toString() : `https://${domain}`,
	})
	for (let post of posts) {
		stream.write({
			url: base + post.path + '/',
		})
	}
	stream.end()
	const resp = await streamToPromise(stream)
	return new Response(resp, {
		headers: {
			'Content-Type': 'text/xml',
		},
	})
}
