import * as types from '../constants/actionTypes'

export const changeView = (view, props) => (
  {type: types.CHANGE_VIEW, view, props}
)
