import React, { Component } from 'react'
import CenteredParagraph from './CenteredParagraph'
import { Modal, Alert, Button, Well, ButtonToolbar, FormControl } from 'react-bootstrap'
import RegionDataAttributeForm from './RegionDataAttributeForm'

class AddARegionForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      openRegionModal: null,
      name: '',
      sohHours: null,
      sohCode: null,
      participatesInSoh: null,
      otHours: null,
      otCode: null,
      participatesInOt: null,
      callInPayHours: null,
      callInPayCode: null,
      participatesInCallInPay: null
    }
  }

  openRegionModal() {
    this.setState({ openRegionModal: true })
  }

  handleOnSubmit(e) {
    e.preventDefault()
  }

  handleNameOnChange(e) {
    e.preventDefault()

    const { value:name } = e.target

    this.setState({ name })
  }

  participate(attribute) {
    this.setState({ 
      [`participatesIn${attribute}`]: true 
    })
  }

  dontParticipate(attribute) {
    this.setState({ 
      [`participatesIn${attribute}`]: false 
    })
  }

  undoParticipate(attribute) {
    this.setState({ 
      [`participatesIn${attribute}`]: null 
    })
  }

  handleTextOnChange(name, e) {
    e.preventDefault()

    const { value } = e.target

    this.setState({ 
      [name]: value 
    })
  }

  render() {
    const { regions, onHide } = this.props

    const { 
      openRegionModal,
      name,
      sohHours,
      sohCode,
      participatesInSoh 
    } = this.state

    return (
      <div>
        { !regions && (
          <Alert bsStyle='danger'>
            <CenteredParagraph>
              You have not yet entered region data. 
            </CenteredParagraph>
            <CenteredParagraph>
              <Button onClick={() => this.openRegionModal()}>
                Enter A New Region
              </Button>
            </CenteredParagraph> 
          </Alert>
        ) }
        { openRegionModal && (
          <Modal show onHide={onHide}>
            <Modal.Header>
              Add a Region
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={e => this.handleOnSubmit(e)} >
                <Well>
                  <p>Name</p>
                  <FormControl
                    type='text'
                    name='name'
                    onChange={e => this.handleNameOnChange(e)} 
                    value={name}
                  />
                </Well>
                <RegionDataAttributeForm
                  numeric='sohHours'
                  numericValue={sohHours}
                  codeName='sohCode'
                  codeValue={sohCode}
                  participates={participatesInSoh}
                  attribute='Spread of Hours (SOH)'
                  attributeName='soh'
                  numericMessage='After how many hours of work in one day is an empoyee eligible for'
                  participate={() => this.participate('Soh')}
                  dontParticipate={() => this.dontParticipate('Soh')}
                  undoParticipate={() => this.undoParticipate('Soh')}
                  handleCodeNameOnChange={e => this.handleTextOnChange('sohCode', e)}
                  handleNumericOnChange={e => this.handleTextOnChange('sohHours', e)}
                />
                <Button bsStyle='primary' onClick={e => this.handleOnSubmit(e)}>Submit</Button>
              </form>
            </Modal.Body>
          </Modal>
        ) }
      </div>
    )
  }
}

// <RegionDataAttributeForm
//   numeric='callInPayHours'
//   codeName='callInPayCode'
//   attribute='Call in Pay'
//   numericMessage='Before how many hours of work in one day is an empoyee eligible for'
// />
// <RegionDataAttributeForm
//   numeric='otHours'
//   codeName='otCode'
//   attribute='Overtime (OT)'
//   numericMessage='After how many hours of work per week is an empoyee eligible for'
// />
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
    const { onHide, regions } = this.props
    const { location } = this.state

    return(
      <Modal show onHide={onHide}>
        { location && (
          <div>
            <Modal.Header>
              {location.name}
            </Modal.Header>
            <Modal.Body>
              { !regions && (
                <AddARegionForm regions={regions} onHide={onHide} />
              ) }
            </Modal.Body>
          </div>
        ) }
      </Modal>
    )
  }
}

export default LocationInformationForm
