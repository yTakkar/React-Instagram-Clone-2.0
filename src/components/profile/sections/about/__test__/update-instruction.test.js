import React from 'react'
import { create } from 'react-test-renderer'
import UpdateInstruction from '../update-instruction'

describe('UpdateInstruction Component', () => {
  it('should match snapshot', () => {
    const tree = create(<UpdateInstruction />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
