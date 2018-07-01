import React from 'react'
import { create } from 'react-test-renderer'
import CreateGroup from '../create-group'
import { shallow } from 'enzyme'

describe('CreateGroup Component', () => {
  it('should match snapshot', () => {
    const tree = create(<CreateGroup />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should show <CreateGroupModal/> when button is clicked', () => {
    const wrapper = shallow(<CreateGroup />)
    wrapper.find('SecondaryButton').simulate('click', {
      preventDefault() {},
    })
    expect(wrapper.find('CreateGroupModal').exists()).toBe(true)
  })
})
