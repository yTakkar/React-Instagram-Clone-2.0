import React from 'react'
import SidebarLink from '../link'
import { create } from 'react-test-renderer'

describe('SideBarLink Component', () => {
  const props = {
    label: 'A label',
    link: '/',
  }

  it('should match snapshot', () => {
    const tree = create(<SidebarLink {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot & show number (eg. unread noti.)', () => {
    const tree = create(
      <SidebarLink {...props} showNumbers numbers={4} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot & display + if number > 9', () => {
    const tree = create(
      <SidebarLink {...props} showNumbers numbers={14} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
