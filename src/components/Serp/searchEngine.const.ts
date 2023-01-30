import { SerpLogo, SerpMenus } from './searchEngine.type'

export const SERP_MAP: Record<'google' | 'microsoft' | 'yandex', { logo: SerpLogo; name: string; menu: SerpMenus }> = {
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
    logo: { name: 'google', width: 160, height: 53 },
    name: 'Microsoft Bing',
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
  yandex: {
    logo: { name: 'google', width: 160, height: 53 },
    name: 'Yandex',
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
}
