import React from 'react'
import { create } from 'react-test-renderer'
import ConversationAddEmojis from '../add-emojis'
import { shallow } from 'enzyme'

describe('ConversationAddEmojis Component', () => {
  const props = {
    updateMssgValue: jest.fn(),
  }

  it('should match snapshot', () => {
    const tree = create(<ConversationAddEmojis {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot and show <Emojis/> when clicked on emojis icon', () => {
    const wrapper = shallow(<ConversationAddEmojis {...props} />)
    wrapper.find('.mssg_emoji_btn').simulate('click')
    expect(wrapper.find('Emojis').exists()).toBe(true)
  })
})
