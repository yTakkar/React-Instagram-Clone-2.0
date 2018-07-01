import React from 'react'
import RangeInput from '../range'
import { create } from 'react-test-renderer'

describe('RangeInput Component', () => {
  it('should match snapshot', () => {
    const tree = create(
      <RangeInput value={20} min={10} max={100} onChange={jest.fn()} />
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
