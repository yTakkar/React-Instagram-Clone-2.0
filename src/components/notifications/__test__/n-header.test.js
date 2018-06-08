import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../store/mockStore/mockStore'
import NotificationsHeader from '../n-header'
import Notification from '../../../store/mockStore/mock-reducers/Notification'

describe('NotificationsHeader Component', () => {
  const comp = (
    <Provider store={mockStore}>
      <NotificationsHeader/>
    </Provider>
  )

  it('should match snapshot', () => {
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot when notifications.length == 0', () => {
    Notification.notifications = []
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
