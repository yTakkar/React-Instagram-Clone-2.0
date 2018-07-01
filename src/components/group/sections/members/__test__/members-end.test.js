import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/__mocks__/mockStore'
import MembersEnd from '../Members-end'
import Group from '../../../../../store/__mocks__/reducers/Group'

describe('MembersEnd Component', () => {
  const comp = (
    <Provider store={mockStore}>
      <MembersEnd loading={false} />
    </Provider>
  )

  it('should match snapshot and show <End/> when members.length > 0', () => {
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot and show <Nothing/> when members.length == 0', () => {
    Group.members = []
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
