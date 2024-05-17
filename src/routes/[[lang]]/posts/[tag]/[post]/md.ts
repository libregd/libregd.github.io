import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import linkReplacer from 'markdown-it-replace-link'

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
