import React from 'react'
import { create } from 'react-test-renderer'
import ToLink from '../toLink'

describe('ToLink Component', () => {
  it('should match snapshot', () => {
    const tree = create(
      <ToLink url="/hashtag/travel" label="A label" />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
