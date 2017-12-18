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

  it('finds an employee id by name', () => {
    const employeeData = [
      'JOHN,SMITH,11111,200000,Store 1',
      'JIMMY,SMITH,11112,200000,Store 1'
    ]

    const name = 'Smith, John'

    expect(parsing.getEmployeeIdByName(name, employeeData)).toEqual('11111')
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
