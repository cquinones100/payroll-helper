import React from 'react'
import { Well, Table } from 'react-bootstrap'

const EmployeeWeeklySummary = ({ data }) => (
  <Well>
    <Table>
      <thead>
        <tr>
          <th>Employee Name</th>
          <th>Employee Code</th>
          <th>Jobs Worked</th>
          <th>Days Worked</th>
          <th>Regular Hours Worked</th>
          <th>Overtime Hours Worked</th>
          <th>Total Hours Worked</th>
        </tr>
      </thead>
      <tbody>
        {
          data.map((employee, index) => {
            const { name, payrollId, workDays } = employee

            const jobs = workDays.reduce((acc, curr, index) => {
              if (acc.indexOf(curr.job) === -1) {
                return acc += `${index > 0 ? ', ' : ''}${curr.job}`
              } else {
                return acc
              }
            }, '')

            const regularHours = workDays.reduce((acc, curr) => {
              return acc += parseInt(curr.regularHours, 10)
            }, 0)

            const overTimeHours = workDays.reduce((acc, curr) => {
              return acc += parseInt(curr.overTimeHours, 10)
            }, 0)

            const totalHours = workDays.reduce((acc, curr) => {
              return acc += parseInt(curr.totalHours, 10)
            }, 0)

            return (
              <tr key={index}>
                <td>{name}</td>
                <td>{payrollId}</td>
                <td>{jobs}</td>
                <td>{workDays.length}</td>
                <td>{regularHours}</td>
                <td>{overTimeHours}</td>
                <td>{totalHours}</td>
              </tr>
            )
          })
        }
      </tbody>
    </Table>
  </Well>
)

export default EmployeeWeeklySummary
