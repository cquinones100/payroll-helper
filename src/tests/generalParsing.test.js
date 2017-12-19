import React from 'react'
import * as parsing from '../utils/parsing/generalParsing'

describe('generalParsing', () => {
  xit('can tell if file is a time card', () => {
    const data = [
      ',,,,,,,,,,,,,,,,,,,,',
      ',,,,,,,,,,,,,,,,,,,,',
      ''
    ]

    const badData = [
      ',,,,,,,,,,,,,,,,,,',
      ',,,,,,,,,,,,,,,,,,,,',
      ''
    ]
    expect(parsing.isATimeCard(data)).toEqual(true)
    expect(parsing.isATimeCard(badData)).toEqual(false)
  })

  it('can tell if file is employee data', () => {
    const data = [
      ',,,,',
      ',,,,',
      ''
    ]

    const badData = [
      ',,,,,,,,,,,,,,,,,,',
      ',,,,,,,,,,,,,,,,,,,,',
      ''
    ]

    const fileName = 'app data'
    expect(parsing.isEmployeeData(data, fileName)).toEqual(true)
    expect(parsing.isEmployeeData(badData, fileName)).toEqual(false)
  })

  it('checks for duplicate files', () => {
    const data = [{
      location: 'Store 1'
    }]

    const newData = {
      location: 'Store 1'
    }

    expect(parsing.isADuplicateLocation(
      newData, data
    )).toEqual(true)
  })
})

describe('parsing the CSV', () => {
  const employeeData = {
    location: 'Store 1',
    payPeriod: '9/18/2017 - 9/24/2017',
    employees: {
      'Smith, John': {
        name: "Smith, John",
        employeeId: '11111',
        regularHours: '40.00',
        otHours: '1.20',
        rate: '15.00'
      }
    }
  }

  const emp = employeeData.employees['Smith, John']

  it('builds a regular line', () => {
    expect(parsing.buildRegularHoursLine(emp)).toEqual('11111,E,REG,40.00')
  })

  it('converts to CSV', () => {

    expect(parsing.toCsv(employeeData)).toEqual(
      'data:text/csv;charset=utf-8,11111,E,REG,40.00\r\n11111,E,OT,1.20'
    )
  })

  it('adds in a line for overtime', () => {
    expect(parsing.buildOtLine(emp)).toEqual(
      '11111,E,OT,1.20'
    )
  })

  it('determines if there is an ot line', () => {
    expect(parsing.hasOt(emp)).toEqual(true)
  })

  describe('spread of hours', () => {
    const employeeData = {
      location: 'Store 1',
      payPeriod: '9/18/2017 - 9/24/2017',
      employees: {
        'Smith, John': {
          name: "Smith, John",
          employeeId: '11111',
          regularHours: '40.00',
          otHours: '1.20',
          spreadOfHours: '2.0',
          rate: '15.00'
        }
      }
    }

    const emp2 = employeeData.employees['Smith, John']

    it('determines if there is a spread of hours line', () => {
      expect(parsing.hasSoh(emp2)).toEqual(true)
    })

    it('applies a spread of hours line', () => {
      expect(parsing.buildSohLine(emp2)).toEqual('11111,E,SOH,2.00')
    })
  })
})
