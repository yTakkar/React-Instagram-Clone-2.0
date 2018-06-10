import React from 'react'
import { create } from 'react-test-renderer'
import { BrowserRouter as Router } from 'react-router-dom'
import InviteList from '../invite-list'
import Group from '../../../../store/mockStore/mock-reducers/Group'
import { shallow } from 'enzyme'

describe('InviteList Component', () => {
  const props = {
    ...Group.usersToInvite[0],
    back: jest.fn(),
    group: 45
  }

  it('should match snapshot', () => {
    const tree = create(
      <Router>
        <InviteList {...props} />
      </Router>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot', () => {
    const wrapper = shallow(
      <InviteList {...props} />
    )
    wrapper.find('PrimaryButton').simulate('click', {
      preventDefault() {}
    })
  })

})
