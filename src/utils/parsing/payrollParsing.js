export function isOverTime (employee) {
  return parseFloat(employee.regularHours) > 40.0
}

export const getEmployeeIdByName = (name, employeeData) => {
  const transformedName = name.toUpperCase().split(',').reduce((acc, curr, index) => {
    acc.unshift(curr.replace(' ', ''))
    return acc
  }, []).join('')
  return employeeData.slice(0, employeeData.length).find(emp => {
    return emp.split(',')
      .slice(0, 2).join('') === transformedName
  }).split(',')[2]
}

export function applyEmployeeHours (employees, hours, name) {
  const newHours = employees[name].regularHours += parseFloat(hours)
  employees = {
    ...employees,
    [name]: {
      ...employees[name],
      regularHours: newHours
    }
  }
  if (isOverTime(employees[name])) {
    const difference = employees[name].regularHours - 40
    employees[name].regularHours = 40
    employees[name].otHours += difference
  }
  return employees
}

export function addNewEmployee(employees, employeeData, name) {
  let employeeId
  try {
    employeeId = getEmployeeIdByName(name, employeeData)
  } catch (e) {
    console.log(e)
    employeeId = 'employee not found'
  }
  employees[name] = {
    name: name,
    employeeId: employeeId,
    regularHours: 0.0,
    otHours: 0.0
  }
  return employees
}

export const getNameFromRow = (row) => (
  row.slice(1, 3)
     .join('')
     .replace(/"|'/g, '')
     .replace(' ', ', ')
)

export const getPayPeriodFromTimeCard = (row) => row.split(',')[13]

export const getLocationFromTimeCard = (row) => row.split(',')[13]

const isANewEmployee = (row) => row[1] !== '' && row[1] !== 'Signature'

const isAnEmployeeRow = (row) => (
  row[1] === '' &&
  row[0] !== 'Date' &&
  row[0] !== 'Totals:' &&
  row[0] !== 'Employe Name' &&
  row[11] !== ''
)

export const parseTimeCard = (data, employeeData) => {
  const location = getLocationFromTimeCard(data[0])
  const payPeriod = getPayPeriodFromTimeCard(data[1])
  const calnpMax = data.calnp
  const dataObj = {
    location: location,
    payPeriod: payPeriod,
    employees: {},
    needsTipSheet: true
  }
  let name = ''
  data.slice(2, data.length - 1).forEach((row, index) => {
    const newRow = row.split(',')
    const hours = newRow[11]
    if (isANewEmployee(newRow)) {
      name = getNameFromRow(newRow)
      dataObj.employees = addNewEmployee(
        dataObj.employees, employeeData, name
      )
    } else if (isAnEmployeeRow(newRow)) {
      dataObj.employees = applyEmployeeHours(
        dataObj.employees, hours, name
      )
      if (!dataObj.employees[name].rate) {
        dataObj.employees[name].rate = newRow[15]
      }
    }
    if (isSpreadOfHours(hours)) { applySoh(dataObj.employees, name, hours) }
    if (isCallInPay(hours, calnpMax)) {
      applyCallInPay(dataObj.employees, name, newRow)
    }
  })
  return dataObj
}

export const isSpreadOfHours = (hours) => parseFloat(hours) > 10.0

export const applySoh = (employees, name, hours) => {
  const spreadOfHours = parseFloat(hours) - 10.0

  return {
    ...employees,
    [name]: {
      ...employees[name],
      regularHours: parseFloat(employees[name].regularHours) - spreadOfHours,
      spreadOfHours: spreadOfHours
    }
  }
}

export const isCallInPay = (hours, calnpMax) => (
  parseFloat(hours) < parseFloat(calnpMax)
)

export const applyCallInPay = (employees, name, row) => {
  const newemp = {...employees}
  if ([newemp[name].callInPay === undefined]) {
    newemp[name].callInPay = []
  }
  return {
    ...newemp,
    [name]: {
      ...newemp[name],
      callInPay: newemp[name].callInPay.concat(row[0])
    }
  }
}
