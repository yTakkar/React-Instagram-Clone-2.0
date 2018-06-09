import React from 'react'
import { create } from 'react-test-renderer'
import UpdateInstruction from '../update-instruction'
import { BrowserRouter as Router } from 'react-router-dom'

describe('UpdateInstruction Component', () => {

  it('should match snapshot', () => {
    const tree = create(
      <Router>
        <UpdateInstruction/>
      </Router>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
