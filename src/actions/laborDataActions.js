import * as types from '../constants/actionTypes'

export const addLaborData = (data, calnp) => (
  {type: types.ADD_LABOR_DATA, data, calnp}
)

export const removeLaborDataByLocation = (location) => (
  {type: types.REMOVE_LABOR_DATA_BY_LOCATION, location}
)
