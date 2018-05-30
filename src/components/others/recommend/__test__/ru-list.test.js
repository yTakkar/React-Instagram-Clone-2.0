import React from 'react'
import { create } from 'react-test-renderer'
import { BrowserRouter as Router } from 'react-router-dom'
import RecommendUsersList from '../ru-list'
import mockStore from '../../../../store/mockStore/mockStore'
import mockFollowState from '../../../../store/mockStore/mock-reducers/Follow'

describe('RecommendUsers-List Component', () => {

  it('should match snapshot', () => {
    const tree = create(
      <Router>
        <RecommendUsersList
          {...mockFollowState.usersToRecommend[0]}
          store={mockStore}
        />
      </Router>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
