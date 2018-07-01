import React from 'react'
import MockDataElement from '../../../../../utils/__mocks__/mock-dataElement'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/__mocks__/mockStore'
import GroupBio from '../grp-bio'
import Group from '../../../../../store/__mocks__/reducers/Group'

describe('GroupBio Component', () => {
  MockDataElement()

  const comp = (
    <Provider store={mockStore}>
      <GroupBio />
    </Provider>
  )

  it('should match snapshot', () => {
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot and show edit bio button when not admin', () => {
    Group.group_details.admin = 7
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
