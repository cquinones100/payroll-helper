import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as employeeDataActions from './actions/employeeDataActions'
import * as generalActions from './actions/generalActions'
import * as generalParsing from './utils/parsing/generalParsing'

import './App.css';

class App extends Component {

  onChange = (event) => {
    event.preventDefault()
    this.props.addUploadedFile(event.target.files[0].name)
    const reader = new FileReader()
    reader.onload = (event) => this.processData(event.target.result)
    reader.readAsText(event.target.files[0])
    document.querySelector('#file-upload').value = ''
  }

  buttonOnClick = (event) => {
    document.querySelector('#file-upload').click()
  }

  processData = (text, title) => {
    const lines = text.split(/\r\n|\n/)
    if (generalParsing.isEmployeeData(lines, this.props.uploadedFile)) {
      this.props.addEmployeeData(lines)
      alert('employee data added')
    } else {
      alert('file not recognized')
    }
  }

  render() {
    return (
      <div className="App">
        <div className="upload-file">
          <div
            className='upload-file-button'
            onClick={this.buttonOnClick}>
              upload a file
          </div>
          <input
            id="file-upload"
            type="file"
            onChange={this.onChange}
            accept='.csv'
            style={{display: 'none'}}
            />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    employeeData: state.employeeData,
    uploadedFile: state.general.uploadedFile
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addEmployeeData: employeeDataActions.addEmployeeData,
    addUploadedFile: generalActions.addUploadedFile
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
