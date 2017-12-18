import { combineReducers, createStore, compose } from 'redux'
import employeeDataReducer from './employeeDataReducer'
import generalReducer from './generalReducer'
import laborDataReducer from './laborDataReducer'
import * as types from '../constants/actionTypes'
import viewsReducer from './viewsReducer'
import { saveState, loadState } from '../utils/storage'

const appReducer = combineReducers({
  employeeData: employeeDataReducer,
  general: generalReducer,
  laborData: laborDataReducer,
  views: viewsReducer
})

const rootReducer = (state, action) => {
  if (action.type === types.CLEAR_DATA) {
    state = undefined
  }
  return appReducer(state, action)
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const persistedState = loadState()

export const store = createStore(
  rootReducer,
  persistedState,
  composeEnhancers()
)

store.subscribe(() => {
  saveState(store.getState())
})
