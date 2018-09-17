import EmployeeRowParser from '../utils/EmployeeRowParser'

const ParsedTimeCardProvider = ({ render, location }) => {
  const { rawRows:rows } = location

  const data = rows.reduce((completedRows, row, index) => {
    const parser = new EmployeeRowParser({ row, completedRows, index, rows, location })

    return parser.parse()
  }, [])

  const sohEmployees = data.reduce((acc,employee) => {
    employee.workDays.forEach(day => {
      if (day.isSoh) {
        acc.push({ name: employee.name, ...day})
      }
    })

    return acc
  }, [])


  const overTimeEmployees = data.filter(employee => employee.workDays.find(day => (
    day.overTimeHours && day.overTimeHours > 0
  )))

  const callInPayEmployees = data.reduce((acc,employee) => {
    employee.workDays.forEach(day => {
      if (day.isCallInPay) {
        acc.push({ name: employee.name, ...day})
      }
    })

    return acc
  }, [])

  return render({
    data,
    sohEmployees,
    overTimeEmployees,
    callInPayEmployees,
  }) 
}

export default ParsedTimeCardProvider
