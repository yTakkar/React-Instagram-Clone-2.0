import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/__mocks__/mockStore'
import Deactivate from '../deactivate'

describe('Deactivate Component', () => {
  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <Deactivate />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
