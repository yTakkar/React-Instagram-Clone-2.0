import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/mockStore/mockStore'
import { BrowserRouter as Router } from 'react-router-dom'
import PostBottom, { PurePostBottom } from '../post-bottom'
import { shallow } from 'enzyme'

describe('PostBottom Component', () => {
  const postDetails = {
    comments_count: 2,
    post_id: 44,
    when: 'feed',
    user: 7,
    comments: []
  }

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <Router>
          <PostBottom
            postDetails={postDetails}
          />
        </Router>
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should increments comments count', () => {
    const wrapper = shallow(
      <PurePostBottom
        postDetails={postDetails}
      />
    )
    expect(wrapper.state().comments_count).toBe(2)
    wrapper.instance().incrementComments()
    expect(wrapper.state().comments_count).toBe(3)
  })

})
