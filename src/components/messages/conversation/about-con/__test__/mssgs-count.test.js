import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/__mocks__/mockStore'
import MessagesCount from '../mssgs-count'

describe('MessagesCount Component', () => {
  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <MessagesCount />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
