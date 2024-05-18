import { type Post, GET } from '$routes/data/posts.json/+server.js'
import { md } from './[post]/md'

export async function load({ fetch, params }) {
	let posts: Post[] = await fetch('/data/posts.json').then((r) => r.json())
	posts = posts.filter((post) => {
		if ((params.lang ?? 'zh') !== post.attributes.lang) {
			return false
		}
		const tags = post.attributes.tags
		return tags.filter((t) => t.startsWith(params.tag)).length > 0
	})
	return {
		posts: posts.map<Post & { content: string }>((post) => {
			return {
				...post,
				content: md.render('[[_toc_]]\n' + post.body, { path: post.path }),
			}
		}),
	}
}

// export async function entries() {
// 	const langs = ['', 'en']
// 	const posts: Post[] = await GET().then((r) => r.json())
// 	let tags = posts
// 		.map((post) => post.attributes.tags)
// 		.reduce((tt, t) => {
// 			return tt.concat(t)
// 		}, [] as string[])
// 	tags = tags.filter((t) => t.startsWith('c_'))
// 	let entries: { lang: string; tag: string }[] = []
// 	for (const lang of langs) {
// 		for (const tag of tags) {
// 			entries.push({
// 				lang: lang,
// 				tag: tag,
// 			})
// 		}
// 	}
// 	console.log(entries)
// 	return entries
// }
