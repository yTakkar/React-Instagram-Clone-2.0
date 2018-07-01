import React from 'react'
import { create } from 'react-test-renderer'
import NotificationTypePost from '../post'

describe('NotificationTypePost Component', () => {
  it('should match snapshot', () => {
    const tree = create(<NotificationTypePost post_id={23} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
