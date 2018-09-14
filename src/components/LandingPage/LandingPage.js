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
    const regions = localStorage.getItem('regions')

    this.setState({
      employeeData: employeeData ? JSON.parse(employeeData) : null,
      locationData: locationData ? JSON.parse(locationData) : null,
      regions: regions ? JSON.parse(regions) : null
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
            const { locationData:oldLocationData } = this.state
            const { location } = response
            const locationData = oldLocationData ? oldLocationData : [] 

            this.setState({ 
              locationData: locationData.reduce((acc, loc) => {
                if (loc.name !== location.name) {
                  acc.push(loc)
                }

                return acc
              }, []).concat(location)
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
      locationData: null,
      regions: null
    }, () => {
      localStorage.clear()
    })
  }

  handleLocationOnClick(selectedLocation) {
    this.setState({ selectedLocation })
  }

  handleHideLocationForm(cb = () => null) {
    this.setState({ selectedLocation: null }, () => cb())
  }

  addRegion(region) {
    const { regions } = this.state

    if (regions === null) {
      this.setState({
        regions: [region]
      }, () => {
        localStorage.setItem('regions', JSON.stringify(this.state.regions))
      })
    } else if (!regions.find(reg => reg.name === region.name)) {
      this.setState({
        regions: regions !== null ? regions.concat(region) : [region]
      }, () => {
        localStorage.setItem('regions', JSON.stringify(this.state.regions))
      })
    }
  }

  assignRegion(region, location) {
    const { locationData } = this.state

    this.setState({
      locationData: locationData.reduce((acc, curr) => {
        if (curr.name === location.name) {
          acc.push({
            ...curr, 
            region
          })
        } else {
          acc.push(curr)
        }

        return acc
      }, [])
    }, () => {
      const { locationData } = this.state

      this.handleHideLocationForm(() => {
        this.handleLocationOnClick(locationData.find(loc => location.name === loc.name))
      })

      localStorage.setItem('locationData', JSON.stringify(locationData))
    })
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
            addRegion={region => this.addRegion(region)}
            assignRegion={(region, location) => this.assignRegion(region, location)}
            employeeData={employeeData}
          />
        ) }
      </Grid>
    )
  }
}

export default LandingPage
