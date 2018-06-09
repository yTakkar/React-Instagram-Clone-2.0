import React from 'react'
import MockDataElement from '../../../utils/__test__/mock-dataElement'
import { create } from 'react-test-renderer'
import { BrowserRouter as Router } from 'react-router-dom'
import ProfileNav from '../nav'

describe('ProfileNav Component', () => {
  MockDataElement()

  it('should match snapshot', () => {
    const tree = create(
      <Router>
        <ProfileNav
          url='/profile/takkar'
          user={24}
        />
      </Router>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot when profile is not mine', () => {
    const tree = create(
      <Router>
        <ProfileNav
          url='/profile/ghalib'
          user={7}
        />
      </Router>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
