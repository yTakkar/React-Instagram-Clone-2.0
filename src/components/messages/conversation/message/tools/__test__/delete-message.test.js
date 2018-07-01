import React from 'react'
import { create } from 'react-test-renderer'
import { PureDeleteMessageTool } from '../delete-message'
import { shallow } from 'enzyme'

describe('DeleteMessageTool Component', () => {
  const comp = (
    <PureDeleteMessageTool
      messageDetails={{
        message: 'some message',
        message_id: 44,
        type: 'text',
      }}
    />
  )

  it('should match snapshot', () => {
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should show <Prompt/> when clicked on the delete icon', () => {
    const wrapper = shallow(comp)
    wrapper.find('.toggle_dlt_mssg').simulate('click')
    expect(wrapper.find('Prompt').exists()).toBe(true)
  })

  it('should mock deleteMessage action when clicked on Prompt action button', () => {
    const wrapper = shallow(comp)
    wrapper.setState({ deleteMessage: true })
    wrapper.find('Prompt').prop('action')({
      preventDefault() {},
    })
  })
})
