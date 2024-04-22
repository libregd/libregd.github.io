import bootstrap from '$lib/bootstrap'
import type { Tooltip } from 'bootstrap'
import type { Action } from 'svelte/action'

export const tooltip: Action<HTMLElement, Partial<Tooltip.Options> | undefined> = function tooltip(
	node,
	config = {},
) {
	let inst = bootstrap.Tooltip.getOrCreateInstance(node, config)
	return {
		update(config) {
			// @ts-ignore
			inst.setContent({ '.tooltip-inner': config!.title })
		},
		destroy() {
			inst.dispose()
		},
	}
}
