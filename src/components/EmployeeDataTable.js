import React from 'react'
import { Table } from 'react-bootstrap'

const EmployeeDataTable = ({ employees }) => (
  <div style={{maxHeight: '90vh', overflow: 'auto'}}>
    <Table striped bordered condensed hover>
      <thead>
        <tr>
          <th>Employee Name</th>
          <th>Identification Number</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        { employees.map((employee, index) => (
          <tr key={index}>
            <td>{employee.name}</td>
            <td>{employee.number}</td>
            <td>{employee.location}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
)

export default EmployeeDataTable 
