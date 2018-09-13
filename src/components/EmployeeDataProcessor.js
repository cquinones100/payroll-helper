import React, { Component } from 'react' 
import Papa from 'papaparse'

class EmployeeDataProcessor extends Component {
  findEmployeeByPayrollId(payrollId) {
    const { employeeData } = this.props

    return employeeData.find(
      employee => parseInt(employee.number, 10) === parseInt(payrollId, 10)
    )
  }

  attributeFromRow(attribute, row) {
    const rowFormat = {
      name: row[1],
      payrollId: row[5],
      date: row[0],
      job: row[2],
      timeIn: row[3],
      timeOut: row[4],
      regularHours: row[7],
      overTimeHours: row[8],
      extHours: row[9],
      totalHours: row[11],
      paidBreaks: row[12],
      rate: row[15],
      totalPay: row[16],
      nonCashTips: row[18],
      declaredTips: row[20]
    }

    return rowFormat[attribute]
  }

  employeeNameFromRow(row) {
    const name = this.attributeFromRow('name', row)

    if (name && name !== '' && name.toLowerCase() !== 'signature') {
      return name.split(', ').reverse().join(' ')
    }
  }

  payRollIdFromRow(row) {
    const payrollId = this.attributeFromRow('payrollId', row)

    if (payrollId && payrollId !== '' && payrollId.match(/^[0-9]*$/)) {
      return payrollId
    }
  }

  dateFromRow(row) {
    const date = this.attributeFromRow('date', row)

    if (date && date !== '' && Date.parse(date)) {
      return date
    }
  }

  render() {

    const { location, employeeData, render } = this.props 
    const { region, rawRows:locationRows } = location
    const {
      sohHours,
      sohCode,
      callInPayHours,
      callInPayCode,
      otHours,
      otCode,
    } = region

    const parsedData = locationRows.reduce((acc, curr) => {
      const row = Papa.parse(curr).data[0]
      if (!row) { return acc }

      const name = this.employeeNameFromRow(row)
      const payrollId = this.payRollIdFromRow(row)
      const date = acc.length > 0 ? this.dateFromRow(row) : undefined

      const attributes = [
        'job', 'timeIn', 'timeOut', 'regularHours', 'overTimeHours', 'extHours', 
        'totalHours', 'paidBreaks', 'rate', 'totalPay', 'nonCashTips', 'declaredTips'
      ]

      if (name && payrollId) { 
        acc.push({
          payrollId,
          name,
          workDays: []
        })
      } 

      if (date) {
        const workDay = attributes.reduce((acc, attribute) => {
          if (this[`${attribute}FromRow`]) {
            acc[attribute] = this[`${attribute}FromRow`](row)
          } else {
            acc[attribute] = this.attributeFromRow(attribute, row)
          }

          return acc
        }, { date })

        acc[acc.length - 1].workDays.push(workDay)
      }

      return acc
    }, [])

    return render({ data: parsedData }) 
  }
}

export default EmployeeDataProcessor

