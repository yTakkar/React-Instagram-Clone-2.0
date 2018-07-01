import React from 'react'
import { create } from 'react-test-renderer'
import PasswordSection from '../password-section'

describe('PasswordSection Component', () => {
  it('should match snapshot', () => {
    const tree = create(
      <PasswordSection
        label="Current password"
        value="Some value"
        autoFocus
        change={jest.fn()}
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
