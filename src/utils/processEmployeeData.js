const processEmployeeData = data => {
  const employees = data.split('\n')

  if (hasFailedValidation(employees)) { return error('Format is incorrect') }

  return success(parsedEmployees(employees)) 
}

const parsedEmployees = employees => (
  employees.reduce((acc, curr, index) => {
    const employee = curr.split(',')

    if (index !== employees.length - 1) {
      acc.push({
        name: employee[0] + ' ' + employee[1],
        number: employee[2],
        location: employee[4] ? employee[4].replace('\r', '') : ''
      })
    }

    return acc
  }, [])
)

const success = employees => ({
  status: 200,
  employees
})

const hasFailedValidation = data => (
  !validateLengthOfEmployeeDataRows(data)
)

const validateLengthOfEmployeeDataRows = rows => (
  !rows.find(row => row !== '' && row.split(',').length !== 5)
)

const error = message => ({
  status: 422, 
  message
})

export default processEmployeeData
