import React from 'react'
import { create } from 'react-test-renderer'
import GrpAboutSection from '../section'
import { BrowserRouter as Router } from 'react-router-dom'

describe('GrpAboutSection Component', () => {

  it('should match snapshot with type text', () => {
    const tree = create(
      <GrpAboutSection
        label='Bio'
        value='A unique bio'
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with type link', () => {
    const tree = create(
      <Router>
        <GrpAboutSection
          type='link'
          label='Group created by'
          value='takkar'
          url='/profile/takkar'
        />
      </Router>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
