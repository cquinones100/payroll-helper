import Papa from 'papaparse'

const processEmployeeData = data => {
  const employees = Papa.parse(data).data

  if (hasFailedValidation(employees)) { return error('Format is incorrect') }

  return success(parsedEmployees(employees)) 
}

const parsedEmployees = employees => (
  employees.reduce((acc, employee, index) => {

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
  !rows.find(row => row[0] !== '' && row.length !== 5)
)

const error = message => ({
  status: 422, 
  message
})

export default processEmployeeData
