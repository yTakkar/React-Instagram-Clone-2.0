import React from 'react'
import HeaderTopLinks from '../top-links'
import { create } from 'react-test-renderer'
import { BrowserRouter as Router } from 'react-router-dom'

describe('HeaderTopLinks Component', () => {

  it('should match snapshot', () => {
    const tree = create(
      <Router>
        <HeaderTopLinks/>
      </Router>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
