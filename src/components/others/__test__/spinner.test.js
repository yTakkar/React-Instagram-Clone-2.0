import React from 'react'
import Spinner from '../spinner'
import { create } from 'react-test-renderer'

describe('Spinner Component', () => {
  it('should match snapshot', () => {
    const tree = create(<Spinner />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
