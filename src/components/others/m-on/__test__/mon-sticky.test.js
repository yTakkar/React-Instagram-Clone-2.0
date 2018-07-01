import React from 'react'
import MonSticky from '../mon-sticky'
import { create } from 'react-test-renderer'

describe('MonSticky Component', () => {
  it('should match snapshot with no content', () => {
    const tree = create(<MonSticky show={false} text="2 mins ago" />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot', () => {
    const tree = create(<MonSticky show text="a month ago" />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
