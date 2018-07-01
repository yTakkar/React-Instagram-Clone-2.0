import React from 'react'
import MockDataElement from './utils/__mocks__/mock-dataElement'
import mockStore from './store/__mocks__/mockStore'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App'

jest.unmock('react-router-dom')

describe('React Entry File', () => {
  MockDataElement()

  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <Provider store={mockStore}>
        <App />
      </Provider>,
      div
    )
  })
})
