import * as payroll from './payrollParsing'

export const isATimeCard = (lines) => (
  lines[0].split(',')[0] === 'Employee Timecard'
)

export const isEmployeeData = (array, fileName) => {
  return array.filter(line => line.split(',').length === 5)
          .length === array.length - 1 &&
          /app data/.exec(fileName) !== null
}

export const toCsv = (data) => {
  const roundFloat = (float) => parseFloat(float).toFixed(2)
  const arr = Object.keys(data.employees).reduce((acc, curr) => {
    acc.push(
      `${data.employees[curr].employeeId},E,REG,${roundFloat(data.employees[curr].regularHours)}`
    )
    if (data.employees[curr].otHours !== '0.0' &&
        data.employees[curr].otHours !== undefined
    ) {
      acc.push(
        `${data.employees[curr].employeeId},E,OT,${roundFloat(data.employees[curr].otHours)}`
      )
    }
    return acc
  }, [])
  const header = "data:text/csv;charset=utf-8,"
  return header + arr.join('\r\n')
}

export const isADuplicateLocation = (newData, currentData) => (
  currentData.find(data => data.location === newData.location) !== undefined
)
