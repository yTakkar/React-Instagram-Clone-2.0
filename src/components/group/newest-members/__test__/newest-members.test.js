import React from 'react'
import { Provider } from 'react-redux'
import mockStore from '../../../../store/__mocks__/mockStore'
import NewestMembers from '../newest-members'
import { create } from 'react-test-renderer'
import Group from '../../../../store/__mocks__/reducers/Group'

describe('NewestMembers Component', () => {
  const comp = (
    <Provider store={mockStore}>
      <NewestMembers group={34} />
    </Provider>
  )

  it('should match snapshot', () => {
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with null when mutualMembers.length == 0', () => {
    Group.newestMembers = []
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
