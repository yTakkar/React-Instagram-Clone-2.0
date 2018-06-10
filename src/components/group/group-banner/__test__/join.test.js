import React from 'react'
import MockDataElement from '../../../../utils/__test__/mock-dataElement'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../store/mockStore/mockStore'
import { BrowserRouter as Router } from 'react-router-dom'
import JoinGroup from '../join'
import Group from '../../../../store/mockStore/mock-reducers/Group'

describe('JoinGroup Component', () => {
  MockDataElement()

  const comp = (
    <Provider store={mockStore}>
      <Router>
        <JoinGroup/>
      </Router>
    </Provider>
  )

  it('should match snapshot', () => {
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot and show <Join/> when joined == false', () => {
    Group.group_details.admin = 7
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot and show <Leave/> when joined == true', () => {
    Group.group_details.admin = 7
    Group.joined = true
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
