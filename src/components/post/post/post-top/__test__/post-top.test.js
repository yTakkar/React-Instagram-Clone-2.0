import React from 'react'
import { create } from 'react-test-renderer'
import PostTop from '../post-top'
import { BrowserRouter as Router } from 'react-router-dom'
import posts from '../../../../../store/mockStore/mock-reducers/posts'

describe('PostTop Component', () => {
  const props = {
    postDetails: {
      ...posts[0],
      when: 'feed'
    },
    updateDescription: jest.fn()
  }

  it('should match snapshot', () => {
    const tree = create(
      <Router>
        <PostTop
          {...props}
        />
      </Router>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
