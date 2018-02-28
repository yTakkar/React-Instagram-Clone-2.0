// USER SYSTEM (FOR NOT LOGGEDIN USER)
import './user-system/user-system'

// FOR LOGGEDIN USER
// eslint-disable-next-line no-unused-vars
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
