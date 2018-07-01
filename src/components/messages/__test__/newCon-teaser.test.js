import React from 'react'
import { create } from 'react-test-renderer'
import NewConTeaser from '../newCon-teaser'
import { shallow } from 'enzyme'

describe('NewConTeaser Component', () => {
  const comp = (
    <NewConTeaser
      userDetails={{
        id: 7,
        username: 'ghalib',
      }}
    />
  )

  it('should match snapshot', () => {
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should mock message action when button is clicked', () => {
    const wrapper = shallow(comp)
    wrapper.find('SecondaryButton').simulate('click', {
      preventDefault() {},
    })
  })

  it('should redirect to /messages when conversation with user is created', () => {
    const wrapper = shallow(comp)
    wrapper.setState({ messaged: true })
    expect(wrapper.find('Redirect').exists()).toBe(true)
  })
})
