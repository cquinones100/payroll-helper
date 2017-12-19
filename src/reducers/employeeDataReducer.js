import * as types from '../constants/actionTypes'
// import * as actions from '../actions/employeeDataActions'

const initialState = {
  data: [],
  dateUploaded: null
}

export default function employeeDataReducer (state = initialState, action) {
  switch (action.type) {
    case types.ADD_EMPLOYEE_DATA:
      return {
        ...state,
        data: action.data,
        dateUploaded: Date.now()
      }
    default:
      return state
  }
}