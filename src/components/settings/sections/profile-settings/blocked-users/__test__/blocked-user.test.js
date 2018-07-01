import React from 'react'
import BlockedUser, { PureBlockedUser } from '../blocked-user'
import { create } from 'react-test-renderer'
import Setting from '../../../../../../store/__mocks__/reducers/Setting'
import mockStore from '../../../../../../store/__mocks__/mockStore'
import { shallow } from 'enzyme'

describe('BlockedUser Component', () => {
  const comp = index => (
    <BlockedUser {...Setting.blockedUsers[index]} store={mockStore} />
  )

  it('should match snapshot', () => {
    const tree = create(comp(0)).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should mock unblock action', () => {
    const wrapper = shallow(<PureBlockedUser {...Setting.blockedUsers[0]} />)
    wrapper.find('SecondaryButton').simulate('click', {
      preventDefault() {},
    })
  })

  it('should match snapshot when mutualFollowersCount > 0', () => {
    const tree = create(comp(1)).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
