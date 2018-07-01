import React from 'react'
import { create } from 'react-test-renderer'
import PostActions from '../post-actions'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/__mocks__/mockStore'
import { shallow } from 'enzyme'

describe('PostActions Component', () => {
  const postDetails = {
    post_id: 11,
    when: 'feed',
    user: 7,
    likes_count: 1,
    shares_count: 1,
  }

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <PostActions postDetails={postDetails} />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should increments counts', () => {
    const wrapper = shallow(<PostActions postDetails={postDetails} />)
    expect(wrapper.state()).toContainEntries([
      ['likes_count', 1],
      ['shares_count', 1],
    ])
    wrapper.instance().incrementWhat('likes_count')
    wrapper.instance().incrementWhat('shares_count')
    expect(wrapper.state()).toContainEntries([
      ['likes_count', 2],
      ['shares_count', 2],
    ])
  })

  it('should increments counts', () => {
    const wrapper = shallow(<PostActions postDetails={postDetails} />)
    expect(wrapper.state()).toContainEntries([
      ['likes_count', 1],
      ['shares_count', 1],
    ])
    wrapper.instance().decrementWhat('likes_count')
    wrapper.instance().decrementWhat('shares_count')
    expect(wrapper.state()).toContainEntries([
      ['likes_count', 0],
      ['shares_count', 0],
    ])
  })
})
