import React from 'react'
import { create } from 'react-test-renderer'
import Banner from '../banner'
import MockDataElement from '../../../../utils/__mocks__/mock-dataElement'
import { Provider } from 'react-redux'
import mockStore from '../../../../store/__mocks__/mockStore'
import { BrowserRouter as Router } from 'react-router-dom'

describe('Banner Component', () => {
  MockDataElement()

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <Router>
          <Banner/>
        </Router>
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
