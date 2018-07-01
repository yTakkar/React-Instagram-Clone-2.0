import React from 'react'
import { create } from 'react-test-renderer'
import EditMessage from '../edit'
import { shallow } from 'enzyme'

describe('EditMessage Component', () => {
  const mockFn = jest.fn()
  const comp = (
    <EditMessage
      message="cool message"
      message_id={44}
      changeMessage={mockFn}
      back={mockFn}
    />
  )

  it('should match snapshot', () => {
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should mock updateMessage action when button is clicked', () => {
    const wrapper = shallow(comp)
    wrapper.find('PrimaryButton').simulate('click', {
      preventDefault() {},
    })
  })
})
