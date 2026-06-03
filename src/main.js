// FOR LOGGEDIN USER
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store/store'
import App from './components/App'

let element = document.getElementById('root')
if (element) {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    element
  )
} else {
  // USER SYSTEM (FOR NOT-LOGGEDIN USER)
  require('./user-system/user-system')
}
