import React from 'react'
import { create } from 'react-test-renderer'
import AppLink from '../link'
import { BrowserRouter as Router } from 'react-router-dom'

describe('AppLink Component', () => {

  it('should match snapshot with label as a string', () => {
    const tree = create(
      <Router>
        <AppLink
          to='/'
          label='Home'
        />
      </Router>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with children prop', () => {
    const tree = create(
      <Router>
        <AppLink to='/' >
          <img src='/images/spacecraft.jpg' />
        </AppLink>
      </Router>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
