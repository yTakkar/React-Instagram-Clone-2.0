import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../store/__mocks__/mockStore'
import BannerFollow from '../follow'
import User from '../../../../store/__mocks__/reducers/User'
import MockDataElement from '../../../../utils/__mocks__/mock-dataElement'
import Follow from '../../../../store/__mocks__/reducers/Follow'

describe('BannerFollow Component', () => {
  MockDataElement()

  const comp = (
    <Provider store={mockStore}>
      <BannerFollow />
    </Provider>
  )

  it('should match snapshot and show editProfile link', () => {
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot and show <Follow/>', () => {
    User.user_details.id = 7
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot and show <Unfollow/>', () => {
    User.user_details.id = 7
    Follow.isFollowing = true
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
