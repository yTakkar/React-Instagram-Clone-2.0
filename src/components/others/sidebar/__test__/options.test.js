import React from 'react'
import SidebarOptions from '../options'
import { create } from 'react-test-renderer'

describe('SideBarOptions Component', () => {
  it('should match snapshot', () => {
    const tree = create(<SidebarOptions />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
