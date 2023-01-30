type StyleSizeProps = {
  width?: number | string
  height?: number | string
  minWidth?: number | string
  minHeight?: number | string
  maxWidth?: number | string
  maxHeight?: number | string
}

type StyleSizeProp = 'width' | 'height' | 'minWidth' | 'minHeight' | 'maxWidth' | 'maxHeight'

export const getStyleSize = (value?: string | number) => {
  if (!value || typeof value === 'string') {
    return value
  }

  return value > 0 ? value + 'px' : 0
}

export const getStyleSizeByProps = (
  props: StyleSizeProps,
  keys: StyleSizeProp[] = ['width', 'height', 'minWidth', 'minHeight', 'maxWidth', 'maxHeight']
) => {
  const style: StyleSizeProps = {}

  keys.forEach((key) => {
    if (props[key]) {
      style[key] = getStyleSize(props[key])
    }
  })

  return style
}
