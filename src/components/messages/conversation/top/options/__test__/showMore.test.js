import React from 'react'
import { create } from 'react-test-renderer'
import ConversationShowMore from '../showMore'
import { shallow } from 'enzyme'

describe('ConversationShowMore Component', () => {
  const mockFn = jest.fn()
  const props = {
    toggleOptions: mockFn,
  }

  it('should match snapshot', () => {
    const tree = create(<ConversationShowMore {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should show <AboutConversation/> when clicked on more option', () => {
    const wrapper = shallow(<ConversationShowMore {...props} />)
    wrapper.find('.m_m_info').simulate('click', {
      preventDefault() {},
    })
    expect(wrapper.find('Connect(AboutConversation)').exists()).toBe(true)
  })
})
