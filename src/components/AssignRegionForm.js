import React, { Component } from 'react'
import { Alert, Button, Well, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import CenteredParagraph from './CenteredParagraph'

class AssignRegionForm extends Component {
  render() {
    const { regions, assignRegion, location} = this.props

    return(
      <Alert bsStyle='danger'>
        <Row>
          <CenteredParagraph>
            You have not yet assigned this location to a region. Please select a region below. 
          </CenteredParagraph>
        </Row>
        <ListGroup>
          {
            regions.map((region, index) => (
              <ListGroupItem key={index} onClick={() => assignRegion(region)}>
                { region.name } 
              </ListGroupItem>
            ))
          }
        </ListGroup>
      </Alert>
    )
  }
}

export default AssignRegionForm
