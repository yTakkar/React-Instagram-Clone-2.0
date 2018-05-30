import React from 'react'
import SectionsEnd from '../sections-end'
import renderer from 'react-test-renderer'

describe('Sections-End Component', () => {

  it('should match snapshot', () => {
    const tree = renderer.create(<SectionsEnd len={5} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
