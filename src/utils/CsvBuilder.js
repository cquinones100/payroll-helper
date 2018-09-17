class CsvBuilder {
  constructor({ data, location }) {
    this.data = data
    this.location = location
    this.encodedUri = this.encodeCsv()
  }

  download() {
    const link = document.createElement('a')
    link.setAttribute('href', this.encodedUri)
    link.setAttribute('download', `${this.location.name}.csv`)
    document.body.appendChild(link)

    link.click()
  }

  encodeCsv() {
    return (
      encodeURI(
        this.data.reduce((csv, employee) => {
          return csv += this.buildPayLines(employee)
        }, 'data:text/csv;charset=utf-8,')
      )
    )
  }

  buildPayLines(employee) {
    const payCategories = ['regularHours', 'tips', 'overTimeHours', 'sohHours', 'callInPayHours'] 

    return (
      payCategories.reduce((string, category) => {
        const line = this[`${category}Line`](employee)

        if (line && line !== '') {
          return string += `${line}\r\n`
        } else {
          return string
        }
      }, '')
    )
  }

  categoryPresent(value) {
    return value && parseFloat(value) > 0
  }

  regularHoursLine(employee) {
    return `${employee.payrollId},E,REG,${employee.regularHours}`
  }

  tipsLine(employee) {
    const { tips } = employee

    if (this.categoryPresent(tips)) {
      return `${employee.payrollId},E,CCTIP,,${employee.tips}`
    }
  }

  overTimeHoursLine(employee) {
    const { overTimeHours } = employee
    const { otCode } = this.location.region

    if (this.categoryPresent(overTimeHours)) {
      return `${employee.payrollId},E,${otCode},${employee.overTimeHours}`
    }
  }

  sohHoursLine(employee) {
    const { sohHours } = employee
    const { sohCode } = this.location.region

    if (this.categoryPresent(sohHours)) {
      return `${employee.payrollId},E,${sohCode},${employee.sohHours}`
    }
  }

  callInPayHoursLine(employee) {
    const { callInPayHours } = employee
    const { callInPayCode } = this.location.region

    if (this.categoryPresent(callInPayHours)) {
      return `${employee.payrollId},E,${callInPayCode},${employee.callInPayHours}`
    }
  }
}

export default CsvBuilder
