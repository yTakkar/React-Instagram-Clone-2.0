import React from 'react'
import ProfileNavLink from '../profile-navlink'
import { create } from 'react-test-renderer'

describe('Profile Navlink', () => {
  it('should match snapshot', () => {
    const tree = create(
      <ProfileNavLink url="/profile/vsocial/bookmarks" label="Bookmarks" />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
