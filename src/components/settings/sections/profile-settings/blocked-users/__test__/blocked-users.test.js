import React from 'react'
import { Provider } from 'react-redux'
import mockStore from '../../../../../../store/__mocks__/mockStore'
import BlockedUsers from '../blocked-users'
import { create } from 'react-test-renderer'
import Setting from '../../../../../../store/__mocks__/reducers/Setting'

describe('BlockedUsers Component', () => {
  const comp = (
    <Provider store={mockStore}>
      <BlockedUsers />
    </Provider>
  )

  it('should match snapshot', () => {
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot and show when blockedUsers.length == 0', () => {
    Setting.blockedUsers = []
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
