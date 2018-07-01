import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import MembersList, { PureMembersList } from '../member'
import { shallow } from 'enzyme'
import Group from '../../../../../../store/__mocks__/reducers/Group'
import MockDataElement from '../../../../../../utils/__mocks__/mock-dataElement'
import mockStore from '../../../../../../store/__mocks__/mockStore'

describe('MembersList Component', () => {
  MockDataElement()

  const comp = (extraProps = {}) => (
    <Provider store={mockStore}>
      <MembersList {...Group.members[0]} {...extraProps} />
    </Provider>
  )

  it('should match snapshot with <RemoveMember/>', () => {
    const tree = create(comp()).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with profile link', () => {
    const tree = create(
      comp({
        member: 24,
        username: 'takkar',
      })
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should show <Follow/> when isFollowing == false', () => {
    const wrapper = shallow(
      <PureMembersList
        {...Group.members[0]}
        gd={{
          ...Group.group_details,
          admin: 7,
        }}
      />
    )
    wrapper.setState({ isFollowing: false })
    expect(wrapper.find('Connect(Follow)').exists()).toBe(true)
  })

  it('should show <Unfollow/> when isFollowing == true', () => {
    const wrapper = shallow(
      <PureMembersList
        {...Group.members[0]}
        gd={{
          ...Group.group_details,
          admin: 7,
        }}
      />
    )
    wrapper.setState({ isFollowing: true })
    expect(wrapper.find('Connect(Unfollow)').exists()).toBe(true)
  })
})
