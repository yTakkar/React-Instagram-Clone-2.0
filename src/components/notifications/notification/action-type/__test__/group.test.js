import React from 'react'
import { create } from 'react-test-renderer'
import NotificationTypeGroup from '../group'

describe('NotificationTypeGroup Component', () => {
  it('should match snapshot', () => {
    const tree = create(<NotificationTypeGroup group_id={11} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
