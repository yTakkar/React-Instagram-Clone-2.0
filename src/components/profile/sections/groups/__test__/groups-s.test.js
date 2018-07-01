import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/__mocks__/mockStore'
import UserGroups, { PureUserGroups } from '../groups-s'
import MockDataElement from '../../../../../utils/__mocks__/mock-dataElement'
import { shallow } from 'enzyme'
import User from '../../../../../store/__mocks__/reducers/User'
import Group from '../../../../../store/__mocks__/reducers/Group'

describe('UserGroups Component', () => {
  MockDataElement()

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <UserGroups param="takkar" />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should hide spinner when loading == false', () => {
    const wrapper = shallow(
      <PureUserGroups
        dispatch={jest.fn()}
        param="ghalib"
        ud={User.user_details}
        groups={Group.userGroups}
      />
    )
    wrapper.setState({ loading: false })
    expect(wrapper.find('IsLoading').prop('loading')).toBe(false)
  })
})
