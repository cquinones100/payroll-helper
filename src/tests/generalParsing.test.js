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

  it('converts to CSV', () => {
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

    expect(parsing.toCsv(employeeData)).toEqual(
      'data:text/csv;charset=utf-8,11111,E,REG,40.00\r\n11111,E,OT,1.20'
    )
  })
})
