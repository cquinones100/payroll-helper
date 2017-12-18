import { combineReducers, createStore, compose } from 'redux'
import employeeDataReducer from './employeeDataReducer'
import { saveState, loadState } from '../utils/storage'

const rootReducer = combineReducers({
  employeeData: employeeDataReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const persistedState = loadState()

export const store = createStore(
  rootReducer,
  persistedState,
  composeEnhancers()
)

store.subscribe(() => {
  saveState({
    state: store.getState()
  })
})
