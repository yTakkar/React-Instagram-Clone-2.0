import React from 'react'
import { create } from 'react-test-renderer'
import ConSince from '../con-since'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/__mocks__/mockStore'

describe('ConSince Component', () => {
  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <ConSince />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
