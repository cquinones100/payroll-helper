import React, { Component } from 'react'
import CenteredParagraph from './CenteredParagraph'
import { Modal, Alert, Button, Well, ButtonToolbar, FormControl } from 'react-bootstrap'
import AddARegionForm from './AddARegionForm'
import AssignRegionForm from './AssignRegionForm'
import RegionDataAttributeForm from './RegionDataAttributeForm'
import LocationSummary from'./LocationSummary'

class LocationInformationForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      location: null
    }
  }

  componentDidMount() {
    const { location, regions } = this.props

    this.setState({ location })
  }

  render() {
    const { onHide, regions, addRegion, assignRegion, employeeData } = this.props
    const { location } = this.state

    const needsRegionInformation = !regions || regions.length === 0

    return(
      <Modal show onHide={onHide}>
        { 
          location && (
            <div>
              <Modal.Header>
                {location.name}
              </Modal.Header>
              <Modal.Body>
                { 
                  needsRegionInformation && (
                    <AddARegionForm regions={regions} onHide={onHide} addRegion={addRegion}/>
                  ) 
                }
                {
                  !needsRegionInformation && location && !location.region && (
                    <AssignRegionForm
                      regions={regions}
                      onHide={onHide}
                      assignRegion={region => assignRegion(region, location)}
                      location={location}
                    />
                  )
                }
                {
                  !needsRegionInformation && location && location.region && (
                    <LocationSummary location={location} employeeData={employeeData}/>
                  )
                }
              </Modal.Body>
            </div>
          )
        }
      </Modal>
    )
  }
}

export default LocationInformationForm
