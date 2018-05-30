import React from 'react'
import SidebarLink from '../link'
import { create } from 'react-test-renderer'
import { BrowserRouter as Router } from 'react-router-dom'

describe('SideBarLink Component', () => {
  const props = {
    label: 'A label',
    link: '/'
  }

  it('should match snapshot', () => {
    const tree = create(
      <Router>
        <SidebarLink
          {...props}
        />
      </Router>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot & show number (eg. unread noti.)', () => {
    const tree = create(
      <Router>
        <SidebarLink
          {...props}
          showNumbers
          numbers={4}
        />
      </Router>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot & display + if number > 9', () => {
    const tree = create(
      <Router>
        <SidebarLink
          {...props}
          showNumbers
          numbers={14}
        />
      </Router>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
