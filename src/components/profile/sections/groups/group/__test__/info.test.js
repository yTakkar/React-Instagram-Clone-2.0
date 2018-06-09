import React from 'react'
import { create } from 'react-test-renderer'
import { BrowserRouter as Router } from 'react-router-dom'
import UserGroupInfo from '../info'
import Group from '../../../../../../store/mockStore/mock-reducers/Group'

describe('UserGroupInfo Component', () => {

  it('should match snapshot', () => {
    const tree = create(
      <Router>
        <UserGroupInfo
          info={Group.userGroups[0]}
        />
      </Router>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot when member is also the admin of group', () => {
    const tree = create(
      <Router>
        <UserGroupInfo
          info={{
            ...Group.userGroups[0],
            admin: 24
          }}
        />
      </Router>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
