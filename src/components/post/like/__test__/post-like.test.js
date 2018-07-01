import React from 'react'
import PostLike from '../post-like'
import { create } from 'react-test-renderer'
import { shallow } from 'enzyme'

describe('PostLike Component', () => {
  const mockFn = jest.fn()
  const props = {
    postDetails: {
      post_id: 13,
      user: 7,
    },
    incrementWhat: mockFn,
    decrementWhat: mockFn,
  }

  it('should match snapshot', () => {
    const tree = create(<PostLike {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should show like icon and mock like action when liked == false', () => {
    const wrapper = shallow(<PostLike {...props} />)
    wrapper.setState({ liked: false })
    expect(wrapper.find('.p_like_icon').exists()).toBe(true)
    wrapper.find('.p_like_icon').simulate('click')
  })

  it('should show unlike icon and mock unlike action when liked == true', () => {
    const wrapper = shallow(<PostLike {...props} />)
    wrapper.setState({ liked: true })
    expect(wrapper.find('.p_unlike_icon').exists()).toBe(true)
    wrapper.find('.p_unlike_icon').simulate('click')
  })
})
