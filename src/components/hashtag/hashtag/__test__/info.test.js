import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../store/__mocks__/mockStore'
import HashtagInfo from '../info'

describe('HashtagInfo Component', () => {
  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <HashtagInfo hashtag="travel" />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
