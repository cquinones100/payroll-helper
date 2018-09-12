import React, { Component } from 'react';
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
// import * as employeeDataActions from './actions/employeeDataActions'
// import * as generalActions from './actions/generalActions'
// import * as laborDataActions from './actions/laborDataActions'
// import * as generalParsing from './utils/parsing/generalParsing'
// import * as viewsActions from './actions/viewsActions'
// import * as views from './constants/viewTypes'
// import * as payrollParsing from './utils/parsing/payrollParsing'
// import EmployeeDataTable from './components/EmployeeDataTable'
// import Upload from './components/Upload'
// import LaborDataMenu from './components/LaborDataMenu'

import './App.css';

// class App extends Component {

//   onChange = (event) => {
//     event.preventDefault()
//     this.props.addUploadedFile(event.target.files[0].name)
//     const reader = new FileReader()
//     reader.onload = (event) => this.processData(event.target.result)
//     reader.readAsText(event.target.files[0])
//     document.querySelector('#file-upload').value = ''
//   }

//   clearOnClick = () => {
//     if (window.confirm('are you sure you want to clear all data?')) {
//       localStorage.clear()
//       this.props.clearData()
//     }
//   }

//   laborUploadOnClick = (event) => {
//     debugger
//   }

//   buttonOnClick = (event) => {
//     document.querySelector('#file-upload').click()
//   }

//   processData = (text, title) => {
//     const lines = text.split(/\r\n|\n/)
//     if (generalParsing.isEmployeeData(lines, this.props.uploadedFile)) {
//       this.props.addEmployeeData(lines)
//       alert('employee data added')
//     } else if (generalParsing.isATimeCard(lines)) {
//       if (this.props.employeeData.data.length > 0) {
//         const promptSpreadOfHours = () => {
//           const spreadOfHours = prompt('Please enter the call in pay maximum for this location')
//           if (spreadOfHours === null) {
//             return promptSpreadOfHours()
//           }
//           const laborData = payrollParsing
//                             .parseTimeCard(lines, this.props.employeeData.data, spreadOfHours)
//           if (generalParsing
//               .isADuplicateLocation(laborData, this.props.laborData.data)) {
//             if (window.confirm('this appears to be a duplicate location, do you want to overwrite the existing?')) {
//               this.props.removeLaborDataByLocation(laborData.location)
//             } else {
//               return alert('writing skipped')
//             }
//           }
//           console.log(spreadOfHours)
//           this.props.addLaborData(laborData, spreadOfHours)
//           return alert('labor data added')
//         }
//         promptSpreadOfHours()
//       } else {
//         return alert('please upload employee data first')
//       }
//     } else {
//       return alert('file not recognized')
//     }
//   }

//   laborOnClick = (event) => {
//     const data = this.props.laborData.data[event.target.id]
//     if (data.needsTipSheet === true) {

//     }
//     if (window.confirm('this location may need a tip sheet, do you still wish to download?')) {
//       const csv = generalParsing.toCsv(data)
//       const location = data.location
//       const payPeriod = data.payPeriod
//       var encodedUri = encodeURI(csv)
//       var link = document.createElement("a")
//       link.setAttribute("href", encodedUri)
//       link.setAttribute("download", `${location}-${payPeriod}.csv`)
//       document.body.appendChild(link)
//       link.click();
//     }
//   }

//   render() {
//     const renderer = () => {
//       if (this.props.views.view === views.UPLOAD) {
//         return (
//           <Upload
//             employeeData={this.props.employeeData}
//             onClick={this.buttonOnClick}
//             onChange={this.onChange}
//             clearOnClick={this.clearOnClick}
//           />
//         )
//       }
//     }
//     return (
//     <div>
//       {this.props.employeeData.data.length > 0
//       ? (
//         <div style={{width: '400px', height: '100%'}}>
//           <EmployeeDataTable data={this.props.employeeData.data} />
//           <LaborDataMenu
//             data={this.props.laborData.data}
//             onClick={this.laborOnClick}
//             uploadOnClick={this.laborUploadOnClick}
//           />
//         </div>
//       )
//       : ''}
//       {renderer()}
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state, ownProps) => {
//   return {
//     employeeData: state.employeeData,
//     uploadedFile: state.general.uploadedFile,
//     laborData: state.laborData,
//     views: state.views
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators({
//     addEmployeeData: employeeDataActions.addEmployeeData,
//     addUploadedFile: generalActions.addUploadedFile,
//     addLaborData: laborDataActions.addLaborData,
//     changeView: viewsActions.changeView,
//     clearData: generalActions.clearData,
//     removeLaborDataByLocation: laborDataActions.removeLaborDataByLocation
//   }, dispatch)
// }

// export default connect(mapStateToProps, mapDispatchToProps)(App)
