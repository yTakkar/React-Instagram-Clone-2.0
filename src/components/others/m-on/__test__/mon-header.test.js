import React from 'react'
import MonHeader from '../mon-header'
import { create } from 'react-test-renderer'

describe('Mon-Header Component', () => {
  it('should match snapshot with no content', () => {
    const tree = create(<MonHeader len={0} forWhat="member" />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with complete component', () => {
    const tree = create(<MonHeader len={4} forWhat="group" />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with you-may-know message', () => {
    const tree = create(<MonHeader len={4} forWhat="puk" />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
