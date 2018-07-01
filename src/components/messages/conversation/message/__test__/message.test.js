import React from 'react'
import { create } from 'react-test-renderer'
import Message from '../message'
import MessageMockData from '../../../../../store/__mocks__/reducers/Message'
import { shallow } from 'enzyme'

describe('Message Component', () => {
  const comp = index => <Message {...MessageMockData.messages[index]} />

  it('should match snapshot with message type sticker', () => {
    const tree = create(comp(0)).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with message type text', () => {
    const tree = create(comp(1)).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with message type image', () => {
    const tree = create(comp(3)).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should show <MessageTools/> when clicked on the message div', () => {
    const wrapper = shallow(comp(0))
    wrapper.find('.toggle_mssg_tools').simulate('click')
    expect(wrapper.find('MessageTools').exists()).toBe(true)
  })
})
