import * as types from '../constants/actionTypes'

export const addEmployeeData = (data) => (
  {type: types.ADD_EMPLOYEE_DATA, data: data}
)
