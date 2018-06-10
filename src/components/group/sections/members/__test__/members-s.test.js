import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/mockStore/mockStore'
import { BrowserRouter as Router } from 'react-router-dom'
import GroupMembers, { PureGroupMembers } from '../members-s'
import MockDataElement from '../../../../../utils/__test__/mock-dataElement'
import { shallow } from 'enzyme'
import Group from '../../../../../store/mockStore/mock-reducers/Group'

describe('GroupMembers Component', () => {
  MockDataElement()

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <Router>
          <GroupMembers/>
        </Router>
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should hide spinner when loading == false', () => {
    const wrapper = shallow(
      <PureGroupMembers
        dispatch={jest.fn()}
        gd={Group.group_details}
        members={Group.members}
      />
    )
    wrapper.setState({ loading: false })
    expect(wrapper.find('IsLoading').prop('loading')).toBe(false)
  })

})
