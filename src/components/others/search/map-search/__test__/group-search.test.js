import React from 'react'
import { create } from 'react-test-renderer'
import GroupSearch from '../group-search'

describe('Group-Search Component', () => {
  const props = {
    group_id: 11,
    name: 'a groupss',
    membersCount: 11,
    mutualMembersCount: 0,
    clicked() {},
  }

  it('should match snapshot', () => {
    const tree = create(<GroupSearch {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with mutual members also hide members count', () => {
    const tree = create(
      <GroupSearch {...props} mutualMembersCount={3} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
