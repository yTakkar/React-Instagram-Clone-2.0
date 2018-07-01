import React from 'react'
import { create } from 'react-test-renderer'
import OnlineUsersButton from '../onlineUserBtn'
import { shallow } from 'enzyme'

describe('OnlineUsersButton Component', () => {
  it('should match snapshot', () => {
    const tree = create(<OnlineUsersButton />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should show <OnlineUsers/> when clicked on PrimaryButton', () => {
    const wrapper = shallow(<OnlineUsersButton />)
    wrapper.find('PrimaryButton').simulate('click', {
      preventDefault() {},
    })
    expect(wrapper.state('showOnlineUsers')).toBe(true)
    expect(wrapper.find('Connect(OnlineUsers)').exists()).toBe(true)
  })
})
