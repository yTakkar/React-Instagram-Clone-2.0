import React from 'react'
import MockDataElement from '../../../utils/__mocks__/mock-dataElement'
import { create } from 'react-test-renderer'
import ProfileNav from '../nav'

describe('ProfileNav Component', () => {
  MockDataElement()

  it('should match snapshot', () => {
    const tree = create(<ProfileNav url="/profile/takkar" user={24} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot when profile is not mine', () => {
    const tree = create(<ProfileNav url="/profile/ghalib" user={7} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
