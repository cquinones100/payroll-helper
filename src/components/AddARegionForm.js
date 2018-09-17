import React, { Component } from 'react'
import CenteredParagraph from './CenteredParagraph'
import { Modal, Alert, Button, Well, FormControl } from 'react-bootstrap'
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

    const { addRegion } = this.props
    const { 
      name, 
      sohHours, 
      sohCode, 
      participatesInSoh, 
      otHours, 
      otCode, 
      participatesInOt, 
      callInPayHours, 
      callInPayCode, 
      participatesInCallInPay 
    } = this.state

    addRegion({
      name, 
      sohHours, 
      sohCode, 
      participatesInSoh, 
      otHours, 
      otCode, 
      participatesInOt, 
      callInPayHours, 
      callInPayCode, 
      participatesInCallInPay 
    })
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
      participatesInSoh,
      otHours,
      otCode,
      participatesInOt,
      callInPayHours,
      callInPayCode,
      participatesInCallInPay
    } = this.state

    const canSubmitSection = section => {
      const participatesFromState = this.state[`participatesIn${section[0].toUpperCase() + section.slice(1)}`]

      const codeFromState = this.state[`${section}Code`]
      const numericFromState = this.state[`${section}Hours`]
      const canSubmitOnParticipatesTrue = participatesFromState && 
        codeFromState !== null && 
        codeFromState !== '' && 
        numericFromState !== null && 
        numericFromState !== ''

      const canSubmitOnParticipatesFalse = participatesFromState === false

      return participatesFromState !== null && (
        canSubmitOnParticipatesTrue || canSubmitOnParticipatesFalse
      )
    }

    const canSubmit = canSubmitSection('soh') && canSubmitSection('ot') && canSubmitSection('callInPay') && name !== ''

    return (
      <Modal show onHide={onHide}>
        { 
          (!regions || regions.length === 0) && (
            <Alert bsStyle='danger'>
              <CenteredParagraph>
                You have not yet entered region data. Please enter a region before continuing. 
              </CenteredParagraph>
              <CenteredParagraph>
                <Button onClick={() => this.openRegionModal()}>
                  Enter A New Region
                </Button>
              </CenteredParagraph> 
            </Alert>
          ) 
        }
        { 
          openRegionModal && (
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
                    numericValue={sohHours}
                    codeValue={sohCode}
                    participates={participatesInSoh}
                    attribute='Spread of Hours (SOH)'
                    numericMessage='After how many hours of work in one day is an empoyee eligible for'
                    participate={() => this.participate('Soh')}
                    dontParticipate={() => this.dontParticipate('Soh')}
                    undoParticipate={() => this.undoParticipate('Soh')}
                    handleCodeNameOnChange={e => this.handleTextOnChange('sohCode', e)}
                    handleNumericOnChange={e => this.handleTextOnChange('sohHours', e)}
                  />
                  <RegionDataAttributeForm
                    numericValue={otHours}
                    codeValue={otCode}
                    participates={participatesInOt}
                    attribute='Overtime (OT)'
                    numericMessage='After how many hours of work in one week is an empoyee eligible for'
                    participate={() => this.participate('Ot')}
                    dontParticipate={() => this.dontParticipate('Ot')}
                    undoParticipate={() => this.undoParticipate('Ot')}
                    handleCodeNameOnChange={e => this.handleTextOnChange('otCode', e)}
                    handleNumericOnChange={e => this.handleTextOnChange('otHours', e)}
                  />
                  <RegionDataAttributeForm
                    numericValue={callInPayHours}
                    codeValue={callInPayCode}
                    participates={participatesInCallInPay}
                    attribute='Call in Pay'
                    numericMessage='Before how many hours of work in one day is an empoyee eligible for'
                    participate={() => this.participate('CallInPay')}
                    dontParticipate={() => this.dontParticipate('CallInPay')}
                    undoParticipate={() => this.undoParticipate('CallInPay')}
                    handleCodeNameOnChange={e => this.handleTextOnChange('callInPayCode', e)}
                    handleNumericOnChange={e => this.handleTextOnChange('callInPayHours', e)}
                  />
                  <Button 
                    bsStyle='primary' 
                    disabled={!canSubmit}
                    onClick={e => this.handleOnSubmit(e)}
                  >
                    Submit
                  </Button>
                </form>
              </Modal.Body>
            </Modal>
          ) 
        }
      </Modal>
    )
  }
}

export default AddARegionForm
