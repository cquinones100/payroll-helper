import React from 'react'
import * as parsing from '../utils/parsing/payrollParsing'

describe('payroll parsing', () => {
  describe('isSpreadOfHours()', () => {


  })
})

describe('applyEmployeeHours()', () => {
  it('applies hours to an employee', () => {
    const employees = {
      'Smith, John': {
        name: 'Smith, John',
        regularHours: 36.0,
        employeeId: '11111',
        otHours: 0.0
      }
    }

    const hours = '5'

    const name = 'Smith, John'

    expect(parsing.applyEmployeeHours(employees, hours, name)).toEqual({
      'Smith, John': {
        name: 'Smith, John',
        regularHours: 40.0,
        employeeId: '11111',
        otHours: 1.0
      }
    })
  })
})

describe('isOverTime()', () => {

  const employee = {
    regularHours: '41'
  }

  const underEmployee = {
    regularHours: '39'
  }

  it('returns true for overtime', () => {
    expect(parsing.isOverTime(employee)).toEqual(true)
  })

  it('returns false for overtime', () => {
    expect(parsing.isOverTime(underEmployee)).toEqual(false)
  })
})

describe('add new employee', () => {
  it('adds a new employee', () => {
    const employees = {
      'Smith, John': {
        name: 'Smith, John',
        regularHours: 40.0,
        employeeId: '11111',
        otHours: 1.0
      }
    }
    const name = 'Smith, Jane'

    const employeeData = [
      'JOHN,SMITH,11111,200000,Store 1',
      'JANE,SMITH,11112,200000,Store 1'
    ]

    expect(parsing.addNewEmployee(employees, employeeData, name)).toEqual(
      {
        'Smith, John': {
          name: 'Smith, John',
          regularHours: 40.0,
          employeeId: '11111',
          otHours: 1.0
        },
        'Smith, Jane': {
          name: 'Smith, Jane',
          regularHours: 0.0,
          employeeId: '11112',
          otHours: 0.0
        }
      }
    )
  })
})

it('finds an employee id by name', () => {
  const employeeData = [
    'JOHN,SMITH,11111,200000,Store 1',
    'JIMMY,SMITH,11112,200000,Store 1'
  ]

  const name = 'Smith, John'

  expect(parsing.getEmployeeIdByName(name, employeeData)).toEqual('11111')
})

it('gets a name from the row', () => {
  const row = [
    '', "'Smith", " John'",
    '', '', '', '20287',
    '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']

  expect(parsing.getNameFromRow(row)).toEqual('Smith, John')
})

describe('spread of hours', () => {
  it('can tell when there is spread of hours needed', () => {
    expect(parsing.isSpreadOfHours(11.0)).toEqual(true)
  })

  it('applies spread of hours to an employee\'s data', () => {
    const employees = {
      'Smith, John': {
        name: 'Smith, John',
        regularHours: 40.0,
        employeeId: '11111',
        otHours: 1.0
      },
      'Smith, Jane': {
        name: 'Smith, Jane',
        regularHours: 11.0,
        employeeId: '11112',
        otHours: 0.0
      }
    }

    const expectedEmployees = {
      'Smith, John': {
        name: 'Smith, John',
        regularHours: 40.0,
        employeeId: '11111',
        otHours: 1.0
      },
      'Smith, Jane': {
        name: 'Smith, Jane',
        regularHours: 10.0,
        spreadOfHours: 1,
        employeeId: '11112',
        otHours: 0.0
      }
    }

    const name = 'Smith, Jane'
    const hours = '11.0'

    expect(parsing.applySoh(employees, name, hours)).toEqual(expectedEmployees)
  })
})


describe('parsing time card', () => {
  const data = [
    "Employee Timecard,,,,,,,,,,,,,Store 1,,,,,,,",
    "9/25/2017 2:22:12 PM (UTC-05:00) Eastern Time (US & Canada),,,,,,,,,,,,,9/18/2017 - 9/24/2017,,,,,,,",
    "Employe Name,,,,,Payroll ID,,,,,,,,,,,,,,,", ",'Smith, John',,,,11111,,,,,,,,,,,,,,,",
    "Date,,Job,Time In,Time Out,,,Regular,OT,Ext,,Total…eaks,Rate,Total Pay,,Non-Cash Tips,,Declared Tips",
    "9/18/2017,,FOH Counter,9:30 AM,5:30 PM,,,8,0,0,,8,0,,0,$12.50 ,$100.00 ,,$0.00 ,,$4.00 ",
    "9/22/2017,,FOH Counter,9:33 AM,4:56 PM,,,7.38,0,0,,7.38,0,,0,$12.50 ,$92.25 ,,$0.00 ,,$9.00 ",
    "Totals:,,,,,,,15.38,0,0,,15.38,0,,0,$192.25 ,,,$0.00 ,,$13.00 ", ",Signature,,,,,Date,,,,Signature,,,,,,,,,Date,",
    "Employe Name,,,,,Payroll ID,,,,,,,,,,,,,,,",
    ",'Smith, Jane',,,,20400,,,,,,,,,,,,,,,",
  ]

  it('gets its location', () => {
    expect(parsing.getLocationFromTimeCard(data[0])).toEqual('Store 1')
  })

  it('gets its pay period', () => {
    expect(parsing.getPayPeriodFromTimeCard(data[1])).toEqual('9/18/2017 - 9/24/2017')
  })
})
