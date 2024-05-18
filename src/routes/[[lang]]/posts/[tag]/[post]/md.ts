import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import linkReplacer from 'markdown-it-replace-link'
import anchor from 'markdown-it-anchor'
import toc from 'markdown-it-toc-done-right'
import markdownItAttrs from 'markdown-it-attrs'

export const fakeHost = 'http://fakeHost'

export const replaceLink = (link: string, env: { path: string }) => {
	if (link.startsWith('http')) {
		return link
	}
	const u = new URL(link, fakeHost + env.path + '/')
	return u.toString().slice(fakeHost.length)
}

// @ts-ignore
export const md = MarkdownIt({
	// @ts-ignore
	highlight(str, lang) {
		if (lang && hljs.getLanguage(lang)) {
			try {
				return (
					'<pre><code class="hljs">' +
					hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
					'</code></pre>'
				)
			} catch (__) {}
		}
		return '<pre><code class="hljs">' + md.utils.escapeHtml(str) + '</code></pre>'
	},
})
	.use(markdownItAttrs)
	// @ts-ignore
	.use(linkReplacer, { replaceLink: replaceLink })
	.use(anchor, {
		// 这里会有个bug, 就是列表页的 id 一样时可能会出现问题, 等待 https://github.com/valeriangalliat/markdown-it-anchor/pull/125 合并后再处理
		// slugify: (s) => {
		// 	return '55_' + encodeURIComponent(String(s).trim().toLowerCase().replace(/\s+/g, '-'))
		// },
	})
	// @ts-ignore
	.use(toc, {
		containerClass: 'table-of-contents bg-body rounded-4 py-2 d-none d-xxl-block',
		// slugify: (s: string) => {
		// 	return '55_' + encodeURIComponent(String(s).trim().toLowerCase().replace(/\s+/g, '-'))
		// },
	})
