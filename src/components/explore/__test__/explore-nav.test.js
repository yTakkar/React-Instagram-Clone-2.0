import React from 'react'
import { create } from 'react-test-renderer'
import { BrowserRouter as Router } from 'react-router-dom'
import ExploreNav from '../explore-nav'

describe('ExploreNav Component', () => {

  it('should match snapshot', () => {
    const tree = create(
      <Router>
        <ExploreNav
          url='/explore'
        />
      </Router>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
