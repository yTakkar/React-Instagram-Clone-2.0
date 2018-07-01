import React from 'react'
import { create } from 'react-test-renderer'
import ShowSharers from '../show-sharers'
import { shallow } from 'enzyme'

describe('ShowSharers Component', () => {
  const props = {
    post_id: 11,
    shares_count: 1,
    decrementSharers: jest.fn(),
  }

  it('should match snapshot', () => {
    const tree = create(<ShowSharers {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should show <Sharers/> when showSharers == true', () => {
    const wrapper = shallow(<ShowSharers {...props} />)
    wrapper.find('.p_comm').simulate('click')
    expect(wrapper.find('Connect(Sharers)').exists()).toBe(true)
  })
})
