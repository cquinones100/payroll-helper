import * as types from '../constants/actionTypes'

const initialState = {
  data: [],
}

export default function laborDataReducer (state = initialState, action) {
  switch (action.type) {
    case types.ADD_LABOR_DATA:
      return {
        ...state,
        data: state.data.concat(action.data)
      }
    case types.REMOVE_LABOR_DATA_BY_LOCATION:
      return {
        ...state,
        data: state.data.filter(data => data.location !== action.location)
      }
    default:
      return state
  }
}
