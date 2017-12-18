export const isATimeCard = (lines) => {
  return lines.filter(line => line.split(',').length === 21)
          .length === lines.length -1
}

export const isEmployeeData = (array, fileName) => {
  return array.filter(line => line.split(',').length === 5)
          .length === array.length - 1 &&
          /app data/.exec(fileName) !== null
}
