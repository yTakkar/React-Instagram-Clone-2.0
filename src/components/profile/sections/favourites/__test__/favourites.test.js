import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/__mocks__/mockStore'
import { BrowserRouter as Router } from 'react-router-dom'
import Favourites from '../favourites-s'
import MockDataElement from '../../../../../utils/__mocks__/mock-dataElement'

describe('Favourites Component', () => {
  MockDataElement()

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <Router>
          <Favourites param='takkar' />
        </Router>
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
