import React from 'react'
import ProfileNavLink from '../profile-navlink'
import { create } from 'react-test-renderer'
import { BrowserRouter as Router } from 'react-router-dom'

describe('Profile Navlink', () => {

  it('should match snapshot', () => {
    const tree = create(
      <Router>
        <ProfileNavLink
          url='/profile/takkar/bookmarks'
          label='Bookmarks'
        />
      </Router>
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

})
