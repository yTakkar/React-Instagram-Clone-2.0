import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/mockStore/mockStore'
import { BrowserRouter as Router } from 'react-router-dom'
import Comments from '../comments'
import Post from '../../../../../store/mockStore/mock-reducers/Post'

describe('Comments Component', () => {
  const props = {
    when: 'viewPost',
    comments: Post.viewPost.comments,
    decrementComments: jest.fn()
  }

  const comp = (extraProps={}) => (
    <Provider store={mockStore}>
      <Router>
        <Comments
          {...props}
          {...extraProps}
        />
      </Router>
    </Provider>
  )

  it('should match snapshot', () => {
    const tree = create(comp()).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot when comments.length == 0', () => {
    const tree = create(comp({
      comments: []
    })).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot when null when prop.when != viewPost', () => {
    const tree = create(comp({
      when: 'feed'
    })).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
