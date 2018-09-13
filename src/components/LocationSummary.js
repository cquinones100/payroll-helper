import React from 'react'
import { Alert, Button, Well, ListGroup, ListGroupItem, Row, Table, Col } from 'react-bootstrap'
import EmployeeDataProcessor from './EmployeeDataProcessor'
import EmployeeWeeklySummary from './EmployeeWeeklySummary'

const RegionStatSummary = ({ stats, statName, numeric, codeName, requirement }) => (
  <tr>
    <td>
      { statName }
    </td>
    <td>
      { requirement.replace('[req]', stats[numeric]) }
    </td>
    <td>
      { stats[codeName] }
    </td>
  </tr>
)

const LocationSummary = ({ location, employeeData }) => {
  const { region } = location
  const { 
    participatesInOt,
    participatesInSoh,
    participatesInCallInPay,
    sohHours,
    sohCode,
    otHours,
    otCode,
    callInPayHours,
    callInPayCode
  } = region

  return(
    <EmployeeDataProcessor
      location={location}
      employeeData={employeeData}
      render={({ data }) => {

        const hasSohEmployees = data.find(employee => (
          employee.workDays.find(day => parseInt(day.totalHours, 10) > sohHours)
        ))

        const hasOTEmployees = data.find(employee => (
          employee.workDays.reduce((acc, curr) => {
            return acc += parseInt(curr.totalHours, 10)
          }, 0) > otHours
        ))

        const hasCallInPayEmployees = data.find(employee => (
          employee.workDays.find(day => parseInt(day.totalHours, 10) < callInPayHours)
        ))

        return (
          <div>
            <Row>
              <Col xs={4}>
                <Well>
                  <strong>Region: { region.name }</strong>
                  { 
                    (participatesInCallInPay || participatesInSoh || participatesInOt) && (
                      <div>
                        <p>This location participates in the following:</p>
                        <Table responsive>
                          <thead>
                            <tr>
                              <th>Benefit</th>
                              <th>Employee Requirement</th>
                              <th>Code</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              participatesInSoh && (
                                <RegionStatSummary
                                  stats={{ sohHours, sohCode }}
                                  statName='Spread of Hours (SOH)'
                                  numeric='sohHours'
                                  codeName='sohCode'
                                  requirement='Work more than [req] hours in one day'
                                />
                              ) 
                            }
                            {
                              participatesInCallInPay && (
                                <RegionStatSummary
                                  stats={{ callInPayHours, callInPayCode }}
                                  statName='Call in Pay'
                                  numeric='callInPayHours'
                                  codeName='callInPayCode'
                                  requirement='Work less than [req] hours in one day'
                                />
                              ) 
                            }
                            {
                              participatesInOt && (
                                <RegionStatSummary
                                  stats={{ otHours, otCode }}
                                  statName='Overtime (OT)'
                                  numeric='otHours'
                                  codeName='otCode'
                                  requirement='Work more than [req] hours in one week'
                                />
                              ) 
                            }
                          </tbody>
                        </Table>
                      </div>
                    )
                  }
                </Well>
              </Col>
              <Col xs={8}>
                <Well>
                  {
                    participatesInSoh && hasSohEmployees && (
                      <div>Someone went into SOH</div>
                    )
                  }
                  {
                    participatesInOt && hasOTEmployees && (
                      <div>Someone went into OT</div>
                    )
                  }
                  {
                    participatesInCallInPay && hasCallInPayEmployees && (
                      <div>Someone went into Call in Pay</div>
                    )
                  }
                </Well>
              </Col>
            </Row>
            { data && <EmployeeWeeklySummary data={data} /> }
          </div>
        )
      }}
    />
  )
}

export default LocationSummary

