import rowFormat from '../constants/rowFormat'

class TimeCardMap {
  constructor(row) {
    this.row = row
    this.rowFormat = rowFormat
    this.isAValidRow = this.validateRow()

    const attributes = Object.keys(this.rowFormat) 

    if (this.isAValidRow) {
      attributes.forEach(attribute => {
        this[attribute] = this.attributeValue(attribute)
      })
    } else {
      this.isAValidRow = false
    }
  }

  isANamedRow() {
    return (
      this.row[1] && 
      this.row[1] !== 'Signature' && 
      this.row[1] !== '' 
    )
  }

  isADatedRow() {
    return (
      this.row[0] &&
      this.row[0] !== '' &&
      Date.parse(this.row[0])
    )
  }

  validateRow() {
    return this.row && (this.isANamedRow() || this.isADatedRow())
  }

  attributeValue(attribute) {
    const func = this[`${attribute}FromRow`]

    if (typeof func === 'function') {
      return this[`${attribute}FromRow`]()
    } else {
      return this.attributeFromRow(attribute)
    }
  }

  attributeFromRow(attribute) { 
    return this.row[this.rowFormat[attribute]] 
  }

  nameFromRow() {
    const name = this.attributeFromRow('name')

    if (name && name !== '' && name.toLowerCase() !== 'signature') {
      return name.split(', ').reverse().join(' ')
    }
  }

  payrollIdFromRow() {
    const payrollId = this.attributeFromRow('payrollId')

    if (payrollId && payrollId !== '' && payrollId.trim().match(/^[0-9]*$/)) {
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
    return parseFloat(value)
  }

  dollarValueFromRow(value) {
    if (value) {
      return this.floatingPointValue(value.replace('$', ''))
    }
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
}

export default TimeCardMap
