export const isATimeCard = (lines) => (
  lines[0].split(',')[0] === 'Employee Timecard'
)

export const isEmployeeData = (array, fileName) => {
  return array.filter(line => line.split(',').length === 5)
          .length === array.length - 1 &&
          /app data/.exec(fileName) !== null
}

export const getLocationFromTimeCard = (row) => row.split(',')[13]

export const getPayPeriodFromTimeCard = (row) => row.split(',')[13]

export const getEmployeeIdByName = (name, employeeData) => {
  const transformedName = name.toUpperCase().split(',').reduce((acc, curr, index) => {
    acc.unshift(curr.replace(' ', ''))
    return acc
  }, []).join('')
  return employeeData.slice(0, employeeData.length - 1).find(emp => {
    return emp.split(',')
      .slice(0, 2).join('') === transformedName
  }).split(',')[2]
}

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
  const dataObj = {
    location: location,
    payPeriod: payPeriod,
    employees: {}
  }
  let name = ''
  let employeeId = ''

  data.slice(2, data.length - 1).forEach((row, index) => {
    const newRow = row.split(',')
    if (isANewEmployee(newRow)) {
      name = (newRow.slice(1, 3).join(''))
      .replace(/"/g, '').replace(' ', ', ')
      try {
        employeeId = getEmployeeIdByName(name, employeeData)
      } catch (e) {

      }
      dataObj.employees[name] = {
        name: name,
        employeeId: employeeId,
        regularHours: 0.0,
      }
    } else if (isAnEmployeeRow(newRow)) {
      dataObj.employees[name].regularHours += parseFloat(newRow[11])
      if (dataObj.employes[name].regularHours > 40) {
        const difference = dataObj.employees[name].regularHours - 40
        dataObj.employees[name].regularHours = 40
        dataObj.employees[name].otHours += difference
      } else {
        dataObj.employees[name].otHours = 0
      }
      if (!dataObj.employees[name].rate) {
        dataObj.employees[name].rate = newRow[15]
      }
    }
  })
  return dataObj
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
