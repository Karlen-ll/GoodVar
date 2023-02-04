export const toggleArrayElement = <T extends string | number>(array: T[], value: T) => {
  const index = array.indexOf(value)

  if (index !== -1) {
    array.splice(index, 1)
  } else {
    array.push(value)
  }

  return array
}

function removeTrailingSpace(value: string) {
  for (let i = value.length - 1; i >= 0; i--) {
    if (value.charAt(i).search(/\S/) !== -1) {
      value = value.substring(0, i + 1)
      break
    }
  }

  return value
}

function removeExtraSpaces(str: string) {
  const words = str.split(/\s+/)
  let returnStr = ''

  for (let i = 0; i < words.length; i++) {
    if (words[i] !== '') {
      returnStr += words[i]

      if (i !== words.length - 1) {
        returnStr += ' '
      }
    }
  }
  return removeTrailingSpace(returnStr)
}

export const capitalize = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * @desc Word declension
 * @example
 * declination(5, ['яблоко', 'яблока', 'яблок']) */
export const declination = (number: number, words: string[]) => {
  const CASES = [2, 0, 1, 1, 1, 2] as const

  return words[
    number % 1 !== 0 ? 1 : number % 100 > 4 && number % 100 < 20 ? 2 : CASES[number % 10 < 5 ? number % 10 : 5]
    ]
}
