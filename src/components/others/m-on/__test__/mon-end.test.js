import React from 'react'
import MonEnd from '../mon-end'
import { create } from 'react-test-renderer'

describe('Mon-End Component', () => {
  it('should match snapshot with Nothing component', () => {
    const tree = create(
      <MonEnd len={0} nothingMssg="You have nothing" />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with End component', () => {
    const tree = create(
      <MonEnd len={10} nothingMssg="You have nothing" />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
