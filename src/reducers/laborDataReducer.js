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
    default:
      return state
  }
}
