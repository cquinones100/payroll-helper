import React from 'react'
import { Button } from 'react-bootstrap'
import CenteredParagraph from './CenteredParagraph'

const EmployeeDataUploadButton = ({ children, onUpload, onClick }) => (
  <CenteredParagraph>
    <Button onClick={onClick}>
      Upload employee data to continue
    </Button>
    <input
      id="file-upload"
      type="file"
      onChange={onUpload}
      accept='.csv'
      style={{display: 'none'}}
    />
  </CenteredParagraph>
)

export default EmployeeDataUploadButton
