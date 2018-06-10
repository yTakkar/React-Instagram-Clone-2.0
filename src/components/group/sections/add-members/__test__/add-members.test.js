import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/mockStore/mockStore'
import AddGroupMembers, { PureAddGroupMembers } from '../add-members-s'
import { BrowserRouter as Router } from 'react-router-dom'
import { shallow } from 'enzyme'
import Group from '../../../../../store/mockStore/mock-reducers/Group'

describe('AddGroupMembers Component', () => {

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <Router>
          <AddGroupMembers/>
        </Router>
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should mock addMember action', () => {
    const wrapper = shallow(
      <PureAddGroupMembers
        gd={Group.group_details}
        session={24}
      />
    )
    wrapper.find('SearchFollowings').prop('done')()
  })

})
