import React from 'react'
import { create } from 'react-test-renderer'
import AppLink from '../link'

describe('AppLink Component', () => {
  it('should match snapshot with label as a string', () => {
    const tree = create(<AppLink to="/" label="Home" />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with children prop', () => {
    const tree = create(
      <AppLink to="/">
        <img src="/images/spacecraft.jpg" />
      </AppLink>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
