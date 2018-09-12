import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './reducers/rootReducer'
import LandingPage from './components/LandingPage/LandingPage'

ReactDOM.render(
  <Provider store={store}>
    <LandingPage />
  </Provider>, document.getElementById('root')
)
