import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../../store/mockStore/mockStore'
import UserGroupList, { PureUserGroupList } from '../group'
import { BrowserRouter as Router } from 'react-router-dom'
import { shallow } from 'enzyme'
import Group from '../../../../../../store/mockStore/mock-reducers/Group'
import MockDataElement from '../../../../../../utils/__test__/mock-dataElement'
import User from '../../../../../../store/mockStore/mock-reducers/User'

describe('UserGroupList Component', () => {
  MockDataElement()

  it('should match snapshot with group page link', () => {
    const tree = create(
      <Provider store={mockStore}>
        <Router>
          <UserGroupList
            {...Group.userGroups[0]}
            admin={24}
          />
        </Router>
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should show <Join/> when joined == false', () => {
    const wrapper = shallow(
      <PureUserGroupList
        {...Group.userGroups[0]}
        session={User.session}
      />
    )
    wrapper.setState({ joined: false })
    expect(wrapper.find('Join').exists()).toBe(true)
  })

  it('should show <Leave/> when joined == true', () => {
    const wrapper = shallow(
      <PureUserGroupList
        {...Group.userGroups[0]}
        session={User.session}
      />
    )
    wrapper.setState({ joined: true })
    expect(wrapper.find('Connect(Leave)').exists()).toBe(true)
  })

})
