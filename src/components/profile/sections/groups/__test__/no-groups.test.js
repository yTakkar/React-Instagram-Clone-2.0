import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/__mocks__/mockStore'
import NoUserGroups from '../no-groups'
import Group from '../../../../../store/__mocks__/reducers/Group'
import MockDataElement from '../../../../../utils/__mocks__/mock-dataElement'

describe('NoUserGroups Component', () => {
  MockDataElement()

  const comp = (
    <Provider store={mockStore}>
      <NoUserGroups />
    </Provider>
  )

  it('should match snapshot', () => {
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot and show <End/> when groups.length == 0', () => {
    Group.userGroups = []
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
