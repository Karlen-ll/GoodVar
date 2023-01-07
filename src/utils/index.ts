export const getStyleSize = (value?: string | number) => {
  if (!value || typeof value === 'string') {
    return value
  }

  return value > 0 ? value + 'px' : 0
}
