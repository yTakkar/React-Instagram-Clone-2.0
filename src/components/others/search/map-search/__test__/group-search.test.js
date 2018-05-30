import React from 'react'
import { create } from 'react-test-renderer'
import { BrowserRouter as Router } from 'react-router-dom'
import GroupSearch from '../group-search'

describe('Group-Search Component', () => {
  const props = {
    group_id: 11,
    name: 'a groupss',
    membersCount: 11,
    mutualMembersCount: 0,
    clicked() {}
  }

  it('should match snapshot', () => {
    const tree = create(
      <Router>
        <GroupSearch
          {...props}
        />
      </Router>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with mutual members also hide members count', () => {
    const tree = create(
      <Router>
        <GroupSearch
          {...props}
          mutualMembersCount={3}
        />
      </Router>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })


})
