import * as types from '../constants/actionTypes'

export const addUploadedFile = (file) => (
  {type: types.ADD_UPLOADED_FILE, file: file}
)

export const clearData = () => (
  {type: types.CLEAR_DATA}
)
