import React from 'react'
import MockDataElement from '../../../../utils/__test__/mock-dataElement'
import User from '../../../../store/mockStore/mock-reducers/User'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../store/mockStore/mockStore'
import IsOnline from '../isOnline'

describe('IsOnline Component', () => {
  const comp = (
    <Provider store={mockStore}>
      <IsOnline/>
    </Provider>
  )

  MockDataElement()

  it('should match snapshot and show online status', () => {
    User.user_details.isOnline = true
    User.user_details.id = 7
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot and show last active status', () => {
    User.user_details.id = 7
    User.user_details.isOnline = false
    User.user_details.lastOnline = '1514718748562'
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
