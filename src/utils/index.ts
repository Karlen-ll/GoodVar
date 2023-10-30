export const toggleArrayElement = <T extends string | number>(array: T[], value: T) => {
  const index = array.indexOf(value)

  if (index !== -1) {
    array.splice(index, 1)
  } else {
    array.push(value)
  }

  return array
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
