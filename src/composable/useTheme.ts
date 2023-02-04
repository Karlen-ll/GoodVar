import { computed, readonly, ref } from 'vue'

type ColorScheme = 'dark' | 'light'

const inverseThemeMap: Record<ColorScheme, ColorScheme> = {
  dark: 'light',
  light: 'dark',
}

const checkColorScheme = () => {
  return window?.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const getColorScheme = () => {
  return (localStorage.getItem('theme') as ColorScheme | null) ?? checkColorScheme()
}

const theme = ref(getColorScheme())
const isInit = ref(false)

export function useTheme() {
  if (!isInit.value) {
    document.documentElement.classList.add(theme.value)
    isInit.value = true
  }

  const toggleTheme = () => {
    theme.value = inverseThemeMap[theme.value]

    document.documentElement.classList.replace(inverseThemeMap[theme.value], theme.value)
    localStorage.setItem('theme', theme.value);
  }

  const isDark = computed(() => theme.value === 'dark')

  return {
    isDark,
    theme: readonly(theme),
    toggleTheme,
  }
}
