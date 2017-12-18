import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as employeeDataActions from './actions/employeeDataActions'
import * as generalActions from './actions/generalActions'

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

  isEmployeeData = (array) => {
    return array
            .filter(line => line.split(',').length === 5)
              .length === array.length -1 &&
                /app data/.exec(this.props.uploadedFile.name)
  }

  processData = (text, title) => {
    const lines = text.split(/\r\n|\n/)
      this.props.addEmployeeData(lines)
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.onSubmit}>
          <input id="file-upload" type="file" onChange={this.onChange} accept=".csv"/>
        </form>
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
