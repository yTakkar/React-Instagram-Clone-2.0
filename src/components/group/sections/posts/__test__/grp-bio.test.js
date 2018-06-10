import React from 'react'
import MockDataElement from '../../../../../utils/__test__/mock-dataElement'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/mockStore/mockStore'
import { BrowserRouter as Router } from 'react-router-dom'
import GroupBio from '../grp-bio'
import Group from '../../../../../store/mockStore/mock-reducers/Group'

describe('GroupBio Component', () => {
  MockDataElement()

  const comp = (
    <Provider store={mockStore}>
      <Router>
        <GroupBio />
      </Router>
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
