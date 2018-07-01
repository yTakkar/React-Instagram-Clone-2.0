import React from 'react'
import { create } from 'react-test-renderer'
import GroupNav from '../group-nav'
import MockDataElement from '../../../utils/__mocks__/mock-dataElement'

describe('GroupNav Component', () => {
  MockDataElement()

  it('should match snapshot', () => {
    const tree = create(<GroupNav url="/group/11" admin={7} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot and show edit & add-member links also', () => {
    const tree = create(<GroupNav url="/group/11" admin={24} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
