import React from 'react'
import { create } from 'react-test-renderer'
import { BrowserRouter as Router } from 'react-router-dom'
import ToLink from '../toLink'

describe('ToLink Component', () => {

  it('should match snapshot', () => {
    const tree = create(
      <Router>
        <ToLink
          url='/hashtag/travel'
          label='A label'
        />
      </Router>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
