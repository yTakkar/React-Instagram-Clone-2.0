import React from 'react'
import { create } from 'react-test-renderer'
import Loading from '../loading'

describe('Loading Component', () => {
  it('should match snapshot', () => {
    const tree = create(<Loading />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
