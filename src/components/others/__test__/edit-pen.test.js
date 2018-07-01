import React from 'react'
import { create } from 'react-test-renderer'
import EditPen from '../edit-pen'

describe('EditPen Component', () => {
  it('should match snapshot', () => {
    const tree = create(<EditPen when="profile" to="/edit-profile" />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
