import React from 'react'
import { create } from 'react-test-renderer'
import EditPen from '../edit-pen'
import { BrowserRouter as Router } from 'react-router-dom'

describe('EditPen Component', () => {

  it('should match snapshot', () => {
    const tree = create(
      <Router>
        <EditPen
          when='profile'
          to='/edit-profile'
        />
      </Router>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
