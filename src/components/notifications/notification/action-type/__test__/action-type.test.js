import React from 'react'
import NotificationActionType from '../action-type'
import { shallow } from 'enzyme'

// MAKES USE OF SHALLOW SNAPHSOT

describe('NotificationActionType Component', () => {
  const props = {
    details: {
      type: 'follow',
      user_username: '',
      notify_by: 7,
      notify_by_username: 'ghalib',
      post_id: 24,
      group_id: 0,
      isFollowing: false,
    },
  }

  it('should match snapshot with <Follow/>', () => {
    const tree = shallow(<NotificationActionType {...props} />)
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with <Unfollow/>', () => {
    const tree = shallow(
      <NotificationActionType
        details={{
          ...props.details,
          isFollowing: true,
        }}
      />
    )
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with <NotificationTypePost/>', () => {
    const tree = shallow(
      <NotificationActionType
        details={{
          ...props.details,
          type: 'tag',
        }}
      />
    )
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with <NotificationTypeProfile/>', () => {
    const tree = shallow(
      <NotificationActionType
        details={{
          ...props.details,
          type: 'recommend',
          user_username: 'zayn',
        }}
      />
    )
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with <NotificationTypeGroup/>', () => {
    const tree = shallow(
      <NotificationActionType
        details={{
          ...props.details,
          type: 'change_admin',
          group_id: 17,
        }}
      />
    )
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with <NotificationTypeCon/>', () => {
    const tree = shallow(
      <NotificationActionType
        details={{
          ...props.details,
          type: 'new_con',
        }}
      />
    )
    expect(tree).toMatchSnapshot()
  })
})
