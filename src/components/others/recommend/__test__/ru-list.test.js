import React from 'react'
import { create } from 'react-test-renderer'
import RecommendUsersList from '../ru-list'
import mockStore from '../../../../store/__mocks__/mockStore'
import mockFollowState from '../../../../store/__mocks__/reducers/Follow'

describe('RecommendUsers-List Component', () => {
  it('should match snapshot', () => {
    const tree = create(
      <RecommendUsersList
        {...mockFollowState.usersToRecommend[0]}
        store={mockStore}
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
