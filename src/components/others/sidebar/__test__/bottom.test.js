import React from 'react'
import SidebarBottom from '../bottom'
import { create } from 'react-test-renderer'
import { shallow } from 'enzyme'

describe('SideBarBottom Component', () => {
  it('should match snapshot', () => {
    const tree = create(<SidebarBottom />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should toggle options when clicked', () => {
    const wrapper = shallow(<SidebarBottom />)
    wrapper.find('.toggle-sb-options').simulate('click')
    expect(wrapper.state().showOptions).toBe(true)
    expect(wrapper.find('SidebarOptions').exists()).toBe(true)
  })
})
