import * as payroll from './payrollParsing'

export const isATimeCard = (lines) => (
  lines[0].split(',')[0] === 'Employee Timecard'
)

export const isEmployeeData = (array, fileName) => {
  return array.filter(line => line.split(',').length === 5)
          .length === array.length - 1 &&
          /app data/.exec(fileName) !== null
}

const roundFloat = (float) => parseFloat(float).toFixed(2)

export const toCsv = (data) => {
  const arr = Object.keys(data.employees).reduce((acc, curr) => {
    const emp = data.employees[curr]
    acc.push(buildRegularHoursLine(emp)) // add regular hours line
    if (hasOt(emp)) { acc.push(buildOtLine(emp)) } // check for and add overtime
    if (hasSoh(emp)) { acc.push(buildSohLine(emp)) } // check for and add spread of hours
    return acc
  }, [])
  const header = 'data:text/csv;charset=utf-8,'
  return header + arr.join('\r\n')
}

export const isADuplicateLocation = (newData, currentData) => (
  currentData.find(data => data.location === newData.location) !== undefined
)

export const buildOtLine = (emp) => (
  `${emp.employeeId},E,OT,${roundFloat(emp.otHours)}`
)

export const hasOt = (emp) => (
  emp.otHours !== '0.0' &&
  emp.otHours !== undefined &&
  emp.otHours !== 0.0
)

export const hasSoh = (emp) => (
  emp.spreadOfHours !== '0.0' &&
  emp.spreadOfHours !== undefined &&
  emp.spreadOfHours !== 0.0
)

export const buildSohLine = (emp) => (
  `${emp.employeeId},E,SOH,${roundFloat(emp.spreadOfHours)}`
)

export const buildRegularHoursLine = (emp) => (
  `${emp.employeeId},E,REG,${roundFloat(emp.regularHours)}`
)
