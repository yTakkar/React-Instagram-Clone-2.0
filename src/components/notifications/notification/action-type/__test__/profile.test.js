import React from 'react'
import { create } from 'react-test-renderer'
import NotificationTypeProfile from '../profile'

describe('NotificationTypeProfile Component', () => {
  it('should match snapshot', () => {
    const tree = create(
      <NotificationTypeProfile user_username="ghalib" />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
