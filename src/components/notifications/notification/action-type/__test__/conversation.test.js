import React from 'react'
import { create } from 'react-test-renderer'
import NotificationTypeCon from '../conversation'

describe('NotificationTypeCon Component', () => {
  it('should match snapshot', () => {
    const tree = create(<NotificationTypeCon />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
