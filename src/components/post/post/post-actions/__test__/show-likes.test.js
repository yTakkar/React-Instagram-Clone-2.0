import React from 'react'
import { create } from 'react-test-renderer'
import ShowLikes from '../show-likes'
import { shallow } from 'enzyme'

describe('ShowLikes Component', () => {
  const props = {
    post_id: 11,
    likes_count: 1,
    decrementLikes: jest.fn(),
  }

  it('should match snapshot', () => {
    const tree = create(<ShowLikes {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should show <Likes/> when showLikes == true', () => {
    const wrapper = shallow(<ShowLikes {...props} />)
    wrapper.find('.p_likes').simulate('click')
    expect(wrapper.find('Connect(Likes)').exists()).toBe(true)
  })
})
