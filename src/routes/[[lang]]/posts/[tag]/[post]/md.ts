import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import linkReplacer from 'markdown-it-replace-link'
import anchor from 'markdown-it-anchor'
import toc from 'markdown-it-toc-done-right'

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
	// @ts-ignore
	.use(linkReplacer, { replaceLink: replaceLink })
	.use(anchor)
	// @ts-ignore
	.use(toc, {
		containerClass: 'table-of-contents bg-body rounded-4 py-2 d-none d-xxl-block',
	})
