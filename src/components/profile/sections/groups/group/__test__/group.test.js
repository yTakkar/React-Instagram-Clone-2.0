import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../../store/__mocks__/mockStore'
import UserGroupList, { PureUserGroupList } from '../group'
import { shallow } from 'enzyme'
import Group from '../../../../../../store/__mocks__/reducers/Group'
import MockDataElement from '../../../../../../utils/__mocks__/mock-dataElement'
import User from '../../../../../../store/__mocks__/reducers/User'

describe('UserGroupList Component', () => {
  MockDataElement()

  it('should match snapshot with group page link', () => {
    const tree = create(
      <Provider store={mockStore}>
        <UserGroupList {...Group.userGroups[0]} admin={24} />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should show <Join/> when joined == false', () => {
    const wrapper = shallow(
      <PureUserGroupList {...Group.userGroups[0]} session={User.session} />
    )
    wrapper.setState({ joined: false })
    expect(wrapper.find('Join').exists()).toBe(true)
  })

  it('should show <Leave/> when joined == true', () => {
    const wrapper = shallow(
      <PureUserGroupList {...Group.userGroups[0]} session={User.session} />
    )
    wrapper.setState({ joined: true })
    expect(wrapper.find('Connect(Leave)').exists()).toBe(true)
  })
})
