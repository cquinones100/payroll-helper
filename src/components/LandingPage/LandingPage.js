import React, { Component } from 'react'
import { Button, Grid, Col, Row, Alert, ButtonToolbar, ListGroup, ListGroupItem } from 'react-bootstrap'
import processEmployeeData from '../../utils/processEmployeeData'
import processLocationData from '../../utils/processLocationData'
import EmployeeDataUploadButton from '../EmployeeDataUploadButton'
import CenteredParagraph from '../CenteredParagraph'
import EmployeeDataTable from '../EmployeeDataTable'
import LocationInformationForm from '../LocationInformationForm'

const UploadEmployeeDataAlert = ({ onClick, employeeData, onUpload }) => (
  <Alert bsStyle='danger'>
    <CenteredParagraph>
      You have not yet uploaded employee data. 
    </CenteredParagraph>
    <EmployeeDataUploadButton onUpload={onUpload} onClick={onClick}/>
  </Alert>
)

class LandingPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      employeeData: null,
      processing: null,
      locationData: null,
      error: null,
      selectedLocation: null, 
      regions: null
    }
  }

  componentDidMount() {
    const employeeData = localStorage.getItem('employeeData')
    const locationData = localStorage.getItem('locationData')

    this.setState({
      employeeData: employeeData ? JSON.parse(employeeData) : null,
      locationData: locationData ? JSON.parse(locationData) : null
    })
  }

  addError(error, cb = () => null) {
    this.setState({ error }, () => cb())
  }

  processEmployeeData(data) {
    this.setState({
      processing: true,
      error: null
    }, () => {
      Promise.resolve(processEmployeeData(data))
        .then(response => {
          if (response.status === 422) {
            const { message } = response

            this.addError(message, () => {
              this.setState({ processing: false })
            })
          } else if (response.status === 200) {
            const { employees:employeeData } = response

            localStorage.setItem('employeeData', JSON.stringify(employeeData))

            this.setState({ employeeData }, () => (
              this.setState({ processing: false })
            ))
          }
        })
    })
  }

  processLocationData(data) {
    this.setState({
      processing: true,
      error: null
    }, () => {
      Promise.resolve(processLocationData(data))
        .then(response => {
          if (response.status === 422) {
            const { message } = response

            this.addError(message, () => {
              this.setState({ processing: false })
            })
          } else if (response.status === 200) {
            const { locationData } = this.state
            const { location } = response

            this.setState({ 
              locationData: locationData ? locationData.concat(location) : [location] 
            }, () => {
              const { locationData } = this.state

              localStorage.setItem('locationData', JSON.stringify(locationData))

              this.setState({ processing: false })
            })
          }
        })
    })
  }

  readFile(file, fileType) {
    const reader = new FileReader()

    reader.onload = e => this[`process${fileType}Data`](e.target.result)

    reader.readAsText(file)
  }

  handleEmployeeDataUpload(e) {
    e.preventDefault()

    const { files } = e.target

    this.readFile(files[0], 'Employee')

    document.querySelector('#file-upload').value = ''
  }

  openEmployeeFileUpload() {
    document.querySelector('#file-upload').click()
  }

  handleLocationDataUpload(e) {
    e.preventDefault()

    const { files } = e.target

    this.readFile(files[0], 'Location')

    document.querySelector('#location-file-upload').value = ''
  }

  openLocationFileUpload() {
    document.querySelector('#location-file-upload').click()
  }

  clearData() {
    this.setState({
      employeeData: null,
      locationData: null
    }, () => {
      localStorage.clear()
    })
  }

  handleLocationOnClick(selectedLocation) {
    this.setState({ selectedLocation })
  }

  handleHideLocationForm() {
    this.setState({ selectedLocation: null })
  }

  render() {
    const { employeeData, error, locationData, selectedLocation, regions } = this.state

    return(
      <Grid>
        <Row><div style={{ height: '10px' }} /></Row>
        <Row className='show-grid'>
          <Col xs={8} md={4} lg={4}>
            { employeeData && <EmployeeDataTable employees={employeeData} /> }
          </Col>
          <Col xs={2} md={4} lg={4}>
            { error && <Alert bsStyle='danger'>{error}</Alert> }
            {
              !employeeData && (
                <UploadEmployeeDataAlert 
                  onUpload={e => this.handleEmployeeDataUpload(e)} 
                  onClick={() => this.openEmployeeFileUpload()}
                /> 
              )
            }
            {
              employeeData && (
                <Alert bsStyle='success'>Employee Data Uploaded</Alert>
              )
            }
            <ButtonToolbar>
              <Button 
                bsStyle='primary' 
                onClick={e => this.openLocationFileUpload(e)} 
                disabled={!employeeData}
              >
                Upload Location Data
              </Button>
              <Button 
                bsStyle='danger' 
                disabled={!employeeData} 
                onClick={() => this.clearData()}
              >
                Clear Data
              </Button>
              <input
                id='location-file-upload'
                type="file"
                onChange={e => this.handleLocationDataUpload(e)}
                accept='.csv'
                style={{display: 'none'}}
              />
            </ButtonToolbar>
          </Col>
          <Col xs={2} md={4} lg={4}>
            { locationData && locationData.length > 0 && (
              <ListGroup>
                {
                  locationData.map((location, index) => (
                    <ListGroupItem 
                      key={index} 
                      onClick={() => this.handleLocationOnClick(location)}>
                      {location.name}
                    </ListGroupItem>
                  ))
                }
              </ListGroup>
            ) }
          </Col>
        </Row>
        { selectedLocation && (
          <LocationInformationForm 
            onHide={() => this.handleHideLocationForm()} 
            location={selectedLocation}
            regions={regions}
          />
        ) }
      </Grid>
    )
  }
}

export default LandingPage
