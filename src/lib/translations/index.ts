import i18n, { type Config } from 'sveltekit-i18n'

const config: Config = {
	loaders: [
		{
			locale: 'zh',
			key: 'common',
			loader: () => import('./zh/common.json').then((m) => m.default),
		},
    {
			locale: 'en',
			key: 'common',
			loader: () => import('./en/common.json').then((m) => m.default),
		},
	],
	fallbackLocale: 'zh',
}

export const { t, locale, locales, loading, loadTranslations } = new i18n(config)
