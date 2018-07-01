import React from 'react'
import { create } from 'react-test-renderer'
import LastMssgTime from '../lastMssgTime'

describe('LastMssgTime Component', () => {
  it('should match snapshot', () => {
    const tree = create(<LastMssgTime lastMssgTime="1518973051916" />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot and return null when !lastMssgTime or lastMssgTime == ""', () => {
    const tree = create(<LastMssgTime />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
