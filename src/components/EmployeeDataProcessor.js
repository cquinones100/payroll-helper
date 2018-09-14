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

  floatingPointValue(value) {
    return parseFloat(value).toPrecision(4)
  }

  dollarValueFromRow(value) {
    return this.floatingPointValue(value.replace('$', ''))
  }

  timeValueFromRow(value) {
    // value.replace(/(\d{2,}\/){2,}\d{4}\s/, '')
    return value
  }

  rateFromRow(row) {
    return this.dollarValueFromRow(this.attributeFromRow('rate', row))
  }

  timeInFromRow(row) {
    return this.timeValueFromRow(this.attributeFromRow('timeIn', row))
  }

  timeOutFromRow(row) {
    return this.timeValueFromRow(this.attributeFromRow('timeOut', row))
  }

  totalPayFromRow(row) {
    return this.dollarValueFromRow(this.attributeFromRow('totalPay', row))
  }

  totalHoursFromRow(row) {
    return this.floatingPointValue(this.attributeFromRow('totalHours', row))
  }

  nonCashTipsFromRow(row) {
    return this.dollarValueFromRow(this.attributeFromRow('nonCashTips', row))
  }

  regularHoursFromRow(row) {
    return this.floatingPointValue(this.attributeFromRow('regularHours', row))
  }

  overTimeHoursFromRow(row) {
    return this.floatingPointValue(this.attributeFromRow('overTimeHours', row))
  }

  paidBreaksFromRow(row) {
    return this.floatingPointValue(this.attributeFromRow('paidBreaks', row))
  }

  extHoursFromRow(row) {
    return this.floatingPointValue(this.attributeFromRow('extHours', row))
  }

  declaredTipsFromRow(row) {
    return this.dollarValueFromRow(this.attributeFromRow('declaredTips', row))
  }

  initialRowData(row) {
    const { sohHours, callInPayHours } = this.props.location.region

    const isSoh = parseFloat(this.attributeFromRow('totalHours', row)) > parseFloat(sohHours)
    const isCallInPay = parseFloat(this.attributeFromRow('totalHours', row)) < parseFloat(callInPayHours)

    return ({
      date: this.dateFromRow(row),
      isSoh,
      isCallInPay
    })
  }

  completeRowData(acc, row) {
    const attributes = [
      'job', 'timeIn', 'timeOut', 'regularHours', 'overTimeHours', 'extHours', 
      'totalHours', 'paidBreaks', 'rate', 'totalPay', 'nonCashTips', 'declaredTips'
    ]

    const workDay = attributes.reduce((acc, attribute) => {
      if (this[`${attribute}FromRow`]) {
        acc[attribute] = this[`${attribute}FromRow`](row)
      } else {
        acc[attribute] = this.attributeFromRow(attribute, row)
      }

      return acc
    }, this.initialRowData(row))

    acc[acc.length - 1].workDays.push(workDay)

    return acc
  }

  completeEmployeeData(employees) {
    const employee = employees[employees.length - 1]
    const { workDays } = employee

    const totalHours = workDays.reduce((acc, day) => {
      return acc += parseFloat(day.totalHours)
    }, 0).toPrecision(4)

    const jobs = workDays.reduce((acc, curr, index) => {
      if (acc.indexOf(curr.job) === -1) {
        return acc += `${index > 0 ? ', ' : ''}${curr.job}`
      } else {
        return acc
      }
    }, '')

    const overTimeHours = totalHours - 40 > 0 ? totalHours - 40 : 0

    const newEmployee = {
      ...employee,
      overTimeHours,
      totalHours,
      regularHours: overTimeHours ? 40 : totalHours,
      jobs
    }

    return employees.slice(0, employees.length - 1).concat(newEmployee)
  }

  sohEmployees(data) {
    return data.reduce((acc,employee) => {
      employee.workDays.forEach(day => {
        if (day.isSoh) {
          acc.push({ name: employee.name, ...day})
        }
      })

      return acc
    }, [])
  }

  overTimeEmployees(data) {
    return data.filter(employee => employee.workDays.find(day => (
      day.overTimeHours && day.overTimeHours > 0
    )))
  }

  callInPayEmployees(data) {
    return data.reduce((acc,employee) => {
      employee.workDays.forEach(day => {
        if (day.isCallInPay) {
          acc.push({ name: employee.name, ...day})
        }
      })

      return acc
    }, [])
  }

  render() {
    const { location, employeeData, render } = this.props 
    const { region, rawRows:locationRows } = location
    const {
      sohCode,
      callInPayHours,
      callInPayCode,
      otHours,
      otCode,
    } = region

    const parsedData = locationRows.reduce((acc, curr) => {
      const row = Papa.parse(curr).data[0]
      if (!row) { return acc }
      if (parseFloat(this.attributeFromRow('totalHours', row)) === 0) { return acc }

      const name = this.employeeNameFromRow(row)
      const payrollId = this.payRollIdFromRow(row)
      const isAnEmployeeRow = acc.length > 0 ? this.dateFromRow(row) : undefined


      if (name && payrollId) { 
        if (acc.length > 0) { acc = this.completeEmployeeData(acc) }

        acc.push({
          payrollId,
          name,
          workDays: [],
        })
      } 

      if (isAnEmployeeRow) { return this.completeRowData(acc, row) }

      return acc
    }, [])

    const data = this.completeEmployeeData(parsedData)

    return render({
      data,
      sohEmployees: this.sohEmployees(data),
      overTimeEmployees: this.overTimeEmployees(data),
      callInPayEmployees: this.callInPayEmployees(data),
    }) 
  }
}

export default EmployeeDataProcessor

