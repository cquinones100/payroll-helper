import React, { Component } from 'react'
import CenteredParagraph from './CenteredParagraph'
import { Modal, Alert, Button, Well, ButtonToolbar, FormControl } from 'react-bootstrap'

class RegionDataAttributeForm extends Component {
  render() {
    const { 
      attribute,
      codeValue,
      numericValue,
      numericMessage,
      participates,
      dontParticipate,
      participate,
      undoParticipate,
      handleCodeNameOnChange,
      handleNumericOnChange
    } = this.props

    return(
      <div>
        { 
          participates === null &&  (
            <Well>
              <p>
                Does this region participate in { attribute }?
              </p>
              <ButtonToolbar>
                <Button bsStyle='primary' onClick={participate}>Yes</Button>
                <Button bsStyle='danger' onClick={dontParticipate}>No</Button>
              </ButtonToolbar>
            </Well>
          ) 
        }
        {
          participates === false && (
            <Well>
              <p>
                This region does not participate in { attribute }.
              </p>
              <Button bsStyle='primary' onClick={undoParticipate}>Undo</Button>
            </Well>
          )
        }
        {
          participates && (
            <Well>
              <p>This region participates in { attribute }</p>
              <Button bsStyle='primary' onClick={undoParticipate}>Undo</Button>
              <p>
                {numericMessage} { attribute }? 
              </p>
              <FormControl
                type='number'
                placeholder='Enter a Number'
                value={numericValue === null ? '' : numericValue}
                onChange={handleNumericOnChange}
              />
              <p>
                What is this regions's { attribute } code?
              </p>
              <FormControl
                type='text'
                value={codeValue === null ? '' : codeValue}
                onChange={handleCodeNameOnChange}
              />
            </Well>
          )
        }
      </div>
    )
  }
}

export default RegionDataAttributeForm
