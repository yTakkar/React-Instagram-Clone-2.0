import React from 'react'
import { create } from 'react-test-renderer'
import GroupInfo from '../info'
import { Provider } from 'react-redux'
import mockStore from '../../../../store/mockStore/mockStore'
import { BrowserRouter as Router } from 'react-router-dom'
import Group from '../../../../store/mockStore/mock-reducers/Group'

describe('GroupInfo Component', () => {
  const comp = (
    <Provider store={mockStore}>
      <Router>
        <GroupInfo/>
      </Router>
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
