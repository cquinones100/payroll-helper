import * as types from '../constants/actionTypes'

export const addLaborData = (data) => (
  {type: types.ADD_LABOR_DATA, data}
)

export const removeLaborDataByLocation = (location) => (
  {type: types.REMOVE_LABOR_DATA_BY_LOCATION, location}
)
