import React from 'react'
import { create } from 'react-test-renderer'
import Filters from '../filters'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/__mocks__/mockStore'

describe('Filters Component', () => {
  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <Filters />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
