import React from 'react'
import HeaderTopLinks from '../top-links'
import { create } from 'react-test-renderer'

describe('HeaderTopLinks Component', () => {
  it('should match snapshot', () => {
    const tree = create(<HeaderTopLinks />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
