import React from 'react'
import { create } from 'react-test-renderer'
import { BrowserRouter as Router } from 'react-router-dom'
import GroupNav from '../group-nav'
import MockDataElement from '../../../utils/__mocks__/mock-dataElement'

describe('GroupNav Component', () => {
  MockDataElement()

  it('should match snapshot', () => {
    const tree = create(
      <Router>
        <GroupNav
          url='/group/11'
          admin={7}
        />
      </Router>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot and show edit & add-member links also', () => {
    const tree = create(
      <Router>
        <GroupNav
          url='/group/11'
          admin={24}
        />
      </Router>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
