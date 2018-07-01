import React from 'react'
import { create } from 'react-test-renderer'
import EditMessageTool from '../edit-message'
import { shallow } from 'enzyme'

describe('EditMessageTool Component', () => {
  const comp = (type = 'text') => (
    <EditMessageTool
      messageDetails={{
        message: 'some message',
        message_id: 44,
        type,
      }}
      updateMessage={jest.fn()}
    />
  )

  it('should match snapshot', () => {
    const tree = create(comp()).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should show <EditMessage/> when clicked on the edit icon', () => {
    const wrapper = shallow(comp())
    wrapper.find('.toggle_edit_mssg').simulate('click')
    expect(wrapper.find('EditMessage').exists()).toBe(true)
  })

  it('should match snapshot with null when type != text', () => {
    const tree = create(comp('image')).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
