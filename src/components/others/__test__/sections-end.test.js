import React from 'react'
import SectionsEnd from '../sections-end'
import { create } from 'react-test-renderer'

describe('Sections-End Component', () => {
  it('should match snapshot', () => {
    const tree = create(<SectionsEnd len={5} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
