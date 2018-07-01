import React from 'react'
import { create } from 'react-test-renderer'
import Notification from '../notification'
import { Provider } from 'react-redux'
import mockStore from '../../../../store/__mocks__/mockStore'

describe('Notification Component', () => {
  const props = {
    notify_id: 56,
    notify_by: 7,
    notify_by_username: 'ghalib',
    notify_time: '1518972814710',
    type: 'follow',
    user: 0,
    user_username: '',
    post_id: 0,
    group_id: 0,
    isFollowing: false,
  }

  const comp = (extraProps = {}) => (
    <Provider store={mockStore}>
      <Notification {...props} {...extraProps} />
    </Provider>
  )

  it('should match snapshot with follow notification', () => {
    const tree = create(comp()).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with tag notification', () => {
    const ep = {
      type: 'tag',
      post_id: 23,
    }
    const tree = create(comp(ep)).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with recommend notification', () => {
    const ep = {
      type: 'recommend',
      user: 8,
      user_username: 'coldplay',
    }
    const tree = create(comp(ep)).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with change_admin notification', () => {
    const ep = {
      type: 'change_admin',
      group_id: 11,
    }
    const tree = create(comp(ep)).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with mention_post notification', () => {
    const ep = {
      type: 'mention_post',
      post_id: 8,
    }
    const tree = create(comp(ep)).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with like notification', () => {
    const ep = {
      type: 'like',
      post_id: 8,
    }
    const tree = create(comp(ep)).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
