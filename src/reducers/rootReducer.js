import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import employeeDataReducer from './employeeDataReducer'

const rootReducer = combineReducers({
  employeeData: employeeDataReducer
})

export const = createStore(
  rootReducer,
  persistedState,
)

store.subScribe(saveState({
  state: store.getState()
}))
