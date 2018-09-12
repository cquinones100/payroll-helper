const processLocationData = data => {
  const rows = data.split(/\r\n|\n/)

  if (hasFailedValidation(rows)) { return error('Format is incorrect') }

  return {
    status: 200, 
    location: {
      name: rows[0].split(',')[13],
      rawRows: rows.slice(1),
      soh: null,
      ot: null,
      callInPay: null
    }
  }
}

const hasFailedValidation = rows => (
  rows[0].split(',')[0] !== 'Employee Timecard'
)

const error = message => ({
  status: 422, 
  message
})

export default processLocationData
