import React from 'react'
import { create } from 'react-test-renderer'
import ConversationTeaser from '../conversation-teaser'
import Message from '../../../../store/__mocks__/reducers/Message'
import { shallow } from 'enzyme'

describe('ConversationTeaser Component', () => {
  let mockFn = jest.fn()

  it('should match snapshot', () => {
    const tree = create(
      <ConversationTeaser {...Message.conversations[0]} select={mockFn} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot when conversation has no last message', () => {
    const tree = create(
      <ConversationTeaser {...Message.conversations[1]} select={mockFn} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should mock selectConversation action when clicked on a conversation', () => {
    const wrapper = shallow(
      <ConversationTeaser {...Message.conversations[0]} select={mockFn} />
    )
    wrapper.find('.mssg_sr').simulate('click')
  })
})
