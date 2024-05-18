import type { Action } from 'svelte/action'
import Toc, { type Item } from './Toc.svelte'

export const toc: Action = function toc(node) {
	const toc = node.querySelector('.table-of-contents')
	if (!toc) {
		return
	}
	const ol = toc.firstChild as HTMLOListElement
	let items = getItem(ol)
	new Toc({ target: toc, hydrate: true, props: { items } })
}

function getItem(ol: HTMLOListElement, lv = 1) {
	return Array.from(ol.childNodes).map<Item>((elem) => {
		const link = elem.firstChild! as HTMLLinkElement
		let item: Item = {
			link: link.href,
			name: link.textContent!,
			open: lv < 3,
		}
		const ol = elem.lastChild! as HTMLOListElement
		if (ol.tagName != 'OL') {
			return item
		}
		item.sub = getItem(ol, lv + 1)
		return item
	})
}
