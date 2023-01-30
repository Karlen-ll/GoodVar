export const toggleArrayElement = <T extends string | number>(array: T[], value: T) => {
  const index = array.indexOf(value)

  if (index !== -1) {
    array.splice(index, 1)
  } else {
    array.push(value)
  }

  return array
}
