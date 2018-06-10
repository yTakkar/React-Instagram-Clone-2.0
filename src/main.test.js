import React from 'react'
import MockDataElement from './utils/__test__/mock-dataElement'
import mockStore from './store/mockStore/mockStore'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App'

describe('React Entry File', () => {
  MockDataElement()

  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <Provider store={mockStore} >
        <App/>
      </Provider>,
      div
    )
  })

})
