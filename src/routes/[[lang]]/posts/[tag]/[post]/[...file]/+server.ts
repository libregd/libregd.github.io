import { type Post, GET as GETPosts } from '$routes/data/posts.json/+server.js'
import { error } from '@sveltejs/kit'
import { resolveRoute } from '$app/paths'
import mime from 'mime-types'
import filepath from 'path'
import fs from 'fs/promises'

export const prerender = true

export async function GET({ fetch, route, params }) {
	const posts: Post[] = await fetch('/data/posts.json').then((r) => r.json())
	let post: Post = null as any
	const path = resolveRoute('/[[lang]]/posts/[tag]/[post]/', params)
	// console.log(route.id, path)
	for (let rawPost of posts) {
		if (rawPost.path === path) {
			post = rawPost
			break
		}
	}
	if (!post) {
		error(404)
	}
	const dir = filepath.dirname(post.attributes.filepath)
	const f = filepath.join(dir, params.file)
	const body = await fs.readFile(f)
	const mt = mime.lookup(filepath.extname(f))
	return new Response(body, {
		headers: {
			...(mt ? { 'Content-Type': mt } : {}),
		},
	})
}
