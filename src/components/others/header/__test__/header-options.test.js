import React from 'react'
import HeaderOptions from '../header-options'
import { create } from 'react-test-renderer'

describe('HeaderOptions Component', () => {
  const mockFn = jest.fn()

  it('should match snapshot', () => {
    const tree = create(<HeaderOptions toggleOptions={mockFn} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
