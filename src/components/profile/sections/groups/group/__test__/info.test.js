import React from 'react'
import { create } from 'react-test-renderer'
import UserGroupInfo from '../info'
import Group from '../../../../../../store/__mocks__/reducers/Group'

describe('UserGroupInfo Component', () => {
  it('should match snapshot', () => {
    const tree = create(<UserGroupInfo info={Group.userGroups[0]} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot when member is also the admin of group', () => {
    const tree = create(
      <UserGroupInfo
        info={{
          ...Group.userGroups[0],
          admin: 24,
        }}
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
