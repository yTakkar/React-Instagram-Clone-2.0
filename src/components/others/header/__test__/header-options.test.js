import React from 'react'
import HeaderOptions from '../header-options'
import { create } from 'react-test-renderer'
import { BrowserRouter as Router } from 'react-router-dom'

describe('HeaderOptions Component', () => {
  const mockFn = jest.fn()

  it('should match snapshot', () => {
    const tree = create(
      <Router>
        <HeaderOptions
          toggleOptions={mockFn}
        />
      </Router>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
