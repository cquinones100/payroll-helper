import * as types from '../constants/actionTypes'
// import * as actions from '../actions/generalActions'

const initialState = {
  uploadedFile: null
}

export default function generalReducer (state = initialState, action) {
  switch (action.type) {
    case types.ADD_UPLOADED_FILE:
      return {
        ...state,
        uploadedFile: action.file
      }
    default:
      return state
  }
}
