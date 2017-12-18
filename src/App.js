import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as employeeDataActions from './actions/employeeDataActions'

import './App.css';

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      employeeData: [],
      locationData: [],
      uploadedFile: null
    }
  }

  onChange = (event) => {
    event.preventDefault()
    this.setState({
      uploadedFile: event.target.files[0]
    }, (event) => {
      const reader = new FileReader()
      reader.onload = (event) => this.processData(event.target.result)
      reader.readAsText(this.state.uploadedFile)
      document.querySelector('#file-upload').value = ''
    })
  }

  isEmployeeData = (array) => {
    return array
            .filter(line => line.split(',').length === 5)
              .length === array.length -1 &&
                /app data/.exec(this.state.uploadedFile.name)
  }

  processData = (text, title) => {
    const lines = text.split(/\r\n|\n/)
    if (this.isEmployeeData(lines)) {
      this.setState({
        employeeData: lines
      }, )
    }
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
    employeeData: state.employeeData
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addEmployeeData: employeeDataActions.addEmployeeData
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
