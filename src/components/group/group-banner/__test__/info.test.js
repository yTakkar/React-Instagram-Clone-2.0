import React from 'react'
import { create } from 'react-test-renderer'
import GroupInfo from '../info'
import { Provider } from 'react-redux'
import mockStore from '../../../../store/__mocks__/mockStore'
import Group from '../../../../store/__mocks__/reducers/Group'

describe('GroupInfo Component', () => {
  const comp = (
    <Provider store={mockStore}>
      <GroupInfo />
    </Provider>
  )

  it('should match snapshot', () => {
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot when group_type == private', () => {
    Group.group_details.group_type = 'private'
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
