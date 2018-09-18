import Papa from 'papaparse'
import TimeCardMap from '../utils/TimeCardMap'

class EmployeeRowParser {
  constructor({ row, completedRows, index, rows, location }) {
    this.completedRows = completedRows
    this.index = index
    this.location = location

    this.row = row ? Papa.parse(row).data[0] : undefined
    this.isTheLastRow = index === rows.length - 1 

    this.timeCardMap = new TimeCardMap(this.row)

    if (this.timeCardMap.isAValidRow) {
      this.totalHours = this.timeCardMap.totalHours
      this.name = this.timeCardMap.name
      this.payrollId = this.timeCardMap.payrollId
      this.date = this.timeCardMap.date

      this.hasNoRecordedHours = parseFloat(this.totalHours === 0)
      this.isANewEmployeeRow = this.name && this.payrollId
      this.isTheFirstEmployee = this.completedRows.length === 0
      this.isAWorkDayRow = this.date
    }
  }

  parse() {
    if (!this.row && this.isTheLastRow) { 
      this.parseTheLastRow()
      return this.completedRows
    } else if (!this.row && !this.isTheLastRow) {
      return this.completedRows
    }

    if (!this.timeCardMap.isAValidRow) { 
      if (this.isTheLastRow) { this.parseTheLastRow() }

      return this.completedRows 
    }

    if (this.hasNoRecordedHours) { return this.completedRows }

    if (this.isANewEmployeeRow) { this.parseNewEmployeeRow() }

    if (this.isAWorkDayRow) { this.addWorkDay() }

    if (this.isTheLastRow) { this.parseTheLastRow() }

    return this.completedRows
  }

  addWorkDay() {
    const { row, rowFormat, name, payrollId, ...rest } = this.timeCardMap
    const { sohHours, callInPayHours } = this.location.region
    const { totalHours, date } = this

    const isSoh = parseFloat(totalHours) > parseFloat(sohHours)
    const isCallInPay = parseFloat(totalHours) < parseFloat(callInPayHours)

    this.completedRows[this.completedRows.length - 1]
      .workDays.push({
        date,
        isSoh,
        isCallInPay,
        ...rest
      })
  }

  parseTheLastRow() {
    this.completePreviousEmployeeData()
  }

  calculateTips(tipSheet, employee) {
    if (tipSheet) {
      const tipRow = Papa
        .parse(tipSheet)
        .data
        .find(row => parseInt(row[1], 10) === parseInt(employee.payrollId, 10))

      if (tipRow) { return parseFloat(tipRow[5]).toPrecision(4) }
    }
  }

  completePreviousEmployeeData() {
    const { location, completedRows:employees } = this
    const { tipSheet } = location

    const employee = employees[employees.length - 1]
    const { workDays } = employee

    const totalHours = workDays.reduce((acc, day) => (
      acc += parseFloat(day.totalHours)
    ), 0).toPrecision(4)

    const jobs = workDays.reduce((acc, curr, index) => {
      if (acc.indexOf(curr.job) === -1) {
        return acc += `${index > 0 ? ', ' : ''}${curr.job}`
      } else {
        return acc
      }
    }, '')

    const overTimeHours = totalHours - 40 > 0 ? totalHours - 40 : undefined

    const sohHours = workDays.reduce((acc, { isSoh }) => isSoh ? acc += 1 : acc, 0)

    const callInPayHours = workDays.reduce((acc, { isCallInPay }) => (
      isCallInPay ? acc += 1 : acc
    ), 0)

    const completedEmployeeData =  {
      ...employee,
      overTimeHours,
      totalHours,
      regularHours: overTimeHours ? 40 : totalHours,
      jobs,
      tips: this.calculateTips(tipSheet, employee),
      sohHours,
      callInPayHours
    }

    this.completedRows = employees.slice(0, employees.length - 1).concat(completedEmployeeData)
  }

  addNewEmployeeData() {
    const { payrollId, name } = this

    this.completedRows.push({ payrollId, name, workDays: [] })
  }

  parseNewEmployeeRow() {
    if (!this.isTheFirstEmployee) { this.completePreviousEmployeeData() }

    this.addNewEmployeeData()
  }
}

export default EmployeeRowParser

