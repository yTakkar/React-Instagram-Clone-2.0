import React from 'react'
import { create } from 'react-test-renderer'
import InputBio from '../bio-input'

describe('InputBio Component', () => {
  it('should match snapshot', () => {
    const tree = create(
      <InputBio value="Some value" change={jest.fn()} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
