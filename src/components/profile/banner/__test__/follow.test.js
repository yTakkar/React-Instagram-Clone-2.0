import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../store/mockStore/mockStore'
import { BrowserRouter as Router } from 'react-router-dom'
import BannerFollow from '../follow'
import User from '../../../../store/mockStore/mock-reducers/User'
import MockDataElement from '../../../../utils/__test__/mock-dataElement'
import Follow from '../../../../store/mockStore/mock-reducers/Follow'

describe('BannerFollow Component', () => {
  MockDataElement()

  const comp = (
    <Provider store={mockStore}>
      <Router>
        <BannerFollow/>
      </Router>
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
