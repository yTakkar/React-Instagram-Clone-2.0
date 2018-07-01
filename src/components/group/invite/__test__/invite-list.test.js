import React from 'react'
import { create } from 'react-test-renderer'
import InviteList from '../invite-list'
import Group from '../../../../store/__mocks__/reducers/Group'
import { shallow } from 'enzyme'

describe('InviteList Component', () => {
  const props = {
    ...Group.usersToInvite[0],
    back: jest.fn(),
    group: 45,
  }

  it('should match snapshot', () => {
    const tree = create(<InviteList {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot', () => {
    const wrapper = shallow(<InviteList {...props} />)
    wrapper.find('PrimaryButton').simulate('click', {
      preventDefault() {},
    })
  })
})
