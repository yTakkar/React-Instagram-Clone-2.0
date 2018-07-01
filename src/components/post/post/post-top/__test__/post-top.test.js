import React from 'react'
import { create } from 'react-test-renderer'
import PostTop from '../post-top'
import posts from '../../../../../store/__mocks__/reducers/posts'

describe('PostTop Component', () => {
  const props = {
    postDetails: {
      ...posts[0],
      when: 'feed',
    },
    updateDescription: jest.fn(),
  }

  it('should match snapshot', () => {
    const tree = create(<PostTop {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
