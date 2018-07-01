import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../../store/__mocks__/mockStore'
import PostOptionLists from '../options-list'
import MockDataElement from '../../../../../../utils/__mocks__/mock-dataElement'

describe('PostOptionsList Component', () => {
  const mockFn = jest.fn()
  const props = {
    postDetails: {
      post_id: 11,
      user: 24,
      when: 'feed',
      description: 'aa',
    },
    toggleOptions: mockFn,
    updateDescription: mockFn,
  }

  MockDataElement()

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <PostOptionLists {...props} />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
