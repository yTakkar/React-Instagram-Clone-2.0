import React from 'react'
import { create } from 'react-test-renderer'
import { BrowserRouter as Router } from 'react-router-dom'
import RecommendBy from '../recommend-by'

describe('RecommendBy Component', () => {

  it('should match snapshot', () => {
    const tree = create(
      <Router>
        <RecommendBy username='ghalib' />
      </Router>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
