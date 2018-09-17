import React from 'react'
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap'

const LocationEmployeeAlerts = ({ 
  sohEmployees, 
  callInPayEmployees, 
  overTimeEmployees,
  participatesInCallInPay,
  participatesInOt,
  participatesInSoh,
  data
}) => {
  const multipleJobsWorked = data.filter(employee => employee.jobs.split(',').length > 1)

  if ((sohEmployees && sohEmployees.length > 0) || 
    (callInPayEmployees && callInPayEmployees.length > 0) || 
    (overTimeEmployees && overTimeEmployees.length > 0) ||
    multipleJobsWorked.length > 0
  ) {
    return (
      <Panel bsStyle="danger">
        <Panel.Heading>
          <Panel.Title componentClass="h3">Employee Alerts</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <ListGroup>
            {
              participatesInSoh && sohEmployees && (
                sohEmployees.map((employee, index) => (
                  <ListGroupItem key={index}>
                    On {employee.date} {employee.name} went into SOH.
                  </ListGroupItem>
                ))
              )
            }
            {
              participatesInOt && overTimeEmployees && (
                overTimeEmployees.map((employee, index) => (
                  <ListGroupItem key={index}>
                    {employee.name} went into overtime this week.
                  </ListGroupItem>
                ))
              )
            }
            {
              participatesInCallInPay && callInPayEmployees && (
                callInPayEmployees.map((employee, index) => (
                  <ListGroupItem key={index}>
                    On {employee.name} was eligible for call in pay.
                  </ListGroupItem>
                ))
              )
            }
            {
              multipleJobsWorked.length > 0 && (
                multipleJobsWorked.map((employee, index) => (
                  <ListGroupItem key={index}>
                    {employee.name} worked multiple jobs: {employee.jobs}
                  </ListGroupItem>
                ))
              ) 
            }
          </ListGroup>
        </Panel.Body>
      </Panel>
    )
  }

  return <div/>
}

export default LocationEmployeeAlerts
