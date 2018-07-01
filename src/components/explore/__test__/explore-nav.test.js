import React from 'react'
import { create } from 'react-test-renderer'
import ExploreNav from '../explore-nav'

describe('ExploreNav Component', () => {
  it('should match snapshot', () => {
    const tree = create(<ExploreNav url="/explore" />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
