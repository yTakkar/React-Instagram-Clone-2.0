import React from 'react'
import { Provider } from 'react-redux'
import mockStore from '../../../store/__mocks__/mockStore'
import Feed from '../feed'
import { create } from 'react-test-renderer'

describe('Feed Component', () => {
  const comp = (
    <Provider store={mockStore}>
      <Feed />
    </Provider>
  )

  it('should match snapshot', () => {
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
