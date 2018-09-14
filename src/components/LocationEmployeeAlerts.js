import React from 'react'
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap'

const LocationEmployeeAlerts = ({ 
  sohEmployees, 
  callInPayEmployees, 
  overTimeEmployees,
  participatesInCallInPay,
  participatesInOt,
  participatesInSoh
}) => {
  if (sohEmployees.length > 0 || callInPayEmployees.length > 0 || overTimeEmployees.length > 0) {
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
          </ListGroup>
        </Panel.Body>
      </Panel>
    )
  }

  return <div/>
}

export default LocationEmployeeAlerts
