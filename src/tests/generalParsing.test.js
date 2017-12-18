import React from 'react'
import * as parsing from '../utils/parsing/generalParsing'

describe('generalParsing', () => {
  it('can tell if file is a time card', () => {
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
