import React from 'react'
import { create } from 'react-test-renderer'
import RecommendBy from '../recommend-by'

describe('RecommendBy Component', () => {
  it('should match snapshot', () => {
    const tree = create(<RecommendBy username="ghalib" />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
