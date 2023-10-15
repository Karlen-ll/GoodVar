import { SerpOptions } from '@serp/searchEngine.type'

export const SERP_MAP: Record<'google' | 'microsoft' | 'yandex', SerpOptions> = {
  google: {
    width: 600,
    logo: { name: 'google' },
    name: 'Google',
    menu: [
      'All',
      'Videos',
      'News',
      'Shopping',
      'Maps',
      { label: 'More', hideOnMobile: true },
      { label: 'Tools', hideOnMobile: true },
      { label: 'Settings', hideOnMobile: true },
    ],
  },

  microsoft: {
    width: 608,
    logo: { name: 'bing' },
    name: 'Microsoft Bing',
    menu: ['All', 'Images', 'Videos', 'Maps', 'News'],
  },

  yandex: {
    width: 536,
    logo: { name: 'yandex' },
    name: 'Yandex',
    menu: [
      'All',
      'Images',
      'Videos',
      'Maps',
      'Shopping',
      { label: 'News', hideOnMobile: true },
      { label: 'Translate', hideOnMobile: true },
      { label: 'More', hideOnMobile: true },
    ],
    search: {
      text: 'Search',
      props: { hideSeparator: true, appendStretch: true },
    },
  },
}
