import React, { Component } from 'react'
import { Modal, Button, Col } from 'react-bootstrap'
import AssignRegionForm from './AssignRegionForm'
import LocationSummary from'./LocationSummary'
import CsvBuilder from '../utils/CsvBuilder'
import ParsedTimeCardProvider from './EmployeeDataProcessor'

class LocationInformationForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      location: null
    }
  }

  componentDidMount() {
    const { location } = this.props

    this.setState({ location })
  }

  componentDidUpdate(prevProps) {
    const { location:currLocation } = this.state
    const { location } = this.props

    if (!currLocation.tipSheet && location.tipSheet) {
      this.setState({ location })
    }
  }

  downloadData(data) {
    const { location } = this.state
    const csv = new CsvBuilder({ data, location })

    csv.download()
  }

  render() {
    const { 
      onHide, 
      regions, 
      assignRegion, 
      employeeData, 
      uploadTipSheet,
      handleTipSheetUpload
    } = this.props

    const { location } = this.state

    const shouldRenderLocationSummary = location && location.region

    if (!shouldRenderLocationSummary) {
      return(
        <AssignRegionForm
          regions={regions}
          onHide={onHide}
          assignRegion={region => assignRegion(region, location)}
          location={location}
        />
      )
    }

    return(
      <ParsedTimeCardProvider
        location={location}
        employeeData={employeeData}
        render={({ data, sohEmployees, overTimeEmployees, callInPayEmployees }) => {
          return(
            <Modal show onHide={onHide}>
              { 
                location && (
                  <div>
                    <Modal.Header>
                      <Col xs={location.tipSheet ? 6 : 8}>
                        {location.name}
                      </Col>
                      <Col xs={location.tipSheet ? 4 : 2}>
                        { location.region && !location.tipSheet && (
                          <Button bsStyle='primary' onClick={location => uploadTipSheet(location)}>
                            Upload Tipsheet
                            <input
                              id='tipsheet-file-upload'
                              type="file"
                              onChange={handleTipSheetUpload}
                              accept='.csv'
                              style={{display: 'none'}}
                            />
                          </Button>
                        )}
                        { location.region && location.tipSheet && (
                          <Button bsStyle='primary' onClick={location => uploadTipSheet(location)}>
                            Update Uploaded Tipsheet
                            <input
                              id='tipsheet-file-upload'
                              type="file"
                              onChange={handleTipSheetUpload}
                              accept='.csv'
                              style={{display: 'none'}}
                            />
                          </Button>
                        )}
                      </Col>
                      <Col xs={2}>
                        { shouldRenderLocationSummary && (
                          <Button bsStyle='primary' onClick={() => this.downloadData(data)}>
                            Download Report
                          </Button>
                        )}
                      </Col>
                    </Modal.Header>
                    <Modal.Body>
                      {
                        location && !location.region && (
                          <AssignRegionForm
                            regions={regions}
                            onHide={onHide}
                            assignRegion={region => assignRegion(region, location)}
                            location={location}
                          />
                        )
                      }
                      {
                        shouldRenderLocationSummary && (
                          <LocationSummary 
                            location={location} 
                            employeeData={employeeData}
                            data={data}
                            sohEmployees={sohEmployees}
                            callInPayEmployees={callInPayEmployees}
                            overTimeEmployees={overTimeEmployees}
                          />
                        )
                      }
                    </Modal.Body>
                  </div>
                )
              }
            </Modal>
          )}}
        />
    )
  }
}

export default LocationInformationForm
