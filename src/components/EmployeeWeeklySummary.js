import React from 'react'
import { Well, Table } from 'react-bootstrap'

const EmployeeWeeklySummary = ({ data }) => {
  return(
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
              const { 
                name, 
                payrollId, 
                workDays, 
                jobs, 
                overTimeHours, 
                regularHours, 
                totalHours 
              } = employee

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
}

export default EmployeeWeeklySummary
