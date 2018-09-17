import React from 'react'
import { Alert, ListGroup, ListGroupItem, Row, Col, Modal } from 'react-bootstrap'
import CenteredParagraph from './CenteredParagraph'

const AssignRegionForm = ({ regions, assignRegion, onHide }) => (
  <Modal show onHide={onHide}>
    <Alert bsStyle='danger'>
      <Row>
        <Col xs={4} />
        <Col xs={4} >
          <CenteredParagraph>
            You have not yet assigned this location to a region. Please select a region below. 
          </CenteredParagraph>
          <ListGroup>
            {
              regions.map((region, index) => (
                <ListGroupItem key={index} onClick={() => assignRegion(region)}>
                  { region.name } 
                </ListGroupItem>
              ))
            }
          </ListGroup>
        </Col>
        <Col xs={4} />
      </Row>
    </Alert>
  </Modal>
)

export default AssignRegionForm
