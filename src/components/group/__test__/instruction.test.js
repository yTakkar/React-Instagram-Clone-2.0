import React from 'react'
import { create } from 'react-test-renderer'
import { BrowserRouter as Router } from 'react-router-dom'
import GroupInstruction from '../instruction'

describe('GroupInstruction Component', () => {

  it('should match snapshot', () => {
    const tree = create(
      <Router>
        <GroupInstruction/>
      </Router>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot and hide buttons', () => {
    const tree = create(
      <GroupInstruction
        showBtns={false}
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
