import { SerpOptions } from '@serp/searchEngine.type'

export const SERP_MAP: Record<'google' | 'microsoft' | 'yandex', SerpOptions> = {
  google: {
    logo: { name: 'google', width: 160, height: 53 },
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
    logo: { name: 'bing', width: 160, height: 53 },
    name: 'Microsoft Bing',
    menu: [
      'All',
      'Images',
      'Videos',
      'Maps',
      'News',
    ],
  },

  yandex: {
    logo: { name: 'yandex', width: 160, height: 53 },
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
  },
}
