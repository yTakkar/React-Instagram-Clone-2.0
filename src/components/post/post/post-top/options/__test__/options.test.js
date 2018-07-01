import React from 'react'
import { create } from 'react-test-renderer'
import PostOptions from '../options'
import { shallow } from 'enzyme'

describe('PostOptions Component', () => {
  const props = {
    postDetails: {
      user: 24,
      post_id: 11,
      when: 'feed',
      post_time: '1518972814710',
      description: 'assm',
    },
    updateDescription: jest.fn(),
  }

  it('should match snapshot', () => {
    const tree = create(<PostOptions {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should toggle options when toggle icon is clicked', () => {
    const wrapper = shallow(<PostOptions {...props} />)
    wrapper.find('.exp_p_menu').simulate('click')
    expect(wrapper.find('.p_options').exists()).toBe(true)
  })
})
