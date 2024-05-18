export const prerender = true

import fs from 'fs/promises'
import { glob } from 'glob'
import { simpleGit, type SimpleGit } from 'simple-git'
import fpath from 'path'

const git: SimpleGit = simpleGit()

export interface Attributes {
	title: string
	tags: string[]
	desc: string
	poster?: string
	lang: string
	banner?: string
	filepath: string
}
import fm, { type FrontMatterResult } from 'front-matter'
import { replaceLink } from '$routes/[[lang]]/posts/[tag]/[post]/md'

export interface Post extends FrontMatterResult<Attributes> {
	created: Date
	updated: Date
	path: string
	id: number
}

export async function GET() {
	const files = await glob('blog/**/*.md')
	const postsTasks = files
		.filter((f) => !f.startsWith('blog/Draftbox'))
		// 以 _ 开头的 md 文件不会显示
		.filter((f) => !fpath.basename(f).startsWith('_'))
		.map(async (f) => {
			let content = await fs.readFile(f, 'utf8')
			let r = fm<Attributes>(content) as Post
			r.attributes.filepath = f
			const result = await git.log({ file: f })
			if (result.total > 0) {
				r.created = new Date(result.all.slice(-1)[0].date)
				r.updated = new Date(result.latest!.date)
			} else {
				const stat = await fs.stat(f)
				r.created = stat.ctime
				r.updated = stat.mtime
			}
			if (!r.attributes.title) {
				r.attributes.title = fpath.basename(f).slice(5)
			}
			const dir = fpath.dirname(f)
			const fname = f.slice(dir.length)
			const category = 'c_' + dir.slice('blog/'.length).replace('/', '_')
			r.attributes.tags = (r.attributes?.tags ?? []).concat(category)
			r.path = fpath.join('/posts', category, fname)
			if (fname.endsWith('.en.md')) {
				r.path = '/en' + r.path.slice(0, -1 * '.en.md'.length) + '.md'
				r.attributes.lang = 'en'
			} else {
				r.attributes.lang = 'zh'
			}
			if (r.attributes.banner) {
				r.attributes.banner = replaceLink(r.attributes.banner, { path: r.path })
			}
			return r
		})
	let posts = await Promise.all(postsTasks)
	posts = posts.sort((a, b) => {
		// let n1 = getDate(a.path)
		// let n2 = getDate(b.path)
		return a.created.getTime() > b.created.getTime() ? -1 : 1
	})
	posts = posts.map((a, index) => {
		a.id = index
		return a
	})
	const resp = JSON.stringify(posts, null, 2)
	return new Response(resp, {
		headers: {
			'Content-Type': 'application/json',
		},
	})
}

function getDate(path: string): number {
	const date = path.slice('blog/'.length).split('-')[0]
	return Number(date.replace('/', ''))
}
