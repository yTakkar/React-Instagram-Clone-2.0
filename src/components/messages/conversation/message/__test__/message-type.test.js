import React from 'react'
import { create } from 'react-test-renderer'
import MessageType from '../message-type'
import { shallow } from 'enzyme'

describe('MessageType Component', () => {
  it('should match snapshot with type text', () => {
    const tree = create(
      <MessageType
        messageDetails={{
          type: 'text',
          message: 'kjkjk',
          message_time: '1525809227238',
        }}
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with type sticker', () => {
    const tree = create(
      <MessageType
        messageDetails={{
          type: 'sticker',
          message: 'instagram_message_1525091176544.jpg',
          message_time: '1525809227238',
        }}
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with type image', () => {
    const tree = create(
      <MessageType
        messageDetails={{
          type: 'image',
          message: 'instagram_message_1525091176544.jpg',
          message_time: '1525809227238',
        }}
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should show <ImageTheatre/> when clicked on image message', () => {
    const wrapper = shallow(
      <MessageType
        messageDetails={{
          type: 'image',
          message: 'instagram_message_1525091176544.jpg',
          message_time: '1525809227238',
        }}
      />
    )
    wrapper.find('img.m_m_img').simulate('click')
    expect(wrapper.find('ImageTheatre').exists()).toBe(true)
  })

  it('should match snapshot with null when !message', () => {
    const tree = create(
      <MessageType
        messageDetails={{
          type: 'text',
          message: '',
          message_time: '1525809227238',
        }}
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
