/* eslint no-unused-vars: 0 */

// USER SYSTEM (FOR NOT LOGGEDIN USER)
import './user-system/user-system'

// FOR LOGGEDIN USER
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store/store'
import App from './components/App'

let element = document.getElementById('root')
if (element) {
  ReactDOM.render(
    <Provider store={store} >
      <App/>
    </Provider>,
    element
  )
}
