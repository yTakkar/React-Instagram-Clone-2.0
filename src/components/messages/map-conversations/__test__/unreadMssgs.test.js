import React from 'react'
import { create } from 'react-test-renderer'
import UnreadMssgs from '../unreadMssgs'

describe('UnreadMssgs Component', () => {
  it('should match snapshot', () => {
    const tree = create(<UnreadMssgs unreadMssgs={4} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with null when unreadMssgs = 0', () => {
    const tree = create(<UnreadMssgs unreadMssgs={0} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot and display "+" when unreadMssgs > 9', () => {
    const tree = create(<UnreadMssgs unreadMssgs={20} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
