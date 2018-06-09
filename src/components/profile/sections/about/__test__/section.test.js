import React from 'react'
import { create } from 'react-test-renderer'
import { BrowserRouter as Router } from 'react-router-dom'
import AboutSection from '../section'

describe('AboutSection Component', () => {

  it('should match snapshot', () => {
    const tree = create(
      <Router>
        <AboutSection
          label='Username'
          value='takkar'
        />
      </Router>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with isLink prop', () => {
    const tree = create(
      <Router>
        <AboutSection
          label='Github'
          value='https://www.github.com/yTakkar'
          isLink
        />
      </Router>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with null', () => {
    const tree = create(
      <Router>
        <AboutSection
          label='Firstname'
          value=''
        />
      </Router>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
