import { redirect } from '@sveltejs/kit'

export async function load({ parent }) {
	const { langPathPrefix } = await parent()
	redirect(307, langPathPrefix + '/posts/c_Project/')
}
