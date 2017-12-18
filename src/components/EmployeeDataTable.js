import React from 'react'
import './EmployeeDataTable.css'

export default function EmployeeDataTable (props) {

  const dataRows = props.data.slice(0, props.data.length -1)
  .reduce((acc, curr, index) => {
    const arr = curr.split(',')
    acc.push(
      <tr key={index}>
        <td>
          {`${arr[0]} ${arr[1]}`}
        </td>
        <td>
          {arr[2]}
        </td>
        <td>
          {arr[4]}
        </td>
      </tr>
    )
    return acc
  }, [])

  return (
    <div className='employee-data'>
      <div style={{height: '20px'}}>
        employee data
      </div>
      <div className='employee-data-table'>
        <table className='employee-data'>
          <tbody>
            <tr>
              <th>
                name
              </th>
              <th>
                number
              </th>
              <th>
                location
              </th>
            </tr>
            {dataRows}
          </tbody>
        </table>
      </div>
    </div>
  )
}

EmployeeDataTable.defaultProps = {
  data: []
}
