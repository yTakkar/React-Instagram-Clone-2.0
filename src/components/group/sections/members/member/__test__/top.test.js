import React from 'react'
import MockDataElement from '../../../../../../utils/__mocks__/mock-dataElement'
import { Provider } from 'react-redux'
import mockStore from '../../../../../../store/__mocks__/mockStore'
import MembersTop from '../top'
import { create } from 'react-test-renderer'
import Group from '../../../../../../store/__mocks__/reducers/Group'

describe('MemberTop Component', () => {
  MockDataElement()

  const memberDetails = {
    member: 7,
    username: 'ghalib',
    firstname: 'Mirza',
    surname: 'Ghalib',
    mutualUsersCount: 0,
  }

  const comp = (extraProps = {}) => (
    <Provider store={mockStore}>
      <MembersTop
        memberDetails={{
          ...memberDetails,
          ...extraProps,
        }}
      />
    </Provider>
  )

  it('should match snapshot', () => {
    const tree = create(comp()).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot and show mutual followers', () => {
    const tree = create(
      comp({
        mutualUsersCount: 2,
      })
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot and show admin label when member is admin of the group', () => {
    Group.group_details.admin = 7
    const tree = create(comp()).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
