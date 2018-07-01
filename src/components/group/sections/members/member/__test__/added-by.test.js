import React from 'react'
import { create } from 'react-test-renderer'
import MemberAddedBy from '../added_by'

describe('MemberAddedBy Component', () => {
  const memberDetails = {
    member: 18,
    added_by: 7,
    added_by_username: 'ghalib',
  }

  it('should match snapshot', () => {
    const tree = create(
      <MemberAddedBy memberDetails={memberDetails} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot and display null when member is not added by anyone', () => {
    const tree = create(
      <MemberAddedBy
        memberDetails={{
          ...memberDetails,
          member: 7,
        }}
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
