import * as types from '../constants/actionTypes'
import * as views from '../constants/viewTypes'

const initialState = {
  view: views.UPLOAD
}

export default function viewsReducer (state = initialState, action) {
  switch (action.type) {
    case views.UPLOAD:
      return {
        ...state,
        view: views.UPLOAD
      }
    default:
      return state
  }
}
